const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { chunkFilename, minChunks } = require('./config');

module.exports = merge(common, {
    output: {
        chunkFilename: chunkFilename || '[name].bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        // 定义生产环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // 压缩合并代码
        new UglifyJSPlugin(),
        // 公共资源名称
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: minChunks || 2
        })
    ]
})