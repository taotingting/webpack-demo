

var values = require('postcss-modules-values');

module.exports={
    entry: "./main.js",
    output: {
        filename: 'bundle.js'
    },
    module: {
      rules: [
        // {
        //   test: /\.css$/,
        //   // use: [ 'style-loader', 'css-loader' ]
        // }
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
               loader: 'css-loader',
               options: {
                 modules: true,
                 localIdentName:'[path][name]__[local]--[hash:base64:5]'
               }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  values
                ]
              }
            }
          ]
        }
      ]
    }
}