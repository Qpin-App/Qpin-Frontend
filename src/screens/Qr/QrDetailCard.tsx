import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

// 카드 width, height를 항상 동일하게 주기 위해서 -> 정사각형
const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 24;
const cardSize = screenWidth - rem * 5;

const QrDetailCard = ({ backgroundColor, gradientColor }: { backgroundColor: string, gradientColor: string }) => {
  return (
    <LinearGradient
      colors={[backgroundColor, gradientColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <View style={styles.qrBox} />
          <View style={styles.inputBox}>
            <View style={styles.inputRow}>
              <Icon name="call-outline" size={18} color="#B9B9B9" />
              <TextInput style={styles.input} placeholder="050-1234-5678" keyboardType="phone-pad" />
            </View>
            <View style={styles.inputRow}>
              <Icon name="pencil-outline" size={18} color="#B9B9B9" />
              <TextInput style={styles.input} placeholder="주차 메모 작성하기" />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  card: {
    width: cardSize,
    height: cardSize,
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  qrBox: {
    width: rem * 5,
    height: rem * 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
  },
  inputBox: {
    width: rem * 10,
    height: rem * 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRow: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#E1E6E9",
  },
});

export default QrDetailCard;
