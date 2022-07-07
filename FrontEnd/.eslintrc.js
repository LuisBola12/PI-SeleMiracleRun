module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-unused-vars': [
      'warn'
    ],
    indent: [
      'error',
      2
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      2,
      'always'
    ],
    'space-in-parens': [
      2,
      'always'
    ],
    'object-curly-spacing': [
      2,
      'always'
    ],
    'keyword-spacing': 'warn',
    'space-infix-ops': 'warn'
  }
};
