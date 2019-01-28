var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const {GenerateSW} = require('workbox-webpack-plugin');
console.log("PRODUCTIONNNNNNNNNNNN")
module.exports = {
    mode: 'production',
    entry: ['babel-polyfill', './src/app'],
    entry:path.join(__dirname, 'src', 'index.js'),
    resolve: {
        extensions: ['.js', '.vue','styl','.css']
    },
    output: {
        path: path.join(__dirname, 'src'),
        publicPath: '/',
		filename: "main.js"
      },
    module: { 
        rules: [
            {
                test: /\.vue?$/,
                //exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css/,
                use: ['style-loader','vue-style-loader', 'css-loader'] ,// BOTH are needed!
                include:[path.resolve(__dirname,'public/assets/'),]
              },
              {
                test: /\.styl$/,
                use:['css-loader','stylus-loader']
              }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new GenerateSW(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery'",
        "window.$": "jquery"
    })
    ],
    devServer: {
        historyApiFallback: true,
        proxy:{
            "/upload":"http://localhost:3344"

        },headers:{
            'Service-Worker-Allowed': true
        },
        disableHostCheck: true,   // That solved it
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
    
}