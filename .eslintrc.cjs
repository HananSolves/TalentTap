module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb/hooks", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "warn",
    semi: ["error", "always"],
    indent: ["error", 2],
    "no-unused-vars": ["warn"],
  },
};
