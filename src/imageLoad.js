var imageLoad = function(opts) {
    "use strict";

    //可修改参数
    this.opts = {
    	isDebug: false,
        sources: null, //预加载资源总队列
        progress: function() {}, //进度条回调
        completeLoad: function() {}, //加载完成回调
        config: {
			timeOut: opts.loadingOverTime || 15,				//超时时间
			timeOutCB: opts.loadingOverTimeCB || function(){},	//超时回调
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

        //audio标签预加载
        audioNode: [],
        audioNodePSrc: [],
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

        //开始预加载资源
        self._load(params.echelon[0], params.echeloncb[0], params.echelonlen);
    },

    _initData: function() {
        var self = this,
            opts = self.opts,
            params = self.params;


        if (opts.sources === null) return;

        params.echetotal = Object.getOwnPropertyNames(opts.sources).length;

        //处理梯队资源和回调
        for (var i in opts.sources) {

            for (var j = 0, len = opts.sources[i].source.length; j < len; j++) {
                params.echelon.push(opts.sources[i].source[j]);
                // console.log(opts.sources[i].source[j]);
            }
            // console.log(1);
            params.echelonlen.push(opts.sources[i].source.length);


            params.echeloncb.push(typeof opts.sources[i].callback == 'undefined' ? null : opts.sources[i].callback);
        }

        //梯队回调标示位置
        for (var i = 1, len = params.echelonlen.length; i < len; i++) {
            params.echelonlen[i] = params.echelonlen[i - 1] + params.echelonlen[i];
        }

        //资源总数
        params.total = params.echelon.length;

        //处理img标签的预加载
        params.imgNode = document.getElementsByTagName('img'); //获取img标签节点
        for (var i = 0, len = params.imgNode.length; i < len; i++) {
            if (params.imgNode[i].attributes.pSrc) {
                params.imgNodePSrc[i] = params.imgNode[i].attributes.pSrc.value;
            }
        }

        //处理audio标签的预加载
        params.audioNode = document.getElementsByTagName('audio'); //获取img标签节点
        for (var i = 0, len = params.audioNode.length; i < len; i++) {
            if (params.audioNode[i].attributes.pSrc) {
                params.audioNodePSrc[i] = params.audioNode[i].attributes.pSrc.value;
            }
        }
    },

    _load: function(res, callback, length) {
        var self = this,
            opts = self.opts,
            params = self.params;

        /*	用于判断是否已加载完当前队列的所有资源，
         *		若已加载完成，
         *			判断是否传入回调，
         *				有则执行回调
         *				无继续下一队列或退出
         */
        if (params.id >= length[params.flag]) {
            if (params.echeloncb[params.flag] != null) {
                params.echeloncb[params.flag]();
            }
            ++params.flag;
        }

        /*
         *	用于判断当前加载是否达到最大资源数
         *		YES,执行加载完成回调
         */
        // console.log("id=",params.id);
        // console.log("echetotal=",params.total);
        // console.log("res=",res);
        if (params.id >= params.total) {

            opts.completeLoad();
            return;
        }


        /*
         *	判断是否是图片类型
         *		YES，使用new Image加载
         *		NO，使用Ajax加载
         */
        if(self.isImg(res)) {
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

	            for (var i = 0, len = params.imgNodePSrc.length; i < len; i++) {
	                if (params.imgNodePSrc[i] == res) {
	                    params.imgNode[i].src = params.imgNodePSrc[i];
	                    break;
	                }
	            }

	            self._load(params.echelon[++params.id], callback, length);
	        }

	        //加载失败后执行
	        img.onerror = function() {
	            opts.progress(++params.completedCount, params.total);
	            self._load(params.echelon[++params.id], callback, length);
	        }
    	}else{
    		self.throwIf('使用未允许类型图片或非图片类型');
	        opts.progress(++params.completedCount, params.total);
	        self._load(params.echelon[++params.id], callback, length);
    	}



        // console.log("params.flag",params.flag);
        // console.log("params.echetotal",params.echetotal);

        // self._load(params.echelon[++params.id], callback, length);
    },

    /*
	*	判断传入是否是图片，根据后缀名和allowType校验是否符合要求
	*	
	*	@param	res	图片资源路径 
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
        if(opts.isDebug){
            alert(msg);
            return;
        }
    }
}

if (typeof module == 'object') {
    module.exports = imageLoad;
} else {
    window.imageLoad = imageLoad;
}