import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import Loading from "../app/components/Loading";
import { ACCESS_TOKEN_KEY } from "../app/constants";

export default class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    const {
      navigation: { navigate }
    } = this.props;
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    navigate(token ? "App" : "Auth");
  }

  render() {
    return <Loading />;
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};
