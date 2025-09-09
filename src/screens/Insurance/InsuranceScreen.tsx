import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InsuranceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>보험은 준비중입니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f4f4f",
  },
});

export default InsuranceScreen;
