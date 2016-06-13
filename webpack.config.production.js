var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: __dirname + '/common-ui/app.jsx',
  output: {
    filename: __dirname + '/common-ui/static/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  externals: {
    "React": "React"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
  ],
  resolve: {
    extensions: ['','.js','.jsx']
  }
}