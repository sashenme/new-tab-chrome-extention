const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/App.tsx",
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/assets/manifest.json"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new HtmlPlugin({
      title:"ReactJs Boilerplate",
      filename: "newtab.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
  },
};
