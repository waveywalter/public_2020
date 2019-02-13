var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
console.log("PRODUCTION")
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/app'],
    entry:path.join(__dirname, 'src', 'index.js'),
    resolve: {
        extensions: ['.js', '.vue','styl'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
          }
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
                use: ['vue-style-loader', 'css-loader'] ,// BOTH are needed!
                include:[path.resolve(__dirname,'public/assets/')]
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
    new GenerateSW()
    ],
    devServer: {
        historyApiFallback: true,
        proxy:{
            "/upload":"http://localhost:3344"

        },headers:{
            'Service-Worker-Allowed': true
        },
        disableHostCheck: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    },

    
}