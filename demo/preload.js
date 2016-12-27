/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// var connectorLoad = require("./connectorLoad.js"),
	// 	imageLoad = require("./connectorLoad.js"),
	// 	Preload.connectorLoad = connectorLoad,
	// 	Preload.imageLoad = imageLoad;
	var connectorLoad = __webpack_require__(1),
		imageLoad = __webpack_require__(2),
		cssLoad = __webpack_require__(3),
		fontLoad = __webpack_require__(4),
		Preload = {};

	Preload.connectorLoad = connectorLoad;
	Preload.imageLoad = imageLoad;
	Preload.cssLoad = cssLoad;
	Preload.fontLoad = fontLoad;


	window.Preload = Preload;




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

			id: 0,													//自增ID
			count: 0,												//队列总数

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

			params.count = Object.getOwnPropertyNames(opts.connector).length;

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
				type = connect.type.toLocaleUpperCase(),
				data = connect.data || {};



			var timeOut = self.getTimeOut(connect.loadingOverTime, connect.loadingOverTimeCB);

			if(type !== 'GET' && type !== 'POST') type = 'GET';

	        params._createXHR.onreadystatechange = function() {
	            if (params._createXHR.readyState == 4) {
	            	clearTimeout(timeOut);
	                if ((params._createXHR.status >= 200 && params._createXHR.status < 300) || params._createXHR.status === 304) {
	                    connect.success(params._createXHR.responseText)
	                }else{
	                	self.throwIf("对" + url + "请求失败，状态码为：" + params._createXHR.status);
	                	connect.error(params._createXHR);
	                }

	            	self.isCompleteAllLoad();
	            }
	        }

	        // console.log("type", type);

	        url = type == 'POST' ? url : url + '?' + self.getQueryString(data)

	        // console.log(url);

	        params._createXHR.open(type, url, connect.async || true);

	        params._createXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	        // console.log(self.getQueryString(connect.data));

	        params._createXHR.send(type == 'POST' ? self.getQueryString(data) : null);
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

			url += (/\?/.test(url) ? "&" : "?") + '_=' +  Date.parse(new Date());
			// console.log(url + (/\?/.test(url) ? "&" : "?") + '_=' +  Date.parse(new Date()));

	        var script = document.createElement("script");
	        script.src = url;
	        params.head.appendChild(script);
	        
	        script.onload = function(){
	        	// alert(1);
	        	clearTimeout(timeOut);
	        	params.head.removeChild(script);
	            self.isCompleteAllLoad();
	        }

	    },

	    /*
		*	根据平台获取XHR
		*	
		*/
		getXHR: function(){
			if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
			
			throwIf("only Support IE9+")
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
		},

		getQueryString: function(object) {
	      return Object.keys( object ).map( function( item ) {
	        return encodeURIComponent( item )
	          + '=' + encodeURIComponent( object[ item ] );
	      }).join( '&' );
	    },

	    isCompleteAllLoad: function() {
	    	var self = this,
				opts = self.opts,
				params = self.params;

	    	if(++params.id >= params.count){
	    		opts.completeLoad();
	    	}
	    }
	}

	if (true) {
	    module.exports = connectorLoad;
	} else {
	    window.connectorLoad = connectorLoad;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var imageLoad = function(opts) {


	    //可修改参数
	    this.opts = {
	        isDebug: false,
	        sources: null, //预加载资源总队列
	        progress: function() {}, //进度条回调
	        completeLoad: function() {}, //加载完成回调
	        config: {
	            timeOut: opts.loadingOverTime || 15, //超时时间
	            timeOutCB: opts.loadingOverTimeCB || function() {}, //超时回调
	        },
	    }

	    //业务逻辑所需参数
	    this.params = {
	        echetotal: 0, //队列总数
	        echelon: [], //队列资源列表
	        echelonlen: [], //记录每个队列长度
	        echeloncb: [], //队列回调标示

	        id: 0, //自增ID
	        flag: 0, //标示梯队

	        allowType: ['jpg', 'jpeg', 'png', 'gif'], //允许加载的图片类型
	        total: 0, //资源总数
	        completedCount: 0, //已加载资源总数

	        //img标签预加载
	        imgNode: [],
	        imgNodePSrc: [],
	    }

	    for (var i in opts) {
	        this.opts[i] = opts[i];
	    }

	    // console.log(opts);

	    this._init();

	}

	imageLoad.prototype = {
	    _init: function() {
	        var self = this,
	            opts = self.opts,
	            params = self.params;

	        //初始化资源参数
	        self._initData();

	        // console.log(params.echelon);
	        // console.log(params.echeloncb);
	        // console.log(params.echelonlen);
	        // console.log(params.total);

	        //开始加载队列资源
	        self.loadEcho(params.echelon[0])
	    },

	    _initData: function() {
	        var self = this,
	            opts = self.opts,
	            params = self.params;


	        if (opts.sources === null) return;

	        //处理梯队资源和回调
	        for (var i in opts.sources) {
	            var echoLon = [];
	            for (var j = 0, len = opts.sources[i].source.length; j < len; j++) {

	                echoLon.push(opts.sources[i].source[j]);
	                // console.log(opts.sources[i].source[j]);
	            }
	            // console.log(1);

	            //资源总数
	            params.total += len * 1;
	            params.echelonlen.push(opts.sources[i].source.length);
	            params.echelon.push(echoLon);

	            params.echeloncb.push(typeof opts.sources[i].callback == 'undefined' ? null : opts.sources[i].callback);
	        }

	        //梯队回调标示位置
	        for (var i = 1, len = params.echelonlen.length; i < len; i++) {
	            params.echelonlen[i] = params.echelonlen[i - 1] + params.echelonlen[i];
	        }

	        //处理img标签的预加载
	        params.imgNode = document.getElementsByTagName('img');          //获取img标签节点
	        for(var i = 0, len = params.imgNode.length; i < len; i++){
	            if(params.imgNode[i].attributes.pSrc){
	                params.imgNodePSrc[i] = params.imgNode[i].attributes.pSrc.value;
	            }
	        }

	        // params.total = params.echelon.length;


	    },

	    loadEcho: function(echo) {
	        var self = this,
	            opts = self.opts,
	            params = self.params;

	        for (var i = 0, len = echo.length; i < len; i++) {
	            self.load(echo[i]);
	        }


	    },

	    load: function(res) {
	        var self = this,
	            opts = self.opts,
	            params = self.params;



	        /*
	         *  判断是否是图片类型
	         *      YES，使用new Image加载
	         *      NO，使用Ajax加载
	         */
	        if (self.isImg(res)) {
	            // console.log(1);
	            var img = new Image();
	            // createTimer(new Date());

	            var timer = setTimeout(function() {
	                opts.config.timeOutCB();
	            }, opts.config.timeOut * 1000);

	            img.src = res;

	            //加载成功后执行
	            img.onload = function() {
	                //加载成功后清理计时器
	                clearTimeout(timer);
	                opts.progress(++params.completedCount, params.total);
	                        
	                // console.log("imgNodePSrc", params.imgNodePSrc);

	                //预加载标签替换
	                for (var i = 0, len = params.imgNodePSrc.length; i < len; i++) {

	                    if (params.imgNodePSrc[i] == res) {
	                        params.imgNode[i].src = params.imgNodePSrc[i];
	                        break;
	                    }
	                }


	                self.next();

	            }

	            //加载失败后执行
	            img.onerror = function() {
	                opts.progress(++params.completedCount, params.total);
	                self.next();
	            }
	        } else {
	            self.throwIf('使用未允许类型图片或非图片类型');
	            opts.progress(++params.completedCount, params.total);
	        }
	    },

	    //是否加载下一队列
	    next: function() {
	        var self = this,
	            opts = self.opts,
	            params = self.params;
	        if (params.completedCount >= params.echelonlen[params.flag]) {
	            // console.log(1111);
	            if (params.echeloncb[params.flag] != null) {
	                params.echeloncb[params.flag]();
	            }
	            ++params.flag;
	            if (params.echelon[params.flag]) {
	                self.loadEcho(params.echelon[params.flag]);
	            } else {
	                opts.completeLoad();
	                return;
	            }
	        }
	    },


	    /*
	     *   判断传入是否是图片，根据后缀名和allowType校验是否符合要求
	     *
	     *   @param  res 图片资源路径
	     *
	     */
	    isImg: function(res) {
	        var self = this,
	            opts = self.opts,
	            params = self.params,
	            type = res.split('.').pop();

	        for (var i = 0, len = params.allowType.length; i < len; i++) {
	            if (type == params.allowType[i]) return true;
	        }
	        return false;
	    },

	    //错误数据弹出
	    throwIf: function(msg) {
	        var opts = this.opts,
	            msg = msg || "未知错误";
	        if (opts.isDebug) {
	            alert(msg);
	            return;
	        }
	    }
	}


	if (true) {
	    module.exports = imageLoad;
	} else {
	    window.imageLoad = imageLoad;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var cssLoad = function(url, local, media) {
	    function ready(e) {
	        return doc.body ? e() : setTimeout(function() {
	            ready(e)
	        })
	    }

	    var onloadcssdefined = function(e) {
	        for (var n = link.href, local = sheets.length; local--;)
	            if (sheets[local].href === n) return e()
	        setTimeout(function() {
	            onloadcssdefined(e)
	        })
	    };

	    var doc = window.document,
	        sheets = doc.styleSheets,
	        link = doc.createElement( "link" ),
	        media = media || "all";
	    link.rel = "stylesheet";
	    link.href = url;
	    link.media = media;

	    // console.log(navigator.userAgent.toLowerCase().match(/firefox/));

	    if(!local){
	        var loa = ( doc.getElementsByTagName( "head" )[ 0 ] || doc.body ).childNodes;
	        local = loa[loa.length - 1];
	    }

	    ready(function() {
	        local.parentNode.insertBefore(link, local ? local : local.nextSibling)
	    })

	    link.addEventListener && link.addEventListener("load", function(e) {
	        if(navigator.userAgent.toLowerCase().match(/firefox/)){
	            var script = doc.createElement("script");
	            local.parentNode.insertBefore(script, local ? local : local.nextSibling);
	        }
	    });

	    link.onloadcssdefined = onloadcssdefined;

	    onloadcssdefined(function() {
	        link.media !== media && (link.media = media)
	    })
	}

	 true ? module.exports = cssLoad : window.cssLoad = cssLoad;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var fontLoad = function(url, as, type, callback) {
		var link = document.createElement( "link" );
		    link.rel = "preload";
		    link.href = url;
		    link.as = as || "font";
		    link.type = type || "font/ttf";
		    link.setAttribute('crossorigin', 'anonymous'),
		    callback = callback || function(){};

		if(!link.relList || !link.relList.supports || !link.relList.supports('preload')){
		  	alert("unsupports: Resource Hints preload");
		  	return 0;
		}

		link.addEventListener('load', function(){
		  	callback()

		});
		document.getElementsByTagName('head')[0].appendChild(link);
	}

	 true ? module.exports = fontLoad : window.fontLoad = fontLoad;


/***/ }
/******/ ]);