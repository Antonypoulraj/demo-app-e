const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const next = require("eslint-plugin-next");
const prettier = require("eslint-config-prettier");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      next: next,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  prettier,
  next.configs.recommended,
];

// // eslint.config.mjs
// import js from "@eslint/js";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import tsparser from "@typescript-eslint/parser";
// import next from "eslint-plugin-next";
// import prettier from "eslint-config-prettier";

// export default [
//   js.configs.recommended,
//   {
//     files: ["**/*.{js,ts,jsx,tsx}"],
//     languageOptions: {
//       parser: tsparser,
//       parserOptions: {
//         project: "./tsconfig.json",
//         ecmaVersion: "latest",
//         sourceType: "module",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tseslint,
//       next: next,
//     },
//     rules: {
//       "@typescript-eslint/no-unused-vars": "off",
//       "react/no-unescaped-entities": "off",
//     },
//   },
//   prettier,
//   next.configs.recommended,
// ];

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
