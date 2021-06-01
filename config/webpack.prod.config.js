// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const getMpa = require('./getMpa');

const smp = new SpeedMeasurePlugin();
const { htmlWebpackPlugins } = getMpa();
module.exports = smp.wrap({
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        }, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        }, 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  plugins: [...htmlWebpackPlugins, new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:6].css',
    chunkFilename: '[name].[contenthash:6].css',
  })], //  new BundleAnalyzerPlugin()
  optimization: {
    minimize: true, // 使用最小化工具 (optimization.minimizer, 默认为uglify-js) 使输出最小
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
      }),
      // new UglifyJsPlugin({
      //     test: /\.js$/i,
      // })
    ],
    splitChunks: {
      name: 'common~base',
      chunks: 'all',
      minChunks: 2, // 模块被引用2次以上的才抽离
      hidePathInfo: true,
      minSize: 20000,
    },
    providedExports: true, // 总是启用
    usedExports: true, // 前提是 providedExports为true
    sideEffects: false, // 前提是 providedExports usedExports为true
    concatenateModules: true, // 前提是 providedExports usedExports为true 试图找到可以安全地连接成单个模块的模块图的各个部分
  },
  performance: {
    hints: false, // 给定一个创建后超过 250kb 的资源不展示警告或错误提示。
  },
});
