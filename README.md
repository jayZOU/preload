# preload
静态资源预加载组件  

## features  
1. 每个模块均可单独引入  
2. 支持amd、cjs、es、iife、umd多种形式使用  
3. 打包三个模块压缩之后整体大小小于4KB  


[图片预加载](https://github.com/jayZOU/preload/blob/master/docs/img.md)  
[CSS加载](https://github.com/jayZOU/preload/blob/master/docs/css.md)  
[font加载](https://github.com/jayZOU/preload/blob/master/docs/font.md)  

## install
```
npm install apreload
```
## usage
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

## dev  
```
git clone https://github.com/jayZOU/preload.git  
cd preload  
npm i  
npm run dev //or npm run build  
```

## change log
[2.1.2](https://github.com/jayZOU/preload/tree/2.1.2)  
[2.0.1](https://github.com/jayZOU/preload/tree/2.0.1)