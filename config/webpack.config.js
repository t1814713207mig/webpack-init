const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');

module.exports = () => {
    if (process.env.NODE_ENV==='production') {
        return merge(baseConfig, prodConfig)
    } else {
        return merge(baseConfig, devConfig)
    }
}