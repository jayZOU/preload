var path = require('path');

module.exports = {
    entry: './src/preload.js',
    output: {
        path: path.join(__dirname, "demo"),
        filename: "preload.js"
    },
}