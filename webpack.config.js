const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'aiUtils',
      type: 'umd',
      umdNamedDefine: true,
    },
  }
}
