/*
 * ultimate-skip-mod.js v.1.3.2
 * Базується на ultimate-skip.js від ipavlin98
 * Оригінал: https://github.com/ipavlin98/lmp-plugins
 * Автор оригіналу: ipavlin98
 *
 // url:https://gist.githack.com/trigor74/fce7e01a741dfe445c41db6f766b9632/raw/ultimate-skip-mod.js
 * Зміни (TrIgor74):
 *  1. Кешування відповідей API (Aniskip per-episode, GitHub DB як цілий файл)
 *     в Lampa.Storage під єдиним ключем usk_cache з TTL в годинах
 *     (за замовчуванням 1 доба, ключ usk_cache_ttl).
 *  2. Збереження контексту картки (currentCard, currentKpId, currentMalId, тощо)
 *     при відкритті плеєра для використання при навігації між серіями.
 *  3. Перехоплення події Player.listener 'start' — єдина синхронна точка перед
 *     Segments.set(data.segments). Зчитує кеш і вставляє сегменти для кожної серії
 *     при навігації, не зачіпаючи плейліст.
 *  4. Попереднє завантаження (prefetch) сегментів для ±3 серій у фоні.
 *  5. Виправлення для плагінів типу lamponline: плейліст передається окремим
 *     викликом Lampa.Player.playlist([...]) — ін'єктується в videoParams.playlist.
 *  6. PlayerPlaylist.set перенесено після searchAndApply (сегменти вже заповнені).
 *  7. Додано TheIntroDB (api.theintrodb.org) та IntroDB.app (api.introdb.app) як
 *     пріоритетні джерела перед GitHub DB та Aniskip. TheIntroDB підтримує TV і
 *     фільми через tmdb_id. IntroDB.app підтримує TV через imdb_id (отримується з
 *     TMDB /external_ids). Для фільмів використовується тільки TheIntroDB.
 */
