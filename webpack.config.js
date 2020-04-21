const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин

module.exports = {
  entry: { main: [
                    './src/script/Card.js',
                    './src/script/CardList.js',
                    './src/script/Popup.js',
                    './src/script/PopupAdd.js',
                    './src/script/PopupEdit.js',
                    './src/script/PopupPhoto.js',
                    './src/script/PopupAvatar.js',
                    './src/script/UserInfo.js',
                    './src/script/FormValidator.js',
                    './src/script/FormValidatorAdd.js',
                    './src/script/FormValidatorEdit.js',
                    './src/script/FormValidatorAvatar.js',
                    './src/script/Api.js',
                    './src/script/script.js'
                ] },
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
            use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
            test: /\.(woff|woff2)$/i,
            use: [
                'file-loader?name=../dist/fonts/[name].[ext]',
                {
                    loader: 'file-loader',
                },
            ],
        },
        {
            test: /\.(png|jpg|gif|ico|svg)$/i,
            use: [
                'file-loader?name=../dist/images/[name].[ext]',
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
        filename: 'index.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};