const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const getMpa = () => { 
    const entry = {};
    const htmlWebpackPlugins = [];
    const fileArr = glob.sync(path.join(__dirname, "./public/*.html"));
    fileArr.forEach((item) => {
        const match = item.match(/public\/(.*)\.html$/)
        const pagename = match && match[1];
        // console.log(pagename);
        entry[pagename] = `./src/${pagename}.js`;
        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                template: path.join(__dirname, `./public/${pagename}.html`),
                filename: `${pagename}.html`,
                chunks: [pagename]
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
        filename:'[name]_[hash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader","css-loader","postcss-loader","less-loader"]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: {
                    // 虽然使用url-loader代替file-loader，但需要下载file-loader插件
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
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
                use:"babel-loader"
            }
        ]
    },
    plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins],
    devServer: {
        contentBase: false,
        port: 8081,
        open: true,
        host: '0.0.0.0',//如需通过本地ip访问需要配置host
        proxy: {
            '/api': {
                target:'http://172.24.27.0:8082'
            }
        },
        hot: true,
    },
};