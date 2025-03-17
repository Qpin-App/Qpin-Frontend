import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const HomeInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.textBold}>나초보</Text>
        <Text style={styles.text}>님이 생성하신</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.textProduct}>QR 안심 번호판</Text>
        <Text style={styles.textBold}>이에요</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 14,
  },
  textBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textProduct: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38B7FF",
  },
});

export default HomeInfo;
