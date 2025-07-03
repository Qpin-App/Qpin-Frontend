import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import type { QrData } from "../../models/qr";

interface QrSimpleCardProps {
  data: QrData;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string | number) => void;
}

// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  QrScreen: undefined;
  QrScreenDetail: QrData;
  QrScreenEditor: Partial<QrData>;
  CompleteScreen: undefined;
};

// 네비게이션 타입 정의
type NavigationProp = StackNavigationProp<RootStackParamList>;

const QrSimpleCard: React.FC<QrSimpleCardProps> = ({
  data,
  isSelectable = false,
  isSelected = false,
  onSelect,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePressDetail = () => {
    if (isSelectable && onSelect) {
      onSelect(data.id);
    } else {
      navigation.navigate("QrScreenDetail", data);
    }
  };

  const handlePressAdd = () => {
    navigation.navigate("QrScreenEditor", {});
  }

  if(data.id === "add") {
    return (
      <TouchableOpacity onPress={handlePressAdd}>
        <View style={styles.container}>
          <View style={styles.addQrContainer}>
           <Image
             source={require('../../assets/icons/qr_add_btn.png')}
             style={styles.datePickerArrow}
           />
          </View>
          <Text style={styles.qrContent}>{data.comment}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePressDetail}>
      <View style={styles.container}>
        <ImageBackground
          source={
            data.imageUri
              ? { uri: String(data.imageUri) }
              : require("../../assets/icons/qr_example_background.png")
          }
          style={styles.qrContainer}
          imageStyle={{ borderRadius: 5 }}
        >
          {isSelectable && (
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => onSelect && onSelect(data.id)}
            >
              <Icon
               name={isSelected ? "check-circle" : "circle-o"}
               size={15}
               color={isSelected ? "#38B7FF" : "#aaa"}
              />
            </TouchableOpacity>
          )}
          <View style={styles.qrArea}>
            {data.qrUrl ? (
              <Image 
                source={typeof data.qrUrl === 'string' ? { uri: data.qrUrl } : data.qrUrl}
                style={styles.qrImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.qrPlaceholder} />
            )}
          </View>
        </ImageBackground>
        <Text style={styles.qrContent}>{data.phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 96,
    height: 120,
    marginBottom: 10,
  },
  qrContainer: {
    width: 96,
    height: 96,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  addQrContainer: {
    width: 96,
    height: 96,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E6E9",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  qrArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 55,
    height: 55,
    borderRadius: 5,
  },
  qrContent: {
    marginTop: 5,
    fontSize: 11,
  },
  checkboxContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 15,
    height: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerArrow: {
    width: 24,
    height: 24,
  },
  qrPlaceholder: {
    width: 45,
    height: 45,
    backgroundColor: '#E1E6E9',
    borderRadius: 5,
  },
  qrImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
});

export default QrSimpleCard;
