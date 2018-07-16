// webpack.config.js
// module.exports = {
//     entry: './main.js',
//     output: {
//       filename: 'bundle.js'
//     }
//   };
module.exports={
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },
    output: {
        filename: '[name].js'
    }
}