import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Appbar } from "react-native-paper";
import FilterMenu from "./FilterMenu";
import logout from "../../auth/logout";

const status = React.createContext(undefined);

export default function TodoHeader({ navigation }) {
  const title = navigation.getParam("title");
  const defaultTitle = "Todos";
  return (
    <Appbar.Header>
      {title ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
      <Appbar.Content title={title || defaultTitle} />
      <FilterMenu />
    </Appbar.Header>
  );
}

TodoHeader.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired
};
