import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, TouchableWithoutFeedback, Alert } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import CustomStackHeader from "../../components/CustomStackHeader";
import QrCardDetail from "./QrCardDetail";
import BackColorSelector from "./BackColorSelector";
import BackStickerSelector from "./BackStickerSelector";
import { QrData } from "../../models/qr";
import { createQr, updateQr } from "../../utils/qrService";

// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  QrScreen: undefined;
  QrScreenDetail: QrData;
  QrScreenEditor: Partial<QrData>;
  CompleteScreen: Partial<QrData>;  // CompleteScreen에 전달되는 데이터 타입 정의
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

// HEX 색상을 백엔드 Enum으로 매핑
const mapColorToEnum = (hexColor: string): string => {
  const colorMap: { [key: string]: string } = {
    "#EF8582": "RED",
    "#F7CCA5": "ORANGE",
    "#FCF2B8": "YELLOW",
    "#C0FCBE": "GREEN",
    "#B5E1FC": "BLUE",
    "#9C98F8": "PURPLE",
  };

  return colorMap[hexColor.toUpperCase()] || "BLUE";
};

// 스티커명을 백엔드 Enum으로 매핑
const mapStickerToEnum = (sticker: string | null): string | null => {
  if (!sticker || sticker === "") return null;

  const stickerMap: { [key: string]: string } = {
    "star": "STAR",
    "heart": "HEART",
    "cherry": "CHERRY",
    "thumb_up": "THUMB",  // BackStickerSelector와 일치
    "car": "CAR",
    "calling": "PHONE",   // BackStickerSelector와 일치
  };

  return stickerMap[sticker.toLowerCase()] || sticker.toUpperCase();
};

const QrScreenEditor: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const params = route.params as {
    id?: string | number;
    backgroundColor?: string;
    gradientColor?: string;
    sticker?: string | null;
    imageUri?: string | null;
    phoneNumber?: string;
    comment?: string | null;
    qrUrl?: string;
    isEdit?: boolean;
  };
  const { id, backgroundColor, gradientColor, sticker, imageUri, phoneNumber, comment, qrUrl, isEdit } = params;

  // id가 있으면 수정 모드, 없으면 생성 모드
  const isUpdateMode = !!id;

  const [activeTab, setActiveTab] = useState<string>("배경색");
  const [selectedColor, setSelectedColor] = useState<string>(backgroundColor || "#F8F8F8");
  const [selectedGradientColor, setSelectedGradientColor] = useState<string>(gradientColor || "#F8F8F8");
  const [selectedSticker, setSelectedSticker] = useState<string | null>(sticker || null);
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUri || null);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string | null>(phoneNumber || null);
  const [currentComment, setCurrentComment] = useState<string | null>(comment || null);
  const [currentQrUrl, setCurrentQrUrl] = useState<string | undefined>(qrUrl);

  const handleSave = async () => {
    try {
      // phoneNumber가 필수값이므로 체크
      if (!currentPhoneNumber) {
        Alert.alert("오류", "전화번호를 입력해주세요.");
        return;
      }

      // API 요청 데이터 준비 (백엔드 형식에 맞게)
      const requestData = {
        memberId: 1, // FIXME: 인증 시스템 구현 후 실제 사용자 ID로 변경 필요
        safePhoneNum: currentPhoneNumber, // FIXME: 안심번호 선택 로직 구현 필요 (현재는 일반 번호와 동일)
        phoneNum: currentPhoneNumber,
        memo: currentComment || null,
        myColor: mapColorToEnum(selectedColor),
        sticker: mapStickerToEnum(selectedSticker),
        gradation: selectedGradientColor,
        backgroundPicture: selectedImage || null,
      };

      if (isUpdateMode && id) {
        // 수정 모드: update API 호출
        await updateQr(id, requestData);
        navigation.navigate("QrScreen");
      } else {
        // 생성 모드: create API 호출
        await createQr(requestData);
        navigation.navigate("QrScreen");
      }
    } catch (error) {
      console.error(isUpdateMode ? "QR 수정 실패:" : "QR 생성 실패:", error);
      Alert.alert("오류", `QR ${isUpdateMode ? "수정" : "생성"}에 실패했습니다. 다시 시도해주세요.`);
    }
  };

  const handleCommentChange = (value: string) => {
    setCurrentComment(value);
  };

  const handlePhoneNumberChange = (value: string) => {
    setCurrentPhoneNumber(value);
  };

  return (
    <View style={styles.container}>
      <CustomStackHeader title={isUpdateMode ? "수정하기" : "생성하기"} onClick={handleSave} isSave={true} />
      <QrCardDetail
        backgroundColor={selectedColor}
        gradientColor={selectedGradientColor}
        sticker={selectedSticker}
        imageUri={selectedImage}
        phoneNumber={currentPhoneNumber}
        comment={currentComment}
        qrUrl={currentQrUrl}
        isEdit={true}
        onCommentChange={handleCommentChange}
        onPhoneNumberChange={handlePhoneNumberChange}
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
