var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:path.join(__dirname, 'src', 'index.js'),
    resolve: {
        extensions: ['.js', '.vue',]
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
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css/,
                use: ['vue-style-loader', 'css-loader'] // BOTH are needed!
              }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        host:'0.0.0.0',
        disableHostCheck:true,
     //   https:true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
    
}