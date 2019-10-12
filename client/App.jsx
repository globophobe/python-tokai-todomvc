import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./src/Routes";
import { StateProvider } from "./src/app/StateContext";
import EmotionGlobal from "./src/app/EmotionGlobal";
import NavigationService from "./src/app/NavigationService";
import client from "./src/app/client";
import theme from "./src/app/theme";

export default function AppContainer() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <StateProvider>
          <Routes
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          <EmotionGlobal />
        </StateProvider>
      </PaperProvider>
    </ApolloProvider>
  );
}
