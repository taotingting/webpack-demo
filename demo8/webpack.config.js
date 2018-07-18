// webpack.config.js
// module.exports = {
//     entry: './main.js',
//     output: {
//       filename: 'bundle.js'
//     }
//   };
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports={
    // mode: 'development',
    entry: "./main.js",
    output: {
        filename: 'bundle.js'
    },
    module: {
    },
    plugins: [
      new HtmlwebpackPlugin({
        title: 'Webpack-demos',
        filename: 'index.html'
      }),
      new OpenBrowserPlugin({
        url: 'http://localhost:8080'
      })
    ]
}