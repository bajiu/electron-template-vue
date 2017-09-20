import webpack from 'webpack';
import path from 'path';
const outputPath = path.join(__dirname, '..', 'src', 'assets');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var cssLoaders = require('./css-loaders')
export default {
  target: 'electron',
  entry: {
    index: './src/render/index.js',
  },
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  // externals(context, request, callback) {
  //   callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
  // },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!sass-loader'
      },

    ],
  },
  // babel: {
  //   presets: ['es2015', 'stage-0'],
  //   plugins: ['transform-runtime']
  // },
  // vue: {
  //   loaders: cssLoaders()
  // },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'vue-router$': 'vue-router/dist/vue-router.common.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      $dirname: '__dirname',
    }),
    // new ExtractTextPlugin("[name].css"),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: "common",
    //     filename: "common.js",
    //     minChunks: 5,
    // }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      Vue: 'vue'
      // avalon: 'avalon'
    })
  ]
}
