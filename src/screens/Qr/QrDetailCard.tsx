import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const stickerImagesSrc: { [key: string]: any } = {
  star: require("../../assets/icons/star_icon.png"),
  heart: require("../../assets/icons/heart_icon.png"),
  cherry: require("../../assets/icons/cherry_icon.png"),
  thumb_up: require("../../assets/icons/thumb_up_icon.png"),
  car: require("../../assets/icons/car_icon.png"),
  calling: require("../../assets/icons/calling_icon.png"),
};

// 카드 width, height를 항상 동일하게 주기 위해서 -> 정사각형
const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 24;
const cardSize = screenWidth - rem * 5;

type QrDetailCardProps = {
  backgroundColor: string;
  gradientColor: string;
  sticker: string | null;
};

const QrDetailCard = ({ backgroundColor, gradientColor, sticker }: QrDetailCardProps) => {
  const [stickerImage, setStickerImage] = useState<string | null>(null);

  useEffect(() => {
    if (sticker) {
      setStickerImage(stickerImagesSrc[sticker]);
    }
  }, [sticker]);

  return (
    <LinearGradient
      colors={[backgroundColor, gradientColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.row}>
        <ImageBackground
          source={stickerImage || undefined} // stickerImage가 없으면 배경 이미지를 사용하지 않음
          style={styles.stickerBackground}
          imageStyle={{ resizeMode: "contain" }}
        />
        <View style={styles.inputContainer}>
          <View style={styles.qrBox} />
          <View style={styles.inputBox}>
            <View style={styles.inputRow}>
              <Icon name="call-outline" size={18} color="#B9B9B9" />
              <TextInput style={styles.input} placeholder="050-1234-5678" keyboardType="phone-pad" />
            </View>
            <View style={styles.inputRow}>
              <Icon name="pencil-outline" size={18} color="#B9B9B9" />
              <TextInput style={styles.input} placeholder="주차 메모 작성하기" />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  card: {
    width: cardSize,
    height: cardSize,
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  stickerBackground: {
    position: "absolute",
    top: cardSize/3,
    left: cardSize/5,
    width: cardSize/2,
    height: cardSize/2,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  qrBox: {
    width: rem * 5,
    height: rem * 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
  },
  inputBox: {
    width: rem * 10,
    height: rem * 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRow: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#E1E6E9",
  },
});

export default QrDetailCard;
