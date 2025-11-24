import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import QrCardSimple from "./QrCardSimple";
import { QrData } from "../../models/qr";
import CommonModal from "../../components/CommonModal";
import qrService from "../../utils/qrService";
import { toApiError } from "../../utils/error";

const QrScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const [qrItems, setQrItems] = useState<QrData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadQrs = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const items = await qrService.fetchQrList();
      console.log(items);
      setQrItems(items);
    } catch (err) {
      const e = toApiError(err);
      console.log(err);
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQrs();
  }, []);

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) setSelectedItems([]);
  };

  const handleSelectItem = (id: string | number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteQr = async () => {
    try {
      setModalVisible(false);
      if (selectedItems.length > 0) {
        await qrService.deleteQrs(selectedItems);
        await loadQrs();
      }
    } catch (err) {
      const e = toApiError(err);
      setErrorMessage(e.message);
    } finally {
      setIsSelectionMode(false);
      setSelectedItems([]);
    }
  }

  const renderItem = ({ item }: { item: QrData }) => (
    <View style={styles.itemContainer}>
      <QrCardSimple
        key={item.id}
        data={item}
        isSelectable={isSelectionMode}
        isSelected={selectedItems.includes(item.id)}
        onSelect={(id: string | number) => handleSelectItem(id)}
      />
    </View>
  );

  const dataWithAdd = useMemo(() => {
    const addCard: QrData = {
      id: "add",
      backgroundColor: "",
      gradientColor: "",
      sticker: null,
      imageUri: null,
      phoneNumber: "",
      comment: "안심 QR 카드 생성"
    };
    return [addCard, ...qrItems];
  }, [qrItems]);

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
      {errorMessage && (
        <Text style={{ color: "#d00", marginBottom: 8 }}>{errorMessage}</Text>
      )}
      <FlatList
        data={dataWithAdd}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
      {loading && (
        <Text style={{ marginTop: 8, color: "#999" }}>불러오는 중...</Text>
      )}
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
  columnWrapper: {
    justifyContent: "flex-start",
  },
  itemContainer: {
    width: "33.33%",
    alignItems: "center",
  },
  trashButton: {
    width: 13,
    height: 15
  },
});

export default QrScreen;
