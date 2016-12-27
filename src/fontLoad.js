"use strict";

var fontLoad = function(url, as, type, callback) {
	var link = document.createElement( "link" );
	    link.rel = "preload";
	    link.href = url;
	    link.as = as || "font";
	    link.type = type || "font/ttf";
	    link.setAttribute('crossorigin', 'anonymous'),
	    callback = callback || function(){};

	if(!link.relList || !link.relList.supports || !link.relList.supports('preload')){
	  	alert("unsupports: Resource Hints preload");
	  	return 0;
	}

	link.addEventListener('load', function(){
	  	callback()

	});
	document.getElementsByTagName('head')[0].appendChild(link);
}

typeof module == 'object' ? module.exports = fontLoad : window.fontLoad = fontLoad;
