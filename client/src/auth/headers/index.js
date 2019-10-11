import decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import refreshTokenMutation from "./refreshTokenMutation";
import logout from "../logout";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../app/constants";

export default async function authHeaders() {
  let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    const now = Date.now() / 1000;
    const access = decode(accessToken);
    // Has access token expired?
    if (access.exp < now) {
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        const refresh = decode(refreshToken);
        // Has refresh token expired?
        if (refresh.exp < now) {
          await logout();
        } else {
          accessToken = await refreshTokenMutation(refreshToken);
          await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        }
      }
    }
  }
  return { Authorization: accessToken ? `Bearer ${accessToken}` : "" };
}
