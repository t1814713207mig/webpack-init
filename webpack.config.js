const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const glob = require('glob');

const getMpa = () => { 
    const entry = {};
    const htmlWebpackPlugins = [];
    const fileArr = glob.sync(path.join(__dirname, "./public/*.html"));
    fileArr.forEach((item) => {
        const match = item.match(/public\/(.*)\.html$/)
        const pagename = match && match[1];
        entry[pagename] = `./src/${pagename}.js`;
        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                template: path.join(__dirname, `./public/${pagename}.html`),
                filename: `${pagename}.html`,
                chunks: [pagename],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                }
            })
        );
    });
    return { entry, htmlWebpackPlugins };
}
const { entry, htmlWebpackPlugins } = getMpa();
module.exports = {
    entry,
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename:'js/[name]_[hash:6].js'
    },
    module: {
        rules: [
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
                        name: "[name]_[hash:6].[ext]",
                        outputPath: "iconfont/",
                        limit: 1024
                    }
                }
            },
            {
                test: /\.(png|jpe?g||gif|webp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "images/",
                        limit: 1024
                    }
                }
            },
            {
                test: /\.js$/,
                include:path.resolve(__dirname,'./src'),
                use: "babel-loader"
            }
        ]
    },
    plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins, new MiniCssExtractPlugin({
        filename: "css/[name]_[contenthash:6].css",
        chunkFilename:"[id].css"
    }), new ImageMinimizerPlugin({
        minimizerOptions: {
            plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                ['svgo',{plugins:[{removeViewBox:false}]}]
            ]
        }
    })],
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
    },
    resolve: {
        modules: [path.resolve(__dirname, './node_modules')],
        alias: {
            '@src': path.join(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./static"),
        },
        extensions: ['.js', '.jsx', '.json', '.ts'],
        
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    }
};