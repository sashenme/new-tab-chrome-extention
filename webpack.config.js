const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin');
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "development", 
  devtool: 'cheap-module-source-map',
  entry: path.resolve("./src/App.tsx"),
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              indent: 'postcss',
              plugins: [tailwindcss, autoprefixer]
            }
          }
        }],
        test: /\.css$/,
      },{
        type: 'assets/resource',
        use: 'asset/resources',
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static/"),
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
