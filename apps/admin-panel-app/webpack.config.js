const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { composePlugins, withNx } = require('@nx/webpack');

const withDefaultConfig = () => {
  const isDev = true;

  return (config) => ({
    mode: isDev ? 'development' : 'production',
    entry: config.entry,
    output: {
      filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
      publicPath: '/',
      clean: true,
      ...config.output,
    },
    devtool: isDev ? 'source-map' : 'hidden-source-map',
    devServer: {
      ...config.devServer,
      static: {
        directory: path.resolve(__dirname, 'src/app/public'),
      },
      historyApiFallback: true,
      hot: true,
    },
    cache: {
      type: 'filesystem',
      buildDependencies: { config: [__filename] },
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../../tsconfig.base.json'),
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: isDev,
              },
            },
          ],
        },
        {
          test: /\.module\.scss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[name]__[local]' : '[hash:base64:6]',
                },
                sourceMap: isDev,
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isDev },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /\.module\.scss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: isDev },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isDev },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/app/public/index.html'),
        minify: isDev
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
            },
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      }),
    ],
  })
}

module.exports = composePlugins(withNx(), withDefaultConfig());
