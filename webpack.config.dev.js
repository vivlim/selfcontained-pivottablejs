const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { 
                insert: 'head', // insert style tag inside of <head>
                injectType: 'singletonStyleTag' // this is for wrap all your style in just one style tag
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlInlineScriptPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
};