import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomStackHeader from "../../components/CustomStackHeader";
import QrCardDetail from "./QrCardDetail";
import BackColorSelector from "./BackColorSelector";
import BackStickerSelector from "./BackStickerSelector";
import Icon from "react-native-vector-icons/Ionicons";
import QRCode from 'react-native-qrcode-svg';

export interface QrData {
  id: string | number;
  backgroundColor: string;
  gradientColor: string;
  sticker: string | null;
  imageUri: string | null;
  phoneNumber: string;
  comment: string;
  qrUrl?: string; // 백엔드에서 생성된 QR URL
}

// Mock 데이터
export const qrMockData: QrData[] = [
  {
    id: "add",
    backgroundColor: "",
    gradientColor: "",
    sticker: null,
    imageUri: null,
    phoneNumber: "",
    comment: "안심 QR 카드 생성"
  },
  {
    id: 1,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "heart",
    imageUri: "file:///data/user/0/com.myapp/cache/rn_image_picker_lib_temp_1b34151c-dc51-4b77-98a2-b193f99cbe7f.jpg",
    phoneNumber: "010-4820-9952",
    comment: "잠깐 편의점 갑니다!",
    qrUrl: "http://localhost:8080/qr/1"
  },
  {
    id: 2,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "heart",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "10분간 자리 비웁니다",
    qrUrl: "http://localhost:8080/qr/2"
  },
  {
    id: 3,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "star",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "여행 다녀옵니다",
    qrUrl: "http://localhost:8080/qr/3"
  },
];

const QrScreenEditor = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as {
    backgroundColor?: string;
    gradientColor?: string;
    sticker?: string | null;
    imageUri?: string | null;
    phoneNumber?: string;
    comment?: string;
    isEdit?: boolean;
  };
  const { backgroundColor, gradientColor, sticker, imageUri, phoneNumber, comment, isEdit } = params;

  const [activeTab, setActiveTab] = useState<string>("배경색");
  const [selectedColor, setSelectedColor] = useState<string>(backgroundColor || "#F8F8F8");
  const [selectedGradientColor, setSelectedGradientColor] = useState<string>(gradientColor || "#F8F8F8");
  const [selectedSticker, setSelectedSticker] = useState<string | null>(sticker || null);
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUri || null);

  const handleSave = () => {
    navigation.navigate("CompleteScreen", {});
  };

  return (
    <View style={styles.container}>
      <CustomStackHeader title="생성하기" onClick={handleSave} isSave={true} />
      <QrCardDetail
        backgroundColor={selectedColor}
        gradientColor={selectedGradientColor}
        sticker={selectedSticker}
        imageUri={selectedImage}
        phoneNumber={phoneNumber}
        comment={comment}
        isEdit={true}
      />
      <View style={styles.stylingContainer}>
        <View style={styles.styleTab}>
          {["배경색", "스티커"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.styleTabTitle,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {activeTab == "배경색" &&
          <BackColorSelector
            currentColor={selectedColor}
            onSelectColor={(color) => setSelectedColor(color)}
            onSelectGradient={(color) => setSelectedGradientColor(color)}
          />
        }
        {activeTab == "스티커" &&
          <BackStickerSelector
            onSelectSticker={(sticker) => setSelectedSticker(sticker)}
            onSelectImage={(image) => setSelectedImage(image)}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  styleTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  tabItem: {
    width: "50%",
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#E1E6E9",
  },
  styleTabTitle: {
    fontSize: 14,
    color: "#B9B9B9",
  },
  activeTab: {
    borderBottomColor: "#38B7FF",
  },
  activeTabText: {
    color: "#38B7FF",
    fontWeight: 600,
  },
  stylingContainer: {
    width: "100%",
    height: "30%",
    flexDirection: "column",
  },
});

export default QrScreenEditor;
