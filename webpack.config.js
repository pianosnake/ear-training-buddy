const path = require('path');

const js = {
  entry: './js/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  }
};

module.exports = [ js ];
