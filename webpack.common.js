const path = require('path');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { page, output, cssFileName } = require('./config');

let entry = {};
let HWPs = [];
for (let k in page) {
    entry[k] = page[k].entry;
    let HWP = {
        template: page[k].template,
        filename: page[k].filename || `${k}.html`,
        chunks: page[k].chunks || [k],
    };
    if (page[k].params) {
        page[k].params.forEach(item => {
            HWP[item.key] = item.value;
        })
    }
    HWPs.push(new HtmlWebpackPlugin(HWP))
}

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, output.dirname || 'dist'),
        filename: output.filename || '[name].bundle.js',
        // 资源开放目录
        publicPath: output.publicPath || '/'
    },
    plugins: [
        // 打包前，清理dist文件夹
        new ClearWebpackPlugin(['dist']),
        // 使用html-webpack-plugin插件生成HTML文件
        // new HtmlWebpackPlugin({
        //     template: './src/index/index.html',
        //     chunks: ['index']
        // }),
        // new HtmlWebpackPlugin({
        //     template: './src/article/index.html',
        //     filename: 'article.html',
        //     chunks: ['article']
        // }),
        // CSS分离
        new ExtractTextPlugin(cssFileName || "styles.css"),
    ].concat(HWPs),
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?minimize"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader?minimize',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(png|svg|gif|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}