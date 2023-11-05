module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript'],
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-floating-promises': 'off'
    // // '@typescript-eslint/no-undef-init': 'error',
    // '@typescript-eslint/unused-import': 'error'
  }
};
