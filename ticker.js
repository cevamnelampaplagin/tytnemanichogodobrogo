(function(){'use strict';
if(window.lampa_rss_ticker)return;window.lampa_rss_ticker=true;

var FEEDS={crypto_news:['https://cointelegraph.com/rss','https://decrypt.co/feed','https://cryptoslate.com/feed/'],fuel:['https://www.nefterynok.info/rss','https://enkorr.ua/feed'],news:['https://rss.unian.net/site/news_ukr.rss','https://www.ukrinform.ua/rss/news.xml','https://lb.ua/rss.xml','https://nv.ua/rss/all.xml','https://www.pravda.com.ua/rss/']},
API={nbu:'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',cg:'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=usd,uah&include_24hr_change=true',fuel:'https://api.epalne.com.ua/v1/today',alerts:'https://ubilling.net.ua/aerialalerts/?source=default'},
FUEL_KEY='epk_7331c89d25d42dea0cbbde55174c593c4e2cd3203900083e',
FUEL_REGIONS={kievskaya:'Київська',lvovskaya:'Львівська',odesskaya:'Одеська',harkovskaya:'Харківська',dnepropetrovskaya:'Дніпропетровська',zaporozhskaya:'Запорізька',vinnickaya:'Вінницька',poltavskaya:'Полтавська',chernigovskaya:'Чернігівська',sumskaya:'Сумська',zhitomirskaya:'Житомирська',chernovickaya:'Чернівецька',ivanofrankovskaya:'Івано-Франківська',ternopolskaya:'Тернопільська',rovenskaya:'Рівненська',volynskaya:'Волинська',hmelnickaya:'Хмельницька',kirovogradskaya:'Кіровоградська',nikolaevskaya:'Миколаївська',hersonskaya:'Херсонська',cherkasskaya:'Черкаська'},
FUEL_TYPES={a95:'А-95',a95plus:'А-95+',a92:'А-92',diesel:'ДП (дизель)',gas:'Газ (LPG)'},
PERM=['севастополь','луганська','крим','автономна республіка крим'],
PROXIES=[
  function(u){return'https://easy-ofilia-oslovienka-18d5d406.koyeb.app/?url='+encodeURIComponent(u)},
  function(u){return'https://api.codetabs.com/v1/proxy/?quest='+encodeURIComponent(u)},
  function(u){return'https://api.allorigins.win/raw?url='+encodeURIComponent(u)},
  function(u){return'https://api.allorigins.win/get?url='+encodeURIComponent(u)},
  function(u){return'https://corsproxy.io/?'+encodeURIComponent(u)}
],
D={rss_enabled:true,rss_show_rates:true,rss_show_news:true,rss_crypto:true,rss_currency:true,rss_crypto_news:true,rss_fuel:true,rss_news:true,rss_custom_1:'',rss_custom_2:'',rss_custom_3:'',rss_speed:'60',rss_text_color:'#ffffff',rss_bg_color:'#000000',rss_opacity:'0.75',rss_separator:'  ✦  ',rss_position:'bottom',rss_height:'36',rss_show_date:true,rss_show_source:true,rss_refresh_min:'20',rss_max_per_feed:'5',rss_currencies:'USD,EUR,PLN',rss_cryptos:'BTC,ETH,SOL',rss_custom_proxy:'',rss_fuel_prices:true,rss_fuel_region:'kievskaya',rss_fuel_type:'a95',rss_fuel_companies:'ОККО,WOG,SOCAR,AMIC,UPG,UKRNAFTA,KLO',rss_fuel_api_key:'',rss_alerts:true,rss_alerts_hide_long:true,rss_alerts_regions:'',rss_alerts_interval:'30',rss_alerts_pin:true},
CK='rss_ticker_cache_v3',CT='rss_ticker_cache_time_v3',FETCH_TO=12e3,AL='\u0001',
AS={loaded:false,regions:[],key:'',checked:'',okAt:0,failAt:0,raw:null,method:-1},
$box,$track,_last='',_fetchT,_alertT,_retryT,_fetching=false,_alertBusy=false,_retries=0,
_rates=[],_news=[],_speed=60;

function G(k){var v=Lampa.Storage.get(k);return v==null?D[k]:v}
function S(k,v){Lampa.Storage.set(k,v)}
Object.keys(D).forEach(function(k){if(Lampa.Storage.get(k)==null)S(k,D[k])});

function hexRgb(h){h=(h||'#000').replace('#','');if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];var n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
function on(){return!!G('rss_enabled')}

function styles(){
  if(!$box)return;
  var o=parseFloat(G('rss_opacity'))||.75,rgb=hexRgb(G('rss_bg_color')||'#000'),h=parseInt(G('rss_height'),10)||36,top=G('rss_position')==='top';
  $box.css({background:'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+o+')',height:h+'px',lineHeight:h+'px',top:top?'0':'',bottom:top?'':'0',fontSize:Math.round(h*.58)+'px'});
  $track.css({color:G('rss_text_color')||'#fff'});
  $('#rss-ticker-badge').css({background:'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')',color:G('rss_text_color')||'#fff'});
  if(!on())$box.hide();else{$box.show();if($track.css('animation-name')!=='rss-ticker-scroll')restart()}
}

function buildDOM(){
  if($('#rss-ticker-wrap').length)return;
  $('head').append('<style id="rss-ticker-style">#rss-ticker-wrap{position:fixed;left:0;width:100%;z-index:9999;overflow:hidden;white-space:nowrap;pointer-events:none;box-shadow:0 0 12px rgba(0,0,0,.6)}#rss-ticker-track{display:inline-flex;will-change:transform;animation-timing-function:linear;animation-iteration-count:infinite;transition:opacity .25s ease}.rss-ticker-seg{display:inline-block;padding-right:60px}.rss-al.rss-al-on{color:#ff5a5a;font-weight:bold}#rss-ticker-badge{position:absolute;left:0;top:0;bottom:0;z-index:2;padding:0 14px;font-weight:bold;white-space:nowrap;box-shadow:6px 0 10px rgba(0,0,0,.55)}#rss-ticker-badge.on{background:#b71c1c!important;color:#fff!important}#rss-ticker-badge.stale{color:#ffb74d!important}@keyframes rss-ticker-scroll{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}</style>');
  $('body').append('<div id="rss-ticker-wrap"><span id="rss-ticker-track"><span class="rss-ticker-seg" id="rss-ticker-seg-a">Завантаження...</span><span class="rss-ticker-seg" id="rss-ticker-seg-b">Завантаження...</span></span><span id="rss-ticker-badge" style="display:none"></span></div>');
  $box=$('#rss-ticker-wrap');$track=$('#rss-ticker-track');styles();
}

function restart(){
  if(!$track||!$track.length)return;
  _speed=parseInt(G('rss_speed'),10)||60;
  var w=$track[0].scrollWidth/2,dur=Math.max(w/_speed,8);
  $track.css('animation-name','none');
  void $track[0].offsetWidth;
  $track.css({'animation-name':'rss-ticker-scroll','animation-duration':dur+'s'});
}

function proxies(){
  var c=(G('rss_custom_proxy')||'').trim(),list=[];
  if(c)list.push(function(u){return c.indexOf('?')!==-1?c+encodeURIComponent(u):c+(c.slice(-1)==='/'?'':'/')+'?url='+encodeURIComponent(u)});
  return list.concat(PROXIES);
}

function timedFetch(url,opt){
  var ctrl=typeof AbortController!=='undefined'?new AbortController():null,to=setTimeout(function(){ctrl&&ctrl.abort()},FETCH_TO);
  opt=opt||{};if(ctrl)opt.signal=ctrl.signal;opt.cache='no-store';
  return fetch(url,opt).then(function(r){clearTimeout(to);if(!r.ok)throw new Error('HTTP '+r.status);return r}).catch(function(e){clearTimeout(to);throw e});
}

function asText(r){
  var ct=(r.headers.get('content-type')||'').toLowerCase();
  if(ct.indexOf('json')!==-1)return r.json().then(function(d){return d&&typeof d.contents==='string'?d.contents:d&&typeof d.body==='string'?d.body:JSON.stringify(d)});
  return r.text();
}

function fetchDirect(url,hdr){return timedFetch(url,{mode:'cors',headers:hdr||{}}).then(function(r){return r.text()})}
function fetchProxy(url,fn){return timedFetch(fn(url),{}).then(asText)}

function smartFetch(url,preferDirect){
  var a=[],i=0;
  if(preferDirect)a.push(function(){return fetchDirect(url)});
  proxies().forEach(function(fn){a.push(function(){return fetchProxy(url,fn)})});
  if(!preferDirect)a.push(function(){return fetchDirect(url)});
  function next(){return i>=a.length?Promise.reject(new Error('fail '+url)):a[i++]().catch(next)}
  return next();
}

function fmtDate(s){
  if(!s)return'';
  try{
    var d=new Date(s);if(isNaN(d.getTime()))return'';
    var m=Math.floor((Date.now()-d.getTime())/6e4);
    if(m>=0&&m<60)return m<=1?'щойно':m+' хв';
    if(m>=60&&m<1440)return Math.floor(m/60)+' год';
    return d.getDate()+' '+['січ','лют','бер','кві','трав','чер','лип','сер','вер','жов','лис','гру'][d.getMonth()];
  }catch(e){return''}
}
function host(u){try{return u.replace(/^https?:\/\/(www\.)?/,'').split('/')[0]}catch(e){return''}}

function parseXml(xml,feedUrl){
  try{
    var doc=new DOMParser().parseFromString(xml,'text/xml'),items=doc.querySelectorAll('item');
    if(!items.length)items=doc.querySelectorAll('entry');
    var out=[],showD=G('rss_show_date'),showS=G('rss_show_source'),src=showS?host(feedUrl):'',max=parseInt(G('rss_max_per_feed'),10)||5;
    if(max<1)max=5;if(max>100)max=100;
    for(var i=0,n=Math.min(items.length,max);i<n;i++){
      var te=items[i].querySelector('title');if(!te||!te.textContent)continue;
      var title=te.textContent.trim().replace(/\s+/g,' ');if(title.length<8)continue;
      var parts=[],pe=items[i].querySelector('pubDate')||items[i].querySelector('published')||items[i].querySelector('updated');
      if(showD){var ds=fmtDate(pe?pe.textContent:'');if(ds)parts.push('['+ds+']')}
      if(src)parts.push('['+src+']');
      parts.push(title);
      var de=items[i].querySelector('pubDate')||items[i].querySelector('published');
      out.push({text:parts.join(' '),rawTitle:title.toLowerCase(),date:de?new Date(de.textContent).getTime()||0:0});
    }
    return out;
  }catch(e){return[]}
}

function selList(s,fb){var l=(s||fb||'').split(',').map(function(x){return x.trim().toUpperCase()}).filter(Boolean);return l.length?l:fb.split(',')}
function num(n,d){if(n==null||isNaN(n))return'—';d=d!=null?d:(n>=1e3?0:n>=10?2:4);return Number(n).toLocaleString('uk-UA',{minimumFractionDigits:0,maximumFractionDigits:d})}
function arrow(c){return c==null||isNaN(c)?'':c>.15?' ↑':c<-.15?' ↓':''}
function pad(n){return n<10?'0'+n:''+n}
function nowHMS(d){d=d||new Date();return pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds())}

function fetchNBU(){
  if(!G('rss_currency'))return Promise.resolve([]);
  return smartFetch(API.nbu,true).then(function(t){
    var data=JSON.parse(t),want=selList(G('rss_currencies'),'USD,EUR,PLN'),map={},parts=[];
    data.forEach(function(r){if(r.cc)map[r.cc.toUpperCase()]=r});
    want.forEach(function(c){var r=map[c];if(r&&r.rate!=null)parts.push(c+' '+num(r.rate,2))});
    return parts.length?['₴ '+parts.join('  ·  ')]:[];
  }).catch(function(){return[]});
}

function fetchCrypto(){
  if(!G('rss_crypto'))return Promise.resolve([]);
  return smartFetch(API.cg,true).then(function(t){
    var data=JSON.parse(t),want=selList(G('rss_cryptos'),'BTC,ETH,SOL'),ids={BTC:'bitcoin',ETH:'ethereum',SOL:'solana',USDT:'tether'},parts=[];
    want.forEach(function(s){var id=ids[s];if(!id||!data[id])return;var p=data[id],price=p.usd!=null?p.usd:p.uah;parts.push(s+' '+num(price)+(p.usd!=null?'$':'₴')+arrow(p.usd_24h_change))});
    return parts.length?['₿ '+parts.join('  ·  ')]:[];
  }).catch(function(){return[]});
}

function normName(s){return(s||'').toLowerCase().replace(/\s+/g,'')}

function fetchFuel(){
  if(!G('rss_fuel_prices'))return Promise.resolve([]);
  var region=(G('rss_fuel_region')||'kievskaya').trim(),fuel=(G('rss_fuel_type')||'a95').trim().toLowerCase(),key=(G('rss_fuel_api_key')||'').trim()||FUEL_KEY,
      url=API.fuel+'?region='+encodeURIComponent(region)+'&fuel='+encodeURIComponent(fuel),
      want=selList(G('rss_fuel_companies'),'ОККО,WOG,SOCAR,AMIC,UPG,UKRNAFTA,KLO').map(normName);
  function parse(text){
    var data=typeof text==='string'?JSON.parse(text):text,list=(data&&data.prices)||[];if(!list.length)return[];
    var label=(FUEL_TYPES[fuel]||fuel).replace(/\s*\(.*\)/,''),filtered,parts=[];
    if(want.length){
      filtered=list.filter(function(r){var n=normName(r.company);return want.some(function(w){return n===w||n.indexOf(w)!==-1||w.indexOf(n)!==-1})});
      filtered.sort(function(a,b){function idx(r){var n=normName(r.company);var i=want.findIndex(function(w){return n===w||n.indexOf(w)!==-1||w.indexOf(n)!==-1});return i<0?999:i}return idx(a)-idx(b)});
    }else filtered=list.slice().sort(function(a,b){return(a.price||999)-(b.price||999)}).slice(0,8);
    filtered.forEach(function(r){if(r.price==null||isNaN(r.price))return;parts.push((r.company||'?')+' '+num(r.price,2)+arrow(r.changePct))});
    return parts.length?['⛽ '+label+': '+parts.join('  ·  ')]:[];
  }
  return timedFetch(url,{mode:'cors',headers:{'X-Api-Key':key,Accept:'application/json'}}).then(function(r){return r.text()}).then(parse)
    .catch(function(){return smartFetch(url,false).then(parse)}).catch(function(){return[]});
}

function shortReg(n){return(n||'').replace(/\s*область\s*$/i,'').replace(/^Автономна Республіка\s+/i,'').replace(/\s*район\s*$/i,'').trim()}
function alertDur(s){
  if(!s)return'';
  try{
    var raw=String(s),d=new Date(raw.replace(' ','T')+(raw.indexOf('T')===-1?'+03:00':''));
    if(isNaN(d.getTime()))d=new Date(s);if(isNaN(d.getTime())||d.getFullYear()<2000)return'';
    var ms=Date.now()-d.getTime();if(ms<0)return'';
    var m=Math.floor(ms/6e4);if(m<60)return m<=1?'щойно':m+' хв';
    var h=Math.floor(m/60);return h<24?h+' год':Math.floor(h/24)+' д';
  }catch(e){return''}
}
function isPerm(n){n=(n||'').toLowerCase();return PERM.some(function(p){return n.indexOf(p)!==-1})}

function fmtChecked(t){if(!t)return'—';var d=new Date(t);return pad(d.getDate())+'.'+pad(d.getMonth()+1)+' '+nowHMS(d)}
function alertMs(){var s=parseInt(G('rss_alerts_interval'),10)||30;return Math.max(15,Math.min(300,s))*1e3}
function pinned(){return!!G('rss_alerts_pin')}

// Розбір відповіді ubilling: {source, cachedat:"Y-m-d H:i:s", states:{"Назва":{alertnow:bool,changed:"Y-m-d H:i:s"}}}
function parseAlertJson(text){
  var data=typeof text==='string'?JSON.parse(text):text;
  if(data&&typeof data.contents==='string')data=JSON.parse(data.contents); // allorigins /get
  if(!data||!data.states||typeof data.states!=='object'||!Object.keys(data.states).length)throw new Error('bad alerts json');
  return data;
}

// Фільтрація за налаштуваннями (регіони, «постійні» тривоги)
function computeRegions(data){
  var states=data.states,out=[],hide=G('rss_alerts_hide_long'),flt=(G('rss_alerts_regions')||'').trim(),
      fl=flt?flt.split(',').map(function(s){return s.trim().toLowerCase()}).filter(Boolean):[];
  Object.keys(states).forEach(function(name){
    var st=states[name];if(!st||!st.alertnow)return;if(hide&&isPerm(name))return;
    var sn=shortReg(name),low=(name||'').toLowerCase();
    if(fl.length&&!fl.some(function(f){return low.indexOf(f)!==-1||sn.toLowerCase().indexOf(f)!==-1}))return;
    out.push({name:sn,changed:st.changed});
  });
  return out;
}

function alertsStale(){return AS.loaded&&Date.now()-AS.okAt>Math.max(3*alertMs(),18e4)}

// Текст блоку тривог у рухомому рядку (оновлюється «на місці», без перезапуску прокрутки)
function alertLine(){
  if(!AS.loaded)return AS.failAt?'⚠ Тривоги: немає зв\'язку з джерелом (спроба '+nowHMS(new Date(AS.failAt))+')':'⏳ Тривоги: перевірка…';
  var chk=(alertsStale()?'⚠ дані застарілі, перевірено ':'перевірено ')+fmtChecked(AS.okAt);
  if(!AS.regions.length)return'✅ Повітряних тривог немає · '+chk;
  return'🚨 Тривога: '+AS.regions.map(function(r){var d=alertDur(r.changed);return r.name+(d?' ('+d+')':'')}).join('  ·  ')+' · '+chk;
}

// Короткий текст закріпленої плашки зліва
function alertBadge(){
  if(!AS.loaded)return AS.failAt?'⚠ Тривоги: немає зв\'язку':'⏳ Тривоги…';
  var t=AS.okAt?nowHMS(new Date(AS.okAt)).slice(0,5):'',st=alertsStale()?' ⚠':'';
  if(!AS.regions.length)return'✅ Тривог немає · '+fmtChecked(AS.okAt).slice(0,11)+st;
  var n=AS.regions.length,names=n<=2?AS.regions.map(function(r){return r.name}).join(', '):n+' обл.';
  return'🚨 Тривога: '+names+' · '+t+st;
}

function updateBadge(){
  var b=document.getElementById('rss-ticker-badge'),show=on()&&G('rss_alerts')&&pinned();if(!b)return;
  if(!show){b.style.display='none';if($track)$track.css('margin-left','0');return}
  b.style.display='';b.textContent=alertBadge();
  b.className=(AS.loaded&&AS.regions.length?'on':'')+(AS.loaded&&alertsStale()||(!AS.loaded&&AS.failAt)?' stale':'');
  if($track)$track.css('margin-left',b.offsetWidth+'px');
}

// Чи потрібен блок тривог у рядку, що прокручується
function nothingElse(){return!_rates.length&&!(_news&&_news.length)}
function alertInScroll(){return!!G('rss_alerts')&&(!pinned()||(AS.loaded&&AS.regions.length>0)||nothingElse())}

function refreshAlertView(){
  updateBadge();
  if(!$track)return;
  var want=alertInScroll(),has=_last.indexOf(AL)!==-1;
  if(want!==has){rebuild();return}          // структура змінилась — перебудувати рядок
  if(!has)return;
  var a=document.getElementById('rss-ticker-seg-a'),w0=a?a.offsetWidth:0,txt=alertLine();
  $track.find('.rss-al').each(function(){this.textContent=txt;this.className='rss-al'+(AS.loaded&&AS.regions.length?' rss-al-on':'')});
  var w1=a?a.offsetWidth:0,need=(window.innerWidth||1280)*1.15;
  if(w1<need||(w0&&Math.abs(w1-w0)/w0>.25))setText(_last,true); // сильна зміна ширини — перезаповнити
}

// Запит до джерела тривог: запам'ятовуємо робочий спосіб і пробуємо його першим
function nativeText(url){
  return new Promise(function(res,rej){
    try{
      if(!window.Lampa||!Lampa.Reguest||!Lampa.Platform||!Lampa.Platform.is('android'))return rej(new Error('no native'));
      var n=new Lampa.Reguest();n.timeout(FETCH_TO);
      n.native(url,function(d){res(typeof d==='string'?d:JSON.stringify(d))},function(){rej(new Error('native fail'))},false,{dataType:'text'});
    }catch(e){rej(e)}
  });
}
function alertMethods(){
  var m=[function(u){return nativeText(u)},function(u){return fetchDirect(u)}];
  proxies().forEach(function(fn){m.push(function(u){return fetchProxy(u,fn)})});
  return m;
}
function fetchAlertData(){
  var ms=alertMethods(),order=[],i=0,url=API.alerts+(API.alerts.indexOf('?')===-1?'?':'&')+'_='+Date.now();
  if(AS.method>=0&&AS.method<ms.length)order.push(AS.method);
  for(var k=0;k<ms.length;k++)if(k!==AS.method)order.push(k);
  function next(){
    if(i>=order.length)return Promise.reject(new Error('alerts: all methods failed'));
    var idx=order[i++];
    return ms[idx](url).then(function(t){var d=parseAlertJson(t);AS.method=idx;return d}).catch(next);
  }
  return next();
}

function applyAlerts(){
  if(!AS.raw)return;
  AS.regions=computeRegions(AS.raw);
  refreshAlertView();
}

function pollAlerts(){
  clearTimeout(_alertT);
  if(!on()||!G('rss_alerts')){updateBadge();return}
  if(_alertBusy)return;
  _alertBusy=true;
  fetchAlertData().then(function(data){
    AS.raw=data;AS.loaded=true;AS.okAt=Date.now();AS.failAt=0;AS.checked=data.cachedat||'';
    AS.regions=computeRegions(data);
  }).catch(function(){
    AS.failAt=Date.now();AS.method=-1;      // старі дані НЕ стираємо — лише позначаємо як застарілі
  }).then(function(){
    _alertBusy=false;refreshAlertView();
    _alertT=setTimeout(pollAlerts,AS.failAt?Math.min(1e4,alertMs()):alertMs());
  });
}

function newsUrls(){
  var u=[];
  if(G('rss_crypto_news'))u=u.concat(FEEDS.crypto_news);
  if(G('rss_fuel'))u=u.concat(FEEDS.fuel);
  if(G('rss_news'))u=u.concat(FEEDS.news);
  ['rss_custom_1','rss_custom_2','rss_custom_3'].forEach(function(k){
    var v=(G(k)||'').trim();if(!v)return;v=v.replace(/^\/\//,'https://');if(!/^https?:\/\//i.test(v))v='https://'+v;u.push(v);
  });
  return u;
}

function fetchNews(){
  if(!G('rss_show_news'))return Promise.resolve([]);
  var urls=newsUrls();if(!urls.length)return Promise.resolve([]);
  return Promise.all(urls.map(function(url){return smartFetch(url,false).then(function(xml){return parseXml(xml,url)}).catch(function(){return[]})})).then(function(arr){
    var all=[],seen={},uniq=[],per=parseInt(G('rss_max_per_feed'),10)||5,lim=Math.min(100,Math.max(25,per*4));
    arr.forEach(function(a){all=all.concat(a)});
    all.sort(function(a,b){return(b.date||0)-(a.date||0)});
    all.forEach(function(h){var k=h.rawTitle.slice(0,60);if(!seen[k]){seen[k]=1;uniq.push(h.text)}});
    return uniq.slice(0,lim);
  });
}

// Рядок може містити маркер AL — на його місці вставляється <span class="rss-al"> з актуальним текстом тривог
function appendChunk(el,str){
  var parts=str.split(AL),txt=alertLine(),cls='rss-al'+(AS.loaded&&AS.regions.length?' rss-al-on':'');
  for(var i=0;i<parts.length;i++){
    if(parts[i])el.appendChild(document.createTextNode(parts[i]));
    if(i<parts.length-1){var s=document.createElement('span');s.className=cls;s.textContent=txt;el.appendChild(s)}
  }
}
function fillSeg(str){
  var a=document.getElementById('rss-ticker-seg-a'),b=document.getElementById('rss-ticker-seg-b');if(!a||!b)return;
  var sep=G('rss_separator')||'  ✦  ',need=(window.innerWidth||1280)*1.15,g=0;
  a.textContent='';appendChunk(a,str);
  while(a.offsetWidth<need&&g++<12){a.appendChild(document.createTextNode(sep));appendChunk(a,str)}
  b.textContent='';for(var i=0;i<a.childNodes.length;i++)b.appendChild(a.childNodes[i].cloneNode(true));
}

function setText(str,force){
  if(!$track||!$track.length||(!force&&str===_last))return;
  _last=str;$track.css('opacity','0.4');
  setTimeout(function(){fillSeg(str);$track.css('opacity','1');updateBadge();restart()},160);
}

function joinTicker(rates,news){
  var sep=G('rss_separator')||'  ✦  ',p=[];
  if(rates&&rates.length)p.push(rates.join(sep));
  if(news&&news.length)p.push(news.join(sep));
  return p.join(sep+'  │  '+sep)||'Немає даних для відображення. Перевірте налаштування.';
}

function tickerText(){
  var rates=_rates.slice();if(alertInScroll())rates.push(AL);
  return{text:joinTicker(rates,_news||[]),empty:!_rates.length&&!(_news&&_news.length)};
}

function saveCache(t){try{S(CK,t.split(AL).join(''));S(CT,Date.now())}catch(e){}}
function loadCache(){try{var t=G(CK),ts=G(CT);if(t&&ts&&Date.now()-Number(ts)<72e5)return t}catch(e){}return null}

function retry(){clearTimeout(_retryT);if(_retries>=5)return;var d=Math.min(15e3*Math.pow(2,_retries++),3e5);_retryT=setTimeout(fetchAll,d)}

function rebuild(){
  var t=tickerText();
  if(t.empty&&!alertInScroll()){updateBadge();return}
  if(t.empty&&_last&&_last.indexOf(AL)===-1&&_last.indexOf('(кеш)')!==-1){updateBadge();return}
  setText(t.text);if(!t.empty)saveCache(t.text);
}

function fetchAll(){
  if(!on()||_fetching)return;_fetching=true;
  if(!G('rss_show_rates')&&!G('rss_show_news')&&!G('rss_fuel_prices')&&!G('rss_alerts')){setText('Увімкніть блок курсів, новин, палива або тривог у налаштуваннях.');_fetching=false;return}
  var rateP=G('rss_show_rates')?Promise.all([fetchNBU(),fetchCrypto()]).then(function(a){return[].concat(a[0]||[],a[1]||[])}):Promise.resolve([]);
  Promise.all([rateP,fetchFuel(),G('rss_show_news')?fetchNews():Promise.resolve([])])
    .then(function(r){
      var nr=[].concat(r[0]||[],r[1]||[]),nn=r[2]||[];
      // якщо якийсь блок тимчасово не завантажився — залишаємо попередні дані
      if(nr.length)_rates=nr;if(nn.length)_news=nn;
      var t=tickerText();
      if(t.empty){
        var c=loadCache();
        if(c)setText(c+'  (кеш)'+(alertInScroll()?(G('rss_separator')||'  ✦  ')+AL:''));
        else setText(alertInScroll()?AL:'Не вдалося завантажити дані. Перевірте інтернет.');
        retry();
      }
      else{setText(t.text);saveCache(t.text);_retries=0}
    }).catch(function(){var c=loadCache();setText(c?c+'  (кеш)':'Помилка завантаження.');retry()})
    .then(function(){_fetching=false});
}

function clearCache(){try{S(CK,'');S(CT,0)}catch(e){}_last='';_rates=[];_news=[];_retries=0}

function forceRefresh(){clearCache();_fetching=_alertBusy=false;clearTimeout(_retryT);AS.method=-1;fetchAll();pollAlerts()}

function scheduleAlerts(){
  clearTimeout(_alertT);_alertBusy=false;
  if(!on()||!G('rss_alerts')){updateBadge();return}
  pollAlerts();
}

function scheduleRefresh(){
  clearTimeout(_fetchT);clearInterval(_fetchT);clearTimeout(_retryT);_retries=0;clearCache();fetchAll();
  var m=parseInt(G('rss_refresh_min'),10)||20;m=Math.max(5,Math.min(120,m));
  _fetchT=setInterval(fetchAll,m*6e4);scheduleAlerts();
}

function normUrl(v){v=(v||'').trim().replace(/^\/\//,'https://');if(v&&!/^https?:\/\//i.test(v))v='https://'+v;return v}

function registerSettings(){
  Lampa.SettingsApi.addComponent({component:'rss_ticker',name:'RSS Рухомий рядок',icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 15.64A2.18 2.18 0 0 1 8.36 17.82C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82A2.18 2.18 0 0 1 6.18 15.64M4 4.44A15.56 15.56 0 0 1 19.56 20H16.73A12.73 12.73 0 0 0 4 7.27V4.44M4 10.1A9.9 9.9 0 0 1 13.9 20H11.07A7.07 7.07 0 0 0 4 12.93V10.1Z"/></svg>'});
  var C='rss_ticker';
  function addTxt(key,label,desc){
    Lampa.SettingsApi.addParam({component:C,param:{name:key,type:'trigger',default:D[key]},field:{name:label,description:desc||(G(key)||'')},onRender:function(item){
      item.find('.settings-param__value').text(G(key)||'—');
      item.on('hover:enter',function(){Lampa.Input.edit({title:label,value:G(key)||'',free:true,nosave:true},function(val){S(key,(val||'').trim());item.find('.settings-param__value').text(G(key)||'—');scheduleRefresh()})});
    }});
  }
  function addSel(key,label,opts,desc,kind){
    Lampa.SettingsApi.addParam({component:C,param:{name:key,type:'select',values:opts,default:D[key]},field:{name:label,description:desc||''},onChange:function(){
      styles();if(kind===1)scheduleRefresh();else if(kind===2)restart();else if(kind===3)rebuild();
    }});
  }
  function addTrig(key,name,desc,fn){
    Lampa.SettingsApi.addParam({component:C,param:{name:key,type:'trigger',default:D[key]},field:{name:name,description:desc||''},onChange:fn||scheduleRefresh});
  }
  function addCustom(key,label){
    Lampa.SettingsApi.addParam({component:C,param:{name:key,type:'trigger',default:''},field:{name:label,description:G(key)||'Натисніть для введення URL'},onRender:function(item){
      item.find('.settings-param__value').text(G(key)?'Задано':'Не задано');
      item.on('hover:enter',function(){
        Lampa.Input.edit({title:label+' (RSS XML URL)',value:G(key)||'',free:true,nosave:true},function(val){
          val=normUrl(val);S(key,val);
          if(!val){item.find('.settings-param__value').text('Не задано');scheduleRefresh();return}
          item.find('.settings-param__value').text('Перевірка...');
          smartFetch(val,false).then(function(xml){
            var n=parseXml(xml,val).length;
            item.find('.settings-param__value').text(n?'Задано ('+n+' новин)':'Задано (0 новин)');
            Lampa.Noty.show(n?'Джерело підключено: знайдено '+n+' новин':'Джерело відповіло, але новин не знайдено. Це точно RSS/Atom XML?');
            scheduleRefresh();
          }).catch(function(err){
            item.find('.settings-param__value').text('Помилка завантаження');
            Lampa.Noty.show('Не вдалося завантажити це джерело: '+(err&&err.message||'мережа/CORS'));
            scheduleRefresh();
          });
        });
      });
    }});
  }

  addTrig('rss_enabled','▸ Увімкнути рухомий рядок','',function(){styles();scheduleRefresh()});
  Lampa.SettingsApi.addParam({component:C,param:{name:'rss_force_refresh',type:'trigger',default:false},field:{name:'🔄 Оновити стрічку зараз',description:'Скидає кеш і одразу завантажує свіжі дані'},onChange:function(){S('rss_force_refresh',false);forceRefresh();Lampa.Noty.show('Оновлення стрічки…')}});
  Lampa.SettingsApi.addParam({component:C,param:{name:'rss_clear_cache',type:'trigger',default:false},field:{name:'🗑 Скинути кеш',description:'Очистити збережений текст стрічки'},onChange:function(){S('rss_clear_cache',false);clearCache();setText('Кеш очищено. Натисніть «Оновити стрічку зараз».');Lampa.Noty.show('Кеш стрічки очищено')}});
  addSel('rss_refresh_min','Інтервал оновлення',{'10':'10 хв','20':'20 хв','30':'30 хв','60':'60 хв'},'Як часто автоматично оновлювати дані',1);

  addTrig('rss_show_rates','▸ Курси: валюти + крипто','Блок офіційного курсу НБУ та CoinGecko');
  addTrig('rss_currency','  · Валюти НБУ','Офіційний курс гривні');
  addTxt('rss_currencies','  · Які валюти','Наприклад: USD,EUR,PLN,GBP');
  addTrig('rss_crypto','  · Крипто-ціни','BTC, ETH, SOL з CoinGecko');
  addTxt('rss_cryptos','  · Які крипто','Наприклад: BTC,ETH,SOL,USDT');

  addTrig('rss_fuel_prices','▸ Ціни на паливо','Актуальні ціни АЗС (ePalne / minfin)');
  Lampa.SettingsApi.addParam({component:C,param:{name:'rss_fuel_region',type:'select',values:FUEL_REGIONS,default:D.rss_fuel_region},field:{name:'  · Область',description:'Регіон для цін АЗС'},onChange:scheduleRefresh});
  Lampa.SettingsApi.addParam({component:C,param:{name:'rss_fuel_type',type:'select',values:FUEL_TYPES,default:D.rss_fuel_type},field:{name:'  · Тип палива',description:'А-95, дизель, газ тощо'},onChange:scheduleRefresh});
  addTxt('rss_fuel_companies','  · Які АЗС','Напр: ОККО,WOG,SOCAR (порожньо = топ-8 дешевих)');
  addTxt('rss_fuel_api_key','  · API-ключ ePalne','Порожньо = вбудований ключ');

  addTrig('rss_alerts','▸ Повітряні тривоги','Ubilling API без ключа');
  addTrig('rss_alerts_hide_long','  · Ховати постійні','Не показувати Крим, Луганську тощо з 2022',applyAlerts);
  addTxt('rss_alerts_regions','  · Фільтр областей','Напр: Київ, Харків (порожньо = усі)');
  Lampa.SettingsApi.addParam({component:C,param:{name:'rss_alerts_interval',type:'select',values:{'15':'15 сек','30':'30 сек','60':'1 хв','120':'2 хв'},default:D.rss_alerts_interval},field:{name:'  · Перевіряти тривоги кожні',description:'Окремо від новин і курсів'},onChange:scheduleAlerts});
  addTrig('rss_alerts_pin','  · Закріпити статус зліва','Плашка зі статусом і часом перевірки завжди на екрані',function(){updateBadge();rebuild()});

  addTrig('rss_show_news','▸ Новини (RSS)','Увімкнути блок новин у стрічці');
  addTrig('rss_news','  · Українські новини','UNIAN, Ukrinform, LB, NV, Правда');
  addTrig('rss_crypto_news','  · Крипто-новини','Cointelegraph, Decrypt, CryptoSlate');
  addTrig('rss_fuel','  · Новини: паливо / енергетика','Nefterynok, Enkorr');
  addSel('rss_max_per_feed','  · Скільки новин з джерела',{'5':'5','10':'10','25':'25','50':'Максимум (50)'},'5 / 10 / 25 або максимум (50)',1);
  addTrig('rss_show_date','  · Показувати дату новини','Напр. [2 год] або [7 трав]');
  addTrig('rss_show_source','  · Показувати джерело','Напр. [unian.net]');
  addCustom('rss_custom_1','  · Своє джерело 1');
  addCustom('rss_custom_2','  · Своє джерело 2');
  addCustom('rss_custom_3','  · Своє джерело 3');

  addSel('rss_position','▸ Положення',{bottom:'Знизу',top:'Зверху'},'Зверху або знизу екрана',0);
  addSel('rss_height','  · Висота рядка',{'28':'Вузька (28px)','36':'Стандарт (36px)','44':'Широка (44px)','54':'Дуже широка (54px)'},'',0);
  addSel('rss_speed','  · Швидкість прокрутки',{'30':'Повільно','60':'Нормально','100':'Швидко','150':'Дуже швидко'},'px/сек',2);
  addSel('rss_text_color','  · Колір тексту',{'#ffffff':'Білий','#000000':'Чорний','#ffff00':'Жовтий','#00ff00':'Зелений','#00ffff':'Блакитний','#ff4444':'Червоний','#ff8800':'Помаранчевий'},'',0);
  addSel('rss_bg_color','  · Колір фону',{'#ffffff':'Білий','#000000':'Чорний','#ffff00':'Жовтий','#00ff00':'Зелений','#00ffff':'Блакитний','#ff4444':'Червоний','#ff8800':'Помаранчевий'},'',0);
  addSel('rss_opacity','  · Прозорість фону',{'0.3':'30%','0.5':'50%','0.75':'75%','0.9':'90%','1':'100%'},'',0);
  addSel('rss_separator','  · Роздільник',{'  ✦  ':'✦ Зірочка','  |  ':'| Риса','  •  ':'• Точка','  >>>  ':'>>> Стрілки','   ':'Пробіл'},'',3);
  addTxt('rss_custom_proxy','▸ Свій CORS-проксі','URL воркера (Cloudflare Worker тощо), пробується першим');
}

function init(){
  registerSettings();buildDOM();
  var c=loadCache();if(c)setText(c);
  scheduleRefresh();
  var rz;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){if(_last)setText(_last,true)},400)});
  Lampa.Listener.follow('player',function(e){
    if(!$box)return;
    if(e.type==='start')$box.fadeOut(300);
    if(e.type==='destroy'&&on())$box.fadeIn(300);
  });
}

if(window.appready)init();
else Lampa.Listener.follow('app',function(e){if(e.type==='ready')init()});
})();