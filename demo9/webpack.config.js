var webpack = require('webpack');
var devFlagPlugin = new webpack.DefinePlugin({
  _DEV_ : JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})
module.exports={
    mode: 'development',
    entry: "./main.js",
    output: {
        filename: 'bundle.js'
    },
    module: {
    },
    plugins: [
      devFlagPlugin
    ]
}