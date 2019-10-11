import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import TodoScreen from "../todos/TodoScreen";
import DefaultHeader from "./components/DefaultHeader";

const AppStack = createStackNavigator(
  {
    TodoScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: <DefaultHeader navigation={navigation} />
    })
  }
);

export default AppStack;
