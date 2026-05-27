module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 放宽部分严格规则以适应游戏开发场景
    'no-console': 'off',
    'no-alert': 'off',
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
    }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'import/no-unresolved': 'off',
  },
  globals: {
    AudioContext: 'readonly',
    webkitAudioContext: 'readonly',
  },
};
