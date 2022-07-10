module.exports = {
  'env': {
    'browser': false,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'no-unused-vars': [
      'warn'
    ],
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
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