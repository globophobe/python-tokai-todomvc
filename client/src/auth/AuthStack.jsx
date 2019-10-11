import { StatusBar } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./LoginScreen";

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default AuthStack;
