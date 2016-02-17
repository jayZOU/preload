var cssLoad = function(opts) {

	"use strict";

	//可修改参数
	this.opts = {
    	isDebug: false,
		sources: null,											//预加载资源总队列
	}

	for (var i in opts) {
        this.opts[i] = opts[i];
    }

    // console.log(opts);

    this._init();
}

cssLoad.prototype = {
	_init: function() {
        var self = this,
            opts = self.opts,
            params = self.params;

        //初始化资源参数
        // self._initData();

        //开始预加载资源
        self.loadCss();

    },

    _initData: function() {

        var self = this,
            opts = self.opts,
            params = self.params;

        params.linkNote.rel = "stylesheet";
        // params.linkNote.media = ;

        for(var i in opts.sources){
        	//记录link标签位置
        	var tag = opts.sources[i].tag;
        	if(tag == "head" || tag == "body"){
        		params.linkLocal.push(tag);
        	}else{
        		params.linkLocal.push("head");
        	}

        	//记录link加载完成回调
        	var CB = opts.sources[i].callback || function(){};
        	params.linkCB.push(CB);

        	//记录link media
        	var media = opts.sources[i].media || "all";
        	params.linkMedia.push(media);

        }


        // console.log(opts);
        // console.log(params);
        console.log(params.linkLocal);
        console.log(params.callback);
        console.log(params.media);
    },

    loadCss: function() {
        var self = this,
            opts = self.opts,
            params = self.params;


        for(var i in opts.sources) {
        	var linkNote = document.createElement( "link" );
        	linkNote.rel = "stylesheet";

        	var tag = opts.sources[i].tag;
        	if(tag == "body"){
        		tag = document.body;
        	}else{
        		tag = document.head;
        	}

        	linkNote.href = opts.sources[i].href;
        	linkNote.media = opts.sources[i].media || "all";
        	
        	tag.appendChild(linkNote);

        	//回调执行
        	if(opts.sources[i].callback){
        		if( linkNote.addEventListener ){
					linkNote.addEventListener( "load", opts.sources[i].callback );
				}
				if( linkNote.attachEvent ){
					linkNote.attachEvent( "onload", opts.sources[i].callback );
				}
				// Android < 4.4
			 	if( "isApplicationInstalled" in navigator) {
					var resolvedHref = linkNote.href;
					var i = sheets.length;
					while( i-- ){
						if( sheets[ i ].href === resolvedHref ){
							return opts.sources[i].callback();
						}
					}
				}
        	}
        }
    }
}


if (typeof module == 'object') {
    module.exports = cssLoad;
} else {
    window.cssLoad = cssLoad;
}