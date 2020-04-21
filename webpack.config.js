const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин

module.exports = {
  entry: { main: './src/script/script.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
// указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader"
            },
        },
        {
            test: /\.css$/,
            use:  [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.(png|jpe?g|gif|woff|woff2)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
        {
            test: /\.(png|jpe?g|gif|ico|svg)$/i,
            use: [
                'file-loader?name=../images/[name].[ext]',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true, 
                        disable: true, 
                    },
                },
            ],
        }        
    ]
  },
  plugins: [ 
    new MiniCssExtractPlugin({
        filename: './src/pages/index.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};