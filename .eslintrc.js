module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended"],
  rules: {
    indent: ["error", 2],
    "no-undef": 0,
    "no-unused-vars": 0,
  },
};
