(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.preload = factory());
}(this, (function () {

var Preload = function Preload(opts){
	opts = opts || {};
	this.callBack = {};
	this.progress = opts.progress ? opts.progress.bind(this) : function(){};
	this.timeOut = opts.timeOut || 15;
	this.timeOutCB = opts.timeOutCB ? opts.timeOutCB.bind(this) : function(){};


	// 初始化队列加载参数
	this.reset();	

	//获取img标签预加载资源列表
	this.imgNode = [];
	this.loadTag();
};


Preload.prototype.load = function load (imgList){
		var this$1 = this;

	var that = this;

	return new Promise(function (resolve, reject) {
		if(!this$1.isArrayFn(imgList)) { reject(new Error("It's not allow params")); }
		if(!imgList.length) { reject(new Error("It's not null")); }
		//重置队列
		that.reset(imgList.length);

		that.imgList = imgList;

		imgList.forEach(function (item) {
			//开始加载
			var img = new Image();
			//超时回调
			var timer = that._timeOut(item);
			// console.log('that.timer=',that.timer);

			img.src = item;

			//加载成功
			img.onload = that.onload.bind(this$1, item, timer, resolve);
			//加载失败
			img.onerror = that.onerror.bind(this$1, item, timer, resolve);

		});

	})
};

Preload.prototype.loadTag = function loadTag (){
	var that = this;
	var imgNode = document.getElementsByTagName('img');
	var loop = function ( i, len ) {
            if(imgNode[i].attributes['p-src']){
			//开始加载
			var img = new Image();
			var src = imgNode[i].attributes['p-src'].value;
			//超时回调
			var timer = that._timeOut(src);
				
			img.src = src;
			img.onload = function (){
				clearTimeout(timer);
				imgNode[i].src = src;
			};
            }
        };

		for(var i = 0, len = imgNode.length; i < len; i++)loop( i, len );

};

    Preload.prototype._timeOut = function _timeOut (src) {
    var that = this;

        var timer = setTimeout(function () {
            that.timeOutCB({
                name: src,
                msg: "load timer"
            });
            clearTimeout(timer);
        }, that.timeOut * 1000);
        return timer;
    console.log('timer=', timer);
    };


    Preload.prototype.onload = function onload (src, timer, resolve) {
        //清理计时器
        clearTimeout(timer);
        //加载成功信息记录
        this.success.data.push(src);
        //执行进度回调
        this.progress(++this.flag, this.count);
        //队列加载完成后调起then
        this.complate(resolve);
    };

    Preload.prototype.onerror = function onerror (src, timer, resolve) {
        //清理计时器
        clearTimeout(timer);
        //错误信息记录
        this.err.data.push(src);
        //执行进度回调
        this.progress(++this.flag, this.count);

        //队列加载完成后调起then
        this.complate(resolve);
    };	

    Preload.prototype.complate = function complate (resolve){
        if(this.flag >= this.count){
        resolve(this.success);
        }

    };

Preload.prototype.reset = function reset (len){
	this.imgList = [];
	this.flag = 0;
	this.count = len;
	this.success = {						
		code: 0,
		msg: 'success',
		data: []
	};	
	this.err = {					
		code: -1,
		msg: 'load error',
		data: []

	};
};

Preload.prototype.isArrayFn = function isArrayFn (arr){
	if(typeof Array.isArray == "function") { return Array.isArray(arr); }

	return Object.prototype.toString.call(arr) === '[object Array]';
};

return Preload;

})));
//# sourceMappingURL=preload.umd.js.map
