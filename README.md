# preload
资源预加载组件

 - 队列，可以支持队列加载和回调，也可以加载视频或者音频
 - 支持同步或异步获取数据
 - 进度条，可以动态获取进度条信息

##Install

    git clone https://github.com/jayZOU/preload.git
    npm install
    gulp
    
访问[http://localhost:8080/][1]
##Examples
```js
    /**
	*	Preload 资源预加载组件
	*	@author jayzou
	*	@time 2015-10-15
	*	@version 1.0.0
	*	@class Preload
	*	@param {object}	sources		必填	加载队列容器，支持队列加载以及加载一个队列后传入回调
	*   @param {object} connector   选填    后台数据接口，可选择同步或异步
	*	@param {object}	wrap		选填	进度条容器，返回记载进度信息
	**/

    var preload = new Preload({
		sources: {
			imgs:{
				source:[
					"./src/image/b2.jpg",
					"./src/image/b1.jpg"
				],
				callback: function(){
					alert("队列1完成");
				}
			},
			audio:{
				source:[
					"./src/audio/a.mp3",
					"./src/audio/b.mp3"
				]
			},
			imgs2:{
				source:[
					"./src/image/b3.jpg",
					"./src/image/b4.jpg",
					"http://7xl041.com1.z0.glb.clouddn.com/OrthographicCamera.png",
					"http://7xl041.com1.z0.glb.clouddn.com/audio.gif",
				],
				callback: function(){
					alert("队列3完成");
				}
			}
		},
		connector: {
			int1: {
				url: 'http://localhost/test/index.php?callback=read&city=上海市',
				jsonp: true
			},
			int2: {
    			url: 'http://localhost/test/index.php?callback=read&city=深圳市',
				jsonp: false
			}
		},
		progress: function(completedCount, total){
			console.log(Math.floor((completedCount / total) * 100));
		}
	});
	
	function read(){
		console.log(arguments[0])
	}
```
##Notes

 - 队列名称不能重名，否则后面的队列会覆盖前面

	
	


  [1]: http://localhost:8080/