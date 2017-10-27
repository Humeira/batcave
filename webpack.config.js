const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        './app.js',
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'dist.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },

    plugins: [
        new Dotenv()
    ]
};