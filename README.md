# preload
资源预加载组件

一共分为3个模块，可单独使用，支持CMD

 - [imageLoad](https://github.com/jayZOU/preload/blob/master/src/imageLoad.js)
 - [connectorLoad](https://github.com/jayZOU/preload/blob/master/src/connectorLoad.js)
 - [cssLoad](https://github.com/jayZOU/preload/blob/master/src/cssLoad.js)

具备以下特性

 - 队列，可以支持队列加载和回调，也可以加载视频或者音频
 - 支持同步或异步获取数据
 - 进度条，可以动态获取进度条信息
 - 支持img标签的预加载，添加pSrc属性即可
 - [ES6](https://github.com/jayZOU/preload/tree/dev)
 - [demo](http://jayzou.github.io/preload/index.html)


##Install

    git clone https://github.com/jayZOU/preload.git
    npm install
    npm run dev
    
访问

- [http://localhost:8080/imageLoad.html](http://localhost:8080/imageLoad.html)
- [http://localhost:8080/connectorLoad.html](http://localhost:8080/connectorLoad.html)
- [http://localhost:8080/cssLoad.html](http://localhost:8080/cssLoad.html)

##Examples

###imageLoad
```html
    <audio pSrc="./audio/a.mp3" preload="auto" controls></audio>

    <img pSrc="./src/image/b1.jpg" alt="">
	<img pSrc="./src/image/b2.jpg" alt="">
	<img pSrc="./src/image/b3.jpg" alt="">
	<img pSrc="./src/image/b4.jpg" alt="">
```
```js

	/**
    *   Preload imageLoad
    *   @author jayzou
    *   @time 2016-2-16
    *   @version 2.1.2
    *   @class Preload
    *   @param {boolean} isDebug            选填  是否开启debug选项，用于移动端调试，默认false
    *   @param {object} sources             必填  加载队列容器，支持队列加载以及加载一个队列后传入回调
    *   @param int      loadingOverTime     选填  预加载超时时间，默认15， 单位:秒
    *   @param {object} loadingOverTimeCB   选填  预加载超时回调
    *   @param {object} progress            选填  进度条容器，返回记载进度信息
    *   @param {object} completeLoad        选填  完成所有加载项执行回调
    **/

    var imageLoad = new Preload.imageLoad({	//可单独使用imageLoad，var imageLoad = new imageLoad()
	    isDebug: false,
	    sources: {
	        imgs: {
	            source: [
	                "./image/b2.jpg",
	                "./image/b1.jpg"
	            ],
	            callback: function() {
	                console.log("队列1完成");
	            }
	        },
	        audio: {
	            source: [
	                "./audio/a.mp3",
	                "./audio/b.mp3"
	            ],
	            callback: function() {
	                console.log("队列2完成");
	            }
	        },
	        imgs2: {
	            source: [
	                "./image/b3.jpg",
	                "./image/b4.jpg",
	                "http://7xl041.com1.z0.glb.clouddn.com/OrthographicCamera.png",
	                "http://7xl041.com1.z0.glb.clouddn.com/audio.gif",
	            ],
	            callback: function() {
	                console.log("队列3完成");
	            }
	        }
	    },
	    loadingOverTime: 3,
	    loadingOverTimeCB: function() {
	        console.log("资源加载超时");
	    },
	    progress: function(completedCount, total) {
	        console.log(Math.floor((completedCount / total) * 100));
	    },
	    completeLoad: function() {
	        console.log("已完成所有加载项");
	    }
	});
```

###connectorLoad
```js

	/**
    *   Preload connectorLoad
    *   @author jayzou
    *   @time 2016-2-18
    *   @version 2.1.4
    *   @class Preload
    *   @param {boolean} isDebug              选填  是否开启debug选项，用于移动端调试，默认false
    *   @param {object} connector             必填  加载队列容器，支持队列加载以及加载一个队列后传入回调
    *   @param {object} completeLoad            选填  完成所有加载项执行回调
    **/

var connectorLoad = new Preload.connectorLoad({
    isDebug: true,
    connector: {
        int1: {
            url: 'http://192.168.191.1/test1/index.php?callback=read&city=上海市',
            jsonp: true,
            loadingOverTime: 3,
            loadingOverTimeCB: function() {
                console.log("资源加载超时");
            },
        },
        int2: {
            url: 'http://192.168.191.1/test1/index.php',
            type: 'GET',                        //选填，请求类型，GET or POST 默认GET
            jsonp: false,                       //选填，是否为jsonp，默认false
            data: {                             //选填，发送服务器数据
                "callback": "read",
                "city": "深圳市"
            },
            loadingOverTime: 3,                 //选填，超时时间，默认12S
            loadingOverTimeCB: function() {     //选填，超时回调，
                console.log("资源加载超时");
            },
            async: true,                        //选填，同步或异步，默认true，异步
            success: function(res) {            //必填，执行成功后的回调
                console.log(res);
            },
            error: function(err) {              //选填，执行失败后的回调
                console.log(err);
            }
        }
    },
    completeLoad: function() {                  //选填，完成所有队列后执行，无论成功或失败
        console.log("已完成所有加载项");
    }
});

function read() {
    console.log('这是跨域' + arguments[0])
}
```

###cssLoad
```html
    <h1 class="index" id="index">index.css样式表插入</h1>
    <h1 class="main" id="main">main.css样式表插入</h1>
```
```js
	/**
    *   Preload cssLoad
    *   @author jayzou
    *   @time 2016-2-22
    *   @version 2.1.4
    *   @class Preload
    *   @param {string} url         必填  加载队列容器，支持队列加载以及加载一个队列后传入回调
    *   @param {Object} local       选填  CSS加载的位置，默认head末尾添加
    *   @param {string} media       选填  CSS media
    **/

    Preload.cssLoad('./style/index.css', document.getElementById("index"), "all");
    Preload.cssLoad('./style/main.css', document.getElementById("main"), "all");

    /**
    *   可以选择单独加载cssLoad.js
    *   cssLoad('./style/index.css', document.getElementById("index"), "all");
    *   cssLoad('./style/main.css', document.getElementById("main"), "all");
    **/
```

##Notes

 - 队列名称不能重名，否则后面的队列会覆盖前面
 - 对于img、audio标签资源预加载，使用pSrc属性

	
	


  [1]: http://jayzou.coding.io/
  [2]: http://localhost:8080/