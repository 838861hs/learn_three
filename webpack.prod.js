const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common(), {
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new OptimizeCssPlugin()],
  },
});
