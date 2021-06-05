module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    "@typescript-eslint/no-unused-vars": 'error',
    'no-return-assign': 0,
    'no-console': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
