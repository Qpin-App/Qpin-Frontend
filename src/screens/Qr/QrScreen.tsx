import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import QrSimpleCard from "./QrSimpleCard";
import { QrData } from "../models/qr";

const qrMockData: QrData[] = [
  { id: "add", code: "add", number: "", comment: "안심 QR 카드 생성" },
  { id: 1, code: "Qr1", number: "123-456-7890", comment: "잠깐 편의점 갑니다!" },
  { id: 2, code: "Qr2", number: "098-765-4321", comment: "10분간 자리 비웁니다" },
  { id: 3, code: "Qr3", number: "123-987-6543", comment: "은행 다녀옵니다" },
  { id: 4, code: "Qr4", number: "876-543-2109", comment: "1박 2일 여행 다녀옵니다" },
  { id: 5, code: "Qr5", number: "789-012-3456", comment: "유료 주차장입니다" },
];

const QrScreen = () => {
  const renderItem = ({ item }: { item: QrData }) => {
    return <QrSimpleCard key={item.id} data={item} />;
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
    height: "90%",
  },
  columnWrapper: {
    gap: 15,
    justifyContent: "space-between",
  },
});

export default QrScreen;
