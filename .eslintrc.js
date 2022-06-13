module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-undef": 0,
    "no-unused-vars": 0,
  },
};
