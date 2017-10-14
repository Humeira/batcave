const path = require('path');
const webpack = require('webpack');


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
        new webpack.DefinePlugin( {
            'process.env': {
                'REACT_APP_GITHUB_API_URL': JSON.stringify('https://api.github.com/users'),
                'REACT_APP_GITHUB_USERNAME': JSON.stringify('Humeira')
            }
        })
    ]

};