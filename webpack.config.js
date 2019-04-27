const path = require('path');

const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		content: path.resolve(__dirname, 'src/browser/Content.ts'),
		background: path.resolve(__dirname, 'src/browser/Background.ts')
	},
	output: {
		path: path.join(__dirname, '/dist'),
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