(function () {
	"use strict";

	const ANISKIP_API = "https://api.aniskip.com/v2/skip-times";
	const JIKAN_API = "https://api.jikan.moe/v4/anime";
	const GITHUB_DB_URL = "https://raw.githubusercontent.com/ipavlin98/lmp-series-skip-db/refs/heads/main/database/";
	const TIDB_API = "https://api.theintrodb.org/v3/media";
	const INTRODB_API = "https://api.introdb.app/segments";
	const SKIP_TYPES = ["op", "ed", "recap"];
	const STORAGE_KEY = "ultimate_skip_offsets";

	// Кешування
	var CACHE_STORE_KEY = "usk_cache"; // єдиний ключ для всього кешу
	var DEFAULT_TTL_HOURS = 24; // 1 доба
	var PREFETCH_WIN = 3; // кількість серій вперед/назад для prefetch

	// Контекст поточного перегляду (скидається при кожному Player.play)
	var currentCard = null;
	var currentKpId = null;
	var currentMalId = null;
	var currentIsAnime = false;
	var currentSeason = 1;
	var currentTmdbId = null;
	var currentImdbId = null;
	var currentIsMovie = false;
	// true/false — чи є дані Aniskip для поточного шоу (null = ще невідомо)
	var currentMalHasAniskip = null;

	// ── Кеш (єдиний об'єкт usk_cache) ─────────────────────────────────────────

	function cacheGetStore() {
		try {
			var raw = Lampa.Storage.get(CACHE_STORE_KEY, null);
			if (!raw) return {};
			return (typeof raw === "string" ? JSON.parse(raw) : raw) || {};
		} catch (e) {
			return {};
		}
	}

	function cacheGet(key) {
		try {
			var entry = cacheGetStore()[key];
			if (!entry || !entry.ts) return null;
			var ttlMs = parseInt(Lampa.Storage.get("usk_cache_ttl", DEFAULT_TTL_HOURS)) * 3600000;
			if (Date.now() - entry.ts > ttlMs) return null;
			return entry.data;
		} catch (e) {
			return null;
		}
	}

	function cacheSet(key, data) {
		try {
			var store = cacheGetStore();
			// Видаляємо застарілі записи при кожному записі
			var ttlMs = parseInt(Lampa.Storage.get("usk_cache_ttl", DEFAULT_TTL_HOURS)) * 3600000;
			var now = Date.now();
			for (var k in store) {
				if (!store[k] || !store[k].ts || now - store[k].ts > ttlMs) delete store[k];
			}
			store[key] = { data: data, ts: now };
			Lampa.Storage.set(CACHE_STORE_KEY, JSON.stringify(store));
		} catch (e) {}
	}

	// Одноразове очищення старих розрізнених usk_* ключів (до міграції на єдиний usk_cache).
	// Lampa.Storage додає власний префікс до ключів у localStorage, тому шукаємо за підрядком.
	function cacheLegacyCleanup() {
		try {
			var oldPatterns = ["usk_skip_", "usk_tidb_", "usk_introdb_", "usk_tmdb_extids_",
				"ultimate_aniskip_cache", "ultimate_malid_cache", "ultimate_skip_cache"];
			var toRemove = [];
			for (var i = 0; i < localStorage.length; i++) {
				var k = localStorage.key(i);
				if (!k) continue;
				for (var j = 0; j < oldPatterns.length; j++) {
					if (k.indexOf(oldPatterns[j]) !== -1) { toRemove.push(k); break; }
				}
			}
			toRemove.forEach(function(k) { localStorage.removeItem(k); });
		} catch (e) {}
	}

	// Зміщує сегменти з start < 1 до start = 1, щоб уникнути помилки NaN duration
	// при першому timeupdate HLS-потоку (duration = NaN поки не завантажено маніфест)
	function normalizeSegsStartTime(segs) {
		if (!segs || !segs.length) return segs;
		return segs.map(function (s) {
			return s.start < 1 ? { start: 1, end: s.end, name: s.name } : s;
		});
	}

	// ── Оригінальні допоміжні функції (без змін) ───────────────────────────────

	function getCardId(card) {
		if (!card) return null;
		return card.id || card.kinopoisk_id || card.kp_id || card.imdb_id || null;
	}

	function getOffsets() {
		try {
			var data = Lampa.Storage.get(STORAGE_KEY, "{}");
			if (typeof data === "string") return JSON.parse(data);
			return data || {};
		} catch (e) {
			return {};
		}
	}

	function getOffset(cardId) {
		if (!cardId) return 0;
		var offsets = getOffsets();
		return offsets[cardId] || 0;
	}

	function setOffset(cardId, value) {
		if (!cardId) return;
		var offsets = getOffsets();
		if (value === 0) {
			delete offsets[cardId];
		} else {
			offsets[cardId] = value;
		}
		Lampa.Storage.set(STORAGE_KEY, JSON.stringify(offsets));
	}

	function applyOffset(segments, offset) {
		if (!segments || !offset) return segments;
		return segments.map(function (seg) {
			return {
				start: Math.max(0, seg.start + offset),
				end: Math.max(0, seg.end + offset),
				name: seg.name
			};
		});
	}

	function hasExistingSegments(obj) {
		return obj && obj.segments && obj.segments.skip && obj.segments.skip.length > 0;
	}

	function isAnimeContent(card) {
		if (!card) return false;
		const lang = (card.original_language || "").toLowerCase();
		const isAsian = lang === "ja" || lang === "zh" || lang === "cn";
		const isAnimation = card.genres && card.genres.some(
			(g) => g.id === 16 || (g.name && g.name.toLowerCase() === "animation")
		);
		return isAsian || isAnimation;
	}

	function updatePlaylist(playlist, currentSeason, currentEpisode, segments) {
		if (playlist && Array.isArray(playlist)) {
			playlist.forEach((item, index) => {
				const itemSeason = item.season || item.s || currentSeason;
				const itemEpisode = item.episode || item.e || item.episode_number || index + 1;

				if (parseInt(itemEpisode) === parseInt(currentEpisode) && parseInt(itemSeason) === parseInt(currentSeason)) {
					if (!hasExistingSegments(item)) {
						item.segments = item.segments || {};
						item.segments.skip = segments.slice();
					}
				}
			});
		}
	}

	function getSegmentsFromDb(dbData, season, episode) {
		if (!dbData) return null;
		const seasonStr = String(season);
		const episodeStr = String(episode);

		if (dbData[seasonStr] && dbData[seasonStr][episodeStr]) {
			return dbData[seasonStr][episodeStr];
		}

		if (seasonStr === "1" && episodeStr === "1" && dbData.movie) {
			return dbData.movie;
		}

		if (dbData.movie) {
			return dbData.movie;
		}

		return null;
	}

	async function fetchFromGitHub(kpId) {
		try {
			const url = `${GITHUB_DB_URL}${kpId}.json`;
			const response = await fetch(url);
			return response.ok ? await response.json() : null;
		} catch (e) {
			return null;
		}
	}

	async function searchMalId(title, seas, year) {
		let query = title;
		if (seas > 1) query += " Season " + seas;

		const url = `${JIKAN_API}?q=${encodeURIComponent(query)}&limit=10`;

		try {
			const response = await fetch(url);
			const json = await response.json();

			if (!json.data || json.data.length === 0) return null;

			if (year && seas === 1) {
				const match = json.data.find((item) => {
					let y = item.year;
					if (!y && item.aired && item.aired.from)
						y = item.aired.from.substring(0, 4);
					return String(y) === String(year);
				});
				if (match) {
					return match.mal_id;
				}
			}

			if (seas > 1) {
				const ordinal =
					seas +
					(seas % 10 === 1 && seas !== 11
						? "st"
						: seas % 10 === 2 && seas !== 12
							? "nd"
							: seas % 10 === 3 && seas !== 13
								? "rd"
								: "th");
				const keywords = [
					`Season ${seas}`,
					`${ordinal} Season`,
					`Season${seas}`
				];

				const titleMatch = json.data.find((item) => {
					const titlesToCheck = [
						item.title,
						item.title_english,
						...(item.title_synonyms || [])
					]
						.filter(Boolean)
						.map((t) => t.toLowerCase());

					return titlesToCheck.some((t) =>
						keywords.some((k) => t.includes(k.toLowerCase()))
					);
				});

				if (titleMatch) {
					return titleMatch.mal_id;
				}
			}

			return json.data[0].mal_id;
		} catch (e) {
			return null;
		}
	}

	async function fetchAniSkipSegments(malId, episode) {
		const types = SKIP_TYPES.map((t) => "types=" + t);
		types.push("episodeLength=0");
		const url = `${ANISKIP_API}/${malId}/${episode}?${types.join("&")}`;

		try {
			const res = await fetch(url);
			if (res.status === 404) return [];
			const data = await res.json();
			if (data.found && data.results && data.results.length > 0) {
				return data.results;
			}
			return [];
		} catch (e) {
			return [];
		}
	}

	function parseAniSkipSegments(rawSegments) {
		if (!rawSegments || !rawSegments.length) return [];
		const list = [];
		rawSegments.forEach((s) => {
			if (!s.interval) return;
			const type = (s.skipType || s.skip_type || "").toLowerCase();
			let name = "Пропустити";
			if (type.includes("op")) name = "Опенінг";
			else if (type.includes("ed")) name = "Ендінг";
			else if (type === "recap") name = "Рекап";

			const start =
				s.interval.startTime !== undefined
					? s.interval.startTime
					: s.interval.start_time;
			const end =
				s.interval.endTime !== undefined
					? s.interval.endTime
					: s.interval.end_time;

			if (start !== undefined && end !== undefined) {
				list.push({ start, end, name });
			}
		});
		return list;
	}

	// ── TheIntroDB та IntroDB.app ───────────────────────────────────────────────

	// Отримує imdb_id через TMDB /external_ids (з кешуванням)
	// Використовує Lampa.TMDB.api() та Lampa.TMDB.key() — стандартний механізм додатку
	async function fetchImdbId(tmdbId, isMovie) {
		if (!tmdbId) return null;
		var cacheKey = 'tmdb_extids_' + tmdbId;
		var cached = cacheGet(cacheKey);
		if (cached !== null) return cached || null;

		try {
			var mediaType = isMovie ? 'movie' : 'tv';
			var url = Lampa.TMDB.api(mediaType + '/' + tmdbId + '/external_ids?api_key=' + Lampa.TMDB.key());
			var res = await fetch(url);
			if (!res.ok) { cacheSet(cacheKey, false); return null; }
			var data = await res.json();
			var imdbId = data.imdb_id || false;
			cacheSet(cacheKey, imdbId);
			return imdbId || null;
		} catch (e) {
			cacheSet(cacheKey, false);
			return null;
		}
	}

	// Парсить відповідь TheIntroDB у [{start, end, name}]
	// intro[], recap[], credits[] — масиви {start_ms, end_ms}, null = відкритий кінець/початок
	function parseTIDBResponse(data, isAnime) {
		if (!data) return [];
		var segs = [];

		function addFromArray(arr, name) {
			if (!arr || !arr.length) return;
			arr.forEach(function (s) {
				var start = (s.start_ms != null) ? s.start_ms / 1000 : 0;
				var end = (s.end_ms != null) ? s.end_ms / 1000 : 99999;
				if (end > start) segs.push({ start: start, end: end, name: name });
			});
		}

		addFromArray(data.intro, isAnime ? "Опенінг" : "Вступ");
		addFromArray(data.recap, "Рекап");
		addFromArray(data.credits, isAnime ? "Ендінг" : "Фінальні титри");
		// data.preview (анонс наступної серії) — не потрібен для пропуску
		return segs;
	}

	// Парсить відповідь IntroDB.app у [{start, end, name}]
	// intro, recap, outro — об'єкти {start_ms, end_ms}
	function parseIntroDBResponse(data, isAnime) {
		if (!data) return [];
		var segs = [];

		function addFromObj(obj, name) {
			if (!obj) return;
			var start = (obj.start_ms != null) ? obj.start_ms / 1000 : 0;
			var end = (obj.end_ms != null) ? obj.end_ms / 1000 : 99999;
			if (end > start) segs.push({ start: start, end: end, name: name });
		}

		addFromObj(data.intro, isAnime ? "Опенінг" : "Вступ");
		addFromObj(data.recap, "Рекап");
		addFromObj(data.outro, isAnime ? "Ендінг" : "Фінальні титри");
		return segs;
	}

	// Сирий запит до TheIntroDB (кешування — на стороні виклику)
	async function fetchFromTIDB(tmdbId, season, episode, isMovie) {
		if (!tmdbId) return null;
		try {
			var url = TIDB_API + '?tmdb_id=' + tmdbId;
			if (!isMovie) url += '&season=' + season + '&episode=' + episode;
			var res = await fetch(url);
			if (!res.ok) return null;
			return await res.json();
		} catch (e) {
			return null;
		}
	}

	// Сирий запит до IntroDB.app (кешування — на стороні виклику)
	async function fetchFromIntroDB(imdbId, season, episode) {
		if (!imdbId) return null;
		try {
			var url = INTRODB_API + '?imdb_id=' + imdbId + '&season=' + season + '&episode=' + episode;
			var res = await fetch(url);
			if (!res.ok) return null;
			return await res.json();
		} catch (e) {
			return null;
		}
	}

	// ── Нові функції: навігація між серіями ────────────────────────────────────

	// Визначає season/episode для елемента плеєра (data в події 'start')
	function getPositionFromItem(data) {
		var ep = data.episode || data.e || data.episode_number;
		var seas = data.season || data.s;
		if (ep) {
			return { season: parseInt(seas || currentSeason || 1), episode: parseInt(ep) };
		}
		// Fallback: шукаємо позицію в плейлісті за посиланням або URL
		try {
			var playlist = Lampa.PlayerPlaylist.get ? Lampa.PlayerPlaylist.get() : null;
			if (playlist && playlist.length) {
				var idx = -1;
				for (var i = 0; i < playlist.length; i++) {
					if (playlist[i] === data || (data.url && playlist[i].url === data.url)) {
						idx = i;
						break;
					}
				}
				if (idx !== -1) {
					var item = playlist[idx];
					ep = item.episode || item.e || item.episode_number || (idx + 1);
					seas = item.season || item.s || currentSeason || 1;
					return { season: parseInt(seas), episode: parseInt(ep) };
				}
			}
		} catch (e) {}
		return null;
	}

	// Вставляє сегменти з кешу в data.segments до того, як Lampa викличе Segments.set
	function onPlayerStart(data) {
		if (!currentCard) return;

		var pos = getPositionFromItem(data);

		// Якщо сегменти вже є — тільки запускаємо prefetch сусідніх серій
		if (hasExistingSegments(data)) {
			if (pos) prefetchAdjacent(pos.season, pos.episode);
			return;
		}

		if (!pos) return;

		var offset = getOffset(getCardId(currentCard));
		var segs = null;

		// TheIntroDB кеш (TV)
		if (!segs && currentTmdbId && !currentIsMovie) {
			var tidbHit = cacheGet('tidb_' + currentTmdbId + '_' + pos.season + '_' + pos.episode);
			if (tidbHit) segs = parseTIDBResponse(tidbHit, currentIsAnime);
		}

		// IntroDB.app кеш (TV only)
		if (!segs && currentImdbId && !currentIsMovie) {
			var introdbHit = cacheGet('introdb_' + currentImdbId + '_' + pos.season + '_' + pos.episode);
			if (introdbHit) segs = parseIntroDBResponse(introdbHit, currentIsAnime);
		}

		// Aniskip кеш (аніме)
		if (!segs && currentIsAnime && currentMalId) {
			var aniskipHit = cacheGet("skip_" + currentMalId + "_" + pos.episode);
			if (aniskipHit !== null) segs = parseAniSkipSegments(aniskipHit);
		}

		// GitHub DB кеш
		if (!segs && currentKpId && !currentIsMovie) {
			var dbHit = cacheGet("ghdb_" + currentKpId);
			if (dbHit) {
				var raw = getSegmentsFromDb(dbHit, pos.season, pos.episode);
				if (raw && raw.length) segs = raw;
			}
		}

		if (segs && segs.length) {
			var normSegs = normalizeSegsStartTime(segs);
			data.segments = data.segments || {};
			data.segments.skip = offset ? applyOffset(normSegs, offset) : normSegs.slice();
			Lampa.Noty.show("Таймкоди: Сезон " + pos.season + ", Серія " + pos.episode);
		}

		prefetchAdjacent(pos.season, pos.episode);
	}

	// Завантажує та кешує сегменти для одного епізоду
	async function prefetchEpisode(season, episode) {
		if (episode < 1) return;

		// TheIntroDB prefetch
		if (currentTmdbId && !currentIsMovie) {
			var tidbKey = 'tidb_' + currentTmdbId + '_' + season + '_' + episode;
			if (cacheGet(tidbKey) === null) {
				try {
					var tidbData = await fetchFromTIDB(currentTmdbId, season, episode, false);
					cacheSet(tidbKey, tidbData || false);
				} catch (e) { cacheSet(tidbKey, false); }
			}
		}

		// IntroDB.app prefetch
		if (currentImdbId && !currentIsMovie) {
			var introdbKey = 'introdb_' + currentImdbId + '_' + season + '_' + episode;
			if (cacheGet(introdbKey) === null) {
				try {
					var introdbData = await fetchFromIntroDB(currentImdbId, season, episode);
					cacheSet(introdbKey, introdbData || false);
				} catch (e) { cacheSet(introdbKey, false); }
			}
		}

		// Aniskip prefetch (аніме)
		if (currentIsAnime && currentMalId && currentMalHasAniskip !== false) {
			var key = "skip_" + currentMalId + "_" + episode;
			if (cacheGet(key) === null) {
				try {
					var raw = await fetchAniSkipSegments(currentMalId, episode);
					cacheSet(key, raw || []);
				} catch (e) {
					cacheSet(key, []);
				}
			}
		}
	}

	// Послідовно завантажує ±PREFETCH_WIN серій навколо поточної
	async function prefetchAdjacent(season, episode) {
		for (var d = 1; d <= PREFETCH_WIN; d++) {
			await prefetchEpisode(season, episode + d);
			await prefetchEpisode(season, episode - d);
		}
	}

	// ── searchAndApply (оригінальна логіка + збереження контексту + кешування) ─

	async function searchAndApply(videoParams) {
		let card = videoParams.movie || videoParams.card;
		if (!card) {
			const active = Lampa.Activity.active();
			if (active) card = active.movie || active.card;
		}
		if (!card) return;

		const title = videoParams.title || card.title || card.name || "";
		const trailerKeywords = ["трейлер", "trailer", "тизер", "teaser"];
		const isTrailerTitle = trailerKeywords.some((k) =>
			title.toLowerCase().includes(k)
		);

		if (isTrailerTitle) {
			return;
		}

		// Зберігаємо контекст картки для подальших навігацій між серіями
		currentCard = card;
		currentKpId = card.kinopoisk_id || (card.source === "kinopoisk" ? card.id : null) || card.kp_id;
		currentTmdbId = (card.source !== "kinopoisk" && card.id) ? parseInt(card.id) : null;
		currentImdbId = card.imdb_id || null;
		currentIsAnime = isAnimeContent(card);
		currentIsMovie = false; // буде уточнено після isSerial
		currentMalId = null;
		currentMalHasAniskip = null;
		currentSeason = 1;

		const kpId = currentKpId;

		const position = (function (params, defaultSeason = 1) {
			if (params.episode || params.e || params.episode_number) {
				return {
					season: parseInt(params.season || params.s || defaultSeason),
					episode: parseInt(params.episode || params.e || params.episode_number)
				};
			}
			if (params.playlist && Array.isArray(params.playlist)) {
				const url = params.url;
				const index = params.playlist.findIndex((p) => p.url && p.url === url);
				if (index !== -1) {
					const item = params.playlist[index];
					return {
						season: parseInt(item.season || item.s || defaultSeason),
						episode: index + 1
					};
				}
			}
			return { season: defaultSeason, episode: 1 };
		})(videoParams, 1);

		let episode = position.episode;
		let season = position.season;

		const isSerial = card.number_of_seasons > 0 || (card.original_name && !card.original_title);
		if (!isSerial) {
			season = 1;
			episode = 1;
		}

		currentIsMovie = !isSerial;
		currentSeason = season;

		if (hasExistingSegments(videoParams)) return;

		let finalSegments = [];
		let source = null;
		const isAnime = currentIsAnime;

		// TheIntroDB — підтримує TV та фільми через tmdb_id
		if (finalSegments.length === 0 && currentTmdbId) {
			var tidbCacheKey = currentIsMovie
				? 'tidb_movie_' + currentTmdbId
				: 'tidb_' + currentTmdbId + '_' + season + '_' + episode;
			var tidbCached = cacheGet(tidbCacheKey);
			if (tidbCached === null) {
				tidbCached = await fetchFromTIDB(currentTmdbId, season, episode, currentIsMovie);
				cacheSet(tidbCacheKey, tidbCached || false);
			}
			if (tidbCached) {
				var tidbSegs = parseTIDBResponse(tidbCached, isAnime);
				if (tidbSegs.length > 0) {
					finalSegments = tidbSegs;
					source = "tidb";
				}
			}
		}

		// IntroDB.app — тільки серіали, потрібен imdb_id
		if (finalSegments.length === 0 && !currentIsMovie) {
			// Якщо imdb_id немає на картці — отримуємо з TMDB /external_ids
			if (!currentImdbId && currentTmdbId) {
				currentImdbId = await fetchImdbId(currentTmdbId, false);
			}
			if (currentImdbId) {
				var introdbCacheKey = 'introdb_' + currentImdbId + '_' + season + '_' + episode;
				var introdbCached = cacheGet(introdbCacheKey);
				if (introdbCached === null) {
					introdbCached = await fetchFromIntroDB(currentImdbId, season, episode);
					cacheSet(introdbCacheKey, introdbCached || false);
				}
				if (introdbCached) {
					var introdbSegs = parseIntroDBResponse(introdbCached, isAnime);
					if (introdbSegs.length > 0) {
						finalSegments = introdbSegs;
						source = "introdb";
					}
				}
			}
		}

		// Aniskip — тільки аніме серіали
		if (finalSegments.length === 0 && isAnime) {
			let cleanName = card.original_name || card.original_title || card.name;
			const searchTerm = cleanName
				? cleanName
					.replace(/\(\d{4}\)/g, "")
					.replace(/\(TV\)/gi, "")
					.replace(/Season \d+/gi, "")
					.replace(/Part \d+/gi, "")
					.replace(/[:\-]/g, " ")
					.replace(/\s+/g, " ")
					.trim()
				: "";

			const releaseYear = (card.release_date || card.first_air_date || "0000").slice(0, 4);

			const malId = await searchMalId(searchTerm, season, releaseYear);

			if (malId) {
				currentMalId = malId;

				var aniskipKey = "skip_" + malId + "_" + episode;
				var cachedRaw = cacheGet(aniskipKey);
				var segmentsData;
				if (cachedRaw !== null) {
					segmentsData = cachedRaw;
				} else {
					segmentsData = await fetchAniSkipSegments(malId, episode);
					cacheSet(aniskipKey, segmentsData || []);
				}

				finalSegments = parseAniSkipSegments(segmentsData);
				currentMalHasAniskip = finalSegments.length > 0;
				if (finalSegments.length > 0) {
					source = "aniskip";
				}
			}
		}

		// GitHub DB — тільки серіали з Kinopoisk ID
		if (finalSegments.length === 0 && kpId && !currentIsMovie) {
			var cachedDb = cacheGet("ghdb_" + kpId);
			const dbData = cachedDb || (await fetchFromGitHub(kpId));
			if (dbData) {
				if (!cachedDb) cacheSet("ghdb_" + kpId, dbData);

				const segmentsData = getSegmentsFromDb(dbData, season, episode);
				if (segmentsData && segmentsData.length > 0) {
					finalSegments = segmentsData.slice();
					source = "github";
				}

				if (videoParams.playlist && Array.isArray(videoParams.playlist)) {
					videoParams.playlist.forEach((item) => {
						if (hasExistingSegments(item)) return;

						const itemSeason = item.season || item.s || season;
						const itemEpisode = item.episode || item.e || item.episode_number;
						if (itemSeason && itemEpisode) {
							const itemSegments = getSegmentsFromDb(dbData, itemSeason, itemEpisode);
							if (itemSegments) {
								var cardId = getCardId(card);
								var offset = getOffset(cardId);
								var normSegs = normalizeSegsStartTime(itemSegments);
								item.segments = item.segments || {};
								item.segments.skip = offset !== 0 ? applyOffset(normSegs, offset) : normSegs.slice();
							}
						}
					});
				}
			}
		}

		if (finalSegments.length > 0) {
			var cardId = getCardId(card);
			var offset = getOffset(cardId);
			finalSegments = normalizeSegsStartTime(finalSegments);
			if (offset !== 0) {
				finalSegments = applyOffset(finalSegments, offset);
			}

			videoParams.segments = videoParams.segments || {};
			videoParams.segments.skip = finalSegments.slice();

			updatePlaylist(videoParams.playlist, season, episode, finalSegments);
			Lampa.Noty.show("Таймкоди завантажено: Сезон " + season + ", Серія " + episode);

			prefetchAdjacent(season, episode);
		}
	}

	// ── initOffsetFilterMenu (без змін) ────────────────────────────────────────

	function initOffsetFilterMenu() {
		if (window.ultimate_skip_filter_plugin) {
			return;
		}

		window.ultimate_skip_filter_plugin = true;

		Lampa.Lang.add({
			ultimate_skip_offset: {
				ru: "Смещение меток",
				en: "Marks offset",
				uk: "Зміщення міток",
				zh: "标记偏移"
			},
			ultimate_skip_offset_sec: {
				ru: "сек",
				en: "sec",
				uk: "сек",
				zh: "秒"
			}
		});

		Lampa.Controller.listener.follow("toggle", function (event) {
			if (event.name !== "select") {
				return;
			}

			var active = Lampa.Activity.active();

			var componentName = active.component ? active.component.toLowerCase() : "";
			if (
				!active ||
				!active.component ||
				(componentName !== "lamponline" && componentName !== "lampacskaz" && componentName !== "lampac")
			) {
				return;
			}

			var $filterTitle = $(".selectbox__title");

			if (
				$filterTitle.length !== 1 ||
				$filterTitle.text() !== Lampa.Lang.translate("title_filter")
			) {
				return;
			}

			if ($(".selectbox-item[data-ultimate-skip-offset]").length > 0) {
				return;
			}

			var card = active.movie || active.card;
			var cardId = getCardId(card);

			if (!cardId) {
				return;
			}

			var currentOffset = getOffset(cardId);
			var offsetText = currentOffset === 0 ? "0" : (currentOffset > 0 ? "+" + currentOffset : String(currentOffset));

			var $offsetItem = Lampa.Template.get("selectbox_item", {
				title: Lampa.Lang.translate("ultimate_skip_offset"),
				subtitle: offsetText + " " + Lampa.Lang.translate("ultimate_skip_offset_sec")
			});

			$offsetItem.attr("data-ultimate-skip-offset", "true");

			$offsetItem.on("hover:enter", function () {
				Lampa.Select.close();

				var items = [];
				var values = [-30, -20, -15, -10, -5, -3, -2, -1, 0, 1, 2, 3, 5, 10, 15, 20, 30];

				values.forEach(function (val) {
					var label = val === 0 ? "0" : (val > 0 ? "+" + val : String(val));
					items.push({
						title: label + " " + Lampa.Lang.translate("ultimate_skip_offset_sec"),
						value: val,
						selected: val === currentOffset
					});
				});

				Lampa.Select.show({
					title: Lampa.Lang.translate("ultimate_skip_offset"),
					items: items,
					onBack: function () {
						Lampa.Controller.toggle("content");
					},
					onSelect: function (item) {
						setOffset(cardId, item.value);
						Lampa.Noty.show(Lampa.Lang.translate("ultimate_skip_offset") + ": " + (item.value === 0 ? "0" : (item.value > 0 ? "+" + item.value : item.value)) + " " + Lampa.Lang.translate("ultimate_skip_offset_sec"));
						Lampa.Controller.toggle("content");
					}
				});
			});

			var $lastItem = $(".selectbox-item").last();
			if ($lastItem.length) {
				$lastItem.after($offsetItem);
			} else {
				var $scrollBody = $("body > .selectbox").find(".scroll__body");
				$scrollBody.append($offsetItem);
			}

			Lampa.Controller.collectionSet(
				$("body > .selectbox").find(".scroll__body")
			);
		});
	}

	// ── init ───────────────────────────────────────────────────────────────────

	function init() {
		if (window.lampa_ultimate_skip) return;
		window.lampa_ultimate_skip = true;

		cacheLegacyCleanup();
		initOffsetFilterMenu();

		const originalPlay = Lampa.Player.play;
		const originalPlaylist = Lampa.Player.playlist;
		let pendingPlaylist = null;

		Lampa.Player.playlist = function (playlist) {
			pendingPlaylist = playlist;
			originalPlaylist.call(this, playlist);
		};

		// Підписуємось на 'start' — вставляємо сегменти з кешу для кожної серії
		if (Lampa.Player.listener && Lampa.Player.listener.follow) {
			Lampa.Player.listener.follow("start", onPlayerStart);
		}

		Lampa.Player.play = function (videoParams) {
			const context = this;

			// Скидаємо контекст при новому відтворенні
			currentCard = null;
			currentMalId = null;
			currentKpId = null;
			currentTmdbId = null;
			currentImdbId = null;
			currentIsMovie = false;

			// Виправлення для lamponline: плагін передає плейліст через окремий виклик
			// Lampa.Player.playlist([...]), тому videoParams.playlist залишається undefined
			if (!videoParams.playlist && pendingPlaylist && pendingPlaylist.length) {
				videoParams.playlist = pendingPlaylist;
			}

			searchAndApply(videoParams)
				.then(() => {
					if (videoParams.url) {
						Lampa.PlayerPlaylist.url(videoParams.url);
					}

					// Встановлюємо плейліст після завантаження сегментів
					var playlistToSet = videoParams.playlist || pendingPlaylist;
					if (playlistToSet && playlistToSet.length > 0) {
						Lampa.PlayerPlaylist.set(playlistToSet);
					}

					originalPlay.call(context, videoParams);
					pendingPlaylist = null;
				})
				.catch((e) => {
					originalPlay.call(context, videoParams);
				});
		};
	}

	if (window.Lampa && window.Lampa.Player) {
		init();
	} else {
		window.document.addEventListener("app_ready", init);
	}
})();
