module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    "@typescript-eslint/no-unused-vars": 'error',
    'no-return-assign': 0,
    'no-console': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': false,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/prop-types': false,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
