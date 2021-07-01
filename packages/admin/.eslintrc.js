module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-underscore-dangle': 'off',
    'react/self-closing-comp': 'error',
  },
};
