/* ============================================================120826(1)orig:
https://levende.github.io/lampa-plugins/obsidian.js
https://ko31k.github.io/LMP/plugins/interface+.js
   Combined Lampa plugin: Obsidian + Interface+
   Both plugins are loaded unmodified except for a small
   compatibility patch in Interface+ that stops its per-card
   badge injection from duplicating onto Obsidian-rendered cards.
   ============================================================ */

/* ---------- Obsidian (unmodified) ---------- */
!function(){"use strict";var t={79306(t,r,e){var n=e(94901),a=e(16823),o=TypeError;t.exports=function(t){if(n(t))return t;throw new o(a(t)+" is not a function")}},35548(t,r,e){var n=e(33517),a=e(16823),o=TypeError;t.exports=function(t){if(n(t))return t;throw new o(a(t)+" is not a constructor")}},24194(t,r,e){var n=e(36955),a=TypeError;t.exports=function(t){if("DataView"===n(t))return t;throw new a("Argument is not a DataView")}},73506(t,r,e){var n=e(13925),a=String,o=TypeError;t.exports=function(t){if(n(t))return t;throw new o("Can't set "+a(t)+" as a prototype")}},97080(t,r,e){var n=e(94402).has;t.exports=function(t){return n(t),t}},63463(t){var r=TypeError;t.exports=function(t){if("string"==typeof t)return t;throw new r("Argument is not a string")}},84328(t,r,e){var n=e(44995),a=new n.WeakMap,o=n.set,i=n.remove;t.exports=function(t){return o(a,t,1),i(a,t),t}},76557(t,r,e){var n=e(44995).has;t.exports=function(t){return n(t),t}},91021(t,r,e){var n=e(97751),a=e(69565),o=e(79504),i=e(76080),s=e(28551),u=e(79306),c=e(64117),f=e(55966),l=e(78227),h=l("asyncDispose"),p=l("dispose"),d=o([].push),v=function(t,r,e){return arguments.length<3&&!c(t)&&(e=u(function(t,r){if("async-dispose"===r){var e=f(t,h);return void 0!==e||void 0===(e=f(t,p))?e:function(){var t=this;return new(n("Promise"))(function(r){a(e,t),r(void 0)})}}return f(t,p)}(s(t),r))),void 0===e?function(){}:i(e,t)};t.exports=function(t,r,e,n){var a;if(arguments.length<4){if(c(r)&&"sync-dispose"===e)return;a=v(r,e)}else a=v(void 0,e,n);d(t.stack,a)}},6469(t,r,e){var n=e(78227),a=e(2360),o=e(24913).f,i=n("unscopables"),s=Array.prototype;void 0===s[i]&&o(s,i,{configurable:!0,value:a(null)}),t.exports=function(t){s[i][t]=!0}},57829(t,r,e){var n=e(68183).charAt;t.exports=function(t,r,e){return r+(e&&n(t,r).length||1)}},90679(t,r,e){var n=e(1625),a=TypeError;t.exports=function(t,r){if(n(r,t))return t;throw new a("Incorrect invocation")}},83972(t,r,e){var n=e(20034),a=String,o=TypeError;t.exports=function(t){if(void 0===t||n(t))return t;throw new o(a(t)+" is not an object or undefined")}},28551(t,r,e){var n=e(20034),a=String,o=TypeError;t.exports=function(t){if(n(t))return t;throw new o(a(t)+" is not an object")}},34154(t,r,e){var n=e(36955),a=TypeError;t.exports=function(t){if("Uint8Array"===n(t))return t;throw new a("Argument is not an Uint8Array")}},77811(t){t.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},67394(t,r,e){var n=e(44576),a=e(46706),o=e(22195),i=n.ArrayBuffer,s=n.TypeError;t.exports=i&&a(i.prototype,"byteLength","get")||function(t){if("ArrayBuffer"!==o(t))throw new s("ArrayBuffer expected");return t.byteLength}},3238(t,r,e){var n=e(44576),a=e(77811),o=e(67394),i=n.DataView;t.exports=function(t){if(!a||0!==o(t))return!1;try{return new i(t),!1}catch(t){return!0}}},15652(t,r,e){var n=e(79039);t.exports=n(function(){if("function"==typeof ArrayBuffer){var t=new ArrayBuffer(8);Object.isExtensible(t)&&Object.defineProperty(t,"a",{value:8})}})},55169(t,r,e){var n=e(3238),a=TypeError;t.exports=function(t){if(n(t))throw new a("ArrayBuffer is detached");return t}},95636(t,r,e){var n=e(44576),a=e(79504),o=e(46706),i=e(57696),s=e(55169),u=e(67394),c=e(94483),f=e(1548),l=n.structuredClone,h=n.ArrayBuffer,p=n.DataView,d=Math.max,v=Math.min,g=h.prototype,y=p.prototype,m=a(g.slice),b=o(g,"resizable","get"),w=o(g,"maxByteLength","get"),x=a(y.getInt8),_=a(y.setInt8);t.exports=(f||c)&&function(t,r,e){var n,a=u(t),o=void 0===r?a:i(r),g=!b||!b(t);if(s(t),f&&(t=l(t,{transfer:[t]}),a===o&&(e||g)))return t;if(a>=o&&(!e||g))n=m(t,0,o);else{var y=e&&!g&&w?{maxByteLength:d(o,w(t))}:void 0;n=new h(o,y);for(var S=new p(t),E=new p(n),A=v(o,a),O=0;O<A;O++)_(E,O,x(S,O))}return f||c(t),n}},94644(t,r,e){var n,a,o,i=e(77811),s=e(43724),u=e(44576),c=e(94901),f=e(20034),l=e(39297),h=e(36955),p=e(16823),d=e(66699),v=e(36840),g=e(62106),y=e(1625),m=e(42787),b=e(52967),w=e(78227),x=e(33392),_=e(91181),S=_.enforce,E=_.get,A=u.Int8Array,O=A&&A.prototype,R=u.Uint8ClampedArray,k=R&&R.prototype,I=A&&m(A),T=O&&m(O),L=Object.prototype,C=u.TypeError,M=w("toStringTag"),P=x("TYPED_ARRAY_TAG"),N="TypedArrayConstructor",j=i&&!!b&&"Opera"!==h(u.opera),U=!1,D={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},F={BigInt64Array:8,BigUint64Array:8},B=function(t){var r=m(t);if(f(r)){var e=E(r);return e&&l(e,N)?e[N]:B(r)}},q=function(t){if(!f(t))return!1;var r=h(t);return l(D,r)||l(F,r)};for(n in D)(o=(a=u[n])&&a.prototype)?S(o)[N]=a:j=!1;for(n in F)(o=(a=u[n])&&a.prototype)&&(S(o)[N]=a);if((!j||!c(I)||I===Function.prototype)&&(I=function(){throw new C("Incorrect invocation")},j))for(n in D)u[n]&&b(u[n],I);if((!j||!T||T===L)&&(T=I.prototype,j))for(n in D)u[n]&&b(u[n].prototype,T);if(j&&m(k)!==T&&b(k,T),s&&!l(T,M))for(n in U=!0,g(T,M,{configurable:!0,get:function(){return f(this)?this[P]:void 0}}),D)u[n]&&d(u[n].prototype,P,n);t.exports={NATIVE_ARRAY_BUFFER_VIEWS:j,TYPED_ARRAY_TAG:U&&P,aTypedArray:function(t){if(q(t))return t;throw new C("Target is not a typed array")},aTypedArrayConstructor:function(t){if(c(t)&&(!b||y(I,t)))return t;throw new C(p(t)+" is not a typed array constructor")},exportTypedArrayMethod:function(t,r,e,n){if(s){if(e)for(var a in D){var o=u[a];if(o&&l(o.prototype,t))try{delete o.prototype[t]}catch(e){try{o.prototype[t]=r}catch(t){}}}T[t]&&!e||v(T,t,e?r:j&&O[t]||r,n)}},exportTypedArrayStaticMethod:function(t,r,e){var n,a;if(s){if(b){if(e)for(n in D)if((a=u[n])&&l(a,t))try{delete a[t]}catch(t){}if(I[t]&&!e)return;try{return v(I,t,e?r:j&&I[t]||r)}catch(t){}}for(n in D)!(a=u[n])||a[t]&&!e||v(a,t,r)}},getTypedArrayConstructor:B,isView:function(t){if(!f(t))return!1;var r=h(t);return"DataView"===r||l(D,r)||l(F,r)},isTypedArray:q,TypedArray:I,TypedArrayPrototype:T}},66346(t,r,e){var n=e(44576),a=e(79504),o=e(43724),i=e(77811),s=e(10350),u=e(66699),c=e(62106),f=e(56279),l=e(79039),h=e(90679),p=e(91291),d=e(57696),v=e(15617),g=e(88490),y=e(42787),m=e(52967),b=e(84373),w=e(67680),x=e(23167),_=e(77740),S=e(10687),E=e(91181),A=s.PROPER,O=s.CONFIGURABLE,R="ArrayBuffer",k="DataView",I="prototype",T="Wrong index",L=E.getterFor(R),C=E.getterFor(k),M=E.set,P=n[R],N=P,j=N&&N[I],U=n[k],D=U&&U[I],F=Object.prototype,B=n.Array,q=n.RangeError,z=a(b),W=a([].reverse),V=g.pack,H=g.unpack,G=function(t){return[255&t]},Y=function(t){return[255&t,t>>8&255]},$=function(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]},J=function(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]},K=function(t){return V(v(t),23,4)},X=function(t){return V(t,52,8)},Q=function(t,r,e){c(t[I],r,{configurable:!0,get:function(){return e(this)[r]}})},Z=function(t,r,e,n){var a=C(t),o=d(e),i=!!n;if(o+r>a.byteLength)throw new q(T);var s=a.bytes,u=o+a.byteOffset,c=w(s,u,u+r);return i?c:W(c)},tt=function(t,r,e,n,a,o){var i=C(t),s=d(e),u=n(+a),c=!!o;if(s+r>i.byteLength)throw new q(T);for(var f=i.bytes,l=s+i.byteOffset,h=0;h<r;h++)f[l+h]=u[c?h:r-h-1]};if(i){var rt=A&&P.name!==R;l(function(){P(1)})&&l(function(){new P(-1)})&&!l(function(){return new P,new P(1.5),new P(NaN),1!==P.length||rt&&!O})?rt&&O&&u(P,"name",R):((N=function(t){return h(this,j),x(new P(d(t)),this,N)})[I]=j,j.constructor=N,_(N,P)),m&&y(D)!==F&&m(D,F);var et=new U(new N(2)),nt=a(D.setInt8);et.setInt8(0,2147483648),et.setInt8(1,2147483649),!et.getInt8(0)&&et.getInt8(1)||f(D,{setInt8:function(t,r){nt(this,t,r<<24>>24)},setUint8:function(t,r){nt(this,t,r<<24>>24)}},{unsafe:!0})}else j=(N=function(t){h(this,j);var r=d(t);M(this,{type:R,bytes:z(B(r),0),byteLength:r}),o||(this.byteLength=r,this.detached=!1)})[I],D=(U=function(t,r,e){h(this,D),h(t,j);var n=L(t),a=n.byteLength,i=p(r);if(i<0||i>a)throw new q("Wrong offset");if(i+(e=void 0===e?a-i:d(e))>a)throw new q("Wrong length");M(this,{type:k,buffer:t,byteLength:e,byteOffset:i,bytes:n.bytes}),o||(this.buffer=t,this.byteLength=e,this.byteOffset=i)})[I],o&&(Q(N,"byteLength",L),Q(U,"buffer",C),Q(U,"byteLength",C),Q(U,"byteOffset",C)),f(D,{getInt8:function(t){return Z(this,1,t)[0]<<24>>24},getUint8:function(t){return Z(this,1,t)[0]},getInt16:function(t){var r=Z(this,2,t,arguments.length>1&&arguments[1]);return(r[1]<<8|r[0])<<16>>16},getUint16:function(t){var r=Z(this,2,t,arguments.length>1&&arguments[1]);return r[1]<<8|r[0]},getInt32:function(t){return J(Z(this,4,t,arguments.length>1&&arguments[1]))},getUint32:function(t){return J(Z(this,4,t,arguments.length>1&&arguments[1]))>>>0},getFloat32:function(t){return H(Z(this,4,t,arguments.length>1&&arguments[1]),23)},getFloat64:function(t){return H(Z(this,8,t,arguments.length>1&&arguments[1]),52)},setInt8:function(t,r){tt(this,1,t,G,r)},setUint8:function(t,r){tt(this,1,t,G,r)},setInt16:function(t,r){tt(this,2,t,Y,r,arguments.length>2&&arguments[2])},setUint16:function(t,r){tt(this,2,t,Y,r,arguments.length>2&&arguments[2])},setInt32:function(t,r){tt(this,4,t,$,r,arguments.length>2&&arguments[2])},setUint32:function(t,r){tt(this,4,t,$,r,arguments.length>2&&arguments[2])},setFloat32:function(t,r){tt(this,4,t,K,r,arguments.length>2&&arguments[2])},setFloat64:function(t,r){tt(this,8,t,X,r,arguments.length>2&&arguments[2])}});S(N,R),S(U,k),t.exports={ArrayBuffer:N,DataView:U}},57029(t,r,e){var n=e(48981),a=e(35610),o=e(26198),i=e(84606),s=Math.min;t.exports=[].copyWithin||function(t,r){var e=n(this),u=o(e),c=a(t,u),f=a(r,u),l=arguments.length>2?arguments[2]:void 0,h=s((void 0===l?u:a(l,u))-f,u-c),p=1;for(f<c&&c<f+h&&(p=-1,f+=h-1,c+=h-1);h-- >0;)f in e?e[c]=e[f]:i(e,c),c+=p,f+=p;return e}},84373(t,r,e){var n=e(48981),a=e(35610),o=e(26198);t.exports=function(t){for(var r=n(this),e=o(r),i=arguments.length,s=a(i>1?arguments[1]:void 0,e),u=i>2?arguments[2]:void 0,c=void 0===u?e:a(u,e);c>s;)r[s++]=t;return r}},90235(t,r,e){var n=e(59213).forEach,a=e(34598)("forEach");t.exports=a?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},8045(t,r,e){var n=e(76080),a=e(79504),o=e(33517),i=e(1886),s=e(70081),u=e(1767),c=e(50851),f=e(55966),l=e(97751),h=e(44124),p=e(78227),d=e(24074),v=e(36639).toArray,g=p("asyncIterator"),y=a(h("Array","values")),m=a(y([]).next),b=function(){return new w(this)},w=function(t){this.iterator=y(t)};w.prototype.next=function(){return m(this.iterator)},t.exports=function(t){var r=this,e=arguments.length,a=e>1?arguments[1]:void 0,h=e>2?arguments[2]:void 0;return new(l("Promise"))(function(e){void 0!==a&&(a=n(a,h));var l=f(t,g),p=l?void 0:c(t)||b,y=o(r)?new r:[],m=l?i(t,l):new d(u(s(t,p)));e(v(m,a,y))})}},35370(t,r,e){var n=e(26198);t.exports=function(t,r,e){for(var a=0,o=arguments.length>2?e:n(r),i=new t(o);o>a;)i[a]=r[a++];return i}},97916(t,r,e){var n=e(76080),a=e(69565),o=e(48981),i=e(96319),s=e(44209),u=e(33517),c=e(26198),f=e(97040),l=e(34527),h=e(70081),p=e(50851),d=e(9539),v=Array;t.exports=function(t){var r=u(this),e=arguments.length,g=e>1?arguments[1]:void 0,y=void 0!==g;y&&(g=n(g,e>2?arguments[2]:void 0));var m,b,w,x,_,S,E=o(t),A=p(E),O=0;if(!A||this===v&&s(A))for(m=c(E),b=r?new this(m):v(m);m>O;O++)S=y?g(E[O],O):E[O],f(b,O,S);else for(b=r?new this:[],_=(x=h(E,A)).next;!(w=a(_,x)).done;O++){S=y?i(x,g,[w.value,O],!0):w.value;try{f(b,O,S)}catch(t){d(x,"throw",t)}}return l(b,O),b}},19617(t,r,e){var n=e(25397),a=e(35610),o=e(26198),i=function(t){return function(r,e,i){var s=n(r),u=o(s);if(0===u)return!t&&-1;var c,f=a(i,u);if(t&&e!=e){for(;u>f;)if((c=s[f++])!=c)return!0}else for(;u>f;f++)if((t||f in s)&&s[f]===e)return t||f||0;return!t&&-1}};t.exports={includes:i(!0),indexOf:i(!1)}},43839(t,r,e){var n=e(76080),a=e(47055),o=e(48981),i=e(26198),s=function(t){var r=1===t;return function(e,s,u){for(var c,f=o(e),l=a(f),h=i(l),p=n(s,u);h-- >0;)if(p(c=l[h],h,f))switch(t){case 0:return c;case 1:return h}return r?-1:void 0}};t.exports={findLast:s(0),findLastIndex:s(1)}},59213(t,r,e){var n=e(76080),a=e(47055),o=e(48981),i=e(26198),s=e(1469),u=e(97040),c=function(t){var r=1===t,e=2===t,c=3===t,f=4===t,l=6===t,h=7===t,p=5===t||l;return function(d,v,g){for(var y,m,b=o(d),w=a(b),x=i(w),_=n(v,g),S=0,E=0,A=r?s(d,x):e||h?s(d,0):void 0;x>S;S++)if((p||S in w)&&(m=_(y=w[S],S,b),t))if(r)u(A,S,m);else if(m)switch(t){case 3:return!0;case 5:return y;case 6:return S;case 2:u(A,E++,y)}else switch(t){case 4:return!1;case 7:u(A,E++,y)}return l?-1:c||f?f:A}};t.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6),filterReject:c(7)}},8379(t,r,e){var n=e(18745),a=e(25397),o=e(91291),i=e(26198),s=e(34598),u=Math.min,c=[].lastIndexOf,f=!!c&&1/[1].lastIndexOf(1,-0)<0,l=s("lastIndexOf"),h=f||!l;t.exports=h?function(t){if(f)return n(c,this,arguments)||0;var r=a(this),e=i(r);if(0===e)return-1;var s=e-1;for(arguments.length>1&&(s=u(s,o(arguments[1]))),s<0&&(s=e+s);s>=0;s--)if(s in r&&r[s]===t)return s||0;return-1}:c},70597(t,r,e){var n=e(79039),a=e(78227),o=e(39519),i=a("species");t.exports=function(t){return o>=51||!n(function(){var r=[];return(r.constructor={})[i]=function(){return{foo:1}},1!==r[t](Boolean).foo})}},34598(t,r,e){var n=e(79039);t.exports=function(t,r){var e=[][t];return!!e&&n(function(){e.call(null,r||function(){return 1},1)})}},80926(t,r,e){var n=e(79306),a=e(48981),o=e(47055),i=e(26198),s=TypeError,u="Reduce of empty array with no initial value",c=function(t){return function(r,e,c,f){var l=a(r),h=o(l),p=i(l);if(n(e),0===p&&c<2)throw new s(u);var d=t?p-1:0,v=t?-1:1;if(c<2)for(;;){if(d in h){f=h[d],d+=v;break}if(d+=v,t?d<0:p<=d)throw new s(u)}for(;t?d>=0:p>d;d+=v)d in h&&(f=e(f,h[d],d,l));return f}};t.exports={left:c(!1),right:c(!0)}},34527(t,r,e){var n=e(43724),a=e(34376),o=TypeError,i=Object.getOwnPropertyDescriptor,s=n&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=s?function(t,r){if(a(t)&&!i(t,"length").writable)throw new o("Cannot set read only .length");return t.length=r}:function(t,r){return t.length=r}},67680(t,r,e){var n=e(79504);t.exports=n([].slice)},74488(t,r,e){var n=e(67680),a=Math.floor,o=function(t,r){var e=t.length;if(e<8)for(var i,s,u=1;u<e;){for(s=u,i=t[u];s&&r(t[s-1],i)>0;)t[s]=t[--s];s!==u++&&(t[s]=i)}else for(var c=a(e/2),f=o(n(t,0,c),r),l=o(n(t,c),r),h=f.length,p=l.length,d=0,v=0;d<h||v<p;)t[d+v]=d<h&&v<p?r(f[d],l[v])<=0?f[d++]:l[v++]:d<h?f[d++]:l[v++];return t};t.exports=o},87433(t,r,e){var n=e(34376),a=e(33517),o=e(20034),i=e(78227)("species"),s=Array;t.exports=function(t){var r;return n(t)&&(r=t.constructor,(a(r)&&(r===s||n(r.prototype))||o(r)&&null===(r=r[i]))&&(r=void 0)),void 0===r?s:r}},1469(t,r,e){var n=e(87433);t.exports=function(t,r){return new(n(t))(0===r?0:r)}},24074(t,r,e){var n=e(69565),a=e(28551),o=e(2360),i=e(55966),s=e(56279),u=e(91181),c=e(9539),f=e(97751),l=e(53982),h=e(62529),p=f("Promise"),d="AsyncFromSyncIterator",v=u.set,g=u.getterFor(d),y=function(t,r,e,n,a){var o=t.done;p.resolve(t.value).then(function(t){r(h(t,o))},function(t){if(!o&&a)try{c(n,"throw",t)}catch(r){t=r}e(t)})},m=function(t){t.type=d,v(this,t)};m.prototype=s(o(l),{next:function(){var t=g(this),r=arguments.length>0,e=r?arguments[0]:void 0;return new p(function(o,i){var s=a(r?n(t.next,t.iterator,e):n(t.next,t.iterator));y(s,o,i,t.iterator,!0)})},return:function(){var t=g(this).iterator,r=arguments.length>0,e=r?arguments[0]:void 0;return new p(function(o,s){var u=i(t,"return");if(void 0===u)return o(h(e,!0));var c=a(r?n(u,t,e):n(u,t));y(c,o,s,t)})},throw:function(){var t=g(this).iterator,r=arguments.length>0,e=r?arguments[0]:void 0;return new p(function(o,s){var u=i(t,"throw");if(void 0===u){try{c(t,"normal")}catch(t){return s(t)}return s(new TypeError("The iterator does not provide a throw method"))}var f=a(r?n(u,t,e):n(u,t));y(f,o,s,t,!0)})}}),t.exports=m},20772(t,r,e){var n=e(69565),a=e(28551),o=e(97751),i=e(55966);t.exports=function(t,r,e,s){try{var u=i(t,"return");if(u)return o("Promise").resolve(n(u,t)).then(function(t){try{r!==s&&a(t)}catch(t){return void s(t)}r(e)},function(t){r===s?r(e):s(t)})}catch(t){return s(r===s?e:t)}r(e)}},36639(t,r,e){var n=e(69565),a=e(79306),o=e(28551),i=e(20034),s=e(96837),u=e(97751),c=e(97040),f=e(34527),l=e(1767),h=e(20772),p=function(t){var r=0===t,e=1===t,p=2===t,d=3===t;return function(t,v,g){o(t);var y=void 0!==v;!y&&r||a(v);var m=l(t),b=u("Promise"),w=m.iterator,x=m.next,_=0;return new b(function(t,a){var u=function(t){h(w,a,t,a)},l=function(){try{try{s(_)}catch(t){return u(t)}b.resolve(o(n(x,w))).then(function(n){try{if(o(n).done)r?(f(g,_),t(g)):t(!d&&(p||void 0));else{var s=n.value;try{if(y){var m=_++,x=v(s,m),S=function(n){if(e)l();else if(p)n?l():h(w,t,!1,a);else if(r)try{c(g,m,n),l()}catch(t){u(t)}else n?h(w,t,d||s,a):l()};i(x)?b.resolve(x).then(S,u):S(x)}else c(g,_++,s),l()}catch(t){u(t)}}}catch(t){a(t)}},a)}catch(t){a(t)}};l()})}};t.exports={toArray:p(0),forEach:p(1),every:p(2),some:p(3),find:p(4)}},53982(t,r,e){var n,a,o=e(44576),i=e(77629),s=e(94901),u=e(2360),c=e(42787),f=e(36840),l=e(78227),h=e(96395),p="USE_FUNCTION_CONSTRUCTOR",d=l("asyncIterator"),v=o.AsyncIterator,g=i.AsyncIteratorPrototype;if(g)n=g;else if(s(v))n=v.prototype;else if(i[p]||o[p])try{a=c(c(c(Function("return async function*(){}()")()))),c(a)===Object.prototype&&(n=a)}catch(t){}n?h&&(n=u(n)):n={},s(n[d])||f(n,d,function(){return this}),t.exports=n},92804(t){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=r+"+/",n=r+"-_",a=function(t){for(var r={},e=0;e<64;e++)r[t.charAt(e)]=e;return r};t.exports={i2c:e,c2i:a(e),i2cUrl:n,c2iUrl:a(n)}},96319(t,r,e){var n=e(28551),a=e(9539);t.exports=function(t,r,e,o){try{return o?r(n(e)[0],e[1]):r(e)}catch(r){a(t,"throw",r)}}},84428(t,r,e){var n=e(78227)("iterator"),a=!1;try{var o=0,i={next:function(){return{done:!!o++}},return:function(){a=!0}};i[n]=function(){return this},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,r){try{if(!r&&!a)return!1}catch(t){return!1}var e=!1;try{var o={};o[n]=function(){return{next:function(){return{done:e=!0}}}},t(o)}catch(t){}return e}},22195(t,r,e){var n=e(79504),a=n({}.toString),o=n("".slice);t.exports=function(t){return o(a(t),8,-1)}},36955(t,r,e){var n=e(92140),a=e(94901),o=e(22195),i=e(78227)("toStringTag"),s=Object,u="Arguments"===o(function(){return arguments}());t.exports=n?o:function(t){var r,e,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,r){try{return t[r]}catch(t){}}(r=s(t),i))?e:u?o(r):"Object"===(n=o(r))&&a(r.callee)?"Arguments":n}},86938(t,r,e){var n=e(2360),a=e(62106),o=e(56279),i=e(76080),s=e(90679),u=e(64117),c=e(72652),f=e(51088),l=e(62529),h=e(87633),p=e(43724),d=e(3451).fastKey,v=e(91181),g=v.set,y=v.getterFor;t.exports={getConstructor:function(t,r,e,f){var l=t(function(t,a){s(t,h),g(t,{type:r,index:n(null),first:null,last:null,size:0}),p||(t.size=0),u(a)||c(a,t[f],{that:t,AS_ENTRIES:e})}),h=l.prototype,v=y(r),m=function(t,r,e){var n,a,o=v(t),i=b(t,r);return i?i.value=e:(o.last=i={index:a=d(r,!0),key:r,value:e,previous:n=o.last,next:null,removed:!1},o.first||(o.first=i),n&&(n.next=i),p?o.size++:t.size++,"F"!==a&&(o.index[a]=i)),t},b=function(t,r){var e,n=v(t),a=d(r);if("F"!==a)return n.index[a];for(e=n.first;e;e=e.next)if(e.key===r)return e};return o(h,{clear:function(){for(var t=v(this),r=t.first;r;)r.removed=!0,r.previous&&(r.previous=r.previous.next=null),r=r.next;t.first=t.last=null,t.index=n(null),p?t.size=0:this.size=0},delete:function(t){var r=this,e=v(r),n=b(r,t);if(n){var a=n.next,o=n.previous;delete e.index[n.index],n.removed=!0,o&&(o.next=a),a&&(a.previous=o),e.first===n&&(e.first=a),e.last===n&&(e.last=o),p?e.size--:r.size--}return!!n},forEach:function(t){for(var r,e=v(this),n=i(t,arguments.length>1?arguments[1]:void 0);r=r?r.next:e.first;)for(n(r.value,r.key,this);r&&r.removed;)r=r.previous},has:function(t){return!!b(this,t)}}),o(h,e?{get:function(t){var r=b(this,t);return r&&r.value},set:function(t,r){return m(this,0===t?0:t,r)}}:{add:function(t){return m(this,t=0===t?0:t,t)}}),p&&a(h,"size",{configurable:!0,get:function(){return v(this).size}}),l},setStrong:function(t,r,e){var n=r+" Iterator",a=y(r),o=y(n);f(t,r,function(t,r){g(this,{type:n,target:t,state:a(t),kind:r,last:null})},function(){for(var t=o(this),r=t.kind,e=t.last;e&&e.removed;)e=e.previous;return t.target&&(t.last=e=e?e.next:t.state.first)?l("keys"===r?e.key:"values"===r?e.value:[e.key,e.value],!1):(t.target=null,l(void 0,!0))},e?"entries":"values",!e,!0),h(r)}}},91625(t,r,e){var n=e(79504),a=e(56279),o=e(3451).getWeakData,i=e(90679),s=e(28551),u=e(64117),c=e(20034),f=e(72652),l=e(59213),h=e(39297),p=e(91181),d=p.set,v=p.getterFor,g=l.find,y=l.findIndex,m=n([].splice),b=0,w=function(t){return t.frozen||(t.frozen=new x)},x=function(){this.entries=[]},_=function(t,r){return g(t.entries,function(t){return t[0]===r})};x.prototype={get:function(t){var r=_(this,t);if(r)return r[1]},has:function(t){return!!_(this,t)},set:function(t,r){var e=_(this,t);e?e[1]=r:this.entries.push([t,r])},delete:function(t){var r=y(this.entries,function(r){return r[0]===t});return~r&&m(this.entries,r,1),!!~r}},t.exports={getConstructor:function(t,r,e,n){var l=t(function(t,a){i(t,p),d(t,{type:r,id:b++,frozen:null}),u(a)||f(a,t[n],{that:t,AS_ENTRIES:e})}),p=l.prototype,g=v(r),y=function(t,r,e){var n=g(t),a=o(s(r),!0);return!0===a?w(n).set(r,e):a[n.id]=e,t};return a(p,{delete:function(t){var r=g(this);if(!c(t))return!1;var e=o(t);return!0===e?w(r).delete(t):e&&h(e,r.id)&&delete e[r.id]},has:function(t){var r=g(this);if(!c(t))return!1;var e=o(t);return!0===e?w(r).has(t):e&&h(e,r.id)}}),a(p,e?{get:function(t){var r=g(this);if(c(t)){var e=o(t);if(!0===e)return w(r).get(t);if(e)return e[r.id]}},set:function(t,r){return y(this,t,r)}}:{add:function(t){return y(this,t,!0)}}),l}}},16468(t,r,e){var n=e(46518),a=e(44576),o=e(79504),i=e(92796),s=e(36840),u=e(3451),c=e(72652),f=e(90679),l=e(94901),h=e(64117),p=e(20034),d=e(79039),v=e(84428),g=e(10687),y=e(23167);t.exports=function(t,r,e){var m=-1!==t.indexOf("Map"),b=-1!==t.indexOf("Weak"),w=m?"set":"add",x=a[t],_=x&&x.prototype,S=x,E={},A=function(t){var r=o(_[t]);s(_,t,"add"===t?function(t){return r(this,0===t?0:t),this}:"delete"===t?function(t){return!(b&&!p(t))&&r(this,0===t?0:t)}:"get"===t?function(t){return b&&!p(t)?void 0:r(this,0===t?0:t)}:"has"===t?function(t){return!(b&&!p(t))&&r(this,0===t?0:t)}:function(t,e){return r(this,0===t?0:t,e),this})};if(i(t,!l(x)||!(b||_.forEach&&!d(function(){(new x).entries().next()}))))S=e.getConstructor(r,t,m,w),u.enable();else if(i(t,!0)){var O=new S,R=O[w](b?{}:-0,1)!==O,k=d(function(){O.has(1)}),I=v(function(t){new x(t)}),T=!b&&d(function(){for(var t=new x,r=5;r--;)t[w](r,r);return!t.has(-0)});I||((S=r(function(t,r){f(t,_);var e=y(new x,t,S);return h(r)||c(r,e[w],{that:e,AS_ENTRIES:m}),e})).prototype=_,_.constructor=S),(k||T)&&(A("delete"),A("has"),m&&A("get")),(T||R)&&A(w),b&&_.clear&&delete _.clear}return E[t]=S,n({global:!0,constructor:!0,forced:S!==x},E),g(S,t),b||e.setStrong(S,t,m),S}},77740(t,r,e){var n=e(39297),a=e(35031),o=e(77347),i=e(24913);t.exports=function(t,r,e){for(var s=a(r),u=i.f,c=o.f,f=0;f<s.length;f++){var l=s[f];n(t,l)||e&&n(e,l)||u(t,l,c(r,l))}}},41436(t,r,e){var n=e(78227)("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(e){try{return r[n]=!1,"/./"[t](r)}catch(t){}}return!1}},12211(t,r,e){var n=e(79039);t.exports=!n(function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype})},77240(t,r,e){var n=e(79504),a=e(67750),o=e(655),i=/"/g,s=n("".replace);t.exports=function(t,r,e,n){var u=o(a(t)),c="<"+r;return""!==e&&(c+=" "+e+'="'+s(o(n),i,"&quot;")+'"'),c+">"+u+"</"+r+">"}},62529(t){t.exports=function(t,r){return{value:t,done:r}}},66699(t,r,e){var n=e(43724),a=e(24913),o=e(6980);t.exports=n?function(t,r,e){return a.f(t,r,o(1,e))}:function(t,r,e){return t[r]=e,t}},6980(t){t.exports=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}}},97040(t,r,e){var n=e(43724),a=e(24913),o=e(6980);t.exports=function(t,r,e){n?a.f(t,r,o(0,e)):t[r]=e}},70380(t,r,e){var n=e(79504),a=e(79039),o=e(60533).start,i=RangeError,s=isFinite,u=Math.abs,c=Date.prototype,f=c.toISOString,l=n(c.getTime),h=n(c.getUTCDate),p=n(c.getUTCFullYear),d=n(c.getUTCHours),v=n(c.getUTCMilliseconds),g=n(c.getUTCMinutes),y=n(c.getUTCMonth),m=n(c.getUTCSeconds);t.exports=a(function(){return"0385-07-25T07:06:39.999Z"!==f.call(new Date(-50000000000001))})||!a(function(){f.call(new Date(NaN))})?function(){if(!s(l(this)))throw new i("Invalid time value");var t=this,r=p(t),e=v(t),n=r<0?"-":r>9999?"+":"";return n+o(u(r),n?6:4,0)+"-"+o(y(t)+1,2,0)+"-"+o(h(t),2,0)+"T"+o(d(t),2,0)+":"+o(g(t),2,0)+":"+o(m(t),2,0)+"."+o(e,3,0)+"Z"}:f},53640(t,r,e){var n=e(28551),a=e(84270),o=TypeError;t.exports=function(t){if(n(this),"string"===t||"default"===t)t="string";else if("number"!==t)throw new o("Incorrect hint");return a(this,t)}},62106(t,r,e){var n=e(50283),a=e(24913);t.exports=function(t,r,e){return e.get&&n(e.get,r,{getter:!0}),e.set&&n(e.set,r,{setter:!0}),a.f(t,r,e)}},36840(t,r,e){var n=e(94901),a=e(24913),o=e(50283),i=e(39433);t.exports=function(t,r,e,s){s||(s={});var u=s.enumerable,c=void 0!==s.name?s.name:r;if(n(e)&&o(e,c,s),s.global)u?t[r]=e:i(r,e);else{try{s.unsafe?t[r]&&(u=!0):delete t[r]}catch(t){}u?t[r]=e:a.f(t,r,{value:e,enumerable:!1,configurable:!s.nonConfigurable,writable:!s.nonWritable})}return t}},56279(t,r,e){var n=e(36840);t.exports=function(t,r,e){for(var a in r)n(t,a,r[a],e);return t}},39433(t,r,e){var n=e(44576),a=Object.defineProperty;t.exports=function(t,r){try{a(n,t,{value:r,configurable:!0,writable:!0})}catch(e){n[t]=r}return r}},84606(t,r,e){var n=e(16823),a=TypeError;t.exports=function(t,r){if(!delete t[r])throw new a("Cannot delete property "+n(r)+" of "+n(t))}},43724(t,r,e){var n=e(79039);t.exports=!n(function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]})},94483(t,r,e){var n,a,o,i,s=e(44576),u=e(89429),c=e(1548),f=s.structuredClone,l=s.ArrayBuffer,h=s.MessageChannel,p=!1;if(c)p=function(t){f(t,{transfer:[t]})};else if(l)try{h||(n=u("worker_threads"))&&(h=n.MessageChannel),h&&(a=new h,o=new l(2),i=function(t){a.port1.postMessage(null,[t])},2===o.byteLength&&(i(o),0===o.byteLength&&(p=i)))}catch(t){}t.exports=p},4055(t,r,e){var n=e(44576),a=e(20034),o=n.document,i=a(o)&&a(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},96837(t){var r=TypeError;t.exports=function(t){if(t>9007199254740991)throw new r("Maximum allowed index exceeded");return t}},55002(t){t.exports={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}}},67400(t){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},79296(t,r,e){var n=e(4055)("span").classList,a=n&&n.constructor&&n.constructor.prototype;t.exports=a===Object.prototype?void 0:a},88727(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},13709(t,r,e){var n=e(82839).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},13763(t,r,e){var n=e(82839);t.exports=/MSIE|Trident/.test(n)},44265(t,r,e){var n=e(82839);t.exports=/ipad|iphone|ipod/i.test(n)&&"undefined"!=typeof Pebble},89544(t,r,e){var n=e(82839);t.exports=/ipad|iphone|ipod/i.test(n)&&/applewebkit/i.test(n)},38574(t,r,e){var n=e(84215);t.exports="NODE"===n},7860(t,r,e){var n=e(82839);t.exports=/web0s(?!.*chrome)/i.test(n)},82839(t,r,e){var n=e(44576).navigator,a=n&&n.userAgent;t.exports=a?String(a):""},39519(t,r,e){var n,a,o=e(44576),i=e(82839),s=o.process,u=o.Deno,c=s&&s.versions||u&&u.version,f=c&&c.v8;f&&(a=(n=f.split("."))[0]>0&&n[0]<4?1:+(n[0]+n[1])),!a&&i&&(!(n=i.match(/Edge\/(\d+)/))||n[1]>=74)&&(n=i.match(/Chrome\/(\d+)/))&&(a=+n[1]),t.exports=a},3607(t,r,e){var n=e(82839).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},84215(t,r,e){var n=e(44576),a=e(82839),o=e(22195),i=function(t){return a.slice(0,t.length)===t};t.exports=i("Bun/")?"BUN":i("Cloudflare-Workers")?"CLOUDFLARE":i("Deno/")?"DENO":i("Node.js/")?"NODE":n.Bun&&"string"==typeof Bun.version?"BUN":n.Deno&&"object"==typeof Deno.version?"DENO":"process"===o(n.process)?"NODE":n.window&&n.document?"BROWSER":"REST"},16193(t,r,e){var n=e(79504),a=Error,o=n("".replace),i=String(new a("zxcasd").stack),s=/\n\s*at [^:]*:[^\n]*/,u=s.test(i);t.exports=function(t,r){if(u&&"string"==typeof t&&!a.prepareStackTrace)for(;r--;)t=o(t,s,"");return t}},80747(t,r,e){var n=e(66699),a=e(16193),o=e(24659),i=Error.captureStackTrace;t.exports=function(t,r,e,s){o&&(i?i(t,r):n(t,"stack",a(e,s)))}},24659(t,r,e){var n=e(79039),a=e(6980);t.exports=!n(function(){var t=new Error("a");return!("stack"in t)||(Object.defineProperty(t,"stack",a(1,7)),7!==t.stack)})},77536(t,r,e){var n=e(43724),a=e(79039),o=e(28551),i=e(32603),s=Error.prototype.toString,u=a(function(){if(n){var t=Object.create(Object.defineProperty({},"name",{get:function(){return this===t}}));if("true"!==s.call(t))return!0}return"2: 1"!==s.call({message:1,name:2})||"Error"!==s.call({})});t.exports=u?function(){var t=o(this),r=i(t.name,"Error"),e=i(t.message);return r?e?r+": "+e:r:e}:s},46518(t,r,e){var n=e(44576),a=e(77347).f,o=e(66699),i=e(36840),s=e(39433),u=e(77740),c=e(92796);t.exports=function(t,r){var e,f,l,h,p,d=t.target,v=t.global,g=t.stat;if(e=v?n:g?n[d]||s(d,{}):n[d]&&n[d].prototype)for(f in r){if(h=r[f],l=t.dontCallGetSet?(p=a(e,f))&&p.value:e[f],!c(v?f:d+(g?".":"#")+f,t.forced)&&void 0!==l){if(typeof h==typeof l)continue;u(h,l)}(t.sham||l&&l.sham)&&o(h,"sham",!0),i(e,f,h,t)}}},79039(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},89228(t,r,e){e(27495);var n=e(69565),a=e(36840),o=e(57323),i=e(79039),s=e(78227),u=e(66699),c=s("species"),f=RegExp.prototype;t.exports=function(t,r,e,l){var h=s(t),p=!i(function(){var r={};return r[h]=function(){return 7},7!==""[t](r)}),d=p&&!i(function(){var r=!1,e=/a/;if("split"===t){var n={};n[c]=function(){return e},(e={constructor:n,flags:""})[h]=/./[h]}return e.exec=function(){return r=!0,null},e[h](""),!r});if(!p||!d||e){var v=/./[h],g=r(h,""[t],function(t,r,e,a,i){var s=r.exec;return s===o||s===f.exec?p&&!i?{done:!0,value:n(v,r,e,a)}:{done:!0,value:n(t,e,r,a)}:{done:!1}});a(String.prototype,t,g[0]),a(f,h,g[1])}l&&u(f[h],"sham",!0)}},70259(t,r,e){var n=e(34376),a=e(26198),o=e(96837),i=e(76080),s=e(97040),u=function(t,r,e,c,f,l,h,p){for(var d,v,g=f,y=0,m=!!h&&i(h,p);y<c;)y in e&&(d=m?m(e[y],y,r):e[y],l>0&&n(d)?(v=a(d),g=u(t,r,d,v,g,l-1)-1):(o(g+1),s(t,g,d)),g++),y++;return g};t.exports=u},92744(t,r,e){var n=e(79039);t.exports=!n(function(){return Object.isExtensible(Object.preventExtensions({}))})},18745(t,r,e){var n=e(40616),a=Function.prototype,o=a.apply,i=a.call;t.exports="object"==typeof Reflect&&Reflect.apply||(n?i.bind(o):function(){return i.apply(o,arguments)})},76080(t,r,e){var n=e(27476),a=e(79306),o=e(40616),i=n(n.bind);t.exports=function(t,r){return a(t),void 0===r?t:o?i(t,r):function(){return t.apply(r,arguments)}}},40616(t,r,e){var n=e(79039);t.exports=!n(function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")})},30566(t,r,e){var n=e(79504),a=e(79306),o=e(20034),i=e(39297),s=e(67680),u=e(40616),c=Function,f=n([].concat),l=n([].join),h={};t.exports=u?c.bind:function(t){var r=a(this),e=r.prototype,n=s(arguments,1),u=function(){var e=f(n,s(arguments));return this instanceof u?function(t,r,e){if(!i(h,r)){for(var n=[],a=0;a<r;a++)n[a]="a["+a+"]";h[r]=c("C,a","return new C("+l(n,",")+")")}return h[r](t,e)}(r,e.length,e):r.apply(t,e)};return o(e)&&(u.prototype=e),u}},69565(t,r,e){var n=e(40616),a=Function.prototype.call;t.exports=n?a.bind(a):function(){return a.apply(a,arguments)}},10350(t,r,e){var n=e(43724),a=e(39297),o=Function.prototype,i=n&&Object.getOwnPropertyDescriptor,s=a(o,"name"),u=s&&"something"===function(){}.name,c=s&&(!n||n&&i(o,"name").configurable);t.exports={EXISTS:s,PROPER:u,CONFIGURABLE:c}},46706(t,r,e){var n=e(79504),a=e(79306);t.exports=function(t,r,e){try{return n(a(Object.getOwnPropertyDescriptor(t,r)[e]))}catch(t){}}},27476(t,r,e){var n=e(22195),a=e(79504);t.exports=function(t){if("Function"===n(t))return a(t)}},79504(t,r,e){var n=e(40616),a=Function.prototype,o=a.call,i=n&&a.bind.bind(o,o);t.exports=n?i:function(t){return function(){return o.apply(t,arguments)}}},944(t){var r=TypeError;t.exports=function(t){var e=t&&t.alphabet;if(void 0===e||"base64"===e||"base64url"===e)return e||"base64";throw new r("Incorrect `alphabet` option")}},1886(t,r,e){var n=e(69565),a=e(24074),o=e(28551),i=e(70081),s=e(1767),u=e(55966),c=e(78227)("asyncIterator");t.exports=function(t,r){var e=arguments.length<2?u(t,c):r;return e?o(n(e,t)):new a(s(i(t)))}},89429(t,r,e){var n=e(44576),a=e(38574);t.exports=function(t){if(a){try{return n.process.getBuiltinModule(t)}catch(t){}try{return Function('return require("'+t+'")')()}catch(t){}}}},44124(t,r,e){var n=e(44576);t.exports=function(t,r){var e=n[t],a=e&&e.prototype;return a&&a[r]}},97751(t,r,e){var n=e(44576),a=e(94901);t.exports=function(t,r){return arguments.length<2?(e=n[t],a(e)?e:void 0):n[t]&&n[t][r];var e}},1767(t){t.exports=function(t){return{iterator:t,next:t.next,done:!1}}},48646(t,r,e){var n=e(69565),a=e(28551),o=e(1767),i=e(50851);t.exports=function(t,r){r&&"string"==typeof t||a(t);var e=i(t);return o(a(void 0!==e?n(e,t):t))}},50851(t,r,e){var n=e(36955),a=e(55966),o=e(64117),i=e(26269),s=e(78227)("iterator");t.exports=function(t){if(!o(t))return a(t,s)||a(t,"@@iterator")||i[n(t)]}},70081(t,r,e){var n=e(69565),a=e(79306),o=e(28551),i=e(16823),s=e(50851),u=TypeError;t.exports=function(t,r){var e=arguments.length<2?s(t):r;if(a(e))return o(n(e,t));throw new u(i(t)+" is not iterable")}},55966(t,r,e){var n=e(79306),a=e(64117);t.exports=function(t,r){var e=t[r];return a(e)?void 0:n(e)}},83789(t,r,e){var n=e(79306),a=e(28551),o=e(69565),i=e(91291),s=e(1767),u="Invalid size",c=RangeError,f=TypeError,l=Math.max,h=function(t,r){this.set=t,this.size=l(r,0),this.has=n(t.has),this.keys=n(t.keys)};h.prototype={getIterator:function(){return s(a(o(this.keys,this.set)))},includes:function(t){return o(this.has,this.set,t)}},t.exports=function(t){a(t);var r=+t.size;if(r!=r)throw new f(u);var e=i(r);if(e<0)throw new c(u);return new h(t,e)}},2478(t,r,e){var n=e(79504),a=e(48981),o=Math.floor,i=n("".charAt),s=n("".replace),u=n("".slice),c=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,f=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,r,e,n,l,h){var p=e+t.length,d=n.length,v=f;return void 0!==l&&(l=a(l),v=c),s(h,v,function(a,s){var c;switch(i(s,0)){case"$":return"$";case"&":return t;case"`":return u(r,0,e);case"'":return u(r,p);case"<":c=l[u(s,1,-1)];break;default:var f=+s;if(0===f)return a;if(f>d){var h=o(f/10);return 0===h?a:h<=d?void 0===n[h-1]?i(s,1):n[h-1]+i(s,1):a}c=n[f-1]}return void 0===c?"":c})}},44576(t,r,e){var n=function(t){return t&&t.Math===Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e.g&&e.g)||n("object"==typeof this&&this)||function(){return this}()||Function("return this")()},39297(t,r,e){var n=e(79504),a=e(48981),o=n({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,r){return o(a(t),r)}},30421(t){t.exports={}},90757(t){t.exports=function(t,r){try{1===arguments.length?console.error(t):console.error(t,r)}catch(t){}}},20397(t,r,e){var n=e(97751);t.exports=n("document","documentElement")},35917(t,r,e){var n=e(43724),a=e(79039),o=e(4055);t.exports=!n&&!a(function(){return 7!==Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a})},88490(t){var r=Array,e=Math.abs,n=Math.pow,a=Math.floor,o=Math.log,i=Math.LN2;t.exports={pack:function(t,s,u){var c,f,l,h=r(u),p=8*u-s-1,d=(1<<p)-1,v=d>>1,g=23===s?n(2,-24)-n(2,-77):0,y=t<0||0===t&&1/t<0?1:0,m=0;for((t=e(t))!=t||t===1/0?(f=t!=t?1:0,c=d):(c=a(o(t)/i),t*(l=n(2,-c))<1&&(c--,l*=2),(t+=c+v>=1?g/l:g*n(2,1-v))*l>=2&&(c++,l/=2),c+v>=d?(f=0,c=d):c+v>=1?(f=(t*l-1)*n(2,s),c+=v):(f=t*n(2,v-1)*n(2,s),c=0));s>=8;)h[m++]=255&f,f/=256,s-=8;for(c=c<<s|f,p+=s;p>0;)h[m++]=255&c,c/=256,p-=8;return h[m-1]|=128*y,h},unpack:function(t,r){var e,a=t.length,o=8*a-r-1,i=(1<<o)-1,s=i>>1,u=o-7,c=a-1,f=t[c--],l=127&f;for(f>>=7;u>0;)l=256*l+t[c--],u-=8;for(e=l&(1<<-u)-1,l>>=-u,u+=r;u>0;)e=256*e+t[c--],u-=8;if(0===l)l=1-s;else{if(l===i)return e?NaN:f?-1/0:1/0;e+=n(2,r),l-=s}return(f?-1:1)*e*n(2,l-r)}}},47055(t,r,e){var n=e(79504),a=e(79039),o=e(22195),i=Object,s=n("".split);t.exports=a(function(){return!i("z").propertyIsEnumerable(0)})?function(t){return"String"===o(t)?s(t,""):i(t)}:i},23167(t,r,e){var n=e(94901),a=e(20034),o=e(52967);t.exports=function(t,r,e){var i,s;return o&&n(i=r.constructor)&&i!==e&&a(s=i.prototype)&&s!==e.prototype&&o(t,s),t}},33706(t,r,e){var n=e(79504),a=e(94901),o=e(77629),i=n(Function.toString);a(o.inspectSource)||(o.inspectSource=function(t){return i(t)}),t.exports=o.inspectSource},77584(t,r,e){var n=e(20034),a=e(66699);t.exports=function(t,r){n(r)&&"cause"in r&&a(t,"cause",r.cause)}},3451(t,r,e){var n=e(46518),a=e(79504),o=e(30421),i=e(20034),s=e(39297),u=e(24913).f,c=e(38480),f=e(10298),l=e(34124),h=e(33392),p=e(92744),d=!1,v=h("meta"),g=0,y=function(t){u(t,v,{value:{objectID:"O"+g++,weakData:{}}})},m=t.exports={enable:function(){m.enable=function(){},d=!0;var t=c.f,r=a([].splice),e={};e[v]=1,t(e).length&&(c.f=function(e){for(var n=t(e),a=0,o=n.length;a<o;a++)if(n[a]===v){r(n,a,1);break}return n},n({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:f.f}))},fastKey:function(t,r){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!s(t,v)){if(!l(t))return"F";if(!r)return"E";y(t)}return t[v].objectID},getWeakData:function(t,r){if(!s(t,v)){if(!l(t))return!0;if(!r)return!1;y(t)}return t[v].weakData},onFreeze:function(t){return p&&d&&l(t)&&!s(t,v)&&y(t),t}};o[v]=!0},91181(t,r,e){var n,a,o,i=e(58622),s=e(44576),u=e(20034),c=e(66699),f=e(39297),l=e(77629),h=e(66119),p=e(30421),d="Object already initialized",v=s.TypeError,g=s.WeakMap;if(i||l.state){var y=l.state||(l.state=new g);y.get=y.get,y.has=y.has,y.set=y.set,n=function(t,r){if(y.has(t))throw new v(d);return r.facade=t,y.set(t,r),r},a=function(t){return y.get(t)||{}},o=function(t){return y.has(t)}}else{var m=h("state");p[m]=!0,n=function(t,r){if(f(t,m))throw new v(d);return r.facade=t,c(t,m,r),r},a=function(t){return f(t,m)?t[m]:{}},o=function(t){return f(t,m)}}t.exports={set:n,get:a,has:o,enforce:function(t){return o(t)?a(t):n(t,{})},getterFor:function(t){return function(r){var e;if(!u(r)||(e=a(r)).type!==t)throw new v("Incompatible receiver, "+t+" required");return e}}}},44209(t,r,e){var n=e(78227),a=e(26269),o=n("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(a.Array===t||i[o]===t)}},34376(t,r,e){var n=e(22195);t.exports=Array.isArray||function(t){return"Array"===n(t)}},18727(t,r,e){var n=e(36955);t.exports=function(t){var r=n(t);return"BigInt64Array"===r||"BigUint64Array"===r}},94901(t){var r="object"==typeof document&&document.all;t.exports=void 0===r&&void 0!==r?function(t){return"function"==typeof t||t===r}:function(t){return"function"==typeof t}},33517(t,r,e){var n=e(79504),a=e(79039),o=e(94901),i=e(36955),s=e(97751),u=e(33706),c=function(){},f=s("Reflect","construct"),l=/^\s*(?:class|function)\b/,h=n(l.exec),p=!l.test(c),d=function(t){if(!o(t))return!1;try{return f(c,[],t),!0}catch(t){return!1}},v=function(t){if(!o(t))return!1;switch(i(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return p||!!h(l,u(t))}catch(t){return!0}};v.sham=!0,t.exports=!f||a(function(){var t;return d(d.call)||!d(Object)||!d(function(){t=!0})||t})?v:d},16575(t,r,e){var n=e(39297);t.exports=function(t){return void 0!==t&&(n(t,"value")||n(t,"writable"))}},92796(t,r,e){var n=e(79039),a=e(94901),o=/#|\.prototype\./,i=function(t,r){var e=u[s(t)];return e===f||e!==c&&(a(r)?n(r):!!r)},s=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},u=i.data={},c=i.NATIVE="N",f=i.POLYFILL="P";t.exports=i},2087(t,r,e){var n=e(20034),a=Math.floor;t.exports=Number.isInteger||function(t){return!n(t)&&isFinite(t)&&a(t)===t}},64117(t){t.exports=function(t){return null==t}},20034(t,r,e){var n=e(94901);t.exports=function(t){return"object"==typeof t?null!==t:n(t)}},13925(t,r,e){var n=e(20034);t.exports=function(t){return n(t)||null===t}},96395(t){t.exports=!1},65810(t,r,e){var n=e(20034),a=e(91181).get;t.exports=function(t){if(!n(t))return!1;var r=a(t);return!!r&&"RawJSON"===r.type}},60788(t,r,e){var n=e(20034),a=e(22195),o=e(78227)("match");t.exports=function(t){var r;return n(t)&&(void 0!==(r=t[o])?!!r:"RegExp"===a(t))}},10757(t,r,e){var n=e(97751),a=e(94901),o=e(1625),i=e(7040),s=Object;t.exports=i?function(t){return"symbol"==typeof t}:function(t){var r=n("Symbol");return a(r)&&o(r.prototype,s(t))}},40507(t,r,e){var n=e(69565);t.exports=function(t,r,e){for(var a,o,i=e?t:t.iterator,s=t.next;!(a=n(s,i)).done;)if(void 0!==(o=r(a.value)))return o}},72652(t,r,e){var n=e(76080),a=e(69565),o=e(28551),i=e(16823),s=e(44209),u=e(26198),c=e(1625),f=e(70081),l=e(50851),h=e(9539),p=TypeError,d=function(t,r){this.stopped=t,this.result=r},v=d.prototype;t.exports=function(t,r,e){var g,y,m,b,w,x,_,S=e&&e.that,E=!(!e||!e.AS_ENTRIES),A=!(!e||!e.IS_RECORD),O=!(!e||!e.IS_ITERATOR),R=!(!e||!e.INTERRUPTED),k=n(r,S),I=function(t){var r=g;return g=void 0,r&&h(r,"normal"),new d(!0,t)},T=function(t){return E?(o(t),R?k(t[0],t[1],I):k(t[0],t[1])):R?k(t,I):k(t)};if(A)g=t.iterator;else if(O)g=t;else{if(!(y=l(t)))throw new p(i(t)+" is not iterable");if(s(y)){for(m=0,b=u(t);b>m;m++)if((w=T(t[m]))&&c(v,w))return w;return new d(!1)}g=f(t,y)}for(x=A?t.next:g.next;!(_=a(x,g)).done;){var L=_.value;try{w=T(L)}catch(t){if(!g)throw t;h(g,"throw",t)}if("object"==typeof w&&w&&c(v,w))return w}return new d(!1)}},91385(t,r,e){var n=e(9539);t.exports=function(t,r,e){for(var a=t.length-1;a>=0;a--)if(void 0!==t[a])try{e=n(t[a].iterator,r,e)}catch(t){r="throw",e=t}if("throw"===r)throw e;return e}},9539(t,r,e){var n=e(69565),a=e(28551),o=e(55966);t.exports=function(t,r,e){var i,s;a(t);try{if(!(i=o(t,"return"))){if("throw"===r)throw e;return e}i=n(i,t)}catch(t){s=!0,i=t}if("throw"===r)throw e;if(s)throw i;return a(i),e}},33994(t,r,e){var n=e(57657).IteratorPrototype,a=e(2360),o=e(6980),i=e(10687),s=e(26269),u=function(){return this};t.exports=function(t,r,e,c){var f=r+" Iterator";return t.prototype=a(n,{next:o(+!c,e)}),i(t,f,!1,!0),s[f]=u,t}},19462(t,r,e){var n=e(69565),a=e(2360),o=e(66699),i=e(56279),s=e(78227),u=e(91181),c=e(55966),f=e(57657).IteratorPrototype,l=e(62529),h=e(9539),p=e(91385),d=s("toStringTag"),v="IteratorHelper",g="WrapForValidIterator",y="normal",m="throw",b=u.set,w=function(t){var r=u.getterFor(t?g:v);return i(a(f),{next:function(){var e=r(this);if(t)return e.nextHandler();if(e.done)return l(void 0,!0);try{var n=e.nextHandler();return e.returnHandlerResult?n:l(n,e.done)}catch(t){throw e.done=!0,t}},return:function(){var e=r(this),a=e.iterator,o=e.done;if(e.done=!0,t){var i=c(a,"return");return i?n(i,a):l(void 0,!0)}if(o)return l(void 0,!0);if(e.inner)try{h(e.inner.iterator,y)}catch(t){return h(a,m,t)}if(e.openIters)try{p(e.openIters,y)}catch(t){if(a)return h(a,m,t);throw t}return a&&h(a,y),l(void 0,!0)}})},x=w(!0),_=w(!1);o(_,d,"Iterator Helper"),t.exports=function(t,r,e){var n=function(n,a){a?(a.iterator=n.iterator,a.next=n.next):a=n,a.type=r?g:v,a.returnHandlerResult=!!e,a.nextHandler=t,a.counter=0,a.done=!1,b(this,a)};return n.prototype=r?x:_,n}},51088(t,r,e){var n=e(46518),a=e(69565),o=e(96395),i=e(10350),s=e(94901),u=e(33994),c=e(42787),f=e(52967),l=e(10687),h=e(66699),p=e(36840),d=e(78227),v=e(26269),g=e(57657),y=i.PROPER,m=i.CONFIGURABLE,b=g.IteratorPrototype,w=g.BUGGY_SAFARI_ITERATORS,x=d("iterator"),_="keys",S="values",E="entries",A=function(){return this};t.exports=function(t,r,e,i,d,g,O){u(e,r,i);var R,k,I,T=function(t){if(t===d&&N)return N;if(!w&&t&&t in M)return M[t];switch(t){case _:case S:case E:return function(){return new e(this,t)}}return function(){return new e(this)}},L=r+" Iterator",C=!1,M=t.prototype,P=M[x]||M["@@iterator"]||d&&M[d],N=!w&&P||T(d),j="Array"===r&&M.entries||P;if(j&&(R=c(j.call(new t)))!==Object.prototype&&R.next&&(o||c(R)===b||(f?f(R,b):s(R[x])||p(R,x,A)),l(R,L,!0,!0),o&&(v[L]=A)),y&&d===S&&P&&P.name!==S&&(!o&&m?h(M,"name",S):(C=!0,N=function(){return a(P,this)})),d)if(k={values:T(S),keys:g?N:T(_),entries:T(E)},O)for(I in k)(w||C||!(I in M))&&p(M,I,k[I]);else n({target:r,proto:!0,forced:w||C},k);return o&&!O||M[x]===N||p(M,x,N,{name:d}),v[r]=N,k}},30684(t){t.exports=function(t,r){var e="function"==typeof Iterator&&Iterator.prototype[t];if(e)try{e.call({next:null},r).next()}catch(t){return!0}}},84549(t,r,e){var n=e(44576);t.exports=function(t,r){var e=n.Iterator,a=e&&e.prototype,o=a&&a[t],i=!1;if(o)try{o.call({next:function(){return{done:!0}},return:function(){i=!0}},-1)}catch(t){t instanceof r||(i=!1)}if(!i)return o}},57657(t,r,e){var n,a,o,i=e(79039),s=e(94901),u=e(20034),c=e(2360),f=e(42787),l=e(36840),h=e(78227),p=e(96395),d=h("iterator"),v=!1;[].keys&&("next"in(o=[].keys())?(a=f(f(o)))!==Object.prototype&&(n=a):v=!0),!u(n)||i(function(){var t={};return n[d].call(t)!==t})?n={}:p&&(n=c(n)),s(n[d])||l(n,d,function(){return this}),t.exports={IteratorPrototype:n,BUGGY_SAFARI_ITERATORS:v}},26269(t){t.exports={}},26198(t,r,e){var n=e(18014);t.exports=function(t){return n(t.length)}},50283(t,r,e){var n=e(79504),a=e(79039),o=e(94901),i=e(39297),s=e(43724),u=e(10350).CONFIGURABLE,c=e(33706),f=e(91181),l=f.enforce,h=f.get,p=String,d=Object.defineProperty,v=n("".slice),g=n("".replace),y=n([].join),m=s&&!a(function(){return 8!==d(function(){},"length",{value:8}).length}),b=String(String).split("String"),w=t.exports=function(t,r,e){"Symbol("===v(p(r),0,7)&&(r="["+g(p(r),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),e&&e.getter&&(r="get "+r),e&&e.setter&&(r="set "+r),(!i(t,"name")||u&&t.name!==r)&&(s?d(t,"name",{value:r,configurable:!0}):t.name=r),m&&e&&i(e,"arity")&&t.length!==e.arity&&d(t,"length",{value:e.arity});try{e&&i(e,"constructor")&&e.constructor?s&&d(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(t){}var n=l(t);return i(n,"source")||(n.source=y(b,"string"==typeof r?r:"")),t};Function.prototype.toString=w(function(){return o(this)&&h(this).source||c(this)},"toString")},72248(t,r,e){var n=e(79504),a=Map.prototype;t.exports={Map,set:n(a.set),get:n(a.get),has:n(a.has),remove:n(a.delete),proto:a}},53250(t){var r=Math.expm1,e=Math.exp;t.exports=!r||r(10)>22025.465794806718||r(10)<22025.465794806718||-2e-17!==r(-2e-17)?function(t){var r=+t;return 0===r?r:r>-1e-6&&r<1e-6?r+r*r/2:e(r)-1}:r},33164(t,r,e){var n=e(77782),a=e(53602),o=Math.abs;t.exports=function(t,r,e,i){var s=+t,u=o(s),c=n(s);if(u<i)return c*a(u/i/r)*i*r;var f=(1+r/2220446049250313e-31)*u,l=f-(f-u);return l>e||l!=l?c*(1/0):c*l}},15617(t,r,e){var n=e(33164);t.exports=Math.fround||function(t){return n(t,1.1920928955078125e-7,34028234663852886e22,11754943508222875e-54)}},49340(t){var r=Math.log,e=Math.LOG10E;t.exports=Math.log10||function(t){return r(t)*e}},7740(t){var r=Math.log;t.exports=Math.log1p||function(t){var e=+t;return e>-1e-8&&e<1e-8?e-e*e/2:r(1+e)}},67787(t){var r=Math.log,e=Math.LN2;t.exports=Math.log2||function(t){return r(t)/e}},53602(t){var r=4503599627370496;t.exports=function(t){return t+r-r}},77782(t){t.exports=Math.sign||function(t){var r=+t;return 0===r||r!=r?r:r<0?-1:1}},80741(t){var r=Math.ceil,e=Math.floor;t.exports=Math.trunc||function(t){var n=+t;return(n>0?e:r)(n)}},91955(t,r,e){var n,a,o,i,s,u=e(44576),c=e(93389),f=e(76080),l=e(59225).set,h=e(18265),p=e(89544),d=e(44265),v=e(7860),g=e(38574),y=u.MutationObserver||u.WebKitMutationObserver,m=u.document,b=u.process,w=u.Promise,x=c("queueMicrotask");if(!x){var _=new h,S=function(){var t,r;for(g&&(t=b.domain)&&t.exit();r=_.get();)try{r()}catch(t){throw _.head&&n(),t}t&&t.enter()};p||g||v||!y||!m?!d&&w&&w.resolve?((i=w.resolve(void 0)).constructor=w,s=f(i.then,i),n=function(){s(S)}):g?n=function(){b.nextTick(S)}:(l=f(l,u),n=function(){l(S)}):(a=!0,o=m.createTextNode(""),new y(S).observe(o,{characterData:!0}),n=function(){o.data=a=!a}),x=function(t){_.head||n(),_.add(t)}}t.exports=x},27819(t,r,e){var n=e(79039);t.exports=!n(function(){var t="9007199254740993",r=JSON.rawJSON(t);return!JSON.isRawJSON(r)||JSON.stringify(r)!==t})},36043(t,r,e){var n=e(79306),a=TypeError,o=function(t){var r,e;this.promise=new t(function(t,n){if(void 0!==r||void 0!==e)throw new a("Bad Promise constructor");r=t,e=n}),this.resolve=n(r),this.reject=n(e)};t.exports.f=function(t){return new o(t)}},32603(t,r,e){var n=e(655);t.exports=function(t,r){return void 0===t?arguments.length<2?"":r:n(t)}},24149(t){var r=RangeError;t.exports=function(t){if(t==t)return t;throw new r("NaN is not allowed")}},60511(t,r,e){var n=e(60788),a=TypeError;t.exports=function(t){if(n(t))throw new a("The method doesn't accept regular expressions");return t}},50360(t,r,e){var n=e(44576).isFinite;t.exports=Number.isFinite||function(t){return"number"==typeof t&&n(t)}},33904(t,r,e){var n=e(44576),a=e(79039),o=e(79504),i=e(655),s=e(43802).trim,u=e(47452),c=o("".charAt),f=n.parseFloat,l=n.Symbol,h=l&&l.iterator,p=1/f(u+"-0")!=-1/0||h&&!a(function(){f(Object(h))});t.exports=p?function(t){var r=s(i(t)),e=f(r);return 0===e&&"-"===c(r,0)?-0:e}:f},52703(t,r,e){var n=e(44576),a=e(79039),o=e(79504),i=e(655),s=e(43802).trim,u=e(47452),c=n.parseInt,f=n.Symbol,l=f&&f.iterator,h=/^[+-]?0x/i,p=o(h.exec),d=8!==c(u+"08")||22!==c(u+"0x16")||l&&!a(function(){c(Object(l))});t.exports=d?function(t,r){var e=s(i(t));return c(e,r>>>0||(p(h,e)?16:10))}:c},44213(t,r,e){var n=e(43724),a=e(79504),o=e(69565),i=e(79039),s=e(71072),u=e(33717),c=e(48773),f=e(48981),l=e(47055),h=Object.assign,p=Object.defineProperty,d=a([].concat);t.exports=!h||i(function(){if(n&&1!==h({b:1},h(p({},"a",{enumerable:!0,get:function(){p(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},r={},e=Symbol("assign detection"),a="abcdefghijklmnopqrst";return t[e]=7,a.split("").forEach(function(t){r[t]=t}),7!==h({},t)[e]||s(h({},r)).join("")!==a})?function(t,r){for(var e=f(t),a=arguments.length,i=1,h=u.f,p=c.f;a>i;)for(var v,g=l(arguments[i++]),y=h?d(s(g),h(g)):s(g),m=y.length,b=0;m>b;)v=y[b++],n&&!o(p,g,v)||(e[v]=g[v]);return e}:h},2360(t,r,e){var n,a=e(28551),o=e(96801),i=e(88727),s=e(30421),u=e(20397),c=e(4055),f=e(66119),l="prototype",h="script",p=f("IE_PROTO"),d=function(){},v=function(t){return"<"+h+">"+t+"</"+h+">"},g=function(t){t.write(v("")),t.close();var r=t.parentWindow.Object;return t=null,r},y=function(){try{n=new ActiveXObject("htmlfile")}catch(t){}var t,r,e;y="undefined"!=typeof document?document.domain&&n?g(n):(r=c("iframe"),e="java"+h+":",r.style.display="none",u.appendChild(r),r.src=String(e),(t=r.contentWindow.document).open(),t.write(v("document.F=Object")),t.close(),t.F):g(n);for(var a=i.length;a--;)delete y[l][i[a]];return y()};s[p]=!0,t.exports=Object.create||function(t,r){var e;return null!==t?(d[l]=a(t),e=new d,d[l]=null,e[p]=t):e=y(),void 0===r?e:o.f(e,r)}},96801(t,r,e){var n=e(43724),a=e(48686),o=e(24913),i=e(28551),s=e(25397),u=e(71072);r.f=n&&!a?Object.defineProperties:function(t,r){i(t);for(var e,n=s(r),a=u(r),c=a.length,f=0;c>f;)o.f(t,e=a[f++],n[e]);return t}},24913(t,r,e){var n=e(43724),a=e(35917),o=e(48686),i=e(28551),s=e(56969),u=TypeError,c=Object.defineProperty,f=Object.getOwnPropertyDescriptor,l="enumerable",h="configurable",p="writable";r.f=n?o?function(t,r,e){if(i(t),r=s(r),i(e),"function"==typeof t&&"prototype"===r&&"value"in e&&p in e&&!e[p]){var n=f(t,r);n&&n[p]&&(t[r]=e.value,e={configurable:h in e?e[h]:n[h],enumerable:l in e?e[l]:n[l],writable:!1})}return c(t,r,e)}:c:function(t,r,e){if(i(t),r=s(r),i(e),a)try{return c(t,r,e)}catch(t){}if("get"in e||"set"in e)throw new u("Accessors not supported");return"value"in e&&(t[r]=e.value),t}},77347(t,r,e){var n=e(43724),a=e(69565),o=e(48773),i=e(6980),s=e(25397),u=e(56969),c=e(39297),f=e(35917),l=Object.getOwnPropertyDescriptor;r.f=n?l:function(t,r){if(t=s(t),r=u(r),f)try{return l(t,r)}catch(t){}if(c(t,r))return i(!a(o.f,t,r),t[r])}},10298(t,r,e){var n=e(22195),a=e(25397),o=e(38480).f,i=e(67680),s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return s&&"Window"===n(t)?function(t){try{return o(t)}catch(t){return i(s)}}(t):o(a(t))}},38480(t,r,e){var n=e(61828),a=e(88727).concat("length","prototype");r.f=Object.getOwnPropertyNames||function(t){return n(t,a)}},33717(t,r){r.f=Object.getOwnPropertySymbols},42787(t,r,e){var n=e(39297),a=e(94901),o=e(48981),i=e(66119),s=e(12211),u=i("IE_PROTO"),c=Object,f=c.prototype;t.exports=s?c.getPrototypeOf:function(t){var r=o(t);if(n(r,u))return r[u];var e=r.constructor;return a(e)&&r instanceof e?e.prototype:r instanceof c?f:null}},34124(t,r,e){var n=e(79039),a=e(20034),o=e(22195),i=e(15652),s=Object.isExtensible,u=n(function(){s(1)});t.exports=u||i?function(t){return!!a(t)&&((!i||"ArrayBuffer"!==o(t))&&(!s||s(t)))}:s},1625(t,r,e){var n=e(79504);t.exports=n({}.isPrototypeOf)},61828(t,r,e){var n=e(79504),a=e(39297),o=e(25397),i=e(19617).indexOf,s=e(30421),u=n([].push);t.exports=function(t,r){var e,n=o(t),c=0,f=[];for(e in n)!a(s,e)&&a(n,e)&&u(f,e);for(;r.length>c;)a(n,e=r[c++])&&(~i(f,e)||u(f,e));return f}},71072(t,r,e){var n=e(61828),a=e(88727);t.exports=Object.keys||function(t){return n(t,a)}},48773(t,r){var e={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,a=n&&!e.call({1:2},1);r.f=a?function(t){var r=n(this,t);return!!r&&r.enumerable}:e},42551(t,r,e){var n=e(96395),a=e(44576),o=e(79039),i=e(3607);t.exports=n||!o(function(){if(!(i&&i<535)){var t=Math.random();__defineSetter__.call(null,t,function(){}),delete a[t]}})},52967(t,r,e){var n=e(46706),a=e(20034),o=e(67750),i=e(73506);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,r=!1,e={};try{(t=n(Object.prototype,"__proto__","set"))(e,[]),r=e instanceof Array}catch(t){}return function(e,n){return o(e),i(n),a(e)?(r?t(e,n):e.__proto__=n,e):e}}():void 0)},32357(t,r,e){var n=e(43724),a=e(79039),o=e(79504),i=e(42787),s=e(71072),u=e(25397),c=o(e(48773).f),f=o([].push),l=n&&a(function(){var t=Object.create(null);return t[2]=2,!c(t,2)}),h=function(t){return function(r){for(var e,a=u(r),o=s(a),h=l&&null===i(a),p=o.length,d=0,v=[];p>d;)e=o[d++],n&&!(h?e in a:c(a,e))||f(v,t?[e,a[e]]:a[e]);return v}};t.exports={entries:h(!0),values:h(!1)}},53179(t,r,e){var n=e(92140),a=e(36955);t.exports=n?{}.toString:function(){return"[object "+a(this)+"]"}},84270(t,r,e){var n=e(69565),a=e(94901),o=e(20034),i=TypeError;t.exports=function(t,r){var e,s;if("string"===r&&a(e=t.toString)&&!o(s=n(e,t)))return s;if(a(e=t.valueOf)&&!o(s=n(e,t)))return s;if("string"!==r&&a(e=t.toString)&&!o(s=n(e,t)))return s;throw new i("Can't convert object to primitive value")}},35031(t,r,e){var n=e(97751),a=e(79504),o=e(38480),i=e(33717),s=e(28551),u=a([].concat);t.exports=n("Reflect","ownKeys")||function(t){var r=o.f(s(t)),e=i.f;return e?u(r,e(t)):r}},616(t,r,e){var n=e(79504),a=e(39297),o=SyntaxError,i=parseInt,s=String.fromCharCode,u=n("".charAt),c=n("".slice),f=n(/./.exec),l={'\\"':'"',"\\\\":"\\","\\/":"/","\\b":"\b","\\f":"\f","\\n":"\n","\\r":"\r","\\t":"\t"},h=/^[\da-f]{4}$/i,p=/^[\u0000-\u001F]$/;t.exports=function(t,r){for(var e=!0,n="";r<t.length;){var d=u(t,r);if("\\"===d){var v=c(t,r,r+2);if(a(l,v))n+=l[v],r+=2;else{if("\\u"!==v)throw new o('Unknown escape sequence: "'+v+'"');var g=c(t,r+=2,r+4);if(!f(h,g))throw new o("Bad Unicode escape at: "+r);n+=s(i(g,16)),r+=4}}else{if('"'===d){e=!1,r++;break}if(f(p,d))throw new o("Bad control character in string literal at: "+r);n+=d,r++}}if(e)throw new o("Unterminated string at: "+r);return{value:n,end:r}}},19167(t,r,e){var n=e(44576);t.exports=n},1103(t){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},10916(t,r,e){var n=e(44576),a=e(80550),o=e(94901),i=e(92796),s=e(33706),u=e(78227),c=e(84215),f=e(96395),l=e(39519),h=a&&a.prototype,p=u("species"),d=!1,v=o(n.PromiseRejectionEvent),g=i("Promise",function(){var t=s(a),r=t!==String(a);if(!r&&66===l)return!0;if(f&&(!h.catch||!h.finally))return!0;if(!l||l<51||!/native code/.test(t)){var e=new a(function(t){t(1)}),n=function(t){t(function(){},function(){})};if((e.constructor={})[p]=n,!(d=e.then(function(){})instanceof n))return!0}return!(r||"BROWSER"!==c&&"DENO"!==c||v)});t.exports={CONSTRUCTOR:g,REJECTION_EVENT:v,SUBCLASSING:d}},80550(t,r,e){var n=e(44576);t.exports=n.Promise},93438(t,r,e){var n=e(28551),a=e(20034),o=e(36043);t.exports=function(t,r){if(n(t),a(r)&&r.constructor===t)return r;var e=o.f(t);return(0,e.resolve)(r),e.promise}},90537(t,r,e){var n=e(80550),a=e(84428),o=e(10916).CONSTRUCTOR;t.exports=o||!a(function(t){n.all(t).then(void 0,function(){})})},11056(t,r,e){var n=e(24913).f;t.exports=function(t,r,e){e in t||n(t,e,{configurable:!0,get:function(){return r[e]},set:function(t){r[e]=t}})}},18265(t){var r=function(){this.head=null,this.tail=null};r.prototype={add:function(t){var r={item:t,next:null},e=this.tail;e?e.next=r:this.head=r,this.tail=r},get:function(){var t=this.head;if(t)return null===(this.head=t.next)&&(this.tail=null),t.item}},t.exports=r},56682(t,r,e){var n=e(69565),a=e(28551),o=e(94901),i=e(22195),s=e(57323),u=TypeError;t.exports=function(t,r){var e=t.exec;if(o(e)){var c=n(e,t,r);return null!==c&&a(c),c}if("RegExp"===i(t))return n(s,t,r);throw new u("RegExp#exec called on incompatible receiver")}},57323(t,r,e){var n,a,o=e(69565),i=e(79504),s=e(655),u=e(67979),c=e(58429),f=e(25745),l=e(2360),h=e(91181).get,p=e(83635),d=e(18814),v=f("native-string-replace",String.prototype.replace),g=RegExp.prototype.exec,y=g,m=i("".charAt),b=i("".indexOf),w=i("".replace),x=i("".slice),_=(a=/b*/g,o(g,n=/a/,"a"),o(g,a,"a"),0!==n.lastIndex||0!==a.lastIndex),S=c.BROKEN_CARET,E=void 0!==/()??/.exec("")[1],A=function(t,r){for(var e=t.groups=l(null),n=0;n<r.length;n++){var a=r[n];e[a[0]]=t[a[1]]}};(_||E||S||p||d)&&(y=function(t){var r,e,n,a=this,i=h(a),c=s(t),f=i.raw;if(f)return f.lastIndex=a.lastIndex,r=o(y,f,c),a.lastIndex=f.lastIndex,r&&i.groups&&A(r,i.groups),r;var l=i.groups,p=S&&a.sticky,d=o(u,a),O=a.source,R=0,k=c;if(p){d=w(d,"y",""),-1===b(d,"g")&&(d+="g"),k=x(c,a.lastIndex);var I=a.lastIndex>0&&m(c,a.lastIndex-1);a.lastIndex>0&&(!a.multiline||a.multiline&&"\n"!==I&&"\r"!==I&&"\u2028"!==I&&"\u2029"!==I)&&(O="(?: (?:"+O+"))",k=" "+k,R++),e=new RegExp("^(?:"+O+")",d)}E&&(e=new RegExp("^"+O+"$(?!\\s)",d)),_&&(n=a.lastIndex);var T=o(g,p?e:a,k);return p?T?(T.input=c,T[0]=x(T[0],R),T.index=a.lastIndex,a.lastIndex+=T[0].length):a.lastIndex=0:_&&T&&(a.lastIndex=a.global?T.index+T[0].length:n),E&&T&&T.length>1&&o(v,T[0],e,function(){for(var t=1;t<arguments.length-2;t++)void 0===arguments[t]&&(T[t]=void 0)}),T&&l&&A(T,l),T}),t.exports=y},65213(t,r,e){var n=e(44576),a=e(79039),o=n.RegExp,i=!a(function(){var t=!0;try{o(".","d")}catch(r){t=!1}var r={},e="",n=t?"dgimsy":"gimsy",a=function(t,n){Object.defineProperty(r,t,{get:function(){return e+=n,!0}})},i={dotAll:"s",global:"g",ignoreCase:"i",multiline:"m",sticky:"y"};for(var s in t&&(i.hasIndices="d"),i)a(s,i[s]);return Object.getOwnPropertyDescriptor(o.prototype,"flags").get.call(r)!==n||e!==n});t.exports={correct:i}},67979(t,r,e){var n=e(28551);t.exports=function(){var t=n(this),r="";return t.hasIndices&&(r+="d"),t.global&&(r+="g"),t.ignoreCase&&(r+="i"),t.multiline&&(r+="m"),t.dotAll&&(r+="s"),t.unicode&&(r+="u"),t.unicodeSets&&(r+="v"),t.sticky&&(r+="y"),r}},61034(t,r,e){var n=e(69565),a=e(39297),o=e(1625),i=e(65213),s=e(67979),u=RegExp.prototype;t.exports=i.correct?function(t){return t.flags}:function(t){return i.correct||!o(u,t)||a(t,"flags")?t.flags:n(s,t)}},58429(t,r,e){var n=e(79039),a=e(44576).RegExp,o=n(function(){var t=a("a","y");return t.lastIndex=2,null!==t.exec("abcd")}),i=o||n(function(){return!a("a","y").sticky}),s=o||n(function(){var t=a("^r","gy");return t.lastIndex=2,null!==t.exec("str")});t.exports={BROKEN_CARET:s,MISSED_STICKY:i,UNSUPPORTED_Y:o}},83635(t,r,e){var n=e(79039),a=e(44576).RegExp;t.exports=n(function(){var t=a(".","s");return!(t.dotAll&&t.test("\n")&&"s"===t.flags)})},18814(t,r,e){var n=e(79039),a=e(44576).RegExp;t.exports=n(function(){var t=a("(?<a>b)","g");return"b"!==t.exec("b").groups.a||"bc"!=="b".replace(t,"$<a>c")})},67750(t,r,e){var n=e(64117),a=TypeError;t.exports=function(t){if(n(t))throw new a("Can't call method on "+t);return t}},93389(t,r,e){var n=e(44576),a=e(43724),o=Object.getOwnPropertyDescriptor;t.exports=function(t){if(!a)return n[t];var r=o(n,t);return r&&r.value}},3470(t){t.exports=Object.is||function(t,r){return t===r?0!==t||1/t==1/r:t!=t&&r!=r}},79472(t,r,e){var n,a=e(44576),o=e(18745),i=e(94901),s=e(84215),u=e(82839),c=e(67680),f=e(22812),l=a.Function,h=/MSIE .\./.test(u)||"BUN"===s&&((n=a.Bun.version.split(".")).length<3||"0"===n[0]&&(n[1]<3||"3"===n[1]&&"0"===n[2]));t.exports=function(t,r){var e=r?2:1;return h?function(n,a){var s=f(arguments.length,1)>e,u=i(n)?n:l(n),h=s?c(arguments,e):[],p=s?function(){o(u,this,h)}:u;return r?t(p,a):t(p)}:t}},89286(t,r,e){var n=e(94402),a=e(38469),o=n.Set,i=n.add;t.exports=function(t){var r=new o;return a(t,function(t){i(r,t)}),r}},83440(t,r,e){var n=e(97080),a=e(94402),o=e(89286),i=e(25170),s=e(83789),u=e(38469),c=e(40507),f=a.has,l=a.remove;t.exports=function(t){var r=n(this),e=s(t),a=o(r);return i(a)<=e.size?u(a,function(t){e.includes(t)&&l(a,t)}):c(e.getIterator(),function(t){f(a,t)&&l(a,t)}),a}},94402(t,r,e){var n=e(79504),a=Set.prototype;t.exports={Set,add:n(a.add),has:n(a.has),remove:n(a.delete),proto:a}},68750(t,r,e){var n=e(97080),a=e(94402),o=e(25170),i=e(83789),s=e(38469),u=e(40507),c=a.Set,f=a.add,l=a.has;t.exports=function(t){var r=n(this),e=i(t),a=new c;return o(r)>e.size?u(e.getIterator(),function(t){l(r,t)&&f(a,t)}):s(r,function(t){e.includes(t)&&f(a,t)}),a}},64449(t,r,e){var n=e(97080),a=e(94402).has,o=e(25170),i=e(83789),s=e(38469),u=e(40507),c=e(9539);t.exports=function(t){var r=n(this),e=i(t);if(o(r)<=e.size)return!1!==s(r,function(t){if(e.includes(t))return!1},!0);var f=e.getIterator();return!1!==u(f,function(t){if(a(r,t))return c(f.iterator,"normal",!1)})}},53838(t,r,e){var n=e(97080),a=e(25170),o=e(38469),i=e(83789);t.exports=function(t){var r=n(this),e=i(t);return!(a(r)>e.size)&&!1!==o(r,function(t){if(!e.includes(t))return!1},!0)}},28527(t,r,e){var n=e(97080),a=e(94402).has,o=e(25170),i=e(83789),s=e(40507),u=e(9539);t.exports=function(t){var r=n(this),e=i(t);if(o(r)<e.size)return!1;var c=e.getIterator();return!1!==s(c,function(t){if(!a(r,t))return u(c.iterator,"normal",!1)})}},38469(t,r,e){var n=e(79504),a=e(40507),o=e(94402),i=o.Set,s=o.proto,u=n(s.forEach),c=n(s.keys),f=c(new i).next;t.exports=function(t,r,e){return e?a({iterator:c(t),next:f},r):u(t,r)}},84916(t,r,e){var n=e(97751),a=function(t){return{size:t,has:function(){return!1},keys:function(){return{next:function(){return{done:!0}}}}}},o=function(t){return{size:t,has:function(){return!0},keys:function(){throw new Error("e")}}};t.exports=function(t,r){var e=n("Set");try{(new e)[t](a(0));try{return(new e)[t](a(-1)),!1}catch(n){if(!r)return!0;try{return(new e)[t](o(-1/0)),!1}catch(n){return r(new e([1,2])[t](o(1/0)))}}}catch(t){return!1}}},39835(t){t.exports=function(t){try{var r=new Set,e={size:0,has:function(){return!0},keys:function(){return Object.defineProperty({},"next",{get:function(){return r.clear(),r.add(4),function(){return{done:!0}}}})}},n=r[t](e);return 1===n.size&&4===n.values().next().value}catch(t){return!1}}},25170(t,r,e){var n=e(46706),a=e(94402);t.exports=n(a.proto,"size","get")||function(t){return t.size}},87633(t,r,e){var n=e(97751),a=e(62106),o=e(78227),i=e(43724),s=o("species");t.exports=function(t){var r=n(t);i&&r&&!r[s]&&a(r,s,{configurable:!0,get:function(){return this}})}},83650(t,r,e){var n=e(97080),a=e(94402),o=e(89286),i=e(83789),s=e(40507),u=a.add,c=a.has,f=a.remove;t.exports=function(t){var r=n(this),e=i(t).getIterator(),a=o(r);return s(e,function(t){c(r,t)?f(a,t):u(a,t)}),a}},10687(t,r,e){var n=e(24913).f,a=e(39297),o=e(78227)("toStringTag");t.exports=function(t,r,e){t&&!e&&(t=t.prototype),t&&!a(t,o)&&n(t,o,{configurable:!0,value:r})}},44204(t,r,e){var n=e(97080),a=e(94402).add,o=e(89286),i=e(83789),s=e(40507);t.exports=function(t){var r=n(this),e=i(t).getIterator(),u=o(r);return s(e,function(t){a(u,t)}),u}},66119(t,r,e){var n=e(25745),a=e(33392),o=n("keys");t.exports=function(t){return o[t]||(o[t]=a(t))}},77629(t,r,e){var n=e(96395),a=e(44576),o=e(39433),i="__core-js_shared__",s=t.exports=a[i]||o(i,{});(s.versions||(s.versions=[])).push({version:"3.49.0",mode:n?"pure":"global",copyright:"© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",license:"https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",source:"https://github.com/zloirock/core-js"})},25745(t,r,e){var n=e(77629);t.exports=function(t,r){return n[t]||(n[t]=r||{})}},2293(t,r,e){var n=e(28551),a=e(35548),o=e(64117),i=e(78227)("species");t.exports=function(t,r){var e,s=n(t).constructor;return void 0===s||o(e=n(s)[i])?r:a(e)}},23061(t,r,e){var n=e(79039);t.exports=function(t){return n(function(){var r=""[t]('"');return r!==r.toLowerCase()||r.split('"').length>3})}},68183(t,r,e){var n=e(79504),a=e(91291),o=e(655),i=e(67750),s=n("".charAt),u=n("".charCodeAt),c=n("".slice),f=function(t){return function(r,e){var n,f,l=o(i(r)),h=a(e),p=l.length;return h<0||h>=p?t?"":void 0:(n=u(l,h))<55296||n>56319||h+1===p||(f=u(l,h+1))<56320||f>57343?t?s(l,h):n:t?c(l,h,h+2):f-56320+(n-55296<<10)+65536}};t.exports={codeAt:f(!1),charAt:f(!0)}},83063(t,r,e){var n=e(82839);t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(n)},60533(t,r,e){var n=e(79504),a=e(18014),o=e(655),i=e(72333),s=e(67750),u=n(i),c=n("".slice),f=Math.ceil,l=function(t){return function(r,e,n){var i=o(s(r)),l=a(e),h=i.length;if(l<=h)return i;var p,d,v=void 0===n?" ":o(n);return""===v?i:((d=u(v,f((p=l-h)/v.length))).length>p&&(d=c(d,0,p)),t?i+d:d+i)}};t.exports={start:l(!1),end:l(!0)}},3717(t,r,e){var n=e(79504),a=2147483647,o=/[^\0-\u007E]/,i=/[.\u3002\uFF0E\uFF61]/g,s="Overflow: input needs wider integers to process",u=RangeError,c=n(i.exec),f=Math.floor,l=String.fromCharCode,h=n("".charCodeAt),p=n([].join),d=n([].push),v=n("".replace),g=n("".split),y=n("".toLowerCase),m=function(t){return t+22+75*(t<26)},b=function(t,r,e){var n=0;for(t=e?f(t/700):t>>1,t+=f(t/r);t>455;)t=f(t/35),n+=36;return f(n+36*t/(t+38))},w=function(t){var r=[];t=function(t){for(var r=[],e=0,n=t.length;e<n;){var a=h(t,e++);if(a>=55296&&a<=56319&&e<n){var o=h(t,e++);56320==(64512&o)?d(r,((1023&a)<<10)+(1023&o)+65536):(d(r,a),e--)}else d(r,a)}return r}(t);var e,n,o=t.length,i=128,c=0,v=72;for(e=0;e<t.length;e++)(n=t[e])<128&&d(r,l(n));var g=r.length,y=g;for(g&&d(r,"-");y<o;){var w=a;for(e=0;e<t.length;e++)(n=t[e])>=i&&n<w&&(w=n);var x=y+1;if(w-i>f((a-c)/x))throw new u(s);for(c+=(w-i)*x,i=w,e=0;e<t.length;e++){if((n=t[e])<i&&++c>a)throw new u(s);if(n===i){for(var _=c,S=36;;){var E=S<=v?1:S>=v+26?26:S-v;if(_<E)break;var A=_-E,O=36-E;d(r,l(m(E+A%O))),_=f(A/O),S+=36}d(r,l(m(_))),v=b(c,x,y===g),c=0,y++}}c++,i++}return p(r,"")};t.exports=function(t){var r,e,n=[],a=g(v(y(t),i,"."),".");for(r=0;r<a.length;r++)e=a[r],d(n,c(o,e)?"xn--"+w(e):e);return p(n,".")}},72333(t,r,e){var n=e(91291),a=e(655),o=e(67750),i=RangeError,s=Math.floor;t.exports=function(t){var r=a(o(this)),e="",u=n(t);if(u<0||u===1/0)throw new i("Wrong number of repetitions");for(;u>0;(u=s(u/2))&&(r+=r))u%2&&(e+=r);return e}},18866(t,r,e){var n=e(43802).end,a=e(60706);t.exports=a("trimEnd")?function(){return n(this)}:"".trimEnd},60706(t,r,e){var n=e(10350).PROPER,a=e(79039),o=e(47452);t.exports=function(t){return a(function(){return!!o[t]()||"​᠎"!=="​᠎"[t]()||n&&o[t].name!==t})}},53487(t,r,e){var n=e(43802).start,a=e(60706);t.exports=a("trimStart")?function(){return n(this)}:"".trimStart},43802(t,r,e){var n=e(79504),a=e(67750),o=e(655),i=e(47452),s=n("".replace),u=RegExp("^["+i+"]+"),c=RegExp("(^|[^"+i+"])["+i+"]+$"),f=function(t){return function(r){var e=o(a(r));return 1&t&&(e=s(e,u,"")),2&t&&(e=s(e,c,"$1")),e}};t.exports={start:f(1),end:f(2),trim:f(3)}},1548(t,r,e){var n=e(44576),a=e(79039),o=e(39519),i=e(84215),s=n.structuredClone;t.exports=!!s&&!a(function(){if("DENO"===i&&o>92||"NODE"===i&&o>94||"BROWSER"===i&&o>97)return!1;var t=new ArrayBuffer(8),r=s(t,{transfer:[t]});return 0!==t.byteLength||8!==r.byteLength})},4495(t,r,e){var n=e(39519),a=e(79039),o=e(44576).String;t.exports=!!Object.getOwnPropertySymbols&&!a(function(){var t=Symbol("symbol detection");return!o(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&n&&n<41})},58242(t,r,e){var n=e(69565),a=e(97751),o=e(78227),i=e(36840);t.exports=function(){var t=a("Symbol"),r=t&&t.prototype,e=r&&r.valueOf,s=o("toPrimitive");r&&!r[s]&&i(r,s,function(t){return n(e,this)},{arity:1})}},91296(t,r,e){var n=e(4495);t.exports=n&&!!Symbol.for&&!!Symbol.keyFor},59225(t,r,e){var n,a,o,i,s=e(44576),u=e(18745),c=e(76080),f=e(94901),l=e(39297),h=e(79039),p=e(20397),d=e(67680),v=e(4055),g=e(22812),y=e(89544),m=e(38574),b=s.setImmediate,w=s.clearImmediate,x=s.process,_=s.Dispatch,S=s.Function,E=s.MessageChannel,A=s.String,O=0,R={},k="onreadystatechange";h(function(){n=s.location});var I=function(t){if(l(R,t)){var r=R[t];delete R[t],r()}},T=function(t){return function(){I(t)}},L=function(t){I(t.data)},C=function(t){s.postMessage(A(t),n.protocol+"

(function () {
    'use strict';
// https://ko31k.github.io/LMP/plugins/interface+.js 080826
    var IFX_TITLE_SIZE_DEFAULT = 0.75;
    var IFX_TMDB_UA_TTL_MS = 1000 * 60 * 60 * 24 * 2;
    var IFX_TMDB_UA_CACHE_PREFIX = 'ifx_tmdb_ua_title_v1.7:';
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }
    function plural(n, one, two, five) {
        n = Math.abs(n) % 100;
        if (n >= 5 && n <= 20) return five;
        n = n % 10;
        if (n === 1) return one;
        if (n >= 2 && n <= 4) return two;
        return five;
    }
    function getBool(key, def) {
        var v = Lampa.Storage.get(key, def);
        if (typeof v === 'string') v = v.trim().toLowerCase();
        return v === true || v === 'true' || v === 1 || v === '1';
    }
    function cacheGet(key) {
        try {
            var raw = Lampa.Storage.get(key);
            if (!raw) return null;
            var obj = (typeof raw === 'string') ? JSON.parse(raw) : raw;
            if (!obj || !obj.t || !obj.v) return null;
            if ((Date.now() - obj.t) > IFX_TMDB_UA_TTL_MS) return null;
            return String(obj.v || '').trim();
        } catch (e) { return null; }
    }
    function cacheSet(key, val) {
        try {
            var obj = { t: Date.now(), v: String(val || '').trim() };
            Lampa.Storage.set(key, JSON.stringify(obj));
        } catch (e) { }
    }
    function tmdbCacheKey(movie) {
        if (!movie) return '';
        var id = movie.tmdb_id || movie.id;
        if (!id) return '';
        var isTvShow = (
            /tv|serial/i.test(movie.type || movie.media_type) ||
            movie.number_of_seasons > 0 ||
            (movie.seasons && movie.seasons.length > 0) ||
            movie.first_air_date
        );
        var type = isTvShow ? 'tv' : 'movie';
        return IFX_TMDB_UA_CACHE_PREFIX + type + ':' + String(id);
    }
    function isMonoEnabled() {
        try {
            return getBool('interface_mod_new_mono_mode', false);
        } catch (e) {
            return false;
        }
    }
    function isMonoFor(settingKey) {
        return isMonoEnabled() && getBool(settingKey, false);
    }
    function applyMonoBadgeStyle(el) {
        if (!el || !el.style) return;
        [
            'background-color', 'color', 'border', 'border-color', 'border-width', 'border-style',
            'box-shadow', 'text-shadow'
        ].forEach(function (p) {
            try { el.style.removeProperty(p); } catch (e) { }
        });
        el.style.setProperty('border-width', '1px', 'important');
        el.style.setProperty('border-style', 'solid', 'important');
        el.style.setProperty('border-color', 'rgba(255,255,255,.45)', 'important');
        el.style.setProperty('background-color', 'rgba(255,255,255,.08)', 'important');
        el.style.setProperty('color', '#fff', 'important');
    }
    function calculateAverageEpisodeDuration(movie) {
        if (!movie || typeof movie !== 'object') return 0;
        var total = 0,
            count = 0;
        if (Array.isArray(movie.episode_run_time) && movie.episode_run_time.length) {
            movie.episode_run_time.forEach(function (m) {
                if (m > 0 && m <= 200) {
                    total += m;
                    count++;
                }
            });
        } else if (Array.isArray(movie.seasons)) {
            movie.seasons.forEach(function (s) {
                if (Array.isArray(s.episodes)) {
                    s.episodes.forEach(function (e) {
                        if (e.runtime && e.runtime > 0 && e.runtime <= 200) {
                            total += e.runtime;
                            count++;
                        }
                    });
                }
            });
        }
        if (count > 0) return Math.round(total / count);
        if (movie.last_episode_to_air && movie.last_episode_to_air.runtime &&
            movie.last_episode_to_air.runtime > 0 && movie.last_episode_to_air.runtime <= 200) {
            return movie.last_episode_to_air.runtime;
        }
        return 0;
    }
    function formatDurationMinutes(minutes) {
        if (!minutes || minutes <= 0) return '';
        var h = Math.floor(minutes / 60),
            m = minutes % 60,
            out = '';
        if (h > 0) {
            out += h + ' ' + plural(h, 'година', 'години', 'годин');
            if (m > 0) out += ' ' + m + ' ' + plural(m, 'хвилина', 'хвилини', 'хвилин');
        } else {
            out += m + ' ' + plural(m, 'хвилина', 'хвилини', 'хвилин');
        }
        return out;
    }

    Lampa.Lang.add({
        interface_mod_new_group_title: {
            en: 'Interface +',
            uk: 'Інтерфейс +'
        },
        interface_mod_new_plugin_name: {
            en: 'Interface +',
            uk: 'Інтерфейс +'
        },
        interface_mod_new_hide_info_panel: {
            en: 'Hide info panel',
            uk: 'Приховати інфо-панель'
        },
        interface_mod_new_hide_info_panel_desc: {
            en: 'Completely hides the info panel with details',
            uk: 'Повністю приховує панель з інформацією (тривалість, жанри тощо)'
        },
        interface_mod_new_info_panel: {
            en: 'New info panel',
            uk: 'Нова інфо-панель'
        },
        interface_mod_new_info_panel_desc: {
            en: 'Colored and rephrased info line',
            uk: 'Кольорова та перефразована інформаційна панель'
        },
        interface_mod_new_margins_menu: {
            en: 'Configure panel margins',
            uk: 'Налаштувати відступи для панелі'
        },
        interface_mod_new_margins_menu_desc: {
            en: 'Allows changing top and bottom margins for the info panel',
            uk: 'Дозволяє змінити відступ зверху чи знизу для інфо-панелі'
        },
        interface_mod_new_mt: {
            en: 'Edit top margin',
            uk: 'Редагувати відступ зверху'
        },
        interface_mod_new_mt_desc: {
            en: 'Default: -0.5. Supports "+" and "-" values.',
            uk: 'За замовчуванням -0.5. Можна вводити як додатні, так і від\'ємні значення.'
        },
        interface_mod_new_mb: {
            en: 'Edit bottom margin',
            uk: 'Редагувати відступ знизу'
        },
        interface_mod_new_mb_desc: {
            en: 'Default: 1. Supports "+" and "-" values.',
            uk: 'За замовчуванням 1. Можна вводити як додатні, так і від\'ємні значення.'
        },
        interface_mod_new_mobile_center: {
            en: 'Mobile centering',
            uk: 'Центрування на мобільних'
        },
        interface_mod_new_mobile_center_desc: {
            en: 'Center title, info and buttons on portrait screens',
            uk: 'Центрувати заголовок, інфо-панель та кнопки на вертикальних екранах'
        },
        interface_mod_new_hide_tagline: {
            en: 'Hide tagline',
            uk: 'Приховати слоган'
        },
        interface_mod_new_hide_tagline_desc: {
            en: 'Hide the movie/series tagline under the title',
            uk: 'Приховує слоган фільму/серіалу під головною назвою'
        },
        interface_mod_new_colored_bookmarks: {
            en: 'Colored bookmark icons',
            uk: 'Кольорові іконки закладок'
        },
        interface_mod_new_colored_bookmarks_desc: {
            en: 'Colorize icons for Bookmarks, History, and Likes on cards',
            uk: 'Підсвічувати кольорами іконки (Закладки, Історія, Пізніше)'
        },
        interface_mod_new_colored_ratings: {
            en: 'Colored rating',
            uk: 'Кольоровий рейтинг'
        },
        interface_mod_new_colored_ratings_desc: {
            en: 'Enable colored rating highlight',
            uk: 'Увімкнути кольорове виділення рейтингу в повній картці'
        },
        interface_mod_new_show_status: {
            en: 'Show statuses',
            uk: 'Показувати статуси'
        },
        interface_mod_new_show_status_desc: {
            en: 'Show or hide movie/series statuses',
            uk: 'Відображати або приховувати статус фільму/серіалу (напр. "Випущено")'
        },
        interface_mod_new_show_age: {
            en: 'Show age rating',
            uk: 'Показувати віковий рейтинг'
        },
        interface_mod_new_show_age_desc: {
            en: 'Show or hide age rating badge (PG)',
            uk: 'Відображати або приховувати плашку вікового рейтингу (PG)'
        },
        interface_mod_new_colored_status: {
            en: 'Colored statuses',
            uk: 'Кольорові статуси'
        },
        interface_mod_new_colored_status_desc: {
            en: 'Colorize series status',
            uk: 'Підсвічувати статус фільму/серіалу в повній картці'
        },
        interface_mod_new_colored_age: {
            en: 'Colored age rating',
            uk: 'Кольоровий віковий рейтинг '
        },
        interface_mod_new_colored_age_desc: {
            en: 'Colorize age rating',
            uk: 'Підсвічувати віковий рейтинг в повній картці'
        },
        interface_mod_new_mono_mode: {
            en: 'Monochrome override',
            uk: 'Монохромний режим (Ч/Б)'
        },
        interface_mod_new_mono_mode_desc: {
            en: 'Overrides colors for statuses, age rating and the new info panel (only when those options are enabled)',
            uk: 'Перекриває кольори для статусів, PG та нової інфо-панелі (якщо відповідні опції увімкнені)'
        },
        interface_mod_new_theme_select_title: {
            en: 'Interface theme',
            uk: 'Тема інтерфейсу'
        },
        interface_mod_new_theme_default: {
            en: 'Default',
            uk: 'За замовчуванням'
        },
        interface_mod_new_theme_emerald_v1: {
            en: 'Emerald V1',
            uk: 'Emerald V1'
        },
        interface_mod_new_theme_emerald_v2: {
            en: 'Emerald V2',
            uk: 'Emerald V2'
        },
        interface_mod_new_theme_aurora: {
            en: 'Aurora',
            uk: 'Aurora'
        },
        interface_mod_new_theme_netflix: {
            en: 'Netflix Style',
            uk: 'Netflix Style'
        },
        interface_mod_new_theme_spotify: {
            en: 'Spotify Dark',
            uk: 'Spotify Dark'
        },
        interface_mod_new_theme_cyberpunk: {
            en: 'Cyberpunk Neon',
            uk: 'Cyberpunk Neon'
        },
        interface_mod_new_theme_amoled: {
            en: 'Amoled Black',
            uk: 'Amoled Black'
        },
        interface_mod_new_theme_ocean: {
            en: 'Ocean Glass',
            uk: 'Ocean Glass'
        },
        interface_mod_new_theme_mint: {
            en: 'Mint Fresh',
            uk: 'Mint Fresh'
        },
        interface_mod_new_theme_dark_mint: {
            en: 'Dark Mint',
            uk: 'Dark Mint'
        },
        interface_mod_new_theme_prime: {
            en: 'Prime Blue',
            uk: 'Prime Blue'
        },
        interface_mod_new_theme_twitch: {
            en: 'Twitch Dark',
            uk: 'Twitch Dark'
        },
        interface_mod_new_theme_apple: {
            en: 'Apple Glass',
            uk: 'Apple Glass'
        },
        interface_mod_new_theme_hulu: {
            en: 'Hulu Green',
            uk: 'Hulu Green'
        },
        interface_mod_new_title_mode: {
            en: 'Titles under header',
            uk: 'Назви під заголовком'
        },
        interface_mod_new_title_mode_desc: {
            en: 'Show original title, localized title, both, or hide',
            uk: 'Показувати оригінальну, локалізовану, обидві або вимкнути'
        },
        interface_mod_new_tmdb_api_key_name: {
            en: 'TMDB API Key',
            uk: 'TMDB API Ключ'
        },
        interface_mod_new_tmdb_api_key_desc: {
            en: 'Custom API key for accurate Ukrainian titles',
            uk: 'Власний ключ для точного отримання українських назв'
        },
        interface_mod_new_title_mode_off: { en: 'No', uk: 'Ні' },
        interface_mod_new_title_mode_orig: { en: 'Original title', uk: 'Оригінальна назва' },
        interface_mod_new_title_mode_loc: { en: 'Localized title', uk: 'Локалізована назва' },
        interface_mod_new_title_mode_orig_loc: { en: 'Original / Localized', uk: 'Оригінальна / Локалізована назва' },
        interface_mod_new_title_size_name: { en: 'Title size', uk: 'Розмір назви' },
        interface_mod_new_title_size_desc: { en: 'Font size (default 0.75)', uk: 'Розмір шрифту (за замовч. 0.75)' },
        interface_mod_new_all_buttons_v1: {
            en: 'All buttons in card',
            uk: 'Всі кнопки в картці'
        },
        interface_mod_new_all_buttons_desc: {
            en: 'Show all buttons in the card.',
            uk: 'Показує всі кнопки у картці (Потрібне перезавантаження)'
        },
        interface_mod_new_icon_only: {
            en: 'Icons only',
            uk: 'Кнопки без тексту'
        },
        interface_mod_new_icon_only_desc: {
            en: 'Hide button labels, keep only icons',
            uk: 'Ховає підписи на кнопках, лишає тільки іконки'
        },
        interface_mod_new_colored_buttons: {
            en: 'Colored buttons',
            uk: 'Кольорові кнопки'
        },
        interface_mod_new_colored_buttons_desc: {
            en: 'Colorize card buttons and update icons',
            uk: 'Оновлює іконки та кольори кнопок онлайн, торенти, трейлери'
        },
        torr_mod_frame: {
            uk: 'Кольорова рамка блоку торентів',
            en: 'Colored torrent frame by seeders'
        },
        torr_mod_frame_desc: {
            uk: 'Підсвічувати блоки торентів кольоровою рамкою залежно від кількості сідерів',
            en: 'Outline torrent rows based on seeder count'
        },
        torr_mod_bitrate: {
            uk: 'Кольоровий  бітрейт',
            en: 'Bitrate-based coloring'
        },
        torr_mod_bitrate_desc: {
            uk: 'Підсвічувати бітрейт кольором в залежності від розміру',
            en: 'Color bitrate by value'
        },
        torr_mod_seeds: {
            uk: 'Кольорова кількість роздаючих',
            en: 'Seeder count coloring'
        },
        torr_mod_seeds_desc: {
            uk: 'Підсвічувати кількість сідерів на роздачі: \n0–5 — червоний, 6–19 — жовтий, 20 і вище — зелений',
            en: 'Seeders: 0–5 red, 6–19 yellow, 20+ green'
        },
    });

    function getTitleSizeEm() {
        var raw = Lampa.Storage.get('interface_mod_new_title_size', String(IFX_TITLE_SIZE_DEFAULT));
        var n = parseFloat(String(raw).replace(',', '.'));
        if (!isFinite(n) || n <= 0) n = IFX_TITLE_SIZE_DEFAULT;
        if (n < 0.4) n = 0.4;
        if (n > 2.5) n = 2.5;
        return n;
    }
    function applyTitleSizeNow() {
        try {
            var n = getTitleSizeEm();
            document.documentElement.style.setProperty('--ifx-title-size', n + 'em');
        } catch (e) { }
    }
    function applyMargins() {
        var mt = String(Lampa.Storage.get('interface_mod_new_mt', '-0.5')).trim();
        var mb = String(Lampa.Storage.get('interface_mod_new_mb', '1')).trim();
        if (mt !== '' && !isNaN(mt)) mt += 'em';
        if (mb !== '' && !isNaN(mb)) mb += 'em';
        var id = 'ifx_margins_dynamic';
        var st = document.getElementById(id);
        if (!st) {
            st = document.createElement('style');
            st.id = id;
            document.head.appendChild(st);
        }
        st.textContent = '.full-start-new__details, .full-start__details { margin-top: ' + mt + ' !important; margin-bottom: ' + mb + ' !important; }';
    }
    Lampa.Template.add('settings_ifx_margins', '<div></div>');
    function pickUaFromTranslations(res, type) {
        try {
            var tr = res && res.translations && res.translations.translations;
            if (!tr || !tr.length) return '';
            var ua = null;
            for (var i = 0; i < tr.length; i++) {
                var t = tr[i];
                if (!t) continue;
                if (String(t.iso_639_1 || '').toLowerCase() === 'uk') { ua = t; break; }
                if (String(t.iso_3166_1 || '').toUpperCase() === 'UA') { ua = t; }
            }
            if (!ua || !ua.data) return '';
            var s = (type === 'tv') ? (ua.data.name || ua.data.title) : (ua.data.title || ua.data.name);
            return String(s || '').trim();
        } catch (e) {
            return '';
        }
    }
    function fetchTmdbUaTitle(movie, cb) {
        try {
            if (!movie) return cb('');
            var id = movie.tmdb_id || movie.id;
            if (!id) return cb('');
            var isTvShow = (
                /tv|serial/i.test(movie.type || movie.media_type) ||
                movie.number_of_seasons > 0 ||
                (movie.seasons && movie.seasons.length > 0) ||
                movie.first_air_date
            );
            var type = isTvShow ? 'tv' : 'movie';
            var key = tmdbCacheKey(movie);
            if (key) {
                var hit = cacheGet(key);
                if (hit) return cb(hit);
            }
            var userApiKey = String(Lampa.Storage.get('interface_mod_new_tmdb_api_key') || '').trim();
            var defaultApiKey = '1ad1fd4b4938e876aa6c96d0cded9395';
            var activeApiKey = userApiKey || defaultApiKey;
            var onSuccess = function (title) {
                if (title && key) cacheSet(key, title);
                cb(title || '');
            };
            if (activeApiKey) {
                var url = 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=' + activeApiKey + '&language=uk-UA&append_to_response=translations';
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        var title = pickUaFromTranslations(res, type);
                        if (!title) title = (type === 'tv') ? res.name : res.title;
                        if (title) {
                            onSuccess(title);
                        } else {
                            fallbackLampaApi();
                        }
                    },
                    error: function () {
                        fallbackLampaApi();
                    }
                });
            } else {
                fallbackLampaApi();
            }
            function fallbackLampaApi() {
                if (Lampa.Api && typeof Lampa.Api.tmdb === 'function') {
                    var bust = Date.now();
                    Lampa.Api.tmdb(type + '/' + id, { language: 'uk-UA', append_to_response: 'translations', _ifx: bust }, function (res) {
                        var title = pickUaFromTranslations(res, type);
                        if (!title) title = (type === 'tv') ? res.name : res.title;
                        onSuccess(title);
                    }, function () {
                        fallbackTMDB();
                    });
                } else {
                    fallbackTMDB();
                }
            }
            function fallbackTMDB() {
                if (Lampa.TMDB && typeof Lampa.TMDB.get === 'function') {
                    Lampa.TMDB.get(type, id, { language: 'uk-UA', append_to_response: 'translations' }, function (res) {
                        var title = pickUaFromTranslations(res, type);
                        if (!title) title = (type === 'tv') ? res.name : res.title;
                        onSuccess(title);
                    }, function () {
                        cb('');
                    });
                } else {
                    cb('');
                }
            }
        } catch (e) {
            cb('');
        }
    }
    function getLocalizedTitleAsync(movie, cb) {
        if (!movie) return cb('');
        fetchTmdbUaTitle(movie, function (uaTitle) {
            if (uaTitle) {
                return cb(uaTitle);
            }
            var uiLoc = String((movie && (movie.title || movie.name)) || '').trim();
            cb(uiLoc);
        });
    }
    function getOriginalTitleEnabled() {
        var rawNew = Lampa.Storage.get('interface_mod_new_en_data');
        if (typeof rawNew !== 'undefined') return getBool('interface_mod_new_en_data', true);
        return getBool('interface_mod_new_english_data', false);
    }
    function getTitleMode() {
        var m = Lampa.Storage.get('interface_mod_new_title_mode_v1');
        if (typeof m !== 'undefined' && m !== null && m !== '') {
            m = String(m);
            if (m === 'orig_ua') m = 'orig_loc';
            if (m !== 'off' && m !== 'orig' && m !== 'loc' && m !== 'orig_loc') m = 'orig';
            return m;
        }
        var old = Lampa.Storage.get('interface_mod_new_en_data');
        if (typeof old !== 'undefined') return getBool('interface_mod_new_en_data', true) ? 'orig' : 'off';
        var older = Lampa.Storage.get('interface_mod_new_english_data');
        if (typeof older !== 'undefined') return getBool('interface_mod_new_english_data', false) ? 'orig' : 'off';
        return 'orig';
    }
    var settings = {
        info_panel: getBool('interface_mod_new_info_panel', true),
        hide_info_panel: getBool('interface_mod_new_hide_info_panel', false),
        mobile_center: getBool('interface_mod_new_mobile_center', false),
        hide_tagline: getBool('interface_mod_new_hide_tagline', false),
        colored_ratings: getBool('interface_mod_new_colored_ratings', false),
        show_status: getBool('interface_mod_new_show_status', true),
        show_age: getBool('interface_mod_new_show_age', true),
        colored_status: getBool('interface_mod_new_colored_status', false),
        colored_age: getBool('interface_mod_new_colored_age', false),
        mono_mode: getBool('interface_mod_new_mono_mode', false),
        theme: (Lampa.Storage.get('interface_mod_new_theme_select', 'default') || 'default'),
        en_data: getOriginalTitleEnabled(),
        all_buttons: getBool('interface_mod_new_all_buttons_v1', false),
        icon_only: getBool('interface_mod_new_icon_only', false),
        colored_buttons: getBool('interface_mod_new_colored_buttons', false),
        tor_frame: getBool('interface_mod_new_tor_frame', true),
        tor_bitrate: getBool('interface_mod_new_tor_bitrate', true),
        tor_seeds: getBool('interface_mod_new_tor_seeds', true),
    };
    var __ifx_last = {
        details: null,
        movie: null,
        originalHTML: '',
        isTv: false,
        fullRoot: null
    };
    var __ifx_btn_cache = {
        container: null,
        nodes: null
    };

    function injectFallbackCss() {
        if (document.getElementById('ifx_fallback_css')) return;
        var st = document.createElement('style');
        st.id = 'ifx_fallback_css';
        st.textContent = `
      .ifx-status-fallback{ border-color:#fff !important; background:none !important; color:inherit !important; }
      .ifx-age-fallback{    border-color:#fff !important; background:none !important; color:inherit !important; }
    `;
        document.head.appendChild(st);
    }
    function ensureStylesPriority(ids) {
        var head = document.head;
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && el.parentNode === head) {
                head.removeChild(el);
                head.appendChild(el);
            }
        });
    }

    (function injectBaseCss() {
        if (document.getElementById('interface_mod_base')) return;
        var css = `
  .full-start-new__details{
    color:#fff !important;
    margin:-0.45em !important;
    margin-bottom:1em !important;
    display:flex !important;
    align-items:center !important;
    flex-wrap:wrap !important;
    min-height:1.9em !important;
    font-size:1.1em !important;
  }
  *:not(input){
    -webkit-user-select:none !important;
    -moz-user-select:none !important;
    -ms-user-select:none !important;
    user-select:none !important;
  }
  *{
    -webkit-tap-highlight-color:transparent;
    -webkit-touch-callout:none;
    box-sizing:border-box;
    outline:none;
    -webkit-user-drag:none;
  }
  .full-start-new__rate-line > * {
    margin-left: 0 !important;
    margin-right: 1em !important;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .ifx-original-title{
    color: #ccc; 
    font-size: var(--ifx-title-size, 0.75em);
    font-weight: 600;
    margin-top: 4px;
    border-left: 2px solid #777;
    padding-left: 8px;
    text-shadow: 
      1px 1px 2px rgba(0, 0, 0, 0.9),
      -1px -1px 2px rgba(0, 0, 0, 0.6),
      0 0 6px rgba(0, 0, 0, 0.9);
  }
  .full-start-new__head {
    text-shadow: 
      1px 1px 2px rgba(0, 0, 0, 0.9),
      -1px -1px 2px rgba(0, 0, 0, 0.6),
      0 0 6px rgba(0, 0, 0, 0.9);
}
  .ifx-btn-icon-only .full-start__button span,
  .ifx-btn-icon-only .full-start__button .full-start__text{
    display:none !important;
  }
  .full-start__buttons.ifx-flex,
  .full-start-new__buttons.ifx-flex{
    display:flex !important;
    flex-wrap:wrap !important;
    gap:10px !important;
  }
  body.ifx-hide-status .full-start__status,
  body.ifx-hide-status .full-start-new__status,
  body.ifx-hide-status .full-start__soon,
  body.ifx-hide-status .full-start-new__soon,
  body.ifx-hide-status .full-start [data-status],
  body.ifx-hide-status .full-start-new [data-status] {
    display: none !important;
  }
  .applecation .applecation__meta .full-start__pg {
  margin-left: 0.7em !important; 
  }
  body.ifx-hide-pg .full-start__pg,
  body.ifx-hide-pg .full-start-new__pg,
  body.ifx-hide-pg .full-start [data-pg],
  body.ifx-hide-pg .full-start-new [data-pg],
  body.ifx-hide-pg .full-start [data-age],
  body.ifx-hide-pg .full-start-new [data-age] {
    display: none !important;
  }
`;
        var st = document.createElement('style');
        st.id = 'interface_mod_base';
        st.textContent = css;
        document.head.appendChild(st);
    })();
    function setTaglineHidden(hidden) {
        var id = 'ifx_hide_tagline_css';
        var el = document.getElementById(id);
        if (el) el.remove();
        if (hidden) {
            var css = '.full-start-new__tagline, .full-start__tagline, .full--tagline { display: none !important; }';
            var st = document.createElement('style');
            st.id = id;
            st.textContent = css;
            document.head.appendChild(st);
        }
    }
    function setInfoPanelHidden(hidden) {
        var id = 'ifx_hide_info_panel_css';
        var el = document.getElementById(id);
        if (el) el.remove();
        if (hidden) {
            var css = '.full-start-new__details, .full-start__details { display: none !important; }';
            var st = document.createElement('style');
            st.id = id;
            st.textContent = css;
            document.head.appendChild(st);
        }
    }
    function injectMobilePosterCss() {
        if (document.getElementById('ifx_mobile_poster_css')) return;
        var st = document.createElement('style');
        st.id = 'ifx_mobile_poster_css';
        st.textContent =
            '@media screen and (max-width: 400px) {' +
            '.full-start-new__img{' +
            '-webkit-mask-image:-webkit-gradient(linear,left top,left bottom,color-stop(40%,white),to(rgba(255,255,255,0)));' +
            '-webkit-mask-image:-webkit-linear-gradient(top,white 40%,rgba(255,255,255,0) 100%);' +
            'mask-image:-webkit-gradient(linear,left top,left bottom,color-stop(40%,white),to(rgba(255,255,255,0)));' +
            'mask-image:linear-gradient(to bottom,white 40%,rgba(255,255,255,0) 100%);' +
            '}' +
            '.full-start-new__right{' +
            'background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0.5)),to(rgba(0,0,0,0)));' +
            'background:-webkit-linear-gradient(top,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%);' +
            'background:-moz-linear-gradient(top,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%);' +
            'background:-o-linear-gradient(top,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%);' +
            'background:linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%);' +
            '-webkit-backdrop-filter:blur(1em);' +
            'backdrop-filter:blur(1em);' +
            '}' +
            '}';
        document.head.appendChild(st);
    }
    function setMobileCenteringEnabled(enabled) {
        var id = 'ifx_mobile_center_css';
        var el = document.getElementById(id);
        if (el) el.remove();
        if (!enabled) return;
        var css = `
      @media (max-aspect-ratio: 1/1) {
        .full-start-new__title, .full-start__title { 
            text-align: center !important; 
            width: 100%;
        }
        .full-start-new__tagline, .full-start__tagline, .full--tagline { text-align: center !important; justify-content: center !important; }
        .full-start-new__head, .full-start__head { align-items: center !important; text-align: center !important; }
        .ifx-original-title { border-left: none !important; padding-left: 0 !important; margin-left: auto !important; margin-right: auto !important; border-bottom: 2px solid #777; padding-bottom: 2px; }
        .full-start-new__details, .full-start__details { justify-content: center !important; text-align: center !important; }
        .full-start-new__details > div, .full-start__details > div { align-items: center !important; margin-left: 0 !important; margin-right: 0 !important; }
        .full-start-new__details > div > div, .full-start__details > div > div { justify-content: center !important; }
        .full-start-new__rate-line, .full-start__rate-line { justify-content: center !important; flex-wrap: wrap !important; }
        .quality-badges-under-rate, .quality-badges-after-details { justify-content: center !important; }
        .full-start-new__buttons, .full-start__buttons { justify-content: center !important; }
      }
    `;
        var st = document.createElement('style');
        st.id = id;
        st.textContent = css;
        document.head.appendChild(st);
    }

    function injectBookmarksCss() {
        if (document.getElementById('ifx_bookmarks_css')) return;
        var st = document.createElement('style');
        st.id = 'ifx_bookmarks_css';
        st.textContent = `
      body.ifx-colored-bookmarks .card__icon.icon--book {
        filter: brightness(0) saturate(100%) invert(37%) sepia(94%) saturate(3583%) hue-rotate(204deg) brightness(102%) contrast(105%) !important;
      }
      body.ifx-colored-bookmarks .card__icon.icon--history {
        filter: brightness(0) saturate(100%) invert(59%) sepia(63%) saturate(452%) hue-rotate(80deg) brightness(97%) contrast(92%) !important;
      }
      body.ifx-colored-bookmarks .card__icon.icon--like {
        filter: brightness(0) saturate(100%) invert(12%) sepia(90%) saturate(6871%) hue-rotate(358deg) brightness(109%) contrast(113%) !important;
      }
      body.ifx-colored-bookmarks .card__icon.icon--wath {
        filter: brightness(0) saturate(100%) invert(63%) sepia(83%) saturate(2274%) hue-rotate(354deg) brightness(101%) contrast(104%) !important;
      }
    `;
        document.head.appendChild(st);
    }   
  
    function toggleBookmarksColor(enabled) {
        document.body.classList.toggle('ifx-colored-bookmarks', enabled);
    }

    function applyTheme(theme) {
        var old = document.getElementById('interface_mod_theme');
        if (old) old.remove();
        if (!theme || theme === 'default') return;
        var b = '.menu__item, .settings-folder, .settings-param, .selectbox-item, .full-start__button, .full-descr__tag, .player-panel .button, .custom-online-btn, .custom-torrent-btn, .main2-more-btn, .simple-button, .menu__version';
        var f = '.menu__item.focus, .menu__item.traverse, .menu__item.hover, .settings-folder.focus, .settings-param.focus, .selectbox-item.focus, .full-start__button.focus, .full-descr__tag.focus, .player-panel .button.focus, .custom-online-btn.focus, .custom-torrent-btn.focus, .main2-more-btn.focus, .simple-button.focus, .menu__version.focus';
        var c = '.card.focus .card__view::after, .card.hover .card__view::after';
        var m = '.settings__content, .settings-input__content, .selectbox__content, .modal__content';
        var performanceCss = b + ' { transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, background-color 0.2s ease-out, color 0.2s ease-out !important; } ';
        var themeCss = {
            emerald_v1:
                'body { background: linear-gradient(135deg, #0c1619 0%, #132730 50%, #18323a 100%) !important; color: #dfdfdf !important; } ' +
                b + ' { border-radius: 1.0em !important; } ' +
                f + ' { background: linear-gradient(to right, #1a594d, #0e3652) !important; color: #fff !important; box-shadow: 0 2px 8px rgba(26,89,77,.25) !important; } ' +
                c + ' { border: 2px solid #1a594d !important; box-shadow: 0 0 10px rgba(26,89,77,.35) !important; border-radius: 1.0em !important; } ' +
                m + ' { background: rgba(12,22,25,.97) !important; border: 1px solid rgba(26,89,77,.12) !important; border-radius: 1.0em !important; }',
            emerald_v2:
                'body { background: radial-gradient(1200px 600px at 70% 10%, #214a57 0%, transparent 60%), linear-gradient(135deg, #112229 0%, #15303a 45%, #0f1c22 100%) !important; color:#e6f2ef !important; } ' +
                b + ' { border-radius: .85em !important; } ' +
                f + ' { background: linear-gradient(90deg, rgba(38,164,131,0.95), rgba(18,94,138,0.95)) !important; color:#fff !important; -webkit-backdrop-filter: blur(2px) !important; backdrop-filter: blur(2px) !important; box-shadow:0 6px 18px rgba(18,94,138,.35) !important; } ' +
                c + ' { border: 3px solid rgba(38,164,131,0.9) !important; box-shadow: 0 0 20px rgba(38,164,131,.45) !important; border-radius: .9em !important; } ' +
                m + ' { background: rgba(10,24,29,0.98) !important; border: 1px solid rgba(38,164,131,.15) !important; border-radius: .9em !important; }',
            aurora:
                'body { background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%) !important; color: #ffffff !important; } ' +
                b + ' { border-radius: .85em !important; } ' +
                f + ' { background: linear-gradient(90deg, #aa4b6b, #6b6b83, #3b8d99) !important; color:#fff !important; box-shadow: 0 0 20px rgba(170,75,107,.35) !important; } ' +
                c + ' { border: 2px solid #aa4b6b !important; box-shadow: 0 0 22px rgba(170,75,107,.45) !important; border-radius: .9em !important; } ' +
                m + ' { background: rgba(20, 32, 39, 0.98) !important; border: 1px solid rgba(59,141,153,.18) !important; border-radius: .9em !important; }',
            netflix:
                'body { background: #141414 !important; color: #ffffff !important; } ' +
                b + ' { border-radius: 0.4em !important; } ' +
                f + ' { background: #E50914 !important; color: #fff !important; box-shadow: 0 4px 15px rgba(229,9,20,.4) !important; } ' +
                c + ' { border: 3px solid #E50914 !important; box-shadow: 0 0 18px rgba(229,9,20,.5) !important; border-radius: 0.4em !important; } ' +
                m + ' { background: rgba(20, 20, 20, 0.98) !important; border: 1px solid rgba(229,9,20,.25) !important; border-radius: 0.4em !important; }',
            spotify:
                'body { background: linear-gradient(135deg, #282828 0%, #121212 40%, #000000 100%) !important; color: #ffffff !important; } ' +
                b + ' { border-radius: 2em !important; } ' +
                f + ' { background: #1DB954 !important; color: #000 !important; box-shadow: 0 4px 15px rgba(29,185,84,.3) !important; font-weight: bold !important; } ' +
                c + ' { border: 3px solid #1DB954 !important; box-shadow: 0 0 15px rgba(29,185,84,.4) !important; border-radius: 0.6em !important; } ' +
                m + ' { background: rgba(18, 18, 18, 0.98) !important; border: 1px solid rgba(29,185,84,.2) !important; border-radius: 0.6em !important; }',
            cyberpunk:
                'body { background: linear-gradient(135deg, #09090e 0%, #1a0b2e 100%) !important; color: #e0e0e0 !important; } ' +
                b + ' { border-radius: 0.3em !important; } ' +
                f + ' { background: linear-gradient(90deg, #ff003c, #00f0ff) !important; color: #fff !important; box-shadow: 0 0 15px rgba(255,0,60,.6) !important; } ' +
                c + ' { border: 2px solid #00f0ff !important; box-shadow: 0 0 20px rgba(0,240,255,.6), inset 0 0 10px rgba(255,0,60,.4) !important; border-radius: 0.3em !important; } ' +
                m + ' { background: rgba(10, 10, 15, 0.96) !important; border: 1px solid #ff003c !important; border-radius: 0.3em !important; }',
            amoled:
                'body { background: #000000 !important; color: #dfdfdf !important; } ' +
                b + ' { border-radius: 0.5em !important; } ' +
                f + ' { background: #bb86fc !important; color: #000 !important; box-shadow: 0 0 12px rgba(187,134,252,.5) !important; font-weight: 600 !important; } ' +
                c + ' { border: 2px solid #bb86fc !important; box-shadow: 0 0 15px rgba(187,134,252,.4) !important; border-radius: 0.5em !important; } ' +
                m + ' { background: #0a0a0a !important; border: 1px solid rgba(187,134,252,.2) !important; border-radius: 0.5em !important; }',
            ocean:
                'body { background: radial-gradient(circle at top right, #122238, #050a14) !important; color: #e6f1ff !important; } ' +
                b + ' { border-radius: 0.4em !important; } ' +
                f + ' { background: rgba(100,255,218,0.15) !important; color: #64ffda !important; box-shadow: 0 0 15px rgba(100,255,218,.25), inset 0 0 0 1px #64ffda !important; -webkit-backdrop-filter: blur(4px) !important; backdrop-filter: blur(4px) !important; } ' +
                c + ' { border: 2px solid #64ffda !important; box-shadow: 0 0 20px rgba(100,255,218,.3) !important; border-radius: 0.4em !important; } ' +
                m + ' { background: rgba(10, 18, 32, 0.98) !important; border: 1px solid rgba(100,255,218,.2) !important; border-radius: 0.4em !important; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5) !important; }',
            dark_mint:
                'body { background: linear-gradient(135deg, #050e0d 0%, #0a1614 50%, #11211e 100%) !important; color: #e6f2ef !important; } ' +
                b + ' { border-radius: 0.6em !important; } ' +
                f + ' { background: rgba(0, 184, 148, 0.15) !important; color: #00b894 !important; box-shadow: 0 0 15px rgba(0, 184, 148, 0.25), inset 0 0 0 1px #00b894 !important; -webkit-backdrop-filter: blur(4px) !important; backdrop-filter: blur(4px) !important; } ' +
                c + ' { border: 2px solid #00b894 !important; box-shadow: 0 0 20px rgba(0, 184, 148, 0.3) !important; border-radius: 0.8em !important; } ' +
                m + ' { background: rgba(5, 11, 10, 0.98) !important; border: 1px solid rgba(0, 184, 148, 0.2) !important; border-radius: 0.6em !important; }',
            mint:
                'body { background: linear-gradient(135deg, #122220 0%, #1c3633 50%, #254a46 100%) !important; color: #ffffff !important; } ' +
                b + ' { border-radius: 0.6em !important; } ' +
                f + ' { background: rgba(46, 204, 113, 0.15) !important; color: #2ecc71 !important; box-shadow: 0 0 15px rgba(46, 204, 113, 0.25), inset 0 0 0 1px #2ecc71 !important; -webkit-backdrop-filter: blur(4px) !important; backdrop-filter: blur(4px) !important; } ' +
                c + ' { border: 2px solid #2ecc71 !important; box-shadow: 0 0 20px rgba(46, 204, 113, 0.3) !important; border-radius: 0.8em !important; } ' +
                m + ' { background: rgba(18, 34, 32, 0.98) !important; border: 1px solid rgba(46, 204, 113, 0.2) !important; border-radius: 0.6em !important; }',
            prime:
                'body { background: linear-gradient(135deg, #1e2b3c 0%, #232f3e 100%) !important; color: #ffffff !important; } ' +
                b + ' { border-radius: 0.4em !important; } ' +
                f + ' { background: #00a8e1 !important; color: #fff !important; box-shadow: 0 4px 12px rgba(0, 168, 225, 0.4) !important; } ' +
                c + ' { border: 2px solid #00a8e1 !important; box-shadow: 0 0 15px rgba(0, 168, 225, 0.4) !important; border-radius: 0.4em !important; } ' +
                m + ' { background: rgba(30, 43, 60, 0.98) !important; border: 1px solid rgba(0, 168, 225, 0.2) !important; border-radius: 0.4em !important; }',
            twitch:
                'body { background: radial-gradient(circle at 50% 0%, #201533 0%, #0e0e10 80%) !important; color: #efeff1 !important; } ' +
                b + ' { border-radius: 0.4em !important; } ' +
                f + ' { background: #9146FF !important; color: #fff !important; box-shadow: 0 4px 15px rgba(145, 70, 255, 0.4) !important; } ' +
                c + ' { border: 2px solid #9146FF !important; box-shadow: 0 0 15px rgba(145, 70, 255, 0.4) !important; border-radius: 0.4em !important; } ' +
                m + ' { background: rgba(24, 24, 27, 0.98) !important; border: 1px solid rgba(145, 70, 255, 0.2) !important; border-radius: 0.4em !important; }',
            apple:
                'body { background: linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%) !important; color: #ffffff !important; } ' +
                b + ' { border-radius: 0.8em !important; } ' +
                f + ' { background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.15) 100%) !important; color: #fff !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0 1.5px rgba(255, 255, 255, 0.6) !important; -webkit-backdrop-filter: blur(15px) !important; backdrop-filter: blur(15px) !important; } ' +
                c + ' { border: 2px solid rgba(255, 255, 255, 0.8) !important; box-shadow: 0 0 20px rgba(255, 255, 255, 0.3) !important; border-radius: 0.8em !important; } ' +
                m + ' { background: rgba(30, 30, 30, 0.2) !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; border-radius: 1em !important; -webkit-backdrop-filter: blur(12px) !important; backdrop-filter: blur(12px) !important; }',
            hulu:
                'body { background: radial-gradient(ellipse at top, #1a3020 0%, #0f1210 80%) !important; color: #ffffff !important; } ' +
                b + ' { border-radius: 0.4em !important; } ' +
                f + ' { background: #1ce783 !important; color: #000 !important; font-weight: bold !important; box-shadow: 0 4px 15px rgba(28, 231, 131, 0.3) !important; } ' +
                c + ' { border: 2px solid #1ce783 !important; box-shadow: 0 0 15px rgba(28, 231, 131, 0.3) !important; border-radius: 0.4em !important; } ' +
                m + ' { background: rgba(15, 18, 16, 0.98) !important; border: 1px solid rgba(28, 231, 131, 0.2) !important; border-radius: 0.4em !important; }'
        };
        var st = document.createElement('style');
        st.id = 'interface_mod_theme';
        st.textContent = performanceCss + (themeCss[theme] || '');
        document.head.appendChild(st);
        if (typeof ensureStylesPriority === 'function') {
            ensureStylesPriority(['interface_mod_theme']);
        }
    }

    var STATUS_BASE_SEL = '.full-start__status, .full-start-new__status, .full-start__soon, .full-start-new__soon, .full-start [data-status], .full-start-new [data-status]';
    var AGE_BASE_SEL = '.full-start__pg, .full-start-new__pg, .full-start [data-pg], .full-start-new [data-pg], .full-start [data-age], .full-start-new [data-age]';

    function initInterfaceModSettingsUI() {
        if (window.__ifx_settings_ready) return;
        window.__ifx_settings_ready = true;
        Lampa.SettingsApi.addComponent({
            component: 'interface_mod_new',
            name: Lampa.Lang.translate('interface_mod_new_group_title'),
            icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 5c0-.552.448-1 1-1h14c.552 0 1 .448 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm0 6c0-.552.448-1 1-1h14c.552 0 1 .448 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Zm0 6c0-.552.448-1 1-1h14c.552 0 1 .448 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Z"/></svg>'
        });
        var add = Lampa.SettingsApi.addParam;
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_theme_select', type: 'select', values: { 'default': Lampa.Lang.translate('interface_mod_new_theme_default'), 'emerald_v1': Lampa.Lang.translate('interface_mod_new_theme_emerald_v1'), 'emerald_v2': Lampa.Lang.translate('interface_mod_new_theme_emerald_v2'), 'aurora': Lampa.Lang.translate('interface_mod_new_theme_aurora'), 'netflix': Lampa.Lang.translate('interface_mod_new_theme_netflix'), 'spotify': Lampa.Lang.translate('interface_mod_new_theme_spotify'), 'cyberpunk': Lampa.Lang.translate('interface_mod_new_theme_cyberpunk'), 'amoled': Lampa.Lang.translate('interface_mod_new_theme_amoled'), 'ocean': Lampa.Lang.translate('interface_mod_new_theme_ocean'), 'mint': Lampa.Lang.translate('interface_mod_new_theme_mint'), 'dark_mint': Lampa.Lang.translate('interface_mod_new_theme_dark_mint'), 'prime': Lampa.Lang.translate('interface_mod_new_theme_prime'), 'twitch': Lampa.Lang.translate('interface_mod_new_theme_twitch'), 'apple': Lampa.Lang.translate('interface_mod_new_theme_apple'), 'hulu': Lampa.Lang.translate('interface_mod_new_theme_hulu') }, default: 'default' },
            field: { name: Lampa.Lang.translate('interface_mod_new_theme_select_title') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_info_panel', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('interface_mod_new_info_panel'), description: Lampa.Lang.translate('interface_mod_new_info_panel_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { type: 'button' },
            field: { name: Lampa.Lang.translate('interface_mod_new_margins_menu'), description: Lampa.Lang.translate('interface_mod_new_margins_menu_desc') },
            onChange: function () {
                Lampa.Settings.create('ifx_margins', {
                    template: 'settings_ifx_margins',
                    onBack: function () { Lampa.Settings.create('interface_mod_new'); }
                });
            }
        });
        add({ component: 'ifx_margins', param: { name: 'interface_mod_new_mt', type: 'input', values: true, default: '-0.5' }, field: { name: Lampa.Lang.translate('interface_mod_new_mt'), description: Lampa.Lang.translate('interface_mod_new_mt_desc') } });
        add({ component: 'ifx_margins', param: { name: 'interface_mod_new_mb', type: 'input', values: true, default: '1' }, field: { name: Lampa.Lang.translate('interface_mod_new_mb'), description: Lampa.Lang.translate('interface_mod_new_mb_desc') } });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_hide_info_panel', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_hide_info_panel'), description: Lampa.Lang.translate('interface_mod_new_hide_info_panel_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_mono_mode', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_mono_mode'), description: Lampa.Lang.translate('interface_mod_new_mono_mode_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_mobile_center', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_mobile_center'), description: Lampa.Lang.translate('interface_mod_new_mobile_center_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_title_mode_v1', type: 'select', values: { off: Lampa.Lang.translate('interface_mod_new_title_mode_off'), orig: Lampa.Lang.translate('interface_mod_new_title_mode_orig'), loc: Lampa.Lang.translate('interface_mod_new_title_mode_loc'), orig_loc: Lampa.Lang.translate('interface_mod_new_title_mode_orig_loc') }, default: 'orig_loc' },
            field: { name: Lampa.Lang.translate('interface_mod_new_title_mode'), description: Lampa.Lang.translate('interface_mod_new_title_mode_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_title_size', type: 'input', values: true, default: '0.75' },
            field: { name: Lampa.Lang.translate('interface_mod_new_title_size_name'), description: Lampa.Lang.translate('interface_mod_new_title_size_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_hide_tagline', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_hide_tagline'), description: Lampa.Lang.translate('interface_mod_new_hide_tagline_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_colored_bookmarks', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('interface_mod_new_colored_bookmarks'), description: Lampa.Lang.translate('interface_mod_new_colored_bookmarks_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_colored_ratings', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_colored_ratings'), description: Lampa.Lang.translate('interface_mod_new_colored_ratings_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_show_status', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('interface_mod_new_show_status'), description: Lampa.Lang.translate('interface_mod_new_show_status_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_colored_status', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_colored_status'), description: Lampa.Lang.translate('interface_mod_new_colored_status_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_show_age', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('interface_mod_new_show_age'), description: Lampa.Lang.translate('interface_mod_new_show_age_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_colored_age', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_colored_age'), description: Lampa.Lang.translate('interface_mod_new_colored_age_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_all_buttons_v1', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_all_buttons_v1'), description: Lampa.Lang.translate('interface_mod_new_all_buttons_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_icon_only', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_icon_only'), description: Lampa.Lang.translate('interface_mod_new_icon_only_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_colored_buttons', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('interface_mod_new_colored_buttons'), description: Lampa.Lang.translate('interface_mod_new_colored_buttons_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_hide_year_title', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('ifx_hide_year_title'), description: Lampa.Lang.translate('ifx_hide_year_title_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_year_on_cards', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('ifx_year_on_cards'), description: Lampa.Lang.translate('ifx_year_on_cards_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_rating_on_cards', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('ifx_show_rating_on_cards'), description: Lampa.Lang.translate('ifx_show_rating_on_cards_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_alt_badges', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('ifx_alt_badges'), description: Lampa.Lang.translate('ifx_alt_badges_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_type_badges', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('ifx_type_badges'), description: Lampa.Lang.translate('ifx_type_badges_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_alt_type_badges', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('ifx_alt_type_badges'), description: Lampa.Lang.translate('ifx_alt_type_badges_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_episode_alt_cards', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('ifx_episode_alt_cards'), description: Lampa.Lang.translate('ifx_episode_alt_cards_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_episode_numbers_only', type: 'trigger', values: true, default: false },
            field: { name: Lampa.Lang.translate('ifx_episode_num_only'), description: Lampa.Lang.translate('ifx_episode_num_only_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_tor_frame', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('torr_mod_frame'), description: Lampa.Lang.translate('torr_mod_frame_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_tor_bitrate', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('torr_mod_bitrate'), description: Lampa.Lang.translate('torr_mod_bitrate_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_tor_seeds', type: 'trigger', values: true, default: true },
            field: { name: Lampa.Lang.translate('torr_mod_seeds'), description: Lampa.Lang.translate('torr_mod_seeds_desc') }
        });
        add({
            component: 'interface_mod_new',
            param: { name: 'interface_mod_new_tmdb_api_key', type: 'input', values: true, default: '' },
            field: { name: Lampa.Lang.translate('interface_mod_new_tmdb_api_key_name'), description: Lampa.Lang.translate('interface_mod_new_tmdb_api_key_desc') }
        });
        function moveAfterInterface() {
            var $folders = $('.settings-folder');
            var $interface = $folders.filter(function () {
                return $(this).data('component') === 'interface';
            });
            var $mod = $folders.filter(function () {
                return $(this).data('component') === 'interface_mod_new';
            });
            if ($interface.length && $mod.length && $mod.prev()[0] !== $interface[0]) $mod.insertAfter($interface);
        }
        var tries = 0,
            t = setInterval(function () {
                moveAfterInterface();
                if (++tries >= 40) clearInterval(t);
            }, 150);
        var obsMenu = new MutationObserver(function () {
            moveAfterInterface();
        });
        obsMenu.observe(document.body, {
            childList: true,
            subtree: true
        });
        function closeOpenSelects() {
            setTimeout(function () {
                $('.selectbox').remove();
                Lampa.Settings.update();
            }, 60);
        }
        if (!window.__ifx_patch_storage) {
            window.__ifx_patch_storage = true;
            var _set = Lampa.Storage.set;
            Lampa.Storage.set = function (key, val) {
                var res = _set.apply(this, arguments);
                if (typeof key === 'string' && key.indexOf('interface_mod_new_') === 0) {
                    switch (key) {
                        case 'interface_mod_new_info_panel':
                            settings.info_panel = getBool(key, true);
                            rebuildInfoPanelActive();
                            break;
                        case 'interface_mod_new_mobile_center':
                            settings.mobile_center = getBool(key, false);
                            setMobileCenteringEnabled(settings.mobile_center);
                            break;
                        case 'interface_mod_new_hide_tagline':
                            settings.hide_tagline = getBool(key, false);
                            setTaglineHidden(settings.hide_tagline);
                            break;
                        case 'interface_mod_new_hide_info_panel':
                            settings.hide_info_panel = getBool(key, false);
                            setInfoPanelHidden(settings.hide_info_panel);
                            break;
                        case 'interface_mod_new_colored_bookmarks':
                            toggleBookmarksColor(getBool(key, true));
                            break;
                        case 'interface_mod_new_colored_ratings':
                            settings.colored_ratings = getBool(key, false);
                            if (settings.colored_ratings) updateVoteColors();
                            else clearVoteColors();
                            break;
                        case 'interface_mod_new_show_status':
                            settings.show_status = getBool(key, true);
                            document.body.classList.toggle('ifx-hide-status', !settings.show_status);
                            break;
                        case 'interface_mod_new_show_age':
                            settings.show_age = getBool(key, true);
                            document.body.classList.toggle('ifx-hide-pg', !settings.show_age);
                            break;
                        case 'interface_mod_new_colored_status':
                            settings.colored_status = getBool(key, false);
                            setStatusBaseCssEnabled(settings.colored_status);
                            if (settings.colored_status) enableStatusColoring();
                            else disableStatusColoring(true);
                            break;
                        case 'interface_mod_new_colored_age':
                            settings.colored_age = getBool(key, false);
                            setAgeBaseCssEnabled(settings.colored_age);
                            if (settings.colored_age) enableAgeColoring();
                            else disableAgeColoring(true);
                            break;
                        case 'interface_mod_new_mono_mode':
                            settings.mono_mode = getBool(key, false);
                            rebuildInfoPanelActive();
                            if (settings.colored_status) applyStatusOnceIn(document);
                            if (settings.colored_age) applyAgeOnceIn(document);
                            break;
                        case 'interface_mod_new_theme_select':
                            settings.theme = (val || 'default');
                            applyTheme(settings.theme);
                            break;
                        case 'interface_mod_new_all_buttons_v1':
                            settings.all_buttons = getBool(key, false);
                            rebuildButtonsNow();
                            break;
                        case 'interface_mod_new_icon_only':
                            settings.icon_only = getBool(key, false);
                            rebuildButtonsNow();
                            break;
                        case 'interface_mod_new_colored_buttons':
                            settings.colored_buttons = getBool(key, false);
                            setColoredButtonsEnabled(settings.colored_buttons);
                            break;
                        case 'interface_mod_new_tor_frame':
                            settings.tor_frame = getBool(key, true);
                            if (window.runTorrentStyleRefresh) window.runTorrentStyleRefresh();
                            break;
                        case 'interface_mod_new_tor_bitrate':
                            settings.tor_bitrate = getBool(key, true);
                            if (window.runTorrentStyleRefresh) window.runTorrentStyleRefresh();
                            break;
                        case 'interface_mod_new_tor_seeds':
                            settings.tor_seeds = getBool(key, true);
                            if (window.runTorrentStyleRefresh) window.runTorrentStyleRefresh();
                            break;
                        case 'interface_mod_new_title_mode_v1':
                            applyOriginalTitleToggle();
                            break;
                        case 'interface_mod_new_mt':
                        case 'interface_mod_new_mb':
                            applyMargins();
                            break;
                        case 'interface_mod_new_title_size':
                            applyTitleSizeNow();
                            applyOriginalTitleToggle();
                            break;
                    }
                }
                return res;
            };
        }
    }

    function buildInfoPanel(details, movie, isTvShow, originalDetails) {
        var mono = isMonoFor('interface_mod_new_info_panel');
        var container = $('<div>').css({
            display: 'flex',
            'flex-direction': 'column',
            width: '100%',
            gap: '0em',
            margin: '-1.0em 0 0.2em 0.45em'
        });
        var row1 = $('<div>').css({ display: 'flex', 'flex-wrap': 'wrap', gap: '0.2em', 'align-items': 'center', margin: '0 0 0.2em 0' });
        var row2 = $('<div>').css({ display: 'flex', 'flex-wrap': 'wrap', gap: '0.2em', 'align-items': 'center', margin: '0 0 0.2em 0' });
        var row3 = $('<div>').css({ display: 'flex', 'flex-wrap': 'wrap', gap: '0.2em', 'align-items': 'center', margin: '0 0 0.2em 0' });
        var row4 = $('<div>').css({ display: 'flex', 'flex-wrap': 'wrap', gap: '0.2em', 'align-items': 'flex-start', margin: '0 0 0.2em 0' });
        var colors = {
            seasons: { bg: 'rgba(52,152,219,0.8)', text: 'white' },
            episodes: { bg: 'rgba(46,204,113,0.8)', text: 'white' },
            duration: { bg: 'rgba(52,152,219,0.8)', text: 'white' },
            next: { bg: 'rgba(230,126,34,0.9)', text: 'white' },
            genres: {
                'Бойовик': { bg: 'rgba(231,76,60,.85)', text: 'white' }, 'Пригоди': { bg: 'rgba(39,174,96,.85)', text: 'white' },
                'Мультфільм': { bg: 'rgba(155,89,182,.85)', text: 'white' }, 'Комедія': { bg: 'rgba(241,196,15,.9)', text: 'black' },
                'Кримінал': { bg: 'rgba(88,24,69,.85)', text: 'white' }, 'Документальний': { bg: 'rgba(22,160,133,.85)', text: 'white' },
                'Драма': { bg: 'rgba(102,51,153,.85)', text: 'white' }, 'Сімейний': { bg: 'rgba(139,195,74,.90)', text: 'white' },
                'Фентезі': { bg: 'rgba(22,110,116,.85)', text: 'white' }, 'Історія': { bg: 'rgba(121,85,72,.85)', text: 'white' },
                'Жахи': { bg: 'rgba(155,27,48,.85)', text: 'white' }, 'Музика': { bg: 'rgba(63,81,181,.85)', text: 'white' },
                'Детектив': { bg: 'rgba(52,73,94,.85)', text: 'white' }, 'Мелодрама': { bg: 'rgba(233,30,99,.85)', text: 'white' },
                'Фантастика': { bg: 'rgba(41,128,185,.85)', text: 'white' }, 'Трилер': { bg: 'rgba(165,27,11,.90)', text: 'white' },
                'Військовий': { bg: 'rgba(85,107,47,.85)', text: 'white' }, 'Вестерн': { bg: 'rgba(211,84,0,.85)', text: 'white' },
                'Бойовик і Пригоди': { bg: 'rgba(231,76,60,.85)', text: 'white' }, 'Дитячий': { bg: 'rgba(0,188,212,.85)', text: 'white' },
                'Новини': { bg: 'rgba(70,130,180,.85)', text: 'white' }, 'Реаліті-шоу': { bg: 'rgba(230,126,34,.9)', text: 'white' },
                'НФ і Фентезі': { bg: 'rgba(41,128,185,.85)', text: 'white' }, 'Мильна опера': { bg: 'rgba(233,30,99,.85)', text: 'white' },
                'Ток-шоу': { bg: 'rgba(241,196,15,.9)', text: 'black' }, 'Війна і Політика': { bg: 'rgba(96,125,139,.85)', text: 'white' },
                'Екшн і Пригоди': { bg: 'rgba(231,76,60,.85)', text: 'white' },
                'Екшн': { bg: 'rgba(231,76,60,.85)', text: 'white' },
                'Науково фантастичний': { bg: 'rgba(40,53,147,.90)', text: 'white' },
                'Науково-фантастичний': { bg: 'rgba(40,53,147,.90)', text: 'white' },
                'Наукова фантастика': { bg: 'rgba(40,53,147,.90)', text: 'white' },
                'Наукова-фантастика': { bg: 'rgba(40,53,147,.90)', text: 'white' },
                'Науково-фантастика': { bg: 'rgba(40,53,147,.90)', text: 'white' }
            }
        };
        var baseBadge = {
            'border-radius': '0.3em',
            border: '0',
            'font-size': '1.0em',
            padding: '0.2em 0.6em',
            display: 'inline-block',
            'white-space': 'nowrap',
            'line-height': '1.2em',
            'margin-right': '0.4em',
            'margin-bottom': '0.2em'
        };
        function badgeCss(bg, text) {
            if (mono) {
                return $.extend({}, baseBadge, {
                    'background-color': 'rgba(255,255,255,.08)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,.45)'
                });
            }
            return $.extend({}, baseBadge, {
                'background-color': bg,
                color: text
            });
        }
        var baseGenre = {
            'border-radius': '0.3em',
            border: '0',
            'font-size': '1.0em',
            padding: '0.2em 0.6em',
            display: 'inline-block',
            'white-space': 'nowrap',
            'line-height': '1.2em',
            'margin-right': '0.4em',
            'margin-bottom': '0.2em'
        };
        function genreCss(bg, text) {
            if (mono) {
                return $.extend({}, baseGenre, {
                    'background-color': 'rgba(255,255,255,.08)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,.45)'
                });
            }
            return $.extend({}, baseGenre, {
                'background-color': bg,
                color: text
            });
        }
        if (isTvShow && Array.isArray(movie.seasons)) {
            var totalEps = 0, airedEps = 0, now = new Date(), hasEpisodes = false;
            movie.seasons.forEach(function (s) {
                if (s.season_number === 0) return;
                if (s.episode_count) totalEps += s.episode_count;
                if (Array.isArray(s.episodes) && s.episodes.length) {
                    hasEpisodes = true;
                    s.episodes.forEach(function (e) {
                        if (e.air_date && new Date(e.air_date) <= now) airedEps++;
                    });
                } else if (s.air_date && new Date(s.air_date) <= now && s.episode_count) {
                    airedEps += s.episode_count;
                }
            });
            if (!hasEpisodes && movie.next_episode_to_air && movie.next_episode_to_air.season_number && movie.next_episode_to_air.episode_number) {
                var nextS = movie.next_episode_to_air.season_number, nextE = movie.next_episode_to_air.episode_number, rem = 0;
                movie.seasons.forEach(function (s) {
                    if (s.season_number === nextS) rem += (s.episode_count || 0) - nextE + 1;
                    else if (s.season_number > nextS) rem += s.episode_count || 0;
                });
                if (rem > 0 && totalEps > 0) airedEps = Math.max(0, totalEps - rem);
            }
            var epsText = '';
            if (totalEps > 0 && airedEps > 0 && airedEps < totalEps) epsText = airedEps + ' ' + plural(airedEps, 'Серія', 'Серії', 'Серій') + ' з ' + totalEps;
            else if (totalEps > 0) epsText = totalEps + ' ' + plural(totalEps, 'Серія', 'Серії', 'Серій');
            if (epsText) row1.append(
                $('<span>').text(epsText).css(badgeCss(colors.episodes.bg, colors.episodes.text))
            );
        }
        if (isTvShow && movie.next_episode_to_air && movie.next_episode_to_air.air_date) {
            var nextDate = new Date(movie.next_episode_to_air.air_date), today = new Date();
            nextDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            var diff = Math.floor((nextDate - today) / (1000 * 60 * 60 * 24));
            var txt = diff === 0 ? 'Наступна серія вже сьогодні'
                : diff === 1 ? 'Наступна серія вже завтра'
                    : diff > 1 ? ('Наступна серія через ' + diff + ' ' + plural(diff, 'день', 'дні', 'днів'))
                        : '';
            if (txt) row2.append(
                $('<span>').text(txt).css(badgeCss(colors.next.bg, colors.next.text))
            );
        }
        if (!isTvShow && movie.runtime > 0) {
            var mins = movie.runtime, h = Math.floor(mins / 60), m = mins % 60;
            var tt = 'Тривалість фільму: ';
            if (h > 0) tt += h + ' ' + plural(h, 'година', 'години', 'годин');
            if (m > 0) tt += (h > 0 ? ' ' : '') + m + ' хв.';
            row3.append(
                $('<span>').text(tt).css(badgeCss(colors.duration.bg, colors.duration.text))
            );
        } else if (isTvShow) {
            var avg = calculateAverageEpisodeDuration(movie);
            if (avg > 0) row3.append(
                $('<span>').text('Тривалість серії ≈ ' + formatDurationMinutes(avg))
                    .css(badgeCss(colors.duration.bg, colors.duration.text))
            );
        }
        var seasonsCount = (movie.season_count || movie.number_of_seasons || (movie.seasons ? movie.seasons.filter(function (s) {
            return s.season_number !== 0;
        }).length : 0)) || 0;
        if (isTvShow && seasonsCount > 0) {
            row4.append(
                $('<span>').text('Сезони: ' + seasonsCount).css(badgeCss(colors.seasons.bg, colors.seasons.text))
            );
        }
        var genreList = [];
        if (Array.isArray(movie.genres) && movie.genres.length) {
            genreList = movie.genres.map(function (g) { return g.name; });
        }
        genreList = genreList.filter(Boolean).filter(function (v, i, a) { return a.indexOf(v) === i; });
        genreList.forEach(function (gn) {
            var c = colors.genres[gn] || { bg: 'rgba(255,255,255,.12)', text: 'white' };
            row4.append(
                $('<span>').text(gn).css(genreCss(c.bg, c.text))
            );
        });
        container.append(row1);
        if (row2.children().length) container.append(row2);
        if (row3.children().length) container.append(row3);
        if (row4.children().length) container.append(row4);
        details.append(container);
    }
    function rebuildInfoPanelActive() {
        var enabled = getBool('interface_mod_new_info_panel', true);
        if (!__ifx_last.details || !__ifx_last.details.length) return;
        if (!enabled) {
            __ifx_last.details.html(__ifx_last.originalHTML);
        } else {
            __ifx_last.details.empty();
            buildInfoPanel(__ifx_last.details, __ifx_last.movie, __ifx_last.isTv, __ifx_last.originalHTML);
        }
    }
    function newInfoPanel() {
        Lampa.Listener.follow('full', function (data) {
            if (data.type !== 'complite') return;
            setTimeout(function () {
                var root = $(data.object.activity.render());
                var details = root.find('.full-start-new__details, .full-start__details').first();
                if (!details.length) return;
                var movie = data.data.movie || {};
                var isTvShow = (movie && (
                    movie.number_of_seasons > 0 ||
                    (movie.seasons && movie.seasons.length > 0) ||
                    movie.type === 'tv' || movie.type === 'serial'
                ));
                __ifx_last.details = details;
                __ifx_last.movie = movie;
                __ifx_last.isTv = isTvShow;
                __ifx_last.originalHTML = details.html();
                __ifx_last.fullRoot = root;
                if (!getBool('interface_mod_new_info_panel', true)) return;
                details.empty();
                buildInfoPanel(details, movie, isTvShow, __ifx_last.originalHTML);
            }, 100);
        });
    }

    function updateVoteColors() {
        if (!getBool('interface_mod_new_colored_ratings', false)) return;
        var SEL = [
            '.card__vote',
            '.full-start__rate',
            '.full-start-new__rate',
            '.info__rate',
            '.card__imdb-rate',
            '.card__kinopoisk-rate'
        ].join(',');
        function paint(el) {
            var txt = ($(el).text() || '').trim();
            var m = txt.match(/(\d+(\.\d+)?)/);
            if (!m) return;
            var v = parseFloat(m[0]);
            if (isNaN(v) || v < 0 || v > 10) return;
            var color = (v <= 3) ? 'red' : (v < 6) ? 'orange' : (v < 8) ? 'cornflowerblue' : 'lawngreen';
            $(el).css('color', color);
        }
        $(SEL).each(function () {
            paint(this);
        });
    }
    function clearVoteColors() {
        var SEL = '.card__vote, .full-start__rate, .full-start-new__rate, .info__rate, .card__imdb-rate, .card__kinopoisk-rate';
        $(SEL).css({
            color: '',
            border: ''
        });
    }
    var __voteObserverDebounce = null;
    function setupVoteColorsObserver() {
        setTimeout(function () {
            if (getBool('interface_mod_new_colored_ratings', false)) updateVoteColors();
        }, 400);
        var obs = new MutationObserver(function () {
            if (getBool('interface_mod_new_colored_ratings', false)) {
                if (__voteObserverDebounce) clearTimeout(__voteObserverDebounce);
                __voteObserverDebounce = setTimeout(updateVoteColors, 200);
            }
        });
        obs.observe(document.body, {
            childList: true,
            subtree: true
        });
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite' && getBool('interface_mod_new_colored_ratings', false)) setTimeout(updateVoteColors, 100);
        });
    }

    function setStatusBaseCssEnabled(enabled) {
        var idEn = 'interface_mod_status_enabled';
        var idDis = 'interface_mod_status_disabled';
        document.getElementById(idEn) && document.getElementById(idEn).remove();
        document.getElementById(idDis) && document.getElementById(idDis).remove();
        var st = document.createElement('style');
        if (enabled) {
            st.id = idEn;
            st.textContent =
                STATUS_BASE_SEL + '{' +
                'font-size:1.2em!important;' +
                'border:1px solid transparent!important;' +
                'border-radius:0.2em!important;' +
                'padding:0.3em!important;' +
                'margin-right:0.3em!important;' +
                'margin-left:0!important;' +
                'display:inline-block;' +
                '}';
        } else {
            st.id = idDis;
            st.textContent =
                STATUS_BASE_SEL + '{' +
                'font-size:1.2em!important;' +
                'border:1px solid #fff!important;' +
                'border-radius:0.2em!important;' +
                'padding:0.3em!important;' +
                'margin-right:0.3em!important;' +
                'margin-left:0!important;' +
                'display:inline-block;' +
                '}';
        }
        document.head.appendChild(st);
    }
    function setAgeBaseCssEnabled(enabled) {
        var idEn = 'interface_mod_age_enabled';
        var idDis = 'interface_mod_age_disabled';
        document.getElementById(idEn) && document.getElementById(idEn).remove();
        document.getElementById(idDis) && document.getElementById(idDis).remove();
        var st = document.createElement('style');
        if (enabled) {
            st.id = idEn;
            st.textContent =
                AGE_BASE_SEL + '{' +
                'font-size:1.2em!important;' +
                'border:1px solid transparent!important;' +
                'border-radius:0.2em!important;' +
                'padding:0.3em!important;' +
                'margin-right:0.3em!important;' +
                'margin-left:0!important;' +
                '}';
        } else {
            st.id = idDis;
            st.textContent =
                AGE_BASE_SEL + '{' +
                'font-size:1.2em!important;' +
                'border:1px solid #fff!important;' +
                'border-radius:0.2em!important;' +
                'padding:0.3em!important;' +
                'margin-right:0.3em!important;' +
                'margin-left:0!important;' +
                '}';
        }
        document.head.appendChild(st);
    }

    var __statusObserver = null;
    var __statusFollowReady = false;
    function applyStatusOnceIn(elRoot) {
        if (!getBool('interface_mod_new_colored_status', false)) return;
        var mono = isMonoFor('interface_mod_new_colored_status');
        var palette = {
            completed: { bg: 'rgba(46,204,113,.85)', text: 'white' },
            canceled: { bg: 'rgba(231,76,60,.9)', text: 'white' },
            ongoing: { bg: 'rgba(243,156,18,.95)', text: 'black' },
            production: { bg: 'rgba(52,152,219,.9)', text: 'white' },
            planned: { bg: 'rgba(155,89,182,.9)', text: 'white' },
            pilot: { bg: 'rgba(230,126,34,.95)', text: 'white' },
            released: { bg: 'rgba(26,188,156,.9)', text: 'white' },
            rumored: { bg: 'rgba(149,165,166,.9)', text: 'white' },
            post: { bg: 'rgba(0,188,212,.9)', text: 'white' },
            soon: { bg: 'rgba(142,68,173,.95)', text: 'white' }
        };
        var $root = $(elRoot || document);
        $root.find(STATUS_BASE_SEL).each(function () {
            var el = this;
            var t = ($(el).text() || '').trim();
            var key = '';
            if (/заверш/i.test(t) || /ended/i.test(t)) key = 'completed';
            else if (/скасов/i.test(t) || /cancel(l)?ed/i.test(t)) key = 'canceled';
            else if (/онгоїн|виходить|триває/i.test(t) || /returning/i.test(t)) key = 'ongoing';
            else if (/виробництв/i.test(t) || /in\s*production/i.test(t)) key = 'production';
            else if (/заплан/i.test(t) || /planned/i.test(t)) key = 'planned';
            else if (/пілот/i.test(t) || /pilot/i.test(t)) key = 'pilot';
            else if (/випущ/i.test(t) || /released/i.test(t)) key = 'released';
            else if (/чутк/i.test(t) || /rumored/i.test(t)) key = 'rumored';
            else if (/пост/i.test(t) || /post/i.test(t)) key = 'post';
            else if (/незабаром|скоро|soon/i.test(t)) key = 'soon';
            el.classList.remove('ifx-status-fallback');
            if (!key) {
                el.classList.add('ifx-status-fallback');
                el.style.setProperty('border-width', '1px', 'important');
                el.style.setProperty('border-style', 'solid', 'important');
                el.style.setProperty('border-color', '#fff', 'important');
                el.style.setProperty('background-color', 'transparent', 'important');
                el.style.setProperty('color', 'inherit', 'important');
                return;
            }
            if (mono) {
                applyMonoBadgeStyle(el);
                //el.style.setProperty('display', 'inline-block', 'important');
                el.style.display = 'inline-block';
                return;
            }
            var c = palette[key];
            $(el).css({
                'background-color': c.bg,
                color: c.text,
                'border-color': 'transparent',
                'display': 'inline-block'
            });
        });
    }
    function enableStatusColoring() {
        applyStatusOnceIn(document);
        if (__statusObserver) __statusObserver.disconnect();
        __statusObserver = new MutationObserver(function (muts) {
            if (!getBool('interface_mod_new_colored_status', false)) return;
            muts.forEach(function (m) {
                (m.addedNodes || []).forEach(function (n) {
                    if (n.nodeType !== 1) return;
                    applyStatusOnceIn(n);
                });
            });
        });
        __statusObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
        if (!__statusFollowReady) {
            __statusFollowReady = true;
            Lampa.Listener.follow('full', function (e) {
                if (e.type === 'complite' && getBool('interface_mod_new_colored_status', false)) {
                    setTimeout(function () {
                        applyStatusOnceIn(e.object.activity.render());
                    }, 120);
                }
            });
        }
    }
    function disableStatusColoring(clearInline) {
        if (__statusObserver) {
            __statusObserver.disconnect();
            __statusObserver = null;
        }
        if (clearInline) $(STATUS_BASE_SEL).each(function () {
            this.classList.remove('ifx-status-fallback');
            this.style.removeProperty('border-width');
            this.style.removeProperty('border-style');
            this.style.removeProperty('border-color');
            this.style.removeProperty('background-color');
            this.style.removeProperty('color');
            this.style.removeProperty('display');
        }).css({
            'background-color': '',
            color: '',
            border: ''
        });
    }

    var __ageObserver = null;
    var __ageFollowReady = false;
    var __ageGroups = {
        kids: ['G', 'TV-Y', 'TV-G', '0+', '3+', '0', '3'],
        children: ['PG', 'TV-PG', 'TV-Y7', '6+', '7+', '6', '7'],
        teens: ['PG-13', 'TV-14', '12+', '13+', '14+', '12', '13', '14'],
        almostAdult: ['R', 'TV-MA', '16+', '17+', '16', '17'],
        adult: ['NC-17', '18+', '18', 'X']
    };
    var __ageColors = {
        kids: {
            bg: '#2ecc71',
            text: 'white'
        },
        children: {
            bg: '#3498db',
            text: 'white'
        },
        teens: {
            bg: '#f1c40f',
            text: 'black'
        },
        almostAdult: {
            bg: '#e67e22',
            text: 'white'
        },
        adult: {
            bg: '#e74c3c',
            text: 'white'
        }
    };
    function ageCategoryFor(text) {
        var t = (text || '').trim();
        var mm = t.match(/(^|\D)(\d{1,2})\s*\+(?=\D|$)/);
        if (mm) {
            var n = parseInt(mm[2], 10);
            if (n >= 18) return 'adult';
            if (n >= 17) return 'almostAdult';
            if (n >= 13) return 'teens';
            if (n >= 6) return 'children';
            return 'kids';
        }
        var ORDER = ['adult', 'almostAdult', 'teens', 'children', 'kids'];
        for (var oi = 0; oi < ORDER.length; oi++) {
            var k = ORDER[oi];
            if (__ageGroups[k] && __ageGroups[k].some(function (mark) {
                var mEsc = (mark || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\+/g, '\\+');
                var re = new RegExp('(^|\\D)' + mEsc + '(?=\\D|$)', 'i');
                return re.test(t);
            })) return k;
        }
        return '';
    }
    function applyAgeOnceIn(elRoot) {
        if (!getBool('interface_mod_new_colored_age', false)) return;
        var mono = isMonoFor('interface_mod_new_colored_age');
        var $root = $(elRoot || document);
        $root.find(AGE_BASE_SEL).each(function () {
            var el = this;
            var t = (el.textContent || '').trim();
            if (!t) {
                var attr = ((el.getAttribute('data-age') || el.getAttribute('data-pg') || '') + '').trim();
                if (attr) t = attr;
            }
            if (!t) {
                el.classList.add('hide');
                el.classList.remove('ifx-age-fallback');
                ['border-width', 'border-style', 'border-color', 'background-color', 'color', 'display'].forEach(function (p) {
                    el.style.removeProperty(p);
                });
                return;
            }
            el.classList.remove('hide');
            el.classList.remove('ifx-age-fallback');
            ['border-width', 'border-style', 'border-color', 'background-color', 'color'].forEach(function (p) {
                el.style.removeProperty(p);
            });
            var g = ageCategoryFor(t);
            if (g) {
                if (mono) {
                    applyMonoBadgeStyle(el);
                    el.style.display = 'inline-block';
                    return;
                }
                var c = __ageColors[g];
                $(el).css({
                    'background-color': c.bg,
                    color: c.text,
                    'border-color': 'transparent'
                });
                el.style.display = 'inline-block';
            } else {
                el.classList.add('ifx-age-fallback');
                el.style.setProperty('border-width', '1px', 'important');
                el.style.setProperty('border-style', 'solid', 'important');
                el.style.setProperty('border-color', '#fff', 'important');
                el.style.setProperty('background-color', 'transparent', 'important');
                el.style.setProperty('color', 'inherit', 'important');
                el.style.display = 'inline-block';
            }
        });
    }
    function enableAgeColoring() {
        applyAgeOnceIn(document);
        if (__ageObserver) __ageObserver.disconnect();
        __ageObserver = new MutationObserver(function (muts) {
            if (!getBool('interface_mod_new_colored_age', false)) return;
            muts.forEach(function (m) {
                (m.addedNodes || []).forEach(function (n) {
                    if (n.nodeType !== 1) return;
                    if (n.matches && n.matches(AGE_BASE_SEL)) applyAgeOnceIn(n);
                    $(n).find && $(n).find(AGE_BASE_SEL).each(function () {
                        applyAgeOnceIn(this);
                    });
                });
                if (m.type === 'attributes' && m.target && m.target.nodeType === 1) {
                    var target = m.target;
                    if (target.matches && target.matches(AGE_BASE_SEL)) {
                        applyAgeOnceIn(target);
                    }
                }
                if (m.type === 'characterData' && m.target && m.target.parentNode) {
                    var parent = m.target.parentNode;
                    if (parent.matches && parent.matches(AGE_BASE_SEL)) {
                        applyAgeOnceIn(parent);
                    }
                }
            });
        });
        __ageObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
            attributeFilter: ['class', 'data-age', 'data-pg', 'style']
        });
        if (!__ageFollowReady) {
            __ageFollowReady = true;
            Lampa.Listener.follow('full', function (e) {
                if (e.type === 'complite' && getBool('interface_mod_new_colored_age', false)) {
                    var root = e.object.activity.render();
                    setTimeout(function () {
                        applyAgeOnceIn(root);
                    }, 120);
                    [100, 300, 800, 1600].forEach(function (ms) {
                        setTimeout(function () {
                            applyAgeOnceIn(root);
                        }, ms);
                    });
                }
            });
        }
    }
    function disableAgeColoring(clearInline) {
        if (__ageObserver) {
            __ageObserver.disconnect();
            __ageObserver = null;
        }
        if (clearInline) $(AGE_BASE_SEL).each(function () {
            this.classList.remove('ifx-age-fallback');
            this.style.removeProperty('border-width');
            this.style.removeProperty('border-style');
            this.style.removeProperty('border-color');
            this.style.removeProperty('background-color');
            this.style.removeProperty('color');
        }).css({
            'background-color': '',
            color: '',
            border: '1px solid #fff',
            'display': 'inline-block'
        });
    }

    function setOriginalTitle(fullRoot, movie) {
        if (!fullRoot || !movie) return;
        var head = fullRoot.find('.full-start-new__head, .full-start__head').first();
        if (!head.length) return;
        head.find('.ifx-original-title').remove();
        var mode = getTitleMode();
        if (mode === 'off') return;
        var original = String(movie.original_title || movie.original_name || movie.original || '').trim();
        var uiLoc = String((movie.title || movie.name) || '').trim();
        function render(text) {
            text = String(text || '').trim();
            if (!text) return;
            $('<div class="ifx-original-title"></div>').text(text).appendTo(head);
        }
        if (mode === 'orig') {
            return render(original || uiLoc);
        }
        if (mode === 'loc') {
            return getLocalizedTitleAsync(movie, function (loc) {
                render(loc || uiLoc || original);
            });
        }
        return getLocalizedTitleAsync(movie, function (loc) {
            loc = String(loc || uiLoc || '').trim();
            var a = original || '';
            var b = loc || '';
            if (!a && b) return render(b);
            if (a && !b) return render(a);
            if (a && b && a.toLowerCase() === b.toLowerCase()) return render(a);
            render(a + ' / ' + b);
        });
    }
    function applyOriginalTitleToggle() {
        if (!__ifx_last.fullRoot) return;
        var head = __ifx_last.fullRoot.find('.full-start-new__head, .full-start__head').first();
        if (!head.length) return;
        head.find('.ifx-original-title').remove();
        if (getTitleMode() !== 'off') setOriginalTitle(__ifx_last.fullRoot, __ifx_last.movie || {});
    }

    function isPlayBtn($b) {
        var cls = ($b.attr('class') || '').toLowerCase();
        var act = String($b.data('action') || '').toLowerCase();
        var txt = ($b.text() || '').trim().toLowerCase();
        if (/trailer/.test(cls) || /trailer/.test(act) || /трейлер|trailer/.test(txt)) return false;
        if (/(^|\s)(button--play|view--play|button--player|view--player)(\s|$)/.test(cls)) return true;
        if (/(^|\s)(play|player|resume|continue)(\s|$)/.test(act)) return true;
        if (/^(play|відтворити|продовжити|старт)$/i.test(txt)) return true;
        return false;
    }
    function reorderAndShowButtons(fullRoot) {
        if (!fullRoot) return;
        var $container = fullRoot.find('.full-start-new__buttons, .full-start__buttons').first();
        if (!$container.length) return;
        fullRoot.find('.button--play, .button--player, .view--play, .view--player').remove();
        var $source = fullRoot.find(
            '.buttons--container .full-start__button, ' +
            '.full-start__buttons .full-start__button, ' +
            '.full-start-new__buttons .full-start__button'
        );
        var seen = new Set();
        function sig($b) {
            return ($b.attr('data-action') || '') + '|' + ($b.attr('href') || '') + '|' + ($b.attr('class') || '');
        }
        var groups = {
            online: [],
            torrent: [],
            trailer: [],
            other: []
        };
        $source.each(function () {
            var $b = $(this);
            if (isPlayBtn($b)) return;
            var s = sig($b);
            if (seen.has(s)) return;
            seen.add(s);
            var cls = ($b.attr('class') || '').toLowerCase();
            if (cls.includes('online')) {
                groups.online.push($b);
            } else if (cls.includes('torrent')) {
                groups.torrent.push($b);
            } else if (cls.includes('trailer')) {
                groups.trailer.push($b);
            } else {
                groups.other.push($b.clone(true));
            }
        });
        var needToggle = false;
        try {
            needToggle = (Lampa.Controller.enabled().name === 'full_start');
        } catch (e) { }
        if (needToggle) {
            try {
                Lampa.Controller.toggle('settings_component');
            } catch (e) { }
        }
        $container.empty();
        ['online', 'torrent', 'trailer', 'other'].forEach(function (cat) {
            groups[cat].forEach(function ($b) {
                $container.append($b);
            });
        });
        $container.find('.full-start__button').filter(function () {
            return $(this).text().trim() === '' && $(this).find('svg').length === 0;
        }).remove();
        $container.addClass('controller');
        applyIconOnlyClass(fullRoot);
        if (needToggle) {
            setTimeout(function () {
                try {
                    Lampa.Controller.toggle('full_start');
                } catch (e) { }
            }, 80);
        }
    }
    function restoreButtons() {
        if (!__ifx_btn_cache.container || !__ifx_btn_cache.nodes) return;
        var needToggle = false;
        try {
            needToggle = (Lampa.Controller.enabled().name === 'full_start');
        } catch (e) { }
        if (needToggle) {
            try {
                Lampa.Controller.toggle('settings_component');
            } catch (e) { }
        }
        var $c = __ifx_btn_cache.container;
        $c.empty().append(__ifx_btn_cache.nodes.clone(true, true));
        $c.addClass('controller');
        if (needToggle) {
            setTimeout(function () {
                try {
                    Lampa.Controller.toggle('full_start');
                } catch (e) { }
            }, 80);
        }
        applyIconOnlyClass(__ifx_last.fullRoot || $(document));
    }
    function rebuildButtonsNow() {
        if (!__ifx_last.fullRoot) return;
        if (settings.all_buttons) {
            reorderAndShowButtons(__ifx_last.fullRoot);
        } else {
            restoreButtons();
        }
        applyIconOnlyClass(__ifx_last.fullRoot);
        if (settings.colored_buttons) applyColoredButtonsIn(__ifx_last.fullRoot);
    }
    function applyIconOnlyClass(fullRoot) {
        var $c = fullRoot.find('.full-start-new__buttons, .full-start__buttons').first();
        if (!$c.length) return;
        if (settings.icon_only) {
            $c.addClass('ifx-btn-icon-only')
                .find('.full-start__button').css('min-width', 'auto');
        } else {
            $c.removeClass('ifx-btn-icon-only')
                .find('.full-start__button').css('min-width', '');
        }
    }

    var __ifx_colbtn = {
        styleId: 'interface_mod_colored_buttons'
    };
    function injectColoredButtonsCss() {
        if (document.getElementById(__ifx_colbtn.styleId)) return;
        var css = `
  .head__action.selector.open--feed svg path { fill: #2196F3 !important; }
  .full-start__button {
    transition: transform 0.2s ease !important;
    position: relative;
  }
  .full-start__button:active {
    transform: scale(0.98) !important;
  }
  .full-start__button.ifx-bandera-online svg path,
  .full-start__button.ifx-bandera-online svg rect {
    fill: unset !important;
  }
  :root{
    --ifx-bazarnet-play-color: #8b5cf6; 
  }
  .full-start__button.view--online.lampac--button[data-subtitle*="BazarNetUA"] svg path{
    fill: var(--ifx-bazarnet-play-color) !important;
  }
  .full-start__button.view--online.lampac--button[data-subtitle*="BazarNetUA"] svg{
    color: var(--ifx-bazarnet-play-color) !important;
  }
  .full-start__button.view--online:not(.ifx-bandera-online):not(.lampac--button) svg path {
    fill: #2196f3 !important;
  }
  .full-start__button.view--online.lampac--button:not(.ifx-bandera-online):not([data-subtitle*="BazarNetUA"]) svg path{
  fill:#2196f3 !important;
  }
  .full-start__button.view--online:not(.ifx-bandera-online):not(.lampac--button) svg{
  color: #2196f3 !important;
  }
  .full-start__button.view--torrent svg path { fill: lime !important; }
  .full-start__button.view--trailer svg path { fill: #f44336 !important; }
  .full-start__button.loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255,255,255,0.5);
    animation: ifx_loading 1s linear infinite;
  }
  @keyframes ifx_loading {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
        var st = document.createElement('style');
        st.id = __ifx_colbtn.styleId;
        st.textContent = css;
        document.head.appendChild(st);
    }
    function removeColoredButtonsCss() {
        var el = document.getElementById(__ifx_colbtn.styleId);
        if (el) el.remove();
    }
    function makeOnlineUaSvg() {
        var gid = 'ifx_ua_grad_' + Math.random().toString(16).slice(2);
        return (
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
            '<defs>' +
            '<linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#156DD1"/>' +
            '<stop offset="50%" stop-color="#156DD1"/>' +
            '<stop offset="50%" stop-color="#FFD948"/>' +
            '<stop offset="100%" stop-color="#FFD948"/>' +
            '</linearGradient>' +
            '</defs>' +
            '<path style="fill:url(#' + gid + ') !important" d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z"/>' +
            '</svg>'
        );
    }
    function isBanderaOnlineBtn($btn) {
        if (!$btn || !$btn.length) return false;
        var sub = String($btn.attr('data-subtitle') || '').toLowerCase();
        var txt = String($btn.text() || '').toLowerCase();
        if (sub.indexOf('bandera online') !== -1) return true;
        if (txt.indexOf('mmssixxx') !== -1) return true;
        return false;
    }
    var SVG_MAP = {
        torrent: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2zM40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722C42.541,30.867,41.756,30.963,40.5,30.963z"/></svg>',
        online: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z"/></svg>',
        trailer: '<svg height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M71.2555 2.08955C74.6975 3.2397 77.4083 6.62804 78.3283 10.9306C80 18.7291 80 35 80 35C80 35 80 51.2709 78.3283 59.0694C77.4083 63.372 74.6975 66.7603 71.2555 67.9104C65.0167 70 40 70 40 70C40 70 14.9833 70 8.74453 67.9104C5.3025 66.7603 2.59172 63.372 1.67172 59.0694C0 51.2709 0 35 0 35C0 35 0 18.7291 1.67172 10.9306C2.59172 6.62804 5.3025 3.2395 8.74453 2.08955C14.9833 0 40 0 40 0C40 0 65.0167 0 71.2555 2.08955ZM55.5909 35.0004L29.9773 49.5714V20.4286L55.5909 35.0004Z"/></svg>'
    };
    function isBazarNetBtn($btn) {
        var sub = String($btn.attr('data-subtitle') || '');
        return sub.indexOf('BazarNetUA') !== -1;
    }
    function replaceIconsIn($root) {
        $root = $root && $root.length ? $root : $(document);
        ['torrent', 'trailer'].forEach(function (kind) {
            $root.find('.full-start__button.view--' + kind + ' svg').each(function () {
                var $svg = $(this);
                var $btn = $svg.closest('.full-start__button');
                if (!$btn.data('ifxOrigSvg')) $btn.data('ifxOrigSvg', $svg.prop('outerHTML'));
                $svg.replaceWith(SVG_MAP[kind]);
            });
        });
        $root.find('.full-start__button.view--online svg').each(function () {
            var $svg = $(this);
            var $btn = $svg.closest('.full-start__button');
            if (!$btn.data('ifxOrigSvg')) $btn.data('ifxOrigSvg', $svg.prop('outerHTML'));
            if (isBanderaOnlineBtn($btn)) {
                $btn.addClass('ifx-bandera-online');
                $svg.replaceWith(makeOnlineUaSvg());
                return;
            }
            if (isBazarNetBtn($btn)) {
                $btn.removeClass('ifx-bandera-online');
                $svg.replaceWith(SVG_MAP.online);
                return;
            }
            $btn.removeClass('ifx-bandera-online');
            $svg.replaceWith(SVG_MAP.online);
        });
    }
    function restoreIconsIn($root) {
        $root = $root && $root.length ? $root : $(document);
        $root.find('.full-start__button').each(function () {
            var $btn = $(this);
            var orig = $btn.data('ifxOrigSvg');
            if (orig) {
                var $current = $btn.find('svg').first();
                if ($current.length) $current.replaceWith(orig);
                $btn.removeData('ifxOrigSvg');
            }
            $btn.removeClass('ifx-bandera-online');
        });
    }
    function applyColoredButtonsIn(root) {
        injectColoredButtonsCss();
        replaceIconsIn(root);
    }
    function setColoredButtonsEnabled(enabled) {
        if (enabled) {
            injectColoredButtonsCss();
            if (__ifx_last.fullRoot) replaceIconsIn(__ifx_last.fullRoot);
            else replaceIconsIn($(document));
        } else {
            removeColoredButtonsCss();
            restoreIconsIn($(document));
        }
    }

    function wireFullCardEnhancers() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type !== 'complite') return;
            setTimeout(function () {
                var root = $(e.object.activity.render());
                var $container = root.find('.full-start-new__buttons, .full-start__buttons').first();
                if ($container.length) {
                    __ifx_btn_cache.container = $container;
                    __ifx_btn_cache.nodes = $container.children().clone(true, true);
                }
                __ifx_last.fullRoot = root;
                __ifx_last.movie = e.data.movie || __ifx_last.movie || {};
                setOriginalTitle(root, __ifx_last.movie);
                if (settings.all_buttons) reorderAndShowButtons(root);
                applyIconOnlyClass(root);
                if (settings.colored_buttons) {
                    applyColoredButtonsIn(root);
                    setTimeout(function () { try { replaceIconsIn(root); } catch (e) { } }, 300);
                    setTimeout(function () { try { replaceIconsIn(root); } catch (e) { } }, 900);
                }
            }, 120);
        });
    }
    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {
            setTimeout(function () {
                try {
                    if (window.runTorrentStyleRefresh) window.runTorrentStyleRefresh();
                } catch (e) { }
            }, 120);
        }
    });
    (function observeTorrents() {
        var obs = new MutationObserver(function (muts) {
            if (typeof window.runTorrentStyleRefresh === 'function') {
                clearTimeout(window.__ifx_tor_debounce);
                window.__ifx_tor_debounce = setTimeout(function () {
                    try {
                        window.runTorrentStyleRefresh();
                    } catch (e) { }
                }, 200);
            }
        });
        try {
            obs.observe(document.body, {
                subtree: true,
                childList: true
            });
        } catch (e) { }
    })();

    function startPlugin() {
        window.lampa_settings = window.lampa_settings || {};
        window.lampa_settings.blur_poster = false;
        injectFallbackCss();
        injectMobilePosterCss();
        initInterfaceModSettingsUI();
        newInfoPanel();
        applyMargins();
        setupVoteColorsObserver();
        setTaglineHidden(settings.hide_tagline);
        setInfoPanelHidden(settings.hide_info_panel);
        document.body.classList.toggle('ifx-hide-status', !settings.show_status);
        document.body.classList.toggle('ifx-hide-pg', !settings.show_age);
        injectBookmarksCss();
        toggleBookmarksColor(getBool('interface_mod_new_colored_bookmarks', true));
        if (settings.colored_ratings) updateVoteColors();
        setStatusBaseCssEnabled(settings.colored_status);
        if (settings.colored_status) enableStatusColoring();
        else disableStatusColoring(true);
        setAgeBaseCssEnabled(settings.colored_age);
        if (settings.colored_age) enableAgeColoring();
        else disableAgeColoring(true);
        setMobileCenteringEnabled(settings.mobile_center);
        if (settings.theme) applyTheme(settings.theme);
        applyTitleSizeNow();
        wireFullCardEnhancers();
        setColoredButtonsEnabled(settings.colored_buttons);
        try {
            if (window.runTorrentStyleRefresh) window.runTorrentStyleRefresh();
        } catch (e) { }
    }
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin();
        });
    }
    (function () {
        try {
            (function () {
                const UKRAINE_FLAG_SVG =
                    '<svg class="ua-flag-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" aria-hidden="true" focusable="false">' +
                    '<rect width="20" height="7.5" y="0" fill="#0057B7"/>' +
                    '<rect width="20" height="7.5" y="7.5" fill="#FFD700"/>' +
                    '</svg>';
                const REPLACEMENTS = [
                    ['Uaflix', 'UAFlix'],
                    ['Zetvideo', 'UaFlix'],
                    ['Нет истории просмотра', 'Історія перегляду відсутня'],
                    ['Дублированный', 'Дубльований'],
                    ['Дубляж', 'Дубльований'],
                    ['Многоголосый', 'багатоголосий'],
                    ['многоголосый', 'багатоголосий'],
                    ['двухголосый', 'двоголосий'],
                    ['Украинский', UKRAINE_FLAG_SVG + ' Українською'],
                    ['украинский', UKRAINE_FLAG_SVG + ' Українською'],
                    ['Український', UKRAINE_FLAG_SVG + ' Українською'],
                    ['Украинская', UKRAINE_FLAG_SVG + ' Українською'],
                    ['Українська', UKRAINE_FLAG_SVG + ' Українською'],
                    {
                        pattern: /\bUkr\b/gi,
                        replacement: UKRAINE_FLAG_SVG + ' Українською',
                        condition: (text) => !text.includes('flag-container')
                    },
                    {
                        pattern: /\bUa\b/gi,
                        replacement: UKRAINE_FLAG_SVG + ' UA',
                        condition: (text) => !text.includes('flag-container')
                    }
                ];
                const FLAG_STYLES = `
          .flag-container {
              display: inline-flex;
              align-items: center;
              vertical-align: middle;
              height: 1.27em;
              margin-left: 3px;
          }
          .flag-svg {
              display: inline-block;
              vertical-align: middle;
              margin-right: 2px;
              margin-top: -5.5px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              border: 1px solid rgba(0,0,0,0.15);
              width: 22.56px;
              height: 17.14px;
          }
          @media (max-width: 767px) {
              .flag-svg {
                  width: 16.03px;
                  height: 12.19px;
                  margin-right: 1px;
                  margin-top: -4px;
              }
          }
          .flag-container ~ span,
          .flag-container + * {
              vertical-align: middle;
          }
          .ua-flag-processed {
              position: relative;
          }
          .filter-item .flag-svg,
          .selector-item .flag-svg,
          .dropdown-item .flag-svg,
          .voice-option .flag-svg,
          .audio-option .flag-svg {
              margin-right: 1px;
              margin-top: -2px;
              width: 18.05px;
              height: 13.54px;
          }
          @media (max-width: 767px) {
              .filter-item .flag-svg,
              .selector-item .flag-svg,
              .dropdown-item .flag-svg,
              .voice-option .flag-svg,
              .audio-option .flag-svg {
                  width: 11.97px;
                  height: 8.98px;
                  margin-right: 0px;
                  margin-top: -1px;
              }
          }
          .online-prestige__description,
          .video-description,
          [class*="description"],
          [class*="info"] {
              line-height: 1.5;
          }
      `;
                const STYLES = {
                    '.torrent-item__seeds span.low-seeds': {
                        'color': '#ff5f6d',
                        'background': 'rgba(255, 95, 109, 0.10)',
                        'border': '1.4px solid rgba(255, 95, 109, 0.5)',
                        'text-shadow': '0 0 5px rgba(255, 95, 109, 0.4)',
                        'box-shadow': '0 0 8px rgba(255, 95, 109, 0.2)'
                    },
                    '.torrent-item__seeds span.medium-seeds': {
                        'color': '#ffc371',
                        'background': 'rgba(255, 195, 113, 0.10)',
                        'border': '1.4px solid rgba(255, 195, 113, 0.5)',
                        'text-shadow': '0 0 5px rgba(255, 195, 113, 0.4)',
                        'box-shadow': '0 0 8px rgba(255, 195, 113, 0.2)'
                    },
                    '.torrent-item__seeds span.high-seeds': {
                        'color': '#77cdb2',
                        'background': 'rgba(119, 205, 178, 0.10)',
                        'border': '1.4px solid rgba(119, 205, 178, 0.5)',
                        'text-shadow': '0 0 5px rgba(119, 205, 178, 0.4)',
                        'box-shadow': '0 0 8px rgba(119, 205, 178, 0.2)'
                    },
                    '.torrent-item__bitrate span.low-bitrate': {
                        'color': '#ffc371',
                        'background': 'rgba(255, 195, 113, 0.10)',
                        'border': '1.4px solid rgba(255, 195, 113, 0.5)',
                        'text-shadow': '0 0 5px rgba(255, 195, 113, 0.4)',
                        'box-shadow': '0 0 8px rgba(255, 195, 113, 0.2)'
                    },
                    '.torrent-item__bitrate span.medium-bitrate': {
                        'color': '#77cdb2',
                        'background': 'rgba(119, 205, 178, 0.10)',
                        'border': '1.4px solid rgba(119, 205, 178, 0.5)',
                        'text-shadow': '0 0 5px rgba(119, 205, 178, 0.4)',
                        'box-shadow': '0 0 8px rgba(119, 205, 178, 0.2)'
                    },
                    '.torrent-item__bitrate span.high-bitrate': {
                        'color': '#ff5f6d',
                        'background': 'rgba(255, 95, 109, 0.10)',
                        'border': '1.4px solid rgba(255, 95, 109, 0.5)',
                        'text-shadow': '0 0 5px rgba(255, 95, 109, 0.4)',
                        'box-shadow': '0 0 8px rgba(255, 95, 109, 0.2)'
                    },
                    '.torrent-item__grabs span.grabs': {
                        'color': '#4db6ff',
                        'background': 'rgba(77, 182, 255, 0.12)',
                        'border': '1.4px solid rgba(77, 182, 255, 0.5)',
                        'text-shadow': '0 0 5px rgba(77, 182, 255, 0.35)',
                        'box-shadow': '0 0 8px rgba(77, 182, 255, 0.18)'
                    },
                    '.torrent-item__grabs span.high-grabs': {
                        'color': '#4db6ff',
                        'background': 'rgba(77, 182, 255, 0.16)',
                        'border': '1.4px solid rgba(77, 182, 255, 0.7)',
                        'text-shadow': '0 0 5px rgba(77, 182, 255, 0.4)',
                        'box-shadow': '0 0 8px rgba(77, 182, 255, 0.22)'
                    },
                    '.torrent-item.low-seeds': {
                        'border': '2px solid rgba(255, 95, 109, 0.45)',
                        'border-radius': '6px',
                        'box-sizing': 'border-box'
                    },
                    '.torrent-item.medium-seeds': {
                        'border': '2px solid rgba(255, 195, 113, 0.45)',
                        'border-radius': '6px',
                        'box-sizing': 'border-box'
                    },
                    '.torrent-item.high-seeds': {
                        'border': '2px solid rgba(119, 205, 178, 0.45)',
                        'border-radius': '6px',
                        'box-sizing': 'border-box'
                    },
                    '.torrent-item__tracker.utopia': { 'color': '#9b59b6', 'font-weight': 'bold' },
                    '.torrent-item__tracker.toloka': { 'color': '#3498db', 'font-weight': 'bold' },
                    '.torrent-item__tracker.mazepa': { 'color': '#C9A0DC', 'font-weight': 'bold' }
                };
                let style = document.createElement('style');
                style.innerHTML = FLAG_STYLES + '\n' + Object.entries(STYLES).map(([selector, props]) => {
                    return `${selector} { ${Object.entries(props).map(([prop, val]) => `${prop}: ${val} !important`).join('; ')} }`;
                }).join('\n');
                document.head.appendChild(style);
                const UKRAINIAN_STUDIOS = [
                    'DniproFilm', 'Дніпрофільм', 'Цікава Ідея', 'Колодій Трейлерів',
                    'UaFlix', 'BaibaKo', 'В одне рило', 'Так Треба Продакшн',
                    'TreleMore', 'Гуртом', 'Exit Studio', 'FilmUA', 'Novator Film',
                    'LeDoyen', 'Postmodern', 'Pryanik', 'CinemaVoice', 'UkrainianVoice'
                ];
                function processVoiceFilters() {
                    const voiceFilterSelectors = [
                        '[data-type="voice"]', '[data-type="audio"]',
                        '.voice-options', '.audio-options',
                        '.voice-list', '.audio-list',
                        '.studio-list', '.translation-filter', '.dubbing-filter'
                    ];
                    voiceFilterSelectors.forEach(selector => {
                        try {
                            const filters = document.querySelectorAll(selector);
                            filters.forEach(filter => {
                                if (filter.classList.contains('ua-voice-processed')) return;
                                let html = filter.innerHTML;
                                let changed = false;
                                UKRAINIAN_STUDIOS.forEach(studio => {
                                    if (html.includes(studio) && !html.includes(UKRAINE_FLAG_SVG)) {
                                        html = html.replace(new RegExp(studio, 'g'), UKRAINE_FLAG_SVG + ' ' + studio);
                                        changed = true;
                                    }
                                });
                                if (html.includes('Українська') && !html.includes(UKRAINE_FLAG_SVG)) {
                                    html = html.replace(/Українська/g, UKRAINE_FLAG_SVG + ' Українська');
                                    changed = true;
                                }
                                if (html.includes('Украинская') && !html.includes(UKRAINE_FLAG_SVG)) {
                                    html = html.replace(/Украинская/g, UKRAINE_FLAG_SVG + ' Українська');
                                    changed = true;
                                }
                                if (html.includes('Ukr') && !html.includes(UKRAINE_FLAG_SVG)) {
                                    html = html.replace(/Ukr/gi, UKRAINE_FLAG_SVG + ' Українською');
                                    changed = true;
                                }
                                if (changed) {
                                    filter.innerHTML = html;
                                    filter.classList.add('ua-voice-processed');
                                    filter.querySelectorAll('svg.ua-flag-svg').forEach(svg => {
                                        //filter.querySelectorAll('svg').forEach(svg => {
                                        if (!svg.closest('.flag-container')) {
                                            svg.classList.add('flag-svg');
                                            const wrapper = document.createElement('span');
                                            wrapper.className = 'flag-container';
                                            svg.parentNode.insertBefore(wrapper, svg);
                                            wrapper.appendChild(svg);
                                        }
                                    });
                                }
                            });
                        } catch (error) {
                            console.warn('Помилка обробки фільтрів озвучення:', error);
                        }
                    });
                }
                function replaceTexts() {
                    const safeContainers = [
                        '.online-prestige-watched__body',
                        '.online-prestige--full .online-prestige__title',
                        '.online-prestige--full .online-prestige__info',
                        '.online-prestige__description',
                        '.video-description',
                        '.content__description',
                        '.movie-info',
                        '.series-info'
                    ];
                    const processSafeElements = () => {
                        const selectors = safeContainers.map(s => s + ':not(.ua-flag-processed)').join(', ');
                        try {
                            const elements = document.querySelectorAll(selectors);
                            elements.forEach(element => {
                                if (element.closest('.hidden, [style*="display: none"]')) return;
                                let html = element.innerHTML;
                                let changed = false;
                                REPLACEMENTS.forEach(item => {
                                    if (Array.isArray(item)) {
                                        if (html.includes(item[0]) && !html.includes(UKRAINE_FLAG_SVG)) {
                                            html = html.replace(new RegExp(item[0], 'g'), item[1]);
                                            changed = true;
                                        }
                                    } else if (item.pattern) {
                                        if ((!item.condition || item.condition(html)) && item.pattern.test(html) && !html.includes(UKRAINE_FLAG_SVG)) {
                                            html = html.replace(item.pattern, item.replacement);
                                            changed = true;
                                        }
                                    }
                                });
                                if (changed) {
                                    element.innerHTML = html;
                                    element.classList.add('ua-flag-processed');
                                    element.querySelectorAll('svg.ua-flag-svg').forEach(svg => {
                                        //element.querySelectorAll('svg').forEach(svg => {
                                        if (!svg.closest('.flag-container')) {
                                            svg.classList.add('flag-svg');
                                            const wrapper = document.createElement('span');
                                            wrapper.className = 'flag-container';
                                            svg.parentNode.insertBefore(wrapper, svg);
                                            wrapper.appendChild(svg);
                                            if (svg.nextSibling && svg.nextSibling.nodeType === 3) {
                                                wrapper.appendChild(svg.nextSibling);
                                            }
                                        }
                                    });
                                }
                            });
                        } catch (error) {
                            console.warn('Помилка обробки селекторів:', error);
                        }
                    };
                    const startTime = Date.now();
                    const TIME_LIMIT = 50;
                    processSafeElements();
                    if (Date.now() - startTime < TIME_LIMIT) {
                        processVoiceFilters();
                    }
                }
                function updateTorrentStyles() {
                    const visibleElements = {
                        seeds: document.querySelectorAll('.torrent-item__seeds span:not([style*="display: none"])'),
                        bitrate: document.querySelectorAll('.torrent-item__bitrate span:not([style*="display: none"])'),
                        grabs: document.querySelectorAll('.torrent-item__grabs span:not([style*="display: none"])'),
                        tracker: document.querySelectorAll('.torrent-item__tracker:not([style*="display: none"])')
                    };
                    if (visibleElements.seeds.length > 0) {
                        visibleElements.seeds.forEach(span => {
                            const seeds = parseInt(span.textContent) || 0;
                            const torrentItem = span.closest('.torrent-item');
                            span.classList.remove('low-seeds', 'medium-seeds', 'high-seeds');
                            if (torrentItem) {
                                torrentItem.classList.remove('low-seeds', 'medium-seeds', 'high-seeds');
                            }
                            if (seeds <= 5) {
                                span.classList.add('low-seeds');
                                if (torrentItem) torrentItem.classList.add('low-seeds');
                            } else if (seeds <= 19) {
                                span.classList.add('medium-seeds');
                                if (torrentItem) torrentItem.classList.add('medium-seeds');
                            } else {
                                span.classList.add('high-seeds');
                                if (torrentItem) torrentItem.classList.add('high-seeds');
                            }
                        });
                    }
                    if (visibleElements.bitrate.length > 0) {
                        visibleElements.bitrate.forEach(span => {
                            const bitrate = parseFloat(span.textContent) || 0;
                            span.classList.remove('low-bitrate', 'medium-bitrate', 'high-bitrate');
                            if (bitrate <= 10) {
                                span.classList.add('low-bitrate');
                            } else if (bitrate <= 60) {
                                span.classList.add('medium-bitrate');
                            } else {
                                span.classList.add('high-bitrate');
                            }
                        });
                    }
                    if (visibleElements.grabs.length > 0) {
                        visibleElements.grabs.forEach(span => {
                            const grabs = parseInt(span.textContent) || 0;
                            span.classList.add('grabs');
                            span.classList.remove('high-grabs');
                            if (grabs > 10) span.classList.add('high-grabs');
                        });
                    }
                    if (visibleElements.tracker.length > 0) {
                        visibleElements.tracker.forEach(tracker => {
                            const text = tracker.textContent.trim().toLowerCase();
                            tracker.classList.remove('utopia', 'toloka', 'mazepa');
                            if (text.includes('utopia')) tracker.classList.add('utopia');
                            else if (text.includes('toloka')) tracker.classList.add('toloka');
                            else if (text.includes('mazepa')) tracker.classList.add('mazepa');
                        });
                    }
                }
                function updateAll() {
                    try {
                        replaceTexts();
                        updateTorrentStyles();
                    } catch (error) {
                        console.warn('Помилка оновлення:', error);
                    }
                }
                let updateTimeout = null;
                const observer = new MutationObserver(mutations => {
                    const hasImportantChanges = mutations.some(mutation => {
                        return mutation.addedNodes.length > 0 &&
                            !mutation.target.closest('.hidden, [style*="display: none"]');
                    });
                    if (hasImportantChanges) {
                        clearTimeout(updateTimeout);
                        updateTimeout = setTimeout(updateAll, 250);
                    }
                });
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: false,
                    characterData: false
                });
                setTimeout(updateAll, 1000);
            })();
        } catch (e) {
            try {
                console.error('torrents+mod error', e);
            } catch (_e) { }
        }
    })();
    (function () {
        function getBool(key, def) {
            var v = Lampa.Storage.get(key);
            if (v === true || v === false) return v;
            if (v === 'true') return true;
            if (v === 'false') return false;
            if (v == null) return def;
            return !!v;
        }
        function apply() {
            var s = document.getElementById('torr_mod_overrides');
            if (!s) {
                s = document.createElement('style');
                s.id = 'torr_mod_overrides';
                document.head.appendChild(s);
            }
            var ef = getBool('interface_mod_new_tor_frame', true),
                eb = getBool('interface_mod_new_tor_bitrate', true),
                es = getBool('interface_mod_new_tor_seeds', true);
            var css = '';
            if (!eb) {
                css += '.torrent-item__bitrate span.low-bitrate, .torrent-item__bitrate span.medium-bitrate, .torrent-item__bitrate span.high-bitrate { color: inherit !important; background: none !important; border: none !important; font-weight: inherit !important; }\n';
            }
            if (!es) {
                css += '.torrent-item__seeds span.low-seeds, .torrent-item__seeds span.medium-seeds, .torrent-item__seeds span.high-seeds { color: inherit !important; background: none !important; border: none !important; font-weight: inherit !important; }\n';
            }
            if (!ef) {
                css += '.torrent-item.low-seeds, .torrent-item.medium-seeds, .torrent-item.high-seeds { border: none !important; box-shadow: none !important; }\n';
            }
            s.textContent = css;
        }
        window.runTorrentStyleRefresh = apply;
        setTimeout(apply, 0);
    })();

    (function () {
        Lampa.Lang.add({
            ifx_year_on_cards: { uk: 'Показувати рік на картці', en: 'Show year on card' },
            ifx_year_on_cards_desc: { uk: 'Увімкнути/Вимкнути відображення року на постері', en: 'Year displayed on the poster only' },
            ifx_hide_year_title: { uk: 'Приховати рік з назви', en: 'Hide year from title' },
            ifx_hide_year_title_desc: { uk: 'Вирізає рік з кінця назв фільмів/серіалів', en: 'Strips the year from the end of titles in lists' },
            ifx_show_rating_on_cards: { uk: 'Показувати рейтинг на картці', en: 'Show rating on card' },
            ifx_show_rating_on_cards_desc: {
                uk: 'Увімкнути/Вимкнути стандартний рейтинг на постері',
                en: 'Toggle the built-in rating badge on list posters'
            },
            ifx_alt_badges: { uk: 'Альтернативні мітки', en: 'Alternative badges' },
            ifx_alt_badges_desc: { uk: 'Мітки "рік" і "рейтинг" у іншому стилі', en: 'Year & Rating  alternative style' },
            ifx_type_badges: { uk: 'Показувати мітки "Фільм / Серіал" знизу', en: '"Show Movie / Series" badges (bottom)' },
            ifx_type_badges_desc: { uk: 'Замінює стандартну мітку TV на нові кольорові мітки внизу постера.', en: 'Replaces the default TV badge with new colored badges at the bottom.' },
            ifx_alt_type_badges: { uk: 'Додати додаткову мітку "Фільм" зверху', en: 'Add "Movie" badge (top)' },
            ifx_alt_type_badges_desc: { uk: 'Додає синю мітку "Movie" на постер, яка доповнює стандартну червону мітку "TV".', en: 'Adds a blue "Movie" badge matching the default red "TV" badge.' },
            ifx_episode_alt_cards: { uk: 'Альтернативні "Найближчі епізоди"', en: 'Alternative "Upcoming Episodes"' },
            ifx_episode_alt_cards_desc: { uk: 'Компактний вигляд блоку "Найближчі епізоди"', en: 'Compact view for the "Upcoming Episodes" block' },
            ifx_episode_num_only: { uk: 'Показувати лише номер серії', en: 'Show episode number only' },
            ifx_episode_num_only_desc: { uk: 'Завжди показувати номер серії у вигляді "Серія N" замість назви', en: 'Always show "Episode N" instead of the title' }
        });
        var KEY_YEAR = 'interface_mod_new_year_on_cards';
        var KEY_ALT = 'interface_mod_new_episode_alt_cards';
        var KEY_HIDE_YEAR_TITLE = 'interface_mod_new_hide_year_title';
        var KEY_NUM = 'interface_mod_new_episode_numbers_only';
        var KEY_RATING = 'interface_mod_new_rating_on_cards';
        var KEY_TYPE_BADGES = 'interface_mod_new_type_badges';
        var KEY_ALT_TYPE_BADGES = 'interface_mod_new_alt_type_badges';
        var S = {
            year_on: (Lampa.Storage.get(KEY_YEAR, false) === true || Lampa.Storage.get(KEY_YEAR, 'false') === 'true'),
            hide_year_title: (Lampa.Storage.get(KEY_HIDE_YEAR_TITLE, false) === true || Lampa.Storage.get(KEY_HIDE_YEAR_TITLE, 'false') === 'true'),
            alt_ep: (Lampa.Storage.get(KEY_ALT, false) === true || Lampa.Storage.get(KEY_ALT, 'false') === 'true'),
            num_only: (Lampa.Storage.get(KEY_NUM, false) === true || Lampa.Storage.get(KEY_NUM, 'false') === 'true'),
            show_rate: (Lampa.Storage.get(KEY_RATING, true) === true || Lampa.Storage.get(KEY_RATING, 'true') === 'true'),
            type_badges: (Lampa.Storage.get(KEY_TYPE_BADGES, false) === true || Lampa.Storage.get(KEY_TYPE_BADGES, 'false') === 'true'),
            alt_type_badges: (Lampa.Storage.get(KEY_ALT_TYPE_BADGES, false) === true || Lampa.Storage.get(KEY_ALT_TYPE_BADGES, 'false') === 'true')
        };
        function ensureCss() {
            var id = 'ifx_css_stable_final_v2';
            if (document.getElementById(id)) return;
            var st = document.createElement('style');
            st.id = id;
            st.textContent = `
      .ifx-pill{
        background: rgba(0,0,0,.5);
        color:#fff; font-size:1.3em; font-weight:700;
        padding:.2em .5em; border-radius:1em; line-height:1;
        white-space:nowrap;
      }
      .ifx-corner-stack{
        position:absolute; right:.3em; bottom:.3em;
        display:flex; flex-direction:column; align-items:flex-end;
        gap:2px; z-index:10; pointer-events:none;
      }
      .ifx-corner-stack > *{ pointer-events:auto; }
      .ifx-corner-stack .card__vote, .ifx-corner-stack .card_vote{
        position:static !important; right:auto !important; bottom:auto !important; top:auto !important; left:auto !important;
        background: rgba(0,0,0,.5); color:#fff; font-size:1.3em; font-weight:700;
        padding:.2em .5em; border-radius:1em; line-height:1;
      }
      .card .card__view{ position:relative; }
      .card-episode .full-episode{ position:relative; }
      body.ifx-ep-alt .card-episode .full-episode .card__title{
        position:absolute; left:.7em; top:.7em; right:.7em; margin:0;
        z-index:2; text-shadow:0 1px 2px rgba(0,0,0,.35);
      }
      body.ifx-ep-alt .card-episode .full-episode__num{ display:none !important; }
      body.ifx-ep-alt .card-episode .full-episode__body > .card__age{ display:none !important; }
      body.ifx-num-only .card-episode .full-episode__num{ display:none !important; }
      .ifx-hide-age .card__age{ display:none !important; }
      body.ifx-no-rate .card__view > .card__vote,
      body.ifx-no-rate .card__view > .card_vote,
      body.ifx-no-rate .ifx-corner-stack > .card__vote,
      body.ifx-no-rate .ifx-corner-stack > .card_vote {
        display: none !important;
      }
      .torrent-item__bitrate span,
      .torrent-item__seeds span,
      .torrent-item__grabs span {
        border-radius: 0.3em !important;
        padding: 0.3em 0.5em !important;
        font-weight: bold !important;
        display: inline-block !important;
        line-height: 1.2 !important;
        transition: all 0.2s ease !important;
      }
      .torrent-item.focus {
        outline: none !important;
        border: 3px solid #ffffff !important;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.4) !important;
        transform: scale(1.01) !important;
        z-index: 10 !important;
        background: rgba(255, 255, 255, 0.1) !important;
      }
    `;
            document.head.appendChild(st);
        }
        function ensureTypeBadgesCss() {
            var el = document.getElementById('ifx_type_badges_css');
            if (el) el.remove();
            var st = document.createElement('style');
            st.id = 'ifx_type_badges_css';
            st.textContent = `
    body.ifx-type-badges .card:not(.card--obsidian) .card__type { display: none !important; }
    .ifx-bottom-left-stack {
      position: absolute; left: .3em; bottom: .3em;
      display: flex; flex-direction: column; align-items: flex-start;
      gap: 2px; z-index: 10; pointer-events: none;
    }
    .ifx-bottom-left-stack > * { pointer-events: auto; }
    .ifx-pill-movie { color: #81c784 !important; } 
    .ifx-pill-series { color: #64b5f6 !important; } 
    body.ifx-alt-type-badges .card__type.ifx-movie-type {
        background: #4285F4 !important; 
        color: #fff !important;
    }
    body:not(.ifx-alt-type-badges) .card__type.ifx-movie-type { display: none !important; }
  `;
            document.head.appendChild(st);
        }
        function ifxSyncAltBadgeThemeFromQuality() {
            try {
                var q = document.querySelector('.card--season-complete, .card--season-progress')
                    || document.querySelector('.card__quality');
                var inner = q ? (q.querySelector('div') || q) : null;
                var bg = 'rgba(61,161,141,0.9)';
                var fg = '#FFFFFF';
                if (q) {
                    var csQ = getComputedStyle(q);
                    if (csQ.backgroundColor) bg = csQ.backgroundColor;
                }
                if (inner) {
                    var csI = getComputedStyle(inner);
                    if (csI.color) fg = csI.color;
                }
                var root = document.documentElement;
                root.style.setProperty('--ifx-badge-bg', bg);
                root.style.setProperty('--ifx-badge-color', fg);
            } catch (e) { }
        }
        function ensureAltBadgesCss() {
            var st = document.getElementById('ifx_alt_badges_css');
            var RIGHT_OFFSET = '.3em';
            var BOTTOM_OFFSET = '.50em';
            var RADIUS = '0.3em';
            var FONT_FAMILY = "'Roboto Condensed','Arial Narrow',Arial,sans-serif";
            var FONT_WEIGHT = '600';
            var FONT_SIZE = '0.9em';
            var PAD_Y = '.39em';
            var PAD_X = '.39em';
            var UPPERCASE = true;
            var css = `
    body.ifx-alt-badges .card .card__view{ position:relative; }
    body.ifx-alt-badges .ifx-corner-stack{
      position:absolute; right:${RIGHT_OFFSET}; bottom:${BOTTOM_OFFSET};
      margin-right:0;
      display:flex; flex-direction:column; align-items:flex-end;
      gap:0.04em; z-index:10; pointer-events:none;
    }
    body.ifx-alt-badges .ifx-corner-stack > *{ pointer-events:auto; }
    body.ifx-alt-badges .ifx-corner-stack .card__vote,
    body.ifx-alt-badges .ifx-corner-stack .card_vote,
    body.ifx-alt-badges .ifx-corner-stack .ifx-year-pill{
      position:static !important;
      background: var(--ifx-badge-bg, rgba(61,161,141,0.9)) !important;
      color: var(--ifx-badge-color, #FFFFFF) !important;
      border-radius: ${RADIUS};
      padding: ${PAD_Y} ${PAD_X} !important;         
      font-family: ${FONT_FAMILY};
      font-weight: ${FONT_WEIGHT};
      font-size: ${FONT_SIZE} !important;            
      line-height: 1.2;
      ${UPPERCASE ? 'text-transform: uppercase;' : ''}
      text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.3);
      box-sizing: border-box;
      display: inline-flex; align-items: center;
      white-space: nowrap;
    }
    body.ifx-alt-badges .card__view > .card__vote,
    body.ifx-alt-badges .card__view > .card_vote{
      position:absolute !important;
      right:${RIGHT_OFFSET} !important;
      bottom:${BOTTOM_OFFSET} !important;
      margin-right:0 !important;
      background: var(--ifx-badge-bg, rgba(61,161,141,0.9)) !important;
      color: var(--ifx-badge-color, #FFFFFF) !important;
      border-radius: ${RADIUS};
      padding: ${PAD_Y} ${PAD_X} !important;         
      font-family: ${FONT_FAMILY} !important;
      font-weight: ${FONT_WEIGHT} !important;
      font-size: ${FONT_SIZE} !important;            
      line-height: 1.2;
      ${UPPERCASE ? 'text-transform: uppercase;' : ''}
      text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.3);
      z-index: 11;
      box-sizing: border-box;
      display: inline-flex; align-items: center;
      white-space: nowrap;
    }
  `;
            if (st) { st.textContent = css; }
            else { st = document.createElement('style'); st.id = 'ifx_alt_badges_css'; st.textContent = css; document.head.appendChild(st); }
        }
        var tplEpisodeOriginal = null;
        var tplEpisodeAlt =
            '<div class="card-episode selector layer--visible layer--render">\
      <div class="card-episode__body">\
        <div class="full-episode">\
          <div class="full-episode__img"><img/></div>\
          <div class="full-episode__body">\
            <div class="card__title">{title}</div>\
            <div class="card__age">{release_year}</div>\
            <div class="full-episode__num">{num}</div>\
            <div class="full-episode__name">{name}</div>\
            <div class="full-episode__date">{date}</div>\
          </div>\
        </div>\
      </div>\
      <div class="card-episode__footer hide">\
        <div class="card__imgbox">\
          <div class="card__view"><img class="card__img"/></div>\
        </div>\
        <div class="card__left">\
          <div class="card__title">{title}</div>\
          <div class="card__age">{release_year}</div>\
        </div>\
      </div>\
    </div>';
        function setEpisodeAlt(on) {
            if (tplEpisodeOriginal === null) {
                try { tplEpisodeOriginal = Lampa.Template.get('card_episode', {}, true); } catch (e) { tplEpisodeOriginal = null; }
            }
            Lampa.Template.add('card_episode', on ? tplEpisodeAlt : (tplEpisodeOriginal || tplEpisodeAlt));
            document.body.classList.toggle('ifx-ep-alt', !!on);
            document.body.classList.toggle('ifx-num-only', S.num_only);
            try { Lampa.Settings.update(); } catch (e) { }
        }
        function episodeWord() {
            var code = (Lampa.Lang && Lampa.Lang.code) || 'uk';
            return code.indexOf('en') === 0 ? 'Episode' : 'Серія';
        }
        var __ifx_yearCache = window.__ifx_yearCache || new WeakMap();
        window.__ifx_yearCache = __ifx_yearCache;
        function __ifx_getYear_orig($root) {
            var d = $root.data() || {};
            var y = (d.first_air_date || '').slice(0, 4)
                || (d.release_date || '').slice(0, 4)
                || d.release_year
                || d.year;
            if (/^(19|20)\d{2}$/.test(String(y))) return String(y);
            var ageTxt = ($root.find('.card__age').first().text() || '').trim();
            var mAge = ageTxt.match(/(19|20)\d{2}/);
            if (mAge) return mAge[0];
            var title = ($root.find('.card__title').first().text() || '').trim();
            var mTitle =
                title.match(/[\[\(]\s*((?:19|20)\d{2})\s*[\]\)]\s*$/) ||
                title.match(/(?:[–—·\/-]\s*)((?:19|20)\d{2})\s*$/);
            if (mTitle) return mTitle[1];
            return '';
        }
        function getYear($root) {
            try {
                var el = $root && $root[0];
                if (el && __ifx_yearCache.has(el)) return __ifx_yearCache.get(el);
                var y = __ifx_getYear_orig($root) || '';
                if (el) __ifx_yearCache.set(el, y);
                return y;
            } catch (e) {
                return __ifx_getYear_orig($root);
            }
        }
        function ensureStack($anchor) {
            var $stack = $anchor.children('.ifx-corner-stack');
            if (!$stack.length) $stack = $('<div class="ifx-corner-stack"></div>').appendTo($anchor);
            return $stack;
        }
        function stripYear(txt) {
            var s = String(txt || '');
            s = s.replace(/\s*\((19|20)\d{2}\)\s*$/, '');
            s = s.replace(/\s*\[(19|20)\d{2}\]\s*$/, '');
            s = s.replace(/\s*[–—\-·]\s*(19|20)\d{2}\s*$/, '');
            s = s.replace(/\s*\/\s*(19|20)\d{2}\s*$/, '');
            return s;
        }
        function applyTitleYearHide($scope) {
            $scope = $scope || $(document.body);
            var hideOnly = getBool('interface_mod_new_hide_year_title', false);
            var doHide = S.year_on || hideOnly;
            $scope.find('.ifx-hide-age .card__title').each(function () {
                var $t = $(this);
                if ($t.find('.card__age').length) {
                    var saved = $t.data('ifx-title-orig');
                    if (typeof saved === 'string') { $t.text(saved); $t.removeData('ifx-title-orig'); }
                    return;
                }
                if (doHide) {
                    var orig = $t.data('ifx-title-orig');
                    if (!orig) $t.data('ifx-title-orig', $t.text());
                    var base = orig || $t.text();
                    var stripped = stripYear(base);
                    if (stripped !== $t.text()) $t.text(stripped.trim());
                } else {
                    var sv = $t.data('ifx-title-orig');
                    if (typeof sv === 'string') { $t.text(sv); $t.removeData('ifx-title-orig'); }
                }
            });
        }
        function applyListCard($card) {
            var $view = $card.find('.card__view').first();
            if (!$view.length) return;
            var $vote = $view.find('.card__vote, .card_vote').first();
            var $stack = ensureStack($view);
            var hardHide = !S.show_rate || document.body.classList.contains('ifx-no-rate');
            if ($vote.length) {
                if (hardHide) {
                    $vote.addClass('ifx-vote-hidden').hide();
                } else {
                    $vote.removeClass('ifx-vote-hidden').show();
                    var useStack = S.year_on || document.body.classList.contains('ifx-alt-badges');
                    if (useStack && !$vote.parent().is($stack)) $stack.prepend($vote);
                }
            }
            if (S.year_on || S.hide_year_title) {
                $card.addClass('ifx-hide-age');
            } else {
                $card.removeClass('ifx-hide-age');
            }
            if (S.year_on) {
                if (!$stack.children('.ifx-year-pill').length) {
                    var y = getYear($card);
                    if (y) $('<div class="ifx-pill ifx-year-pill"></div>').text(y).appendTo($stack);
                }
            } else {
                $stack.children('.ifx-year-pill').remove();
            }
            var isPerson = $card.hasClass('card--person') || $card.closest('.scroll--persons, .items--persons, .crew').length > 0;
            if (!isPerson) {
                var isTv = $card.hasClass('card--tv') || $card.find('.card__type').text().trim() === 'TV';
                var cardText = $card.text().toLowerCase();
                var hasMovieTraits = $card.find('.card__age').length > 0 ||
                    $card.find('.card__vote').length > 0 ||
                    /\b(19|20)\d{2}\b/.test(cardText);
                if (isTv || hasMovieTraits) {
                    var typeText = isTv ? 'Серіал' : 'Фільм';
                    if (S.type_badges) {
                        var $leftStack = $view.children('.ifx-bottom-left-stack');
                        if (!$leftStack.length) {
                            $leftStack = $('<div class="ifx-bottom-left-stack"></div>').appendTo($view);
                        }
                        var $typePill = $leftStack.children('.ifx-type-pill');
                        if (!$typePill.length) {
                            $typePill = $('<div class="ifx-pill ifx-type-pill"></div>').appendTo($leftStack);
                        }
                        $typePill.text(typeText);
                        $typePill.removeClass('ifx-pill-movie ifx-pill-series');
                        $typePill.addClass(isTv ? 'ifx-pill-series' : 'ifx-pill-movie');
                    } else {
                        $view.children('.ifx-bottom-left-stack').remove();
                    }
                    if (S.alt_type_badges) {
                        if (!isTv) {
                            var $movieType = $view.children('.ifx-movie-type');
                            if (!$movieType.length) {
                                $('<div class="card__type ifx-movie-type">Movie</div>').appendTo($view);
                            }
                        } else {
                            $view.children('.ifx-movie-type').remove();
                        }
                    } else {
                        $view.children('.ifx-movie-type').remove();
                    }
                } else {
                    $view.children('.ifx-bottom-left-stack').remove();
                    $view.children('.ifx-movie-type').remove();
                }
            } else {
                $view.children('.ifx-bottom-left-stack').remove();
                $view.children('.ifx-movie-type').remove();
            }
        }
        function applyEpisodeCard($ep) {
            var $full = $ep.find('.full-episode').first();
            if (!$full.length) return;
            var $stack = ensureStack($full);
            if (!$stack.children('.ifx-year-pill').length) {
                var y = getYear($ep);
                if (y) $('<div class="ifx-pill ifx-year-pill"></div>').text(y).appendTo($stack);
            }
            if (S.year_on) $full.addClass('ifx-hide-age'); else $full.removeClass('ifx-hide-age');
        }
        function injectAll($scope) {
            $scope = $scope || $(document.body);
            $scope.find('.card').each(function () {
                var $c = $(this);
                if ($c.closest('.full-start, .full-start-new, .full, .details').length) return;
                // Obsidian plugin compatibility: cards it renders (class "card--obsidian")
                // have no .card__vote/.card__age/.card__title and draw their own
                // rating/quality/year/genre block in .card__metadata. Skip our own
                // badge injection there so we don't stack duplicate or misaligned
                // pills on top of Obsidian's metadata panel.
                if ($c.hasClass('card--obsidian')) return;
                applyListCard($c);
            });
            $scope.find('.card-episode').each(function () {
                var $ep = $(this);
                var $full = $ep.find('.full-episode').first();
                if (S.year_on) {
                    applyEpisodeCard($ep);
                } else {
                    $full.removeClass('ifx-hide-age');
                    $full.find('.ifx-year-pill').remove();
                }
            });
            applyNumberOnly($scope);
            applyTitleYearHide($scope);
        }
        function applyNumberOnly($scope) {
            $scope = $scope || $(document.body);
            var force = S.num_only;
            $scope.find('.card-episode .full-episode').each(function () {
                var $root = $(this);
                var $name = $root.find('.full-episode__name').first();
                if (!$name.length) return;
                if (!force) {
                    var orig = $name.data('ifx-orig');
                    if (typeof orig === 'string') { $name.text(orig); $name.removeData('ifx-orig'); }
                    return;
                }
                var $num = $root.find('.full-episode__num').first();
                var n = ($num.text() || '').trim();
                if (!n) {
                    var m = ($name.text() || '').match(/\d+/);
                    if (m) n = m[0];
                }
                if (!n) return;
                if (!$name.data('ifx-orig')) $name.data('ifx-orig', $name.text());
                $name.text(episodeWord() + ' ' + String(parseInt(n, 10)));
            });
        }
        var mo = null;
        var moDebounce = null;
        function enableObserver() {
            if (mo) return;
            mo = new MutationObserver(function (muts) {
                for (var i = 0; i < muts.length; i++) {
                    if (muts[i].addedNodes && muts[i].addedNodes.length) {
                        if (moDebounce) clearTimeout(moDebounce);
                        moDebounce = setTimeout(function () { injectAll($(document.body)); }, 200);
                        break;
                    }
                }
            });
            try { mo.observe(document.body, { subtree: true, childList: true }); } catch (e) { }
        }
        function disableObserver() { if (mo) { try { mo.disconnect(); } catch (e) { } mo = null; } }
        if (!window.__ifx_storage_stable_final_v2) {
            window.__ifx_storage_stable_final_v2 = true;
            var _prev = Lampa.Storage.set;
            Lampa.Storage.set = function (k, v) {
                var r = _prev.apply(this, arguments);
                if (typeof k === 'string' && k.indexOf('interface_mod_new_') === 0) {
                    if (k === KEY_YEAR) {
                        S.year_on = (v === true || v === 'true' || Lampa.Storage.get(KEY_YEAR, 'false') === 'true');
                        ensureCss();
                        injectAll($(document.body));
                    }
                    if (k === KEY_ALT) {
                        S.alt_ep = (v === true || v === 'true' || Lampa.Storage.get(KEY_ALT, 'false') === 'true');
                        setEpisodeAlt(S.alt_ep);
                        setTimeout(function () { injectAll($(document.body)); }, 50);
                    }
                    if (k === KEY_NUM) {
                        S.num_only = (v === true || v === 'true' || Lampa.Storage.get(KEY_NUM, 'false') === 'true');
                        document.body.classList.toggle('ifx-num-only', S.num_only);
                        applyNumberOnly($(document.body));
                    }
                    if (k === KEY_TYPE_BADGES) {
                        S.type_badges = (v === true || v === 'true');
                        if (S.type_badges) {
                            S.alt_type_badges = false;
                            Lampa.Storage.set(KEY_ALT_TYPE_BADGES, false);
                        }
                        document.body.classList.toggle('ifx-type-badges', S.type_badges);
                        document.body.classList.toggle('ifx-alt-type-badges', S.alt_type_badges);
                        ensureTypeBadgesCss();
                        setTimeout(function () { injectAll($(document.body)); }, 50);
                    }
                    if (k === KEY_ALT_TYPE_BADGES) {
                        S.alt_type_badges = (v === true || v === 'true');
                        if (S.alt_type_badges) {
                            S.type_badges = false;
                            Lampa.Storage.set(KEY_TYPE_BADGES, false);
                        }
                        document.body.classList.toggle('ifx-type-badges', S.type_badges);
                        document.body.classList.toggle('ifx-alt-type-badges', S.alt_type_badges);
                        ensureTypeBadgesCss();
                        setTimeout(function () { injectAll($(document.body)); }, 50);
                    }
                    if (k === 'interface_mod_new_alt_badges') {
                        var on = (v === true || v === 'true' || Lampa.Storage.get('interface_mod_new_alt_badges', 'false') === 'true');
                        ensureAltBadgesCss();
                        document.body.classList.toggle('ifx-alt-badges', on);
                        if (on) ifxSyncAltBadgeThemeFromQuality();
                    }
                    if (k === KEY_RATING) {
                        S.show_rate = (v === true || v === 'true' || Lampa.Storage.get(KEY_RATING, 'true') === 'true');
                        document.body.classList.toggle('ifx-no-rate', !S.show_rate);
                        injectAll($(document.body));
                    }
                    if (k === KEY_HIDE_YEAR_TITLE) {
                        S.hide_year_title = (v === true || v === 'true' || Lampa.Storage.get(KEY_HIDE_YEAR_TITLE, 'false') === 'true');
                        injectAll($(document.body));
                    }
                }
                return r;
            };
        }
        function boot() {
            ensureCss();
            setEpisodeAlt(S.alt_ep);
            ensureTypeBadgesCss();
            document.body.classList.toggle('ifx-type-badges', S.type_badges);
            document.body.classList.toggle('ifx-alt-type-badges', S.alt_type_badges);
            enableObserver();
            injectAll($(document.body));
            ensureAltBadgesCss();
            var altOn = (Lampa.Storage.get('interface_mod_new_alt_badges', false) === true
                || Lampa.Storage.get('interface_mod_new_alt_badges', 'false') === 'true');
            document.body.classList.toggle('ifx-alt-badges', altOn);
            if (altOn) ifxSyncAltBadgeThemeFromQuality();
            document.body.classList.toggle('ifx-no-rate', !S.show_rate);
        }
        if (window.appready) boot();
        else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') boot(); });
    })();
})();
