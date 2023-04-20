module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "prettier"
  ],
  globals: {
    otherGlobal: true
  },
  ignorePatterns:[
    "src/generated/*"
  ],
  parser: "@typescript-eslint/parser",
  env: {
    "browser": true,
    "es6": true,
    "jest": true
  },
  parserOptions: {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "arrowFunctions": true
    }
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
        "paths": ["./src"]
      }
    }
  },
  rules: {
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": 1
  }
};
