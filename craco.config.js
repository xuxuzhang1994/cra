const CracoLessPlugin = require('craco-less');
const lessModuleRegex = /\.module\.less$/;

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#1DA57A'
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }, {
        plugin: CracoLessPlugin,
        options: {
            modifyLessRule: function () {
                return {
                    test: /\.module\.less$/,
                    exclude: /node_modules/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[local]_[hash:base64:6]',
                                },
                            },
                        },
                        {
                            loader: 'less-loader'
                        },
                    ],
                };
            },
        },
    }],
    //配置代理解决跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3010/",
                //target: 'http://192.168.9.19:8080',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}