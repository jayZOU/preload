# css
预加载css

## Installation
可以用ES6 模块的形式引入
```javascript
import {cssLoad} from 'preload';
```
也可以直接使用CommonJS方式引入
```javascript
var cssLoad= require('cssLoad');
```
或者直接引入到HTML里面也可以
```html
<script src="./dist/cssLoad.js"></script>
```

## usage
最简形式使用
```html
	<h1 class="index" id="index">index.css样式表插入</h1>
    <h1 class="main" id="main">main.css样式表插入</h1>
```
```javascript
	cssLoad('./style/index.css', document.getElementById("index"), "all");
    cssLoad('./style/main.css', document.getElementById("main"), "all");
```


## change log
[2.1.2](https://github.com/jayZOU/preload/tree/2.1.2)  
[2.0.1](https://github.com/jayZOU/preload/tree/2.0.1)  
