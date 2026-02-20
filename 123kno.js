(function () {
'use strict';

var orig=[],cache=[],curr=[];

function reset(){orig=[];cache=[];curr=[]}

function reorder(c){
    var wrap=c.find('.full-start-new__buttons');
    if(!wrap.length)return;

    var btns=wrap.children().not('.buttons-folder');
    if(!btns.length)return;

    orig=btns.toArray();
    cache=[].concat(orig);
    curr=[].concat(orig);

    wrap.empty();
    curr.forEach(function(b){wrap.append(b)});
}

Lampa.Listener.follow('activity',function(e){
    if(e.type==='destroy')reset();
});

Lampa.Listener.follow('full',function(e){
    if(e.type!=='complite'||!e.object||!e.object.activity)return;

    var c=e.object.activity.render();
    if(!c||!c.length)return;

    var wrap=c.find('.full-start-new__buttons');
    if(!wrap.length)return;

    wrap.addClass('buttons-loading');
    reset();

    try{reorder(c)}
    catch(err){console.error('buttons plugin:',err)}
    finally{wrap.removeClass('buttons-loading')}
});

})();