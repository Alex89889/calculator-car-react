const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Loan Calculator",
            template: "src/index.html"
        }),
   ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
				options: {
                presets: ['@babel/preset-env',
                          '@babel/react',
                            {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                            },
                          ],
				}
            }
        ]
    }
};


