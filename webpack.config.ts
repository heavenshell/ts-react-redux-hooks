import { Configuration } from 'webpack'

// Plugins
import { default as HtmlWebpackPlugin } from 'html-webpack-plugin'
import { default as MiniCssExtractPlugin } from 'mini-css-extract-plugin'
import { default as TerserPlugin } from 'terser-webpack-plugin'
import { default as OptimizeCSSAssetsPlugin } from 'optimize-css-assets-webpack-plugin'

// eslint-disable-next-line
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin')

const config: Configuration = {
  devtool: 'source-map',
  entry: {
    app: `${__dirname}/src/App.tsx`,
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            // import the antd theme, webpack build show .bezierEasingMixin error ?
            // https://github.com/ant-design/ant-design/issues/7927
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  performance: { hints: false },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new TsConfigWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}

export default config
