const _ = require('underscore');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sourcePath = path.join(__dirname, 'src');
const destinationPath = path.join(__dirname, 'dist');

const siteContext = require('./site.context.js');
const sitePaths = Object.keys(siteContext.pages);

module.exports = {

  entry: path.join(sourcePath, 'index.js'),

  output: {
    filename: 'bundle.js',
    path: destinationPath,
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|mp4)$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.ejs$/,
        use: [
          { loader: 'ejs-loader' }
        ]
      }
    ]
  },

  plugins: [
    ..._.map(sitePaths, sitePath => {
      const context = siteContext.pages[sitePath];
      const options = {
        filename: path.join(destinationPath, sitePath, 'index.html'),
        template: path.join(sourcePath, 'templates', 'index.ejs'),
        inject: false,
        title: context.title,
        baseUrl: siteContext.baseUrl,
        context
      };

      options.getContent = file => {
        const contentTemplate = fs.readFileSync(path.join(sourcePath, 'pages', file)).toString();
        return _.template(contentTemplate)({ htmlWebpackPlugin: { options }});
      }

      options.getPartial = file => {
        const partialTemplate = fs.readFileSync(path.join(sourcePath, 'partials', file)).toString();
        return _.template(partialTemplate)({ htmlWebpackPlugin: { options }});
      }

      options.getData = file => {
        return JSON.parse(fs.readFileSync(path.join(sourcePath, 'data', file)).toString());
      }

      return new HtmlWebpackPlugin(options);
    }),

    new CopyWebpackPlugin([{
      from: path.join(sourcePath, 'assets'),
      to: path.join(destinationPath, 'assets')
    }]),

    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ],

  devServer: {
    port: 3000
  }

};
