import { AsyncStorage } from "react-native";
import NavigationService from "../app/NavigationService";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../app/constants";

export async function removeTokens() {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
}

export default async function logout() {
  await removeTokens();
  NavigationService.navigate("AuthLoading");
}
