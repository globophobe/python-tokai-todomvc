import { AsyncStorage } from "react-native";

export async function setStorage(key, value) {
  return AsyncStorage.setItem(key, value);
}

export async function getStorage(key) {
  return AsyncStorage.getItem(key);
}
