import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default function Loading() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setElapsed(elapsed + 1), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  if (elapsed > 1) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating />
      </View>
    );
  }
  return null;
}
