const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const loaderPlugin = new VueLoaderPlugin();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackPlugin = new HtmlWebpackPlugin({
  template: "index.html",
});

module.exports = {
  entry: "./src/main.ts",
  plugins: [
    loaderPlugin,
    webpackPlugin,
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  context: __dirname,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "img-loader",
          "svg-inline-loader",
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
            ],
          },
        },
      },
      {
        test: /\.vue$/,
        use: [
          "vue-loader",
          "img-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
