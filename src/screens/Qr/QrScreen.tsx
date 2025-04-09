import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import QrCardSimple from "./QrCardSimple";
import { QrData } from "../models/qr";
import CommonModal from "../../components/CommonModal";

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) setSelectedItems([]);
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteQr = () => {
    setModalVisible(false);
    setIsSelectionMode(false);
    setSelectedItems([]);
  }

  const renderItem = ({ item }: { item: QrData }) => (
    <QrCardSimple
      key={item.id}
      data={item}
      isSelectable={isSelectionMode}
      isSelected={selectedItems.includes(item.id)}
      onSelect={handleSelectItem}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR 안심 카드</Text>
        <View style={styles.headerButtonSet}>
          <TouchableOpacity onPress={toggleSelectionMode}>
            <Text style={styles.selectButton}>
              {isSelectionMode ? "취소" : "선택"}
            </Text>
          </TouchableOpacity>
          {isSelectionMode &&
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={require("../../assets/icons/trash_btn.png")}
                style={styles.trashButton}
              />
            </TouchableOpacity>
          }
        </View>
      </View>
      <FlatList
        data={qrMockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.qrList}
        columnWrapperStyle={styles.columnWrapper}
      />
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
  headerButtonSet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
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
  trashButton: {
    width: 13,
    height: 15
  },
});

export default QrScreen;
