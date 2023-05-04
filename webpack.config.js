import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const entry = './src/main.ts';
export const devtool = 'inline-source-map';
export const module = {
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
                limit: 80 * 1024,
                name: '[hash:10].[ext]',
                outputPath: 'static/img',
                esModule: false, // 默认使用es6语法解析，html-loader使用的是commonjs语法引入，但2020年09月24日不用关闭url-loader的es6解析方法。
            },
        },
    ],
};
export const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
};
export const output = {
    filename: '[name].bundle.js',
    // eslint-disable-next-line no-undef
    path: _resolve(__dirname, 'dist'),
    clean: true,
};
export const devServer = {
    static: './dist',
};
export const plugins = [
    new HtmlWebpackPlugin({
        title: 'dev',
    }),
];
export const optimization = {
    runtimeChunk: 'single',
};
export const mode = 'development';