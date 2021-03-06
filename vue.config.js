const webpack = require('webpack');
const path = require('path');
const merge = require('lodash/merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    publicPath: '',// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: 'static',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    pages: {//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
        index: {//除了 entry 之外都是可选的
            entry: 'src/main.js',// page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            template: 'public/index.html',// 模板来源
            filename: 'index.html',// 在 dist/index.html 的输出
            title: 'Index Page',// 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
            chunks: ['chunk-vendors', 'chunk-common', 'index','common','elementui'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor
        },
        // subpage: 'src/subpage/main.js'//官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
    },
    lintOnSave: true,// 是否在保存的时候检查
    productionSourceMap: true,// 生产环境是否生成 sourceMap 文件
    css: {
        extract: true,// 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false,// 开启 CSS source maps
        loaderOptions: {},// css预设器配置项
        requireModuleExtension: true// 启用 CSS modules for all css / pre-processor files.
    },
    devServer: {// 环境配置
        host: 'localhost',
        port: 9011,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        // devtools: "source-map",
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
            '/api': {
                target: 'http://localhost:8088',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/foo': {
                target: '<other_url>'
            }
        }
    },
    pluginOptions: {// 第三方插件配置
        // ...
    },
    configureWebpack: (config) => {
        console.log("process.env.NODE_ENV =", process.env.NODE_ENV);
        let common = {
            devtool: 'source-map',
            optimization:{
                splitChunks: {
                    minSize: 30000,
                    cacheGroups: {
                        elementui: {
                            test: /[\\/]node_modules[\\/](vue|element-ui)/,
                            name: 'elementui',
                            priority: 10,
                            minChunks: 1,
                            chunks: 'all',
                            reuseExistingChunk: true
                        },
                        common: {
                            test: /[\\/]node_modules/,
                            name: 'common',
                            priority: 9,
                            minChunks: 1,
                            chunks: 'all',
                            reuseExistingChunk: true
                        },
                    }
                },
                minimizer: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            warnings: false,
                            compress: {
                                drop_console: true, // console
                                drop_debugger: false,
                                pure_funcs: ['console.log'] // 移除console
                            }
                        }
                    }),
                ]
            },
        };
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
            // 为生产环境修改配置...
            return merge(common,{
                plugins:[
                    new webpack.ProvidePlugin({
                        $: "jquery",
                        jQuery: "jquery",
                        "windows.jQuery": "jquery"
                    }),
                    new CompressionWebpackPlugin({
                        algorithm: 'gzip',
                        // test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        test: /\.js$|\.html$|\.css/,
                        threshold: 5120,
                        minRatio: 0.8,
                        deleteOriginalAssets: false
                    }),
                    new webpack.DllReferencePlugin({
                        context: process.cwd(),
                        manifest: require('./public/vendor/vendor-manifest.json')
                    }),
                    // 将 dll 注入到 生成的 html 模板中
                    new AddAssetHtmlPlugin({
                        // dll文件位置
                        filepath: path.resolve(__dirname, './public/vendor/*.js'),
                        // dll 引用路径
                        publicPath: './vendor',
                        // dll最终输出的目录
                        outputPath: './vendor'
                    }),
                ]
            });
        } else {
            // 为开发环境修改配置...
            config.mode = 'development'
        }
    },
};
