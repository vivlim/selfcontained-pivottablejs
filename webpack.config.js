const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default; // unused?
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // Exposes jquery to the global browser scope
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
      {
        // Applies css directly to the fore<head>
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
  resolve: {
    alias: {
      "plotly.js": "plotly.js-cartesian-dist",
    },
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // Embeds js bundle directly in html instead of a separate file
    new HtmlInlineScriptPlugin(),
    // i'm not sure i'm actually using this anymore
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new NodePolyfillPlugin({
      additionalAliases: ['process']
    }),
    // Exposes jquery to other modules, such as jquery-ui and pivottable itself
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
};