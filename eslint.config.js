import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier/flat";

export default [
  {
    ignores: ["coverage/**", "lib/**"],
  },
  ...typescriptEslint.configs["flat/recommended"],
  {
    files: ["**/*.{js,ts}"],
    plugins: {
      unicorn,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "prettier/prettier": "error",
      "unicorn/prefer-module": "error",
    },
  },
  prettierConfig,
];
