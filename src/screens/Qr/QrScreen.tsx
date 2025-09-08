import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import QrCardSimple from "./QrCardSimple";
import { QrData, qrMockData } from "../../models/qr";
import CommonModal from "../../components/CommonModal";

const QrScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

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
      onSelect={(id: string | number) => handleSelectItem(id.toString())}
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
    height: "15%",
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
