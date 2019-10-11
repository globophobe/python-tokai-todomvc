import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

const ErrorScreen = ({ error }) => {
  const errors = error.map(e => <Text>{e}</Text>);
  return <View>{errors}</View>;
};

ErrorScreen.propTypes = {
  error: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ErrorScreen;
