import React, { useContext } from "react";
import { Snackbar } from "react-native-paper";
import { StateContext } from "../app/StateContext";

export default function ConnectionFailure() {
  const {
    state: { connectionFailure },
    dispatch
  } = useContext(StateContext);
  return (
    <Snackbar
      visible={connectionFailure}
      onDismiss={() => dispatch({ type: "connectionFailure", value: false })}
      duration={Snackbar.DURATION_SHORT}
    >
      Could not connect to server.
    </Snackbar>
  );
}
