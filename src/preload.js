// var connectorLoad = require("./connectorLoad.js"),
// 	imageLoad = require("./connectorLoad.js"),
// 	Preload.connectorLoad = connectorLoad,
// 	Preload.imageLoad = imageLoad;
var connectorLoad = require("./connectorLoad.js"),
	imageLoad = require("./imageLoad.js"),
	cssLoad = require("./cssLoad.js"),
	fontLoad = require("./fontLoad.js"),
	Preload = {};

Preload.connectorLoad = connectorLoad;
Preload.imageLoad = imageLoad;
Preload.cssLoad = cssLoad;
Preload.fontLoad = fontLoad;


window.Preload = Preload;


