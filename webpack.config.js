const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Add rules for other file types like CSS, images, etc.
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      // Configure caching strategies for app shell resources
      runtimeCaching: [
        {
          urlPattern: /\.(?:html|css|js)$/, // Cache HTML, CSS, and JavaScript files
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/, // Cache images
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
            },
          },
        },
        // Add more caching strategies for other types of resources as needed
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3003,
  },
};  