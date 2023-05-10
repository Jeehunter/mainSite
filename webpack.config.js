
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                // 处理图片文件的规则安装指令：cnpm i url-loader file-loader  -D
                test: /\.(png|jpe?g|gif|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 80 * 1024, // 当图片小于80kb时采用base64的方式打包，大于则以图片形式打包。
                    name: '[hash:10].[ext]', // 每次webpack构建打包会生成一串不重复的hash码，[hash:10]则是去hash的前十位，[ext]取源文件的后缀名。
                    outputPath: 'static/img', // 输出目录，output定义了输出目录为build，此处图片输出目录为build/static/img/XXX文件。
                    esModule: false, // 默认使用es6语法解析，html-loader使用的是commonjs语法引入，但2020年09月24日不用关闭url-loader的es6解析方法。
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
    },
    mode: 'development'
};