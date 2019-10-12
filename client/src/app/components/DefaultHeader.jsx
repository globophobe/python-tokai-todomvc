import React from "react";
import PropTypes from "prop-types";
import { Appbar } from "react-native-paper";
import FilterMenu from "./FilterMenu";
import logout from "../../auth/logout";

export default function TodoHeader({ navigation: { goBack, getParam } }) {
  const title = getParam("title");
  const defaultTitle = "Todos";
  return (
    <Appbar.Header>
      {title ? <Appbar.BackAction onPress={() => goBack()} /> : null}
      <Appbar.Content title={title || defaultTitle} />
      <FilterMenu />
      <Appbar.Action icon="exit-to-app" onPress={() => logout()} />
    </Appbar.Header>
  );
}

TodoHeader.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired
  }).isRequired
};
