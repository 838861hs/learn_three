const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      {
        //babelとeslintの設定
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        //sassの設定
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        //cssで追加した画像設定
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "src/scss/"),
      "@imgs": path.resolve(__dirname, "src/images/"),
    },
    extensions: [".js", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
});
