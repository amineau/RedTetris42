var path = require('path');

module.exports = {
  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets: ["es2015", "react", "stage-0"]
      }
    }, {
      test: /\.css/,
      loaders: ['style', 'css'],
      include: path.join(__dirname, 'src/client/style')
    },
    {
        test: /\.(ttf)$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
    },{
      test: /\.png$/, loader: "url-loader"
    }]
  }
};
