import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import QrCardDetailContent from "./QrCardDetailContent";
import { phoneNumberMock } from "../../models/qr";
import QRCode from "react-native-qrcode-svg";

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
  qrUrl?: string;
  isEdit: boolean;
  onCommentChange?: (value: string) => void;
  onPhoneNumberChange?: (value: string) => void;
}

const QrDetailCard: React.FC<QrDetailCardProps> = ({
  backgroundColor,
  gradientColor,
  sticker,
  imageUri,
  phoneNumber,
  comment,
  qrUrl,
  isEdit,
  onCommentChange,
  onPhoneNumberChange
}) => {
  const [stickerImage, setStickerImage] = useState<any>(null);
  const [pictureImage, setPictureImage] = useState<string | null>(null);
  const [tempPhoneNumber, setTempPhoneNumber] = useState<string | null>(phoneNumber);
  const [tempComment, setTempComment] = useState<string | null>(comment);
  const [generatedQrUrl, setGeneratedQrUrl] = useState<string | undefined>(qrUrl);
  const qrRef = useRef<any>(null);

  useEffect(() => {
    if (sticker && stickerImagesSrc[sticker]) {
      setStickerImage(stickerImagesSrc[sticker]);
    } else {
      setStickerImage(null);
    }
  }, [sticker]);

  useEffect(() => {
    if (imageUri) {
      setPictureImage(imageUri);
    } else {
      setPictureImage(null);
    }
  }, [imageUri]);

  useEffect(() => {
    setTempComment(comment);
  }, [comment]);

  useEffect(() => {
    setTempPhoneNumber(phoneNumber);
  }, [phoneNumber]);

  // 전화번호가 변경되면 QR 코드 생성
  useEffect(() => {
    if (!tempPhoneNumber || !qrRef.current) return;

    const generateQR = async () => {
      try {
        await new Promise<void>((resolve) => {
          qrRef.current?.toDataURL((dataURL: string) => {
            console.log('QR generated for:', tempPhoneNumber);
            setGeneratedQrUrl(`data:image/png;base64,${dataURL}`);
            resolve();
          });
        });
      } catch (error) {
        console.error('QR generation failed:', error);
      }
    };

    generateQR();
  }, [tempPhoneNumber]);

  // 부모 컴포넌트에 전화번호 변경 알림 (별도 useEffect)
  useEffect(() => {
    if (onPhoneNumberChange && tempPhoneNumber) {
      onPhoneNumberChange(tempPhoneNumber);
    }
  }, [tempPhoneNumber]);

  const handleCommentChange = (value: string) => {
    setTempComment(value);
    if (onCommentChange) {
      onCommentChange(value);
    }
  };

  return (
    <>
      {/* 숨겨진 QR 코드 생성기 */}
      {tempPhoneNumber && (
        <View style={{ position: 'absolute', left: -1000 }}>
          <QRCode
            value={tempPhoneNumber}
            size={200}
            getRef={(ref) => (qrRef.current = ref)}
          />
        </View>
      )}

      {pictureImage ? (
        <ImageBackground
          source={{ uri: String(pictureImage) }}
          style={styles.card}
          imageStyle={{ resizeMode: "cover", borderRadius: 10 }}
        >
          <QrCardDetailContent
            stickerImage={stickerImage}
            qrUrl={generatedQrUrl || qrUrl}
            tempPhoneNumber={tempPhoneNumber || ""}
            setTempPhoneNumber={(value: string) => setTempPhoneNumber(value)}
            comment={tempComment || ""}
            setComment={handleCommentChange}
            isEdit={isEdit}
            phoneNumberList={phoneNumberMock}
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
            qrUrl={generatedQrUrl || qrUrl}
            tempPhoneNumber={tempPhoneNumber || ""}
            setTempPhoneNumber={(value: string) => setTempPhoneNumber(value)}
            comment={tempComment || ""}
            setComment={handleCommentChange}
            isEdit={isEdit}
            phoneNumberList={phoneNumberMock}
          />
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardSize,
    height: cardSize / 1.2,
    padding: 15,
    borderRadius: 10,
  },
});

export default QrDetailCard;
