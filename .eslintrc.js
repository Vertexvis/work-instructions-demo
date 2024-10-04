module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"], //, "react", "simple-import-sort", "react-hooks"],
  rules: {
    //   "no-await-in-loop": "warn",
    //   "no-return-await": "warn",
    //   "react/react-in-jsx-scope": "off",
    //   "react-hooks/rules-of-hooks": "error",
    //   "require-await": "warn",
    //   "simple-import-sort/imports": "warn",
  },
  settings: { react: { version: "detect" } },
};
