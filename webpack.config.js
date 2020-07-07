const {resolve} = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  mode: 'development',
  entry: {
    login: './src/pages/login/index.js',
    main: './src/pages/main/index.js'
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname,'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'login/login.html',
      template: './src/pages/login/login.html',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/main/main.html',
      chunks: ['main']
    })
  ],
  devServer: {
    open: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader'
      },
      {
        exclude: /\.(html|css|js|jpg|jpeg|gif|png)$/,
        loader: 'file-loader'
      }
    ]
  }
}