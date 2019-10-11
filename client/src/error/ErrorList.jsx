import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    marginBottom: 8
  }
});

export default function ErrorList({ errors }) {
  if (errors.length > 0) {
    const children = errors.map(error => (
      // eslint-disable-next-line react/no-array-index-key
      <HelperText key={error} type="error">
        {error}
      </HelperText>
    ));
    return <View style={styles.container}>{children}</View>;
  }
  return null;
}

ErrorList.defaultProps = {
  errors: []
};

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};
