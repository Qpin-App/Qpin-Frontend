import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Modal, PermissionsAndroid, Platform } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const STICKERS = ["star", "heart", "cherry", "thumb_up", "car", "calling"];
const stickerImages = {
  star: require("../../assets/icons/star_icon.png"),
  heart: require("../../assets/icons/heart_icon.png"),
  cherry: require("../../assets/icons/cherry_icon.png"),
  thumb_up: require("../../assets/icons/thumb_up_icon.png"),
  car: require("../../assets/icons/car_icon.png"),
  calling: require("../../assets/icons/calling_icon.png"),
};

const BackStickerSelector = ({ onSelectSticker, onSelectImage }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "카메라 접근 권한 필요",
          message: "사진을 찍으려면 카메라 접근 권한이 필요합니다.",
          buttonPositive: "확인",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // TODO: iOS -> Info.plist 설정
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log("카메라 권한이 거부됨");
      return;
    }

    launchCamera(
      { mediaType: "photo", quality: 1, saveToPhotos: true },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          onSelectImage(response.assets[0].uri || "");
        }
        setModalVisible(false);
      }
    );
  };

  const handlePickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 1 },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          onSelectImage(response.assets[0].uri || "");
        }
        setModalVisible(false);
      }
    );
  };

  return (
    <>
      <FlatList
        horizontal
        data={STICKERS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stickerIcon}
            onPress={() => onSelectSticker(item)}
          >
            <Image source={stickerImages[item]} style={styles.stickerIconImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.stickerList}
      />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageHeader}
          onPress={() => setModalVisible(true)}
        >
          <Image source={require("../../assets/icons/qr_gradient_icon.png")} style={styles.imageIcon} />
          <Text style={styles.imageTitle}>사진 추가하기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={handlePickImage}>
              <Text style={styles.modalText}>갤러리에서 선택하기</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.modalOption} onPress={handleTakePhoto}>
              <Text style={styles.modalText}>사진 찍기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalCancelContainer}>
            <TouchableOpacity style={styles.modalCancelOption} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  stickerList: {
    width: "100%",
    height: 36,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  stickerIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#B9B9B9",
  },
  stickerIconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  imageContainer: {
    width: "100%",
    height: 80,
    padding: 20,
    gap: 15,
  },
  imageHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  imageTitle: {
    fontSize: 14,
    color: "#38B7FF",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  modalContainer: {
    width: "80%",
    height: 120,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalCancelContainer: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#ddd',
  },
  modalOption: {
    width: "100%",
    height: "50%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelOption: {
    width: "100%",
    height: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#38B7FF",
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#B9B9B9",
  },
});

export default BackStickerSelector;
