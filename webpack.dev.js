const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

module.exports = {
	entry: './src/index.ts',
	module: {
		rules: [
			{ test: /\.ts(x?)$/, loader: 'ts-loader' }, 		
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'env',
							{
								modules: false
							}
						]
					]
				},

				test: /\.js$/
			},
			{
				test: /\.(scss|css)$/,

				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [ 
		new HtmlWebpackPlugin({
		  inject: false,
		  hash: true,
		  template: 'src/index.html',
		  filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: `src/[name].css`
		  }),
	  ],

	mode: 'production',

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8080
	  }
};
