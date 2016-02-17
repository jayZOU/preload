# preload
资源预加载组件

一共分为3个模块，可单独使用，支持CMD

 - [imageLoad](https://github.com/jayZOU/preload/blob/master/src/js/imageLoad.js)
 - [connectorLoad](https://github.com/jayZOU/preload/blob/master/src/js/connectorLoad.js)
 - [cssLoad](https://github.com/jayZOU/preload/blob/master/src/js/cssLoad.js)

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
    *   @time 2016-2-17
    *   @version 2.1.3
    *   @class Preload
    *   @param {object} connector             必填  加载队列容器，支持队列加载以及加载一个队列后传入回调
    **/

var connectorLoad = new Preload.connectorLoad({	//可单独使用connectorLoad，var connectorLoad = new connectorLoad()
    isDebug: true,
    connector: {
        int1: {
            url: 'http://localhost/test1/index.php?callback=read&city=上海市',
            jsonp: true,
            loadingOverTime: 3,
            loadingOverTimeCB: function() {
                console.log("资源加载超时");
            },
        },
        int2: {
            url: 'http://localhost/test1/index.php?callback=read&city=深圳市',
            jsonp: false,
            loadingOverTime: 3,
            success: function(res) {
                console.log(res);
            },
            error: function(err) {
                console.log(err);
            }
        }
    }
});

function read() {
    console.log(arguments[0])
}
```

###cssLoad
```js
	/**
    *   Preload cssLoad
    *   @author jayzou
    *   @time 2016-2-16
    *   @version 2.1.2
    *   @class Preload
    *   @param {object} sources             必填  加载队列容器，支持队列加载以及加载一个队列后传入回调
    **/

var cssLoad = new Preload.cssLoad({				//可单独使用cssLoad，var cssLoad = new cssLoad()
    isDebug: true, //选填，是否开启debug
    sources: {
        index: {
            href: "./style/index.css", //必填，资源路径
            tag: "head", //选填，link标签位置，head  or  body
            media: "all",
            callback: function() { //选填，加载完成后回调
                alert(1);
            }
        },
        main: {
            href: "./style/main.css", //必填，资源路径
            tag: "body", //选填，link标签位置，head  or  body
            media: "all",
            callback: function() { //选填，加载完成后回调
                alert(2);
            }
        }
    }
})
```

##Notes

 - 队列名称不能重名，否则后面的队列会覆盖前面
 - 对于img、audio标签资源预加载，使用pSrc属性

	
	


  [1]: http://jayzou.coding.io/
  [2]: http://localhost:8080/