import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Title, TextInput, HelperText, Button } from "react-native-paper";
import _ from "lodash";
import { StateContext } from "../app/StateContext";
import ErrorList from "../error/ErrorList";
import ConnectionFailure from "../error/ConnectionFailure";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../app/constants";
import LOGIN_MUTATION from "./loginMutation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    marginTop: 8
  },
  innerContainer: {
    margin: 8
  },
  title: {
    flex: 1,
    alignSelf: "center",
    marginBottom: 6
  },
  textInput: {
    outlineStyle: "none",
    outlineWidth: 0,
    outlineColor: "transparent"
  },
  loginButton: {
    marginVertical: 8
  }
});

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
}

function submitForm(
  navigate,
  login,
  variables,
  setErrors,
  setSubmitting,
  dispatch
) {
  const errors = validate(variables);
  if (Object.keys(errors).length) {
    setErrors({ ...errors });
  } else {
    setSubmitting(true);
    login({ variables })
      .then(async ({ errors: nonFormErrors, data }) => {
        if (nonFormErrors && nonFormErrors.length) {
          const e = nonFormErrors.map(({ message }) => message);
          setErrors({ ...errors, nonFormErrors: e });
          setSubmitting(false);
        } else {
          const {
            login: { access, refresh }
          } = data;
          if (access) {
            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, access);
          }
          if (refresh) {
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh);
          }
          navigate("App");
        }
      })
      .catch(() => {
        dispatch({ type: "connectionFailure", value: true });
        setSubmitting(false);
      });
  }
}

export default function LoginScreen({ navigation: { navigate } }) {
  const {
    state: { connectionFailure },
    dispatch
  } = useContext(StateContext);
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [login] = useMutation(LOGIN_MUTATION);
  const submit = _.partial(
    submitForm,
    navigate,
    login,
    _,
    setErrors,
    setSubmitting,
    dispatch
  );
  const { nonFormErrors } = errors;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Title style={styles.title}>Login with your account</Title>
          <ErrorList errors={nonFormErrors} />
          <TextInput
            mode="outlined"
            style={styles.textInput}
            label="Username"
            autoCapitalize="none"
            value={values.username}
            onChangeText={username => setValues({ ...values, username })}
            onSubmitEditing={() => submit(values)}
            editable={!isSubmitting}
          />
          <HelperText type="error" visible={errors.username}>
            {errors.username}
          </HelperText>
          <TextInput
            mode="outlined"
            style={styles.textInput}
            label="Password"
            autoCapitalize="none"
            placeholder="Password"
            value={values.password}
            onChangeText={password => setValues({ ...values, password })}
            onSubmitEditing={() => submit(values)}
            editable={!isSubmitting}
            secureTextEntry
          />
          <HelperText type="error" visible={errors.password}>
            {errors.password}
          </HelperText>
          <Button
            style={styles.loginButton}
            mode="contained"
            onPress={() => submit(values)}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Login
          </Button>
        </View>
      </View>
      <ConnectionFailure connectionFailure={connectionFailure} />
    </>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};
