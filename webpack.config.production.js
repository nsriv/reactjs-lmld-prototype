var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'./app/index.js'
	],
	output: {
		path: __dirname + '/build',
		filename: "index_bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] },
            { test: /\.scss$/, loader: 'style!css!sass' },
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
};