const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { main: ['./src/script/script.js'] },
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
            use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'postcss-loader'
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        },
        {
            test: /\.(png|jpе?g|gif|ico|svg)$/i,
            use: [
                'file-loader?name=./images/[name].[ext]',
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
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
    }),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};