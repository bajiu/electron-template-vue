import webpack from 'webpack';
import path from 'path';
const outputPath = path.join(__dirname, '..', 'app', 'dist');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    new webpack.ProvidePlugin({
      Vue: 'vue'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  ]
}
