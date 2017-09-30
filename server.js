const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/build'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'dist.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Listening at http://localhost:'+port);
});