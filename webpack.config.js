const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        //入口  key: value 的形式  key是打包出来的bundlejs的名字，在dist文件下可以看到
        // index: './src/index.js',
        // print: './src/print.js',

        app: './src/index.js',

        // 热模块更换时的运行代码
        hot: 'webpack/hot/dev-server.js',
        // 开发环境 用于web socket【web连接】 传输 热更新 以及live reload
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',

        // another: './src/another-module.js',

        // index: {
        //     import: './src/index.js',
        //     dependOn: 'shared',
        // },
        // another: {
        //     import: './src/another-module.js',
        //     dependOn: 'shared',
        // },
        // shared: 'lodash',
    },
    //【源码映射】 设置 devtool: eval 具有最好的性能，但并不能帮助那你转译代码  
    devtool: 'inline-source-map',
    // 以上配置告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下。
    devServer: {
        // 该配置项允许配置从目录提供静态文件的选项
        static: './dist',
        hot: true,
        client: false,
    },
    output: {
        // 输出文件
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        // 转换url中的相对路径的(  设置的是 打包资源存放的位置（打包内容是存放在内存中） )
        publicPath: '/',
    },
    // optimization  优化配置
    optimization: {
        // 告知 webpack 当选择模块 id 时需要使用哪种算法。deterministic被哈希转化成的小位数值模块名。
        moduleIds: 'deterministic',
        // runtimeChunk: true 为每个入口添加一个只含有 runtime 的额外 chunk
        runtimeChunk: 'single',      // "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
        // SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
        splitChunks: {
            // 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    //把第三方库单独提取出来【这样子做的作用也能减少主文件index的大小】
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    },
    plugins: [
        //清除dist文件夹
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development'
        }),
        new webpack.HotModuleReplacementPlugin(),

        // 分析包大小
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsOptions: null,
        //     logLevel: 'info'
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.js$/,
                // 仅将loader应用在实际需要的其转换的模块
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
        ]
    }
}