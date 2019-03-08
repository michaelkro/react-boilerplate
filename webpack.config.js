const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'react-boilerplate',
        template: 'src/index.html'
      })
    ]
  }
]);

const productionConfig = merge([
  parts.clean(PATHS.build),
  parts.extractCSS({ use: 'css-loader' }),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.loadJavaScript({
    exclude: /node_modules/
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
  parts.minifyJavaScript(),
  {
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js'
    }
  },
  {
    optimization: {
      splitChunks: {
        chunks: 'initial'
      },
      runtimeChunk: {
        name: 'manifest'
      }
    }
  }
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT
  }),
  parts.loadCSS(),
  parts.generateSourceMaps({ type: 'eval-source-map' }),
  parts.loadJavaScript({
    exclude: /node_modules/
  })
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
