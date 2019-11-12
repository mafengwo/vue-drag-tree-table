const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // webpack分离css单独打包
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dtree-table.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: [ '.js', '.vue', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}