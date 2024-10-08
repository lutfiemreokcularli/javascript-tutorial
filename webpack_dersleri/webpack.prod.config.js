const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpeck = require('webpack');


module.exports = merge(common, {
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    plugins: [,new webpeck.ProgressPlugin(),new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            minifyURLs: true,
            removeComments: true,
            removeAttributeQuotes: true
        }
    }), new MiniCssExtractPlugin({
        filename: "[name].[fullhash:4].css"
    })],
    mode: 'production',
    optimization: {
        minimize:true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            }),

        ],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                /* test: /\.css$/i,
                use: ["style-loader", "css-loader"], */
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    //"style-loader",
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
})