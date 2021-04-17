const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const getMpa = require('./getMpa.js');
const { htmlWebpackPlugins } = getMpa();
module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath:"../",
                    }
                },"css-loader","postcss-loader"]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath:"../",
                    }
                },"css-loader","postcss-loader","less-loader"]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: {
                    // 虽然使用url-loader代替file-loader，但需要下载file-loader插件
                    loader: "url-loader",
                    options: {
                        name: "[name]_[contenthash:6].[ext]",
                        outputPath: "iconfont/",
                        limit: 1024
                    }
                }
            },
            {
                test: /\.(png|jpe?g||gif|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: "[name]_[contenthash:6].[ext]",
                            outputPath: "images/",
                            limit: 1024
                        }
                    }
                ],
            },
            {
                test: /\.jsx$/,
                include:path.resolve(__dirname,'../src'),
                use: "babel-loader"
            }
        ]
    },
    plugins: [...htmlWebpackPlugins, new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:6].css",
        chunkFilename:"[name].[contenthash:6].css"
    })],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new UglifyJsPlugin({
                test: /\.js$/i,
            })
        ],
        splitChunks: {
            name: 'common~base',
            chunks: 'all',
            minChunks: 2, //模块被引用2次以上的才抽离
            hidePathInfo: true,
            minSize: 20000,
        }
    },
    performance: {
        hints: false,//给定一个创建后超过 250kb 的资源不展示警告或错误提示。
    },
};