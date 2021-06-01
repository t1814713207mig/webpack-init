const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getMpa = require('./getMpa');

const { entry } = getMpa();
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'js/[name].chunk.[chunkhash:6].js',
    chunkFilename: 'js/[name].chunk.[chunkhash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          // 虽然使用url-loader代替file-loader，但需要下载file-loader插件
          loader: 'url-loader',
          options: {
            name: '[name]_[contenthash:6].[ext]',
            outputPath: 'iconfont/',
            limit: 1024,
          },
        },
      },
      {
        test: /\.(png|jpe?g||gif|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[contenthash:6].[ext]',
            outputPath: 'images/',
            limit: 1024,
          },
        },
      },
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          'babel-loader',
          'eslint-loader',
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')],
    alias: {
      '@src': path.join(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../static'),
    },
    extensions: ['.jsx', '.js', '.json', '.ts'],
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
};
