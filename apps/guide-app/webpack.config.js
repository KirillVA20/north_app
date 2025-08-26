const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/guide-app'),
    filename: 'main.js', // Фиксированное имя файла
    clean: true,
  },
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      optimization: false,
      extractLicenses: false,
    }),
  ],
};
