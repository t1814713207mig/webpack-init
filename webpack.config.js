// "dev": "webpack --watch",
// "server": "webpack-dev-server"
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const glob = require('glob');

const getMpa = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const rewrite = [];
  const fileArr = glob.sync(path.join(__dirname, './public/*.html'));
  fileArr.forEach((item) => {
    const match = item.match(/public\/(.*)\.html$/);
    const pagename = match && match[1];
    entry[pagename] = `./src/${pagename}.jsx`;
    rewrite.push({ from: new RegExp(`^/${pagename}`), to: `/${pagename}.html` });
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./public/${pagename}.html`),
        filename: `${pagename}.html`,
        chunks: [pagename],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
        },
      }),
    );
  });
  rewrite.push({ from: /./, to: '/index.html' });
  return { entry, htmlWebpackPlugins, rewrite };
};
const { entry, htmlWebpackPlugins, rewrite } = getMpa();
module.exports = {
  entry,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'js/[id].chunk.[chunkhash:6].js',
    chunkFilename: 'js/[id].chunk.[chunkhash:6].js',
  },
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
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          // ????????????url-loader??????file-loader??????????????????file-loader??????
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
        include: path.resolve(__dirname, './src'),
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins, new MiniCssExtractPlugin({
    filename: 'css/[id]_[contenthash:6].css',
    chunkFilename: '[id].css',
  }), new ImageMinimizerPlugin({
    minimizerOptions: {
      plugins: [
        ['gifsicle', { interlaced: true }],
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 5 }],
        ['svgo', { plugins: [{ removeViewBox: false }] }],
      ],
    },
  })],
  devServer: {
    contentBase: false,
    port: 8081,
    open: true,
    host: '127.0.0.1', // ??????????????????ip??????????????????host
    proxy: {
      '/api': {
        target: 'http://172.24.27.0:8082',
      },
    },
    hot: true,
    historyApiFallback: {
      rewrites: [...rewrite],
    },
    writeToDisk: true,
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  resolve: {
    modules: [path.resolve(__dirname, './node_modules')],
    alias: {
      '@src': path.join(__dirname, './src'),
      '@assets': path.resolve(__dirname, './static'),
    },
    extensions: ['.jsx', '.js', '.json', '.ts'],

  },
  // devtool:'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      name: 'common~base',
      chunks: 'all',
      minChunks: 2,
      hidePathInfo: true,
      minSize: 20000,
    },
  },
};
