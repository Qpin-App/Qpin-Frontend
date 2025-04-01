import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import QRCode from 'react-native-qrcode-svg';

type QrDetailCardContentProps = {
  stickerImage: string | null;
  phoneNumberInput: string | null;
  tempPhoneNumber: string;
  setTempPhoneNumber: (value: string) => void;
  handlePhoneNumberChange: () => void;
  comment: string | null;
  isEdit: boolean;
}

const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 24;
const cardSize = screenWidth - rem * 5;

const QrDetailCardContent = ({
  stickerImage,
  phoneNumberInput,
  tempPhoneNumber,
  setTempPhoneNumber,
  handlePhoneNumberChange,
  comment,
  isEdit
}: QrDetailCardContentProps) => {
  return (
    <View style={styles.row}>
      <ImageBackground
        source={stickerImage || undefined}
        style={styles.stickerBackground}
        imageStyle={{ resizeMode: "contain" }}
      />
      <View style={styles.inputContainer}>
        {phoneNumberInput ? (
          <QRCode value={phoneNumberInput} size={rem * 5} />
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
              value={comment}
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
    marginTop: 2,
    padding: 0,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#E1E6E9",
  },
});

export default QrDetailCardContent;