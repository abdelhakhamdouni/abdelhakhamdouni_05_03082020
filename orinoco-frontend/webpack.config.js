const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

let config = {
    entry: {
        main: "./src/controllers/index.js",
        panier: "./src/controllers/panier.page.js",
        product: "./src/controllers/product.page.js",
        order: "./src/controllers/order.page.js",
        confirm: "./src/controllers/confirm.page.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        },
        {
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'postcss-loader'],
            })
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'images',
            },

        },
        {
            test: /\.ejs$/,
            loader: 'ejs-loader',
            options: {
                esModule: false
            }
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // cleans output.path by default
        new ExtractTextWebpackPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: './src/views/index.ejs',
            inject: 'body',
            chunks: ['main'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/views/panier.ejs',
            inject: 'body',
            chunks: ['panier'],
            filename: 'panier.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/views/product.ejs',
            inject: 'body',
            chunks: ['product'],
            filename: 'product.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/views/confirm.ejs',
            inject: 'body',
            chunks: ['confirm'],
            filename: 'confirm.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/views/order.ejs',
            inject: 'body',
            chunks: ['order'],
            filename: 'order.html'
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
    },
    devtool: "eval-source-map",
    node: {
        child_process: 'empty',
        fs: 'empty',
        module: 'empty',
    },
}


module.exports = config;