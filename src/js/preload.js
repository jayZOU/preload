/**
*@description 资源预加载loading
*@name Preload
*@author shijiezou
*---------------------------------
*@default config
*
*var preload = new Preload({
*	sources: {
*		imgs: {
*			source: [
*				"./b2.jpg",
*				"./b1.jpg"
*			],
*			callback: function() {
*				//alert(1);
*			}
*		},
*		audio: {
*			source: [
*				"./a.mp3",
*				"./b.mp3"
*			],
*			callback: function() {
*
*			}
*		},
*		imgs2: {
*			source: [
*				"./b3.jpg",
*				"./b4.jpg",
*				"http://7xl041.com1.z0.glb.clouddn.com/OrthographicCamera.png",
*				"http://7xl041.com1.z0.glb.clouddn.com/audio.gif",
*			],
*			callback: function() {
*				//alert(2);
*			}
*		}
*	},
*	wrap: 'pro'
*});
*
**/
var Preload = function(opts) {

	"use strict";

	var sources = opts.sources || null, 		
		progress = opts.progress || null,				//进度条回调函数
		completedCount  = 0,							//已加载的资源数
		total = 0,										//资源总数
		config,											//请求参数
		id = 0,											//自增ID
		flag = 0,										//标示梯队
		echelon = [],									//梯队加载资源
		echeloncb = [],									//梯队加载后的回调
		echetotal,										//梯队总数
		echelonlen = [],								//梯队长度
		allowType = ['jpg', 'png', 'gif'];				//允许加载的图片类型

	config = {
		xhr: null,
		timeOut: 10,
		id: 0,											//超时标示
		max: 3											//超时最高次数
	};

	var init = function() {
		_initData(); //初始化资源参数

		_load(echelon[0], echeloncb[0], echelonlen);
	};

	var _createXHR = function() {
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
	};

	var _initData = function() {
		if(sources === null) return; 

		config.xhr = _createXHR();
		
		//梯队总数
		echetotal = Object.getOwnPropertyNames(sources).length;


		//处理梯队资源和回调
		for(var i in sources){

			for(var j = 0, len = sources[i].source.length; j < len; j++){
				echelon.push(sources[i].source[j]);
			}
			echelonlen.push(sources[i].source.length);
			echeloncb.push(sources[i].callback);
		}

		//梯队回调标示位置
		for(var i = 1, len = echelonlen.length; i < len; i++){
			echelonlen[i] = echelonlen[i - 1] + echelonlen[i]; 
		}

		//资源总数
		total = echelon.length;

		//获取进度条容器
		if(wrap !== null) wrap = document.getElementById(wrap);
	};

	//递归加载单个梯队的资源
	var _load = function(res, callback, length) {

		if(id >= length[flag]){
			echeloncb[flag]();
			++flag;
		}

		if(flag >= echetotal) return;

		if(isImg(res)) {
			var img = new Image();
			img.src = res;

			//加载成功后执行
			img.onload = function () {
				getProgress();
				_load(echelon[++id], callback, length);
			}

			//加载失败后执行
			img.onerror = function() {
				getProgress();
				_load(echelon[++id], callback, length);
			}
		}else{

			
			config.xhr.onreadystatechange = function() {
				if (config.xhr.readyState == 4){
					if((config.xhr.status >= 200 && config.xhr.status < 300) || config.xhr.status === 304){

						getProgress();
						_load(echelon[++id], callback, length);
					}
				}else if(config.xhr.status >= 400 && config.xhr.status < 500){
					getProgress();
					_load(echelon[++id], callback, length);
				}
			};

			config.xhr.open("GET", res, true);

			config.xhr.send(null);
		}
		
	};

	//获取进度条
	var getProgress = function() {
		++completedCount ;
		console.log(Math.floor((completedCount  / total) * 100));
	};

	//判断是否是图片
	var isImg = function(res) {
		var type = res.split('.').pop();
		for (var i = 0, len = allowType.length; i < len; i++) {
			if (type == allowType[i]) return true;
		}
		return false;
	};

	init();
};