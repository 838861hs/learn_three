const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const entries = WebpackWatchedGlobEntries.getEntries([
  path.resolve(__dirname, "./src/js/**/*.js"),
])();

const htmlGlobPlugins = (entries, srcPath) => {
  return Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        inject: "body",
        filename: `${key}.html`,
        template: `${srcPath}/${key}.html`,
        chunks: [key],
      })
  );
};
module.exports = (outputFile) => ({
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `./js/${outputFile}.js`,
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
      //Shader
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: "asset/source",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: `./css/${outputFile}.css`,
    }),
    new WebpackWatchedGlobEntries(),
    ...htmlGlobPlugins(entries, "./src"),
  ],
  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "src/scss/"),
      "@imgs": path.resolve(__dirname, "src/images/"),
    },
    extensions: [".js", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
});
