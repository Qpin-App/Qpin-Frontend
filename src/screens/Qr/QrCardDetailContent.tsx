import React from "react";
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import QRCode from 'react-native-qrcode-svg';

const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 24;

interface QrDetailCardContentProps {
  stickerImage: string | null;
  qrUrl: string | null;
  phoneNumberInput: string | null;
  tempPhoneNumber: string;
  setTempPhoneNumber: (value: string) => void;
  handlePhoneNumberChange: () => void;
  comment: string | null;
  isEdit: boolean;
}

const QrDetailCardContent: React.FC<QrDetailCardContentProps> = ({
  stickerImage,
  qrUrl,
  phoneNumberInput,
  tempPhoneNumber,
  setTempPhoneNumber,
  handlePhoneNumberChange,
  comment,
  isEdit
}) => {
  return (
    <View style={styles.row}>
      <ImageBackground
        source={stickerImage ? { uri: stickerImage } : undefined}
        style={styles.stickerBackground}
        imageStyle={{ resizeMode: "contain" }}
      />
      <View style={styles.inputContainer}>
        {qrUrl ? (
          <QRCode value={qrUrl} size={rem * 5} />
        ) : (
          <View style={styles.qrBox} />
        )}
        <View style={styles.inputBox}>
          <View style={styles.inputRow}>
            <Icon name="call-outline" size={18} color="#B9B9B9" />
            <TextInput
              style={styles.input}
              placeholder="050-1234-5678"
              keyboardType="phone-pad"
              value={tempPhoneNumber}
              onChangeText={setTempPhoneNumber}
              onEndEditing={handlePhoneNumberChange}
              editable={isEdit}
            />
          </View>
          <View style={styles.inputRow}>
            <Icon name="pencil-outline" size={18} color="#B9B9B9" />
            <TextInput
              style={styles.input}
              value={comment || ""}
              placeholder="주차 메모 작성하기"
              editable={isEdit}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  stickerBackground: {
    position: "absolute",
    top: screenWidth/3,
    left: screenWidth/5,
    width: screenWidth/2,
    height: screenWidth/2,
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
    marginTop: 2,
    padding: 0,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#E1E6E9",
  },
});

export default QrDetailCardContent;