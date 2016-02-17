var connectorLoad = function(opts) {

	"use strict";

	//可修改参数
	this.opts = {
    	isDebug: false,
		sources: null,											//预加载资源总队列
        connector:  null, 										//接口数据		
		completeLoad: function(){},								//加载完成回调

	}

	//业务逻辑所需参数
	this.params = {
		_createXHR: null,										//Ajax初始化

        head: document.getElementsByTagName("head")[0],			//异步调用接口数据
	}

	for (var i in opts) {
		this.opts[i] = opts[i];
	}

	// console.log(opts);

	this._init();
}

connectorLoad.prototype = {
	_init: function(){
		var self = this,
			opts = self.opts,
			params = self.params;

		if (opts.connector == null) return;

		//Ajax初始化
		params._createXHR = self.getXHR();


		//初始化资源参数
		// self._initData();

		//调用接口数据
        self._getData();

		//开始预加载资源
		// self._load(params.echelon[0], params.echeloncb[0], params.echelonlen);			
	},

	/*
	*	获取后台数据，区分同/异布
	*
	*/
    _getData: function() {

		var self = this,
			opts = self.opts,
			params = self.params;

        for (var i in opts.connector) {
            if (opts.connector[i].jsonp) {
                self.asynGetData(opts.connector[i].url);
            } else {
                self.syncGetData(opts.connector[i].url, opts.connector[i].callback)
            }
        }
    },

    /*
	*	同步获取后台数据
	*	
	*	@param	url			接口路径 
	*	@param	callback	成功后回调 
	*
	*/
    syncGetData: function(url, callback) {
		var self = this,
			opts = self.opts,
			params = self.params;
        // config.xhr = _createXHR;
        params._createXHR.onreadystatechange = function() {
            if (params._createXHR.readyState == 4) {
                if ((params._createXHR.status >= 200 && params._createXHR.status < 300) || params._createXHR.status === 304) {
                    callback(params._createXHR.responseText)
                }
            }
        }

        params._createXHR.open("GET", url, true);

        params._createXHR.send(null);
    },

	/*
	*	跨域获取后台数据
	*	
	*	@param	url	接口路径 
	*
	*/
    asynGetData: function(url) {
		var self = this,
			opts = self.opts,
			params = self.params;
        var script = document.createElement("script");
        script.src = url;
        params.head.appendChild(script);
    },

    /*
	*	根据平台获取XHR
	*	
	*/
	getXHR: function(){
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else if (typeof ActiveXObject != "undefined") {
			if (typeof arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
						"MSXML2.XMLHttp"
					],
					i, len;
				for (i = 0, len = versions.length; i < len; i++) {
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch (ex) {
						//跳过
					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		} else {
			throw new Error("No XHR object available.");
		}
	},
}

if (typeof module == 'object') {
    module.exports = connectorLoad;
} else {
    window.connectorLoad = connectorLoad;
}