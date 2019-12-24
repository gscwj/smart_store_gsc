const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    publicPath: '',// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: 'static',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    /*pages: {//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
        index: {//除了 entry 之外都是可选的
            entry: 'src/main.js',// page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            template: 'public/index.html',// 模板来源
            filename: 'index.html',// 在 dist/index.html 的输出
            title: 'Index Page',// 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
            chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
        },
        // subpage: 'src/subpage/main.js'//官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
    },*/
    lintOnSave: true,// 是否在保存的时候检查
    productionSourceMap: true,// 生产环境是否生成 sourceMap 文件
    css: {
        extract: true,// 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false,// 开启 CSS source maps
        loaderOptions: {},// css预设器配置项
        modules: false// 启用 CSS modules for all css / pre-processor files.
    },
    devServer: {// 环境配置
        host: 'localhost',
        port: 9011,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        // devtools: "source-map",
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
            '/api':{
              target: 'http://localhost:3000',
              secure: false,
              changeOrigin: true,
              pathRewrite:{
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
    /*configureWebpack: {
        devtool: 'source-map',
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },*/
    configureWebpack: (config) => {
        console.log("process.env.NODE_ENV =",process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
            // 将每个依赖包打包成单独的js文件
            let optimization = {
                runtimeChunk: true,
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 4800,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name (module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`
                            }
                        }
                    }
                },
                minimizer: [new UglifyPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true, // console
                            drop_debugger: false,
                            pure_funcs: ['console.log'] // 移除console
                        }
                    }
                })]
            };
            Object.assign(config, {
                optimization
            })
        }
        else {
            // 为开发环境修改配置...
            config.mode = 'development'
        }
        /*Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components'),
                    '@p': path.resolve(__dirname, './src/pages')
                } // 别名配置
            }
        })*/
    },
};
