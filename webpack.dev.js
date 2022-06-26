const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common(), {
  mode: "development",
  devServer: {
    open: true,
    watchFiles: ["src/*"],
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
  ],
});
