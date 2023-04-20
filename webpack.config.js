const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'dev',
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
    },
    mode: 'development'
};


// module.exports = {
//     mode: 'development',
//     entry: './src/main.ts',
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//         ],
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//         clean: true,
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js'],
//     },
//     devtool: 'inline-source-map',
//     devServer: {
//         static: './dist',
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             title: 'dev',
//         }),
//     ],
//     optimization: {
//         runtimeChunk: 'single',
//     },
// }