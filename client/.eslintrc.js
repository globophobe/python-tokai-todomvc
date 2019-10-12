module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  rules: {
    "no-console": "off",
    "no-use-before-define": 0,
    "react/jsx-curly-newline": 0,
    "react/jsx-wrap-multilines": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-did-mount-set-state": 0,
    "consistent-return": 0
  }
};
