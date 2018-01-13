const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    // 错误调试工具
    devtool: 'inline-source-map',
    // webpack-dev-server,用于热更新
    devServer: {
        contentBase: './dist'
    },
})