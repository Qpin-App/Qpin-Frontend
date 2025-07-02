import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import QrCardDetailContent from "./QrCardDetailContent";

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

interface QrDetailCardProps {
  backgroundColor: string;
  gradientColor: string;
  sticker: string | null;
  imageUri: string | null;
  phoneNumber: string | null;
  comment: string | null;
  qrUrl?: string | null;
  isEdit: boolean;
}

const QrDetailCard: React.FC<QrDetailCardProps> = ({
  backgroundColor,
  gradientColor,
  sticker,
  imageUri,
  phoneNumber,
  comment,
  qrUrl,
  isEdit
}) => {
  const [stickerImage, setStickerImage] = useState<string | null>(null);
  const [pictureImage, setPictureImage] = useState<string | null>(null);
  const [phoneNumberInput, setPhoneNumberInput] = useState<string | null>(phoneNumber);
  const [tempPhoneNumber, setTempPhoneNumber] = useState<string | null>(phoneNumber);

  useEffect(() => {
    if (sticker) {
      setStickerImage(stickerImagesSrc[sticker]);
    }
  }, [sticker]);

  useEffect(() => {
    if (imageUri) {
      setPictureImage(imageUri);
    }
  }, [imageUri]);

  const handlePhoneNumberChange = () => {
    setPhoneNumberInput(tempPhoneNumber);
  };

  return (
    <>
      {pictureImage ? (
        <ImageBackground
          source={{ uri: pictureImage }}
          style={styles.card}
          imageStyle={{ resizeMode: "cover", borderRadius: 10 }}
        >
          <QrCardDetailContent
            stickerImage={stickerImage}
            qrUrl={qrUrl ?? null}
            phoneNumberInput={phoneNumberInput}
            tempPhoneNumber={tempPhoneNumber || ""}
            setTempPhoneNumber={setTempPhoneNumber}
            handlePhoneNumberChange={handlePhoneNumberChange}
            comment={comment}
            isEdit={isEdit}
          />
        </ImageBackground>
      ) : (
        <LinearGradient
          colors={[backgroundColor, gradientColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <QrCardDetailContent
            stickerImage={stickerImage}
            qrUrl={qrUrl ?? null}
            phoneNumberInput={phoneNumberInput}
            tempPhoneNumber={tempPhoneNumber || ""}
            setTempPhoneNumber={setTempPhoneNumber}
            handlePhoneNumberChange={handlePhoneNumberChange}
            comment={comment}
            isEdit={isEdit}
          />
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardSize,
    height: cardSize,
    padding: 15,
    borderRadius: 10,
  },
});

export default QrDetailCard;
