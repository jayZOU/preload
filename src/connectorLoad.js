var connectorLoad = function(opts) {

	"use strict";

	//可修改参数
	this.opts = {
    	isDebug: false,
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
        	if(!opts.connector[i].url) self.throwIf(i + "队列URL不存在");

            if (opts.connector[i].jsonp || false) {
                self.asynGetData(opts.connector[i]);
            } else {
                self.syncGetData(opts.connector[i]);
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
    syncGetData: function(connect) {
		var self = this,
			params = this.params,
			url = connect.url || "",
			loadingOverTime = connect.loadingOverTime || 12,
			success = connect.success || function(){},
			error = connect.error || function(){};


        params._createXHR.onreadystatechange = function() {
            if (params._createXHR.readyState == 4) {
                if ((params._createXHR.status >= 200 && params._createXHR.status < 300) || params._createXHR.status === 304) {
                    success(params._createXHR.responseText)
                }else{
                	self.throwIf("对" + url + "请求失败，状态码为：" + params._createXHR.status);
                	error(params._createXHR);
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
    asynGetData: function(connect) {
		var self = this,
			params = this.params,
			url = connect.url || "",
			loadingOverTime = connect.loadingOverTime || 12,
			loadingOverTimeCB = connect.loadingOverTimeCB || function(){};

		var timeOut = self.getTimeOut(loadingOverTime, loadingOverTimeCB);

        var script = document.createElement("script");
        script.src = url;
        params.head.appendChild(script);
        
        script.onload = function(){
        	// alert(1);
        	clearTimeout(timeOut);
        	params.head.removeChild(script);
        }

    },

    /*
	*	根据平台获取XHR
	*	
	*/
	getXHR: function(){
		if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
		
		throwIf("unSupport: IE9以下")
	},

	getTimeOut: function(time, callback) {
		return setTimeout(function(){
			callback();
		}, time * 1000);
	},

	//错误数据弹出
	throwIf: function(msg) {
		var opts = this.opts,
			msg = msg || "未知错误";
		if(opts.isDebug){
			alert(msg);
			return;
		}
	}
}

if (typeof module == 'object') {
    module.exports = connectorLoad;
} else {
    window.connectorLoad = connectorLoad;
}