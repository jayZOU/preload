# preload
静态资源预加载组件  
一共分为3个模块（img/css/font），可单独使用，支持amd、cjs、es、iife、umd多种形式使用

[图片预加载](https://github.com/jayZOU/preload/blob/master/docs/img.md)
[CSS加载](https://github.com/jayZOU/preload/blob/master/docs/css.md)
[font加载](https://github.com/jayZOU/preload/blob/master/docs/font.md)

##install
```
npm install apreload
```
##usage
可以用ES6 模块的形式引入
```javascript
import Preload from 'apreload' 
```
也可以直接使用CommonJS方式引入
```javascript
var Preload = require('apreload');
```
或者直接引入到HTML里面也可以
```html
<script src="./dist/preload.global.js"></script>
```