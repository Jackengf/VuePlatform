var webpack = require('webpack');
var path = require('path'); 
var SRC_PATH = path.resolve(__dirname,'./src');
var DIST_PATH = path.resolve(__dirname,'./dist');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
    module.exports={
        //配置入口文件
        entry:SRC_PATH +'/main.js',
        //配置入口文件输出位置
        output:{
            path:DIST_PATH, //项目根路径
            filename:'[name].js'
        },
        resolve: {
            //别名
            alias: {
            // 'vue$': 'vue/dist/vue.esm.js'
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        //配置模块加载器
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                    'vue-style-loader',
                    'css-loader'
                    ]
                }, 
                {
                    test:/\.vue$/, //所有以.vue结尾的文件都由vue-loader加载
                    use:'vue-loader'
                },
                {
                    test:/\.js$/, //所有以.js结尾的文件都由babel-loader加载，除了node_modules以外
                    use:'babel-loader',
                    exclude:/node_modules/
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [{
                        loader:'url-loader',
                        options: {
                            limit: 10000,
                            name: "fonts/[name].[hash:5]"
                        }
                    }]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use:[{
                        loader:'url-loader', //是指定使用的loader和loader的配置参数
                        options:{
                            name: "[name].[hash:5]",
                            limit:1024, //是把小于1024B的文件打成Base64的格式，写入JS
                        }
                    }]
                }
            ]
        },
        // 开发服务器 
        devServer: { 
            hot: true, // 热更新，无需手动刷新 
            contentBase: path.resolve(__dirname, './dist/'),  //热启动文件所指向的文件路径
            host: '0.0.0.0', // host地址 
            port: 8085, // 服务器端口 
            historyApiFallback: true, // 该选项的作用所用404都连接到index.html 
            publicPath:'/', //默认设置
            proxy: { 
            "/api": "http://localhost:3000" 
            // 代理到后端的服务地址，会拦截所有以api开头的请求地址
             } ,
            useLocalIp: true ,
            // open:true,
            // noInfo:true
        },
        // 插件
        plugins: [
            new VueLoaderPlugin(),
            new htmlWebpackPlugin({
                    filename: path.resolve(DIST_PATH,'index.html'), //打包后的文件名
                    title: '树鱼虚拟充值生态服务平台',  //打包后的页面title
                    template: path.resolve(__dirname,'index.html'),  //打包的模板文件
                    inject: true,
                    hash: true,
                    favicon: path.resolve(__dirname, 'favicon.ico')
            }),
            new webpack.DefinePlugin({
                    'sceneParam': JSON.stringify(process.env.scene),
                    'laney':JSON.stringify('laney'),
                    'test':'"kkkkk"'
            })
        ]

    }