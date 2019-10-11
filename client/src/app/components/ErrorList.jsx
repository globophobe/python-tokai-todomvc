import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { HelperText } from "react-native-paper";

const ErrorList = ({ errors }) => {
  let children = null;
  if (errors.length > 0) {
    children = errors.map(({ message }, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <HelperText key={index} type="error">
        {message}
      </HelperText>
    ));
  }
  return <Fragment>{children}</Fragment>;
};

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ErrorList;
