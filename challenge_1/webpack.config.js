const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.less$/i,
        loader: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      }
    ]
  }  
};