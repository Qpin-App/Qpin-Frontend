import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity, FlatList, Modal, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { phoneNumber } from "../../models/qr";

const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 24;

interface QrDetailCardContentProps {
  stickerImage: any;
  qrUrl?: string | null;
  phoneNumberInput?: string;
  tempPhoneNumber?: string;
  setTempPhoneNumber?: (value: string) => void;
  comment?: string;
  setComment?: (value: string) => void;
  isEdit: boolean;
  phoneNumberList?: phoneNumber[];
}

const QrDetailCardContent: React.FC<QrDetailCardContentProps> = ({
  stickerImage,
  qrUrl,
  phoneNumberInput,
  tempPhoneNumber,
  setTempPhoneNumber,
  comment,
  setComment,
  isEdit,
  phoneNumberList = []
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectPhoneNumber = (phone: phoneNumber) => {
    console.log('Selected phone:', phone);

    if (setTempPhoneNumber) {
      setTempPhoneNumber(phone.number);
    }
    setShowDropdown(false);
  };

  return (
    <View style={styles.row}>
      {stickerImage && (
        <ImageBackground
          source={stickerImage}
          style={styles.stickerBackground}
          imageStyle={{ resizeMode: "contain" }}
        />
      )}
      <View style={[styles.inputContainer, !isEdit && styles.inputContainerTransparent]}>
        {qrUrl ? (
          <Image 
            source={typeof qrUrl === 'string' ? { uri: qrUrl } : qrUrl}
            style={styles.qrImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.qrBox} />
        )}
        <View style={styles.inputBox}>
          <View style={[styles.inputRow, { zIndex: 1000 }]}>
            {isEdit && <Icon name="call-outline" size={18} color="#B9B9B9" />}
            <View style={{ flex: 1, position: 'relative' }}>
              <Pressable
                style={{ flex: 1, justifyContent: 'center',}}
                onPress={() => {
                  if (isEdit && phoneNumberList.length > 0) {
                    setShowDropdown(!showDropdown);
                  }
                }}
              >
                <View style={[
                  styles.input,
                  { justifyContent: 'flex-end' },
                  !isEdit && styles.inputNoBorder
                ]}>
                  <Text style={{
                    color: tempPhoneNumber ? '#000' : '#999',
                    fontSize: isEdit ? 14 : 18,
                    fontWeight: isEdit ? 'normal' : 'bold',
                  }}>
                    {tempPhoneNumber || '050-1234-5678'}
                  </Text>
                </View>
              </Pressable>
              {showDropdown && phoneNumberList.length > 0 && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={phoneNumberList}
                    keyExtractor={(item) => `phone-${item.phoneNumberId}`}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          console.log('TouchableOpacity pressed:', item);
                          handleSelectPhoneNumber(item);
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.dropdownText}>
                          <Text style={styles.dropdownLabel}>
                            {item.isSecureNumber ? "안심번호" : "내번호"}
                          </Text>
                          {"   "}
                          {item.number}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.inputRow}>
            {isEdit && <Icon name="pencil-outline" size={18} color="#B9B9B9" />}
            <TextInput
              style={[
                styles.input,
                !isEdit && styles.inputNoBorder,
                !isEdit && styles.inputReadOnly
              ]}
              value={comment || ""}
              placeholder={isEdit ? "주차 메모 작성하기" : ""}
              onChangeText={text => setComment && setComment(text)}
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
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  inputContainerTransparent: {
    backgroundColor: "transparent",
  },
  qrBox: {
    width: rem * 8,
    height: rem * 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 5,
  },
  qrImage: {
    width: rem * 8,
    height: rem * 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  inputBox: {
    width: "100%",
    height: rem * 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  inputRow: {
    width: "100%",
    height: "40%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginTop: 0,
    padding: 0,
    paddingBottom: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#E1E6E9",
  },
  inputNoBorder: {
    borderBottomWidth: 0,
  },
  inputReadOnly: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdown: {
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#E1E6E9',
    maxHeight: 150,
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownLabel: {
    fontWeight: '600',
    color: '#666',
  },
});

export default QrDetailCardContent;