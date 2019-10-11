import React, { useState, useContext } from "react";
import { Appbar, Menu, Colors } from "react-native-paper";
import { FilterContext } from "../FilterContext";

export default function FilterMenu() {
  const { state, dispatch } = useContext(FilterContext);
  const [visible, setVisible] = useState(false);
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(!visible)}
      anchor={
        <Appbar.Action
          icon="filter"
          color={Colors.white}
          onPress={() => setVisible(!visible)}
        />
      }
    >
      <Menu.Item onPress={() => dispatch({ type: "all" })} title="All" />
      <Menu.Item onPress={() => dispatch({ type: "done" })} title="Done" />
      <Menu.Item
        onPress={() => dispatch({ type: "notDone" })}
        title="Not done"
      />
    </Menu>
  );
}
