/*
 * @Author: geping.chen
 * @Date: 2020-05-23 15:57:51
 * @LastEditTime: 2020-05-23 17:10:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \provice-city-selected\webpack.config.js
 */ 

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, "./example/src/index.html"),
	filename: "./index.html"
});

module.exports = {
	entry: path.join(__dirname, "./example/src/app.js"),
	output: {
		path: path.join(__dirname, "example/dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: "babel-loader",
			exclude: /node_modules/
        },
        {
            test: /\.less$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    strictMath: true,
                  },
                },
              },
            ],
          },]
	},
	plugins: [htmlWebpackPlugin],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devServer: {
		port: 3001
	}
};