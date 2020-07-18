const TsConfigWebpackPlugin = require('ts-config-webpack-plugin')

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
  ],
  webpackFinal: async(config, {configType}) => {
    config.module.rules.push(
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
      }

    )
    config.plugins.push(new TsConfigWebpackPlugin())
    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx')
    return config
  }
}
