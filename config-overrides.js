
const webpack = require('webpack');
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "path": require.resolve("path-browserify")
  })
  config.resolve.fallback = fallback;
  config.module.rules = [
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    },
    // {
    //   test: /\.(tsx)$/,
    //   // exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         compact: false,
    //         presets: [["es2015", { "modules": false, "loose": true }], 'react']
    //       }
    //     }
    //   ]
    // },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }
  ];
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  return config;
}
