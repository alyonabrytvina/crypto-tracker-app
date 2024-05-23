module.exports = {
  extends: ['airbnb', 'airbnb-typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'no-spaced-func': 'off',
    'no-param-reassign': 0,
    'implicit-arrow-linebreak': 'off',
    'max-len': ['error', { code: 120 }],
    'no-console': 'off',
  },
};
