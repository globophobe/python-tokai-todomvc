import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating />
    </View>
  );
}
