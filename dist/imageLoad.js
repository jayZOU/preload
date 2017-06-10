class ImageLoad{
	constructor(opts){
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
	}


	load(imgList){
		const that = this;

		return new Promise((resolve, reject) => {
			if(!this.isArrayFn(imgList)) reject(new Error("It's not allow params"));
			if(!imgList.length) reject(new Error("It's not null"));
			//重置队列
			that.reset(imgList.length);

			that.imgList = imgList;

			imgList.forEach((item) => {
				//开始加载
				let img = new Image();
				//超时回调
				let timer = that._timeOut(item);
				// console.log('that.timer=',that.timer);

				img.src = item;

				//加载成功
				img.onload = that.onload.bind(this, item, timer, resolve);
				//加载失败
				img.onerror = that.onerror.bind(this, item, timer, resolve);

			});

		})
	}

	loadTag(){
		const that = this;
		let imgNode = document.getElementsByTagName('img');
		for(let i = 0, len = imgNode.length; i < len; i++){
            if(imgNode[i].attributes['p-src']){
				//开始加载
				let img = new Image();
				let src = imgNode[i].attributes['p-src'].value;
				//超时回调
				let timer = that._timeOut(src);
				
				img.src = src;
				img.onload = ()=>{
					clearTimeout(timer);
					imgNode[i].src = src;
				};
            }
        }

	}

    _timeOut(src) {
    	const that = this;

        let timer = setTimeout(() => {
            that.timeOutCB({
                name: src,
                msg: "load timer"
            });
            clearTimeout(timer);
        }, that.timeOut * 1000);
        return timer;
    	console.log('timer=', timer);
    }


    onload(src, timer, resolve) {
        //清理计时器
        clearTimeout(timer);
        //加载成功信息记录
        this.success.data.push(src);
        //执行进度回调
        this.progress(++this.flag, this.count);
        //队列加载完成后调起then
        this.complate(resolve);
    }

    onerror(src, timer, resolve) {
        //清理计时器
        clearTimeout(timer);
        //错误信息记录
        this.err.data.push(src);
        //执行进度回调
        this.progress(++this.flag, this.count);

        //队列加载完成后调起then
        this.complate(resolve);
    }	

    complate(resolve){
        if(this.flag >= this.count){
        	resolve(this.success);
        }

    }

	reset(len){
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
	}

	isArrayFn(arr){
		if(typeof Array.isArray == "function") return Array.isArray(arr);

		return Object.prototype.toString.call(arr) === '[object Array]';
	}

}

export default ImageLoad;
