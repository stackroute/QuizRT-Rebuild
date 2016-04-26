module.exports = {
  entry: __dirname + '/common-ui/app.jsx',
  output: {
    filename: __dirname + '/common-ui/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: __dirname + '/node_modules'
      }
    ]
  },
  resolve: {
    extensions: ['','.js','.jsx']
  }
}