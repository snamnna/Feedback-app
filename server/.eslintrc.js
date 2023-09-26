module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:import/warnings",
    "plugin:jest-extended/all",
    "plugin:prettier/recommended",
  ],
  plugins: ["jest", "import", "jest-extended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
    "prettier/prettier": "warning",
    "jest/valid-expect": [
      "error",
      {
        maxArgs: 2,
      },
    ],
  },
};
