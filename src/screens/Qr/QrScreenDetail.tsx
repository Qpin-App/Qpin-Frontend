import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomStackHeader from "../../components/CustomStackHeader";
import QrCardDetail from "./QrCardDetail";

const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 24;
const cardSize = screenWidth - rem * 5;

const QrScreenDetail = ({navigation}: any) => {
  const route = useRoute();
  const { id, backgroundColor, gradientColor, sticker, imageUri, phoneNumber, comment } = route.params;

  const handleDelete = () => {
    // navigation.isFocused()로 현재 화면이 포커스를 받고 있는지 확인
    if (navigation.isFocused()) {
      setTimeout(() => {
        Alert.alert("삭제 확인", "이 QR을 삭제할까요?", [
          { text: "취소", style: "cancel" },
          { text: "삭제", onPress: () => console.log("QR 삭제됨") },
        ]);
      }, 0);
    }
  };

  const handlePressEdit = () => {
    navigation.navigate("QrScreenEditor", {
     backgroundColor,
     gradientColor,
     sticker,
     imageUri,
     phoneNumber,
     comment,
    });
  };

  return (
    <View style={styles.container}>
      <CustomStackHeader title="QR 안심 카드" onClick={handleDelete} />
      <View style={styles.content}>
        <QrCardDetail
          backgroundColor={backgroundColor}
          gradientColor={gradientColor}
          sticker={sticker}
          imageUri={imageUri}
          phoneNumber={phoneNumber}
          comment={comment}
          isEdit={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={handlePressEdit}
        >
          <Text style={styles.modifyText}>수정하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>내보내기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer:{
    width: cardSize,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 50,
  },
  modifyButton: {
    width: 120,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#38B7FF",
  },
  modifyText: {
    color: "#38B7FF",
    fontSize: 16,
    fontWeight: 500,
  },
  submitButton: {
    width: 120,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#38B7FF",
    backgroundColor: "#38B7FF",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 500,
  },
});

export default QrScreenDetail;
