const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob')

var entries= function () {
    var srcDir = path.resolve(__dirname, 'src')
    var entryFiles = glob.sync(srcDir + '/**/index.{js,jsx}')
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        // 裁切filePath相对于src的子串
        var filename = filePath.replace(srcDir+"/","")
        map[filename] = filePath;
    }
    return map;
}

module.exports = {
  entry: Object.assign(entries(), {
    // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包
    'vendor': ['lodash']
  }),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },  
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Caching'
    }),
    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['common','vendor','manifest'],
      minChunks: Infinity,
      // (随着 entry chunk 越来越多，这个配置保证没其它的模块会打包进 vendor chunk)
    }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
};