const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // webpack分离css单独打包
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = (env, options) => {
  let entry = './src/lib/index.js';
  let output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'dtree-table.js',
    library: 'dtree-table', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  }
  if (options.mode === 'development') {
    entry = './src/main.js';
  } else {
    output.publicPath = '/dist/'
  }
  return {
    entry,
    output,
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
}