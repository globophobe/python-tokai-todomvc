import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./src/Routes";
import { FilterProvider } from "./src/app/FilterContext";
import NavigationService from "./src/app/NavigationService";
import client from "./src/app/client";
import theme from "./src/app/theme";

export default function AppContainer() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <FilterProvider>
          <Routes
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </FilterProvider>
      </PaperProvider>
    </ApolloProvider>
  );
}
