# font
预加载font

## Installation
可以用ES6 模块的形式引入
```javascript
import {fontLoad} from 'preload';
```
也可以直接使用CommonJS方式引入
```javascript
var fontLoad= require('fontLoad');
```
或者直接引入到HTML里面也可以
```html
<script src="https://unpkg.com/apreload@2.2.4/dist/iife/fontLoad.js"></script>
```

## usage
最简形式使用
```css
	 @font-face {
          font-family: 'Oswald';
          src: local('Oswald Regular'), local('Oswald-Regular'), url(https://fonts.gstatic.com/s/oswald/v11/Qw6_9HvXRQGg5mMbFR3Phn-_kf6ByYO6CLYdB4HQE-Y.woff2) format('woff2');
          unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Oswald';
          src: local('Oswald Regular'), local('Oswald-Regular'), url(https://fonts.gstatic.com/s/oswald/v11/_P8jt3Y65hJ9c4AzRE0V1OvvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
        }
        .text1{
            font-family: 'Oswald', sans-serif;
        }
```
```javascript
	fontLoad('./style/index.css', document.getElementById("index"), "all");
    fontLoad('./style/main.css', document.getElementById("main"), "all");
```
## note
fontLoad 字体的加载跟图片、CSS加载不一样，字体是声明时不加载，只有使用的时候才会去加载相应的字体，所以使用script标签或者AJAX方式加载资源无效，浏览器不认可这类资源，这里使用link标签```<link rel="preload" as="font" />```告诉预加载器[Preloader](http://calendar.perfplanet.com/2013/big-bad-preloader/)，但是兼容性比较差，具体看[这里](http://caniuse.com/#search=preload)

## change log
[2.1.2](https://github.com/jayZOU/preload/tree/2.1.2)  
[2.0.1](https://github.com/jayZOU/preload/tree/2.0.1)  
