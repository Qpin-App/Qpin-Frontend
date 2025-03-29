import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import QrCardSimple from "./QrCardSimple";
import { QrData } from "../models/qr";

const qrMockData: QrData[] = [
  {
    id: "add",
    number: "",
    comment: "안심 QR 카드 생성"
  },
  {
    id: 1,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "heart",
    imageUri: "file:///data/user/0/com.myapp/cache/rn_image_picker_lib_temp_1b34151c-dc51-4b77-98a2-b193f99cbe7f.jpg",
    phoneNumber: "010-4820-9952",
    comment: "잠깐 편의점 갑니다!"
  },
  {
    id: 2,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "heart",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "10분간 자리 비웁니다"
  },
  {
    id: 3,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "star",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "여행 다녀옵니다"
  },
];

const QrScreen = () => {
  const renderItem = ({ item }: { item: QrData }) => {
    return <QrCardSimple key={item.id} data={item} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR 안심 카드</Text>
        <Text style={styles.selectButton}>선택</Text>
      </View>
      <FlatList
        data={qrMockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.qrList}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: "10%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectButton: {
    fontSize: 12,
    color: "#999999",
  },
  qrList: {
    width: "100%",
    height: "100%",
  },
  columnWrapper: {
    width: "100%",
    gap: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});

export default QrScreen;
