var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: [path.resolve(ROOT_PATH, 'app/main.jsx')],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ],
  },
};

if(TARGET === 'build') {
  module.exports = merge(common, {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel?stage=1',
          include: path.resolve(ROOT_PATH, 'app'),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This will have an effect on the React lib size
          'NODE_ENV': JSON.stringify('production'),
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
      }),
      new HtmlWebpackPlugin({
        title: 'Kanban app'
      }),
    ],
  });
}

if(TARGET === 'dev') {
  var IP = '0.0.0.0';
  var PORT = 8080;

  module.exports = merge(common, {
    ip: IP,
    port: PORT,
    entry: [
      'webpack-dev-server/client?http://' + IP + ':' + PORT,
      'webpack/hot/only-dev-server',
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel', 'flowcheck', 'babel?stage=1$blacklist=flow'],
          include: path.resolve(ROOT_PATH, 'app'),
        },
      ],
    },
    output: {
      path: __dirname,
      filename: 'bundle.js',
      publicPath: '/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin(),
    ],
  });
}


