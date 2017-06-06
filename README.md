# preload
静态资源预加载组件  
一共分为3个模块，可单独使用，支持amd、cjs、es、iife、umd多种形式使用
## features
1. Promise，利用Promise链式调用实现队列加载
2. 进度条，可以动态获取进度条信息
3. 加载超时回调，获取超时资源
4. 支持img标签的预加载，添加p-src属性即可，加载完成后自动替换代替图

## Installation
可以用ES6 模块的形式引入
```javascript
import Preload from 'preload' 
```
也可以直接使用CommonJS方式引入
```javascript
var Preload = require('preload');
```
或者直接引入到HTML里面也可以
```html
<script src="./dist/preload.global.js"></script>
```

## usage
最简形式使用
```javascript
var p = new Preload()
p.load([
    'xxx1.jpg',
    'xxx2.jpg',
    'xxx3.jpg',
  ])
  .then(function(res){
    //first queue complate
    return p.load([
      'xxx4.jpg',
      'xxx5.jpg',
    ])
  })
  .then(function(res){
    //second queue complate

  })
  .catch(function(err){
    console.log(err);
  })
```
## API
### progress(进度)
#### type
function
####demo
```javascript
var p = new preload({
  progress: function(i, count){
    console.log(Math.floor((i / count) * 100));
  },
})
```
#### note
这里进度条的数值仅仅是指**单一队列**的，且**不包括HTML里面img标签的加载**

 
### timeOut(超时时间，秒)
#### type
number
#### demo
```javascript
var p = new preload({
  timeOut: 15
})
```
#### note
设置了超时时间，也需要设置超时回调，虽然不设置也不会报错，但是超时时间就无意义


### timeOutCB(超时回调)
####type
function
####demo
```javascript
var p = new preload({
  timeOutCB: function(res){
    console.log('timeout=',res);
  }
})
```
#### note
仅仅是指**单一队列**的，且**不包括HTML里面img标签的加载**

## similar
[微信小程序图片预加载](https://github.com/jayZOU/wxapp-preload)

## note
1. 进度条回调的设置HTML的img标签的图片预加载是无效的，请自行在src上设置加载时的替代图，预加载完成后会自动替换
2. 超时时间是指一张图片加载的最大时间，而不是一个队列，即使触发超时回调，图片请求已经出去了，还是会继续加载，除非资源地址无效
