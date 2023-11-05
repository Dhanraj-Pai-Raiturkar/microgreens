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
    ecmaVersion: 'latest',module.exports = {
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
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/await-thenable': 'off'
        // // '@typescript-eslint/no-undef-init': 'error',
        // '@typescript-eslint/unused-import': 'error'
      }
    };
    
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/return-await': 'off'
    // // '@typescript-eslint/no-undef-init': 'error',
    // '@typescript-eslint/unused-import': 'error'
  }
};
