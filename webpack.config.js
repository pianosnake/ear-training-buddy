const path = require('path');

const js = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  }
};

module.exports = [ js ];
