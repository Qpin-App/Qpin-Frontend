import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomStackHeader from "../../components/CustomStackHeader";
import CommonModal from "../../components/CommonModal";
import QrCardDetail from "./QrCardDetail";
import { NavigationProp } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 24;
const cardSize = screenWidth - rem * 5;

interface QrScreenDetailProps {
  navigation: NavigationProp<any>;
}

interface RouteParams {
  id: string | number;
  backgroundColor: string;
  gradientColor: string;
  sticker: string | null;
  imageUri: string | null;
  phoneNumber: string;
  comment: string;
  qrUrl?: string;
}

const QrScreenDetail = ({navigation}: QrScreenDetailProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const route = useRoute();
  const { id, backgroundColor, gradientColor, sticker, imageUri, phoneNumber, comment } = route.params as RouteParams;

  const handleDeleteQr = () => {
    setModalVisible(false);
    navigation.navigate("QrScreen", {});
  }

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
      <CustomStackHeader title="QR 안심 카드" onClick={() => setModalVisible(true)} />
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
      {modalVisible &&
        <CommonModal
          content={"QR 카드를 삭제하시겠습니까?"}
          onClose={() => setModalVisible(false)}
          onSubmit={handleDeleteQr}
        />
      }
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
