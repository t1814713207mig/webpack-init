const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const getMpa = require('./getMpa.js');
const { htmlWebpackPlugins,rewrite } = getMpa();
module.exports = {
    mode: 'development',
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
        ]
    },
    plugins: [...htmlWebpackPlugins,new MiniCssExtractPlugin({
        filename: "css/[id]_[contenthash:6].css",
        chunkFilename:"[id].css"
    }), new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: false,
        port: 8081,
        open: true,
        host: '127.0.0.1',//如需通过本地ip访问需要配置host
        proxy: {
            '/api': {
                target:'http://172.24.27.0:8082'
            }
        },
        hot: true,
        historyApiFallback: {
            rewrites: [...rewrite]
        },
    },
    devtool:'source-map',
};