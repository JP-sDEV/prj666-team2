// Note: using legacy format, refer to: https://github.com/eslint/eslint/issues/19322#issuecomment-2585395558

module.exports = {
  extends: ['next/core-web-vitals', 'next', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    jest: true,
    node: true,
    browser: true,
  },
  globals: {
    globalThis: true,
  },
  //   ESLint rules, refer: https://eslint.org/docs/latest/rules/
  rules: {
    'no-unused-vars': [2, { varsIgnorePattern: '^(NextAuth|Session|Profile|JWT)$' }],
    'no-const-assign': 2,
    'no-dupe-else-if': 2,
    'no-dupe-keys': 2,
    'no-duplicate-imports': 1,
    semi: 1,
  },
};
