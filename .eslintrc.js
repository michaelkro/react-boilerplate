module.exports = {
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: ['standard', 'react-app', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
