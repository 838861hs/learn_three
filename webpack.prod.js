const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const outputFile = "[name]";

module.exports = merge(common(outputFile), {
  mode: "production",
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new OptimizeCssPlugin()],
  },
});
