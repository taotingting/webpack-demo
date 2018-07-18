// webpack.config.js
// module.exports = {
//     entry: './main.js',
//     output: {
//       filename: 'bundle.js'
//     }
//   };
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports={
    // mode: 'development',
    entry: "./main.js",
    output: {
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            // {
            //   loader: 'url-loader',
            //   options: {
            //     limit: 8192
            //   }
            // },
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ]
    },
    plugins: [
      new UglifyJsPlugin()
    ]
}