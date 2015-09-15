# preload
资源预加载组件

 - 队列，可以支持队列加载和回调，也可以加载视频或者音频
 - 进度条，可以动态获取进度条信息

##Install

    git clone https://github.com/jayZOU/preload.git
    npm install
    gulp
    
访问http://localhost:8080/
##Examples
```js
    /**
	*	Preload 资源预加载组件
	*	@author jayzou
	*	@time 2015-9-15
	*	@version 0.0.2
	*	@class Preload
	*	@param {object}	sources		必填	加载队列容器，支持队列加载以及加载一个队列后传入回调
	*	@param {string}	wrap		必填	进度条容器，返回记载进度信息
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
				],
				callback: function() {
                    alert("队列2完成");
				}
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
		wrap: 'pro'         //进度条容器
	});
```
##Notes

 - 队列名称不能重名，否则后面的队列会覆盖前面
 - 传入队列一定需要回调，回调内容可以为空
 - 必须传入进度条容器