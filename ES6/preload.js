class Preload {
	constructor(opts) {
		this.opts = opts;
	}

	init() {
		this._initData();
	}

	_initData() {
		if(Object.is(this.sources, null)) return; 

		//梯队总数
		this.echetotal = Object.getOwnPropertyNames(this.sources).length;


		//处理梯队资源和回调
		for(let i in this.sources){

			for(var j = 0, len = sources[i].source.length; j < len; j++){
				this.echelon.push(sources[i].source[j]);
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
	}

	_createXHR() {
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else if (typeof ActiveXObject != "undefined") {
			if (typeof arguments.callee.activeXString != "string") {
				let versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
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
	}

	_load(res, callback, length) {

	}

	getProgress() {

	}

	isImg(res) {

	}
}