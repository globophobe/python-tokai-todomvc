import localforage from "localforage";

export async function setStorage(key, value) {
  return localforage.setItem(key, value);
}

export async function getStorage(key) {
  return localforage.getItem(key);
}
