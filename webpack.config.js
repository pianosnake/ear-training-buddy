const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlStringReplace = require('html-string-replace-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: './src/index.html',
      path: path.resolve(__dirname, 'docs')
    }),
    new HtmlStringReplace({
      enable: true,
      patterns: [
        {
          //replace <script type="module"   with <script
          //so that this will work in Firefox. The bundled js is not a module.
          match: / type=\"module\" src=\"index.js\"\>/g,
          replacement: function(){
            return '>' + fs.readFileSync('docs/index.js', 'utf8');
          }
        }
      ]
    })
  ]
};