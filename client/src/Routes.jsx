import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppStack from "./app/AppStack";
import AuthStack from "./auth/AuthStack";
import AuthLoadingScreen from "./auth/AuthLoadingScreen";

const AppContainer = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(AppContainer);
