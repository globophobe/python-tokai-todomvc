import React, { useState, useContext } from "react";
import { Appbar, Menu, Colors } from "react-native-paper";
import { StateContext } from "../StateContext";

export default function FilterMenu() {
  const { dispatch } = useContext(StateContext);
  const [visible, setVisible] = useState(false);
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(!visible)}
      anchor={
        <Appbar.Action
          icon="sort"
          color={Colors.white}
          onPress={() => setVisible(!visible)}
        />
      }
    >
      <Menu.Item
        onPress={() => dispatch({ type: "filter", value: undefined })}
        title="All"
      />
      <Menu.Item
        onPress={() => dispatch({ type: "filter", value: true })}
        title="Done"
      />
      <Menu.Item
        onPress={() => dispatch({ type: "filter", value: false })}
        title="Not done"
      />
    </Menu>
  );
}
