import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, TouchableWithoutFeedback } from "react-native";
import CustomStackHeader from "../../components/CustomStackHeader";
import QrCardDetail from "./QrCardDetail";
import BackColorSelector from "./BackColorSelector";
import BackStickerSelector from "./BackStickerSelector";
import Icon from "react-native-vector-icons/Ionicons";

const QrScreenAdd = () => {
  const [activeTab, setActiveTab] = useState("배경색");
  const [selectedColor, setSelectedColor] = useState("#F8F8F8");
  const [selectedGradientColor, setSelectedGradientColor] = useState("#F8F8F8");
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSave = () => {
    console.log("Save button clicked");
  };

  return (
    <View style={styles.container}>
      <CustomStackHeader title="생성하기" onClick={handleSave} isSave={true} />
      <QrCardDetail
        backgroundColor={selectedColor}
        gradientColor={selectedGradientColor}
        sticker={selectedSticker}
        imageUri={selectedImage}
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

export default QrScreenAdd;
