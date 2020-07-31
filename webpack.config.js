const {resolve} = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  mode: 'development',
  entry: {
    detail: './src/pages/detail/detail.js',
    search: './src/pages/search/search.js',
    main: './src/pages/main/index.js',
    user: './src/pages/user/user.js',
    follows: './src/pages/follows/follows.js'
  },
  output: {
    filename: 'static/js/[name].js',
    path: resolve(__dirname,'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'static/search.html',
      template: './src/pages/search/search.html',
      chunks: ['search']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/main/main.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'static/detail.html',
      template: './src/pages/detail/detail.html',
      chunks: ['detail']
    }),
    new HtmlWebpackPlugin({
      filename: 'static/user.html',
      template: './src/pages/user/user.html',
      chunks: ['user']
    }),
    new HtmlWebpackPlugin({
      filename: 'static/follows.html',
      template: './src/pages/follows/follows.html',
      chunks: ['follows']
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
  },
  devtool: 'cheap-module-eval-source-map'
}