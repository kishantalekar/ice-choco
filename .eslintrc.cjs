module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "react-native"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
  ],
  rules: {
    // Other rules...

    // Add this rule to suppress the ViewPropTypes error
    "react-native/no-unused-styles": "off",
  },
};
