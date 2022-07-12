const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const outputFile = "[name]";

const bsConf = {
  start: "./dist/index.html",
};

module.exports = merge(common(outputFile), {
  mode: "development",
  devServer: {
    open: true,
    watchFiles: ["src/*"],
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
});
