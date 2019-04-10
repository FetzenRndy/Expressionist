const path = require('path');

const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        content_script: path.join(__dirname, 'src/content_script.ts'),
        background: path.join(__dirname, 'src/background.ts')
    },
    output: {
        path: path.join(__dirname, '/dist/js/'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        new copyWebpackPlugin([{
            from: path.join(__dirname, "assets")
        }])
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};