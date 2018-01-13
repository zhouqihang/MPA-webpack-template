module.exports = {
    // 页面配置
    page: {
        // 首页
        index: {
            // 入口文件
            entry: './src/index.js',
            // 模板文件
            template: './src/index.html',
            // 生成文件名
            filename: 'index.html',
            // 文件参数
            params: [
                { key: 'title', value: 'home page' }
            ],
            // 引用打包文件
            chunks: ['index']
        },
        article: {
            entry: './src/news.js',
            template: './src/news.html',
            filename: 'news.html',
            params: [
                { key: 'title', value: 'news page' }
            ],
            chunks: ['news']
        }
    },
    // 输出配置
    output: {
        // 输出打包文件夹名
        dirname: 'dist',
        // 输出文件名
        filename: '[name].js',
        // 公开路径
        publicPath: '/'
    },
    // CSS文件名
    cssFileName: 'styles.css',
    // 公共模块文件名
    chunkFilename: '[name].js',
    // 公共文件打包重复数量
    minChunks: 2
}