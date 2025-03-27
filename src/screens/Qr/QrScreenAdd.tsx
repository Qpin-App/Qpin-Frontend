import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, TouchableWithoutFeedback } from "react-native";
import CustomStackHeader from "../../components/CustomStackHeader";
import QrDetailCard from "./QrDetailCard";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const COLORS = ["#EF8582", "#F7CCA5", "#FCF2B8", "#C0FCBE", "#B5E1FC", "#9C98F8"];
const GRADIENTS: { [key: string]: string[] } = {
  "#EF8582": ["#9C98F8", "#EF8582", "#F7CCA5"],
  "#F7CCA5": ["#EF8582", "#F7CCA5", "#FCF2B8"],
  "#FCF2B8": ["#F7CCA5", "#FCF2B8", "#C0FCBE"],
  "#C0FCBE": ["#FCF2B8", "#C0FCBE", "#B5E1FC"],
  "#B5E1FC": ["#C0FCBE", "#B5E1FC", "#9C98F8"],
  "#9C98F8": ["#B5E1FC", "#9C98F8", "#EF8582"],
};

const QrScreenAdd = () => {
  const [selectedColor, setSelectedColor] = useState("#F8F8F8");
  const [selectedGradientColor, setSelectedGradientColor] = useState("#F8F8F8");
  const [activeTab, setActiveTab] = useState("배경색");
  const [gradientWidth, setGradientWidth] = useState(0);
  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    setGradientWidth(width);
  };

const handleGradientPress = (e: any) => {
  const { locationX } = e.nativeEvent;

  if (gradientWidth === 0) return;

  // 0, 1, 2 중 하나로 계산
  const selectedIndex = Math.floor((locationX / gradientWidth) * 3);

  // selectedIndex에 따라 GRADIENTS에서 매핑된 색상 선택
  let newColor = "";
  if (selectedIndex === 0) {
    newColor = GRADIENTS[selectedColor][0];
  } else if (selectedIndex === 1) {
    newColor = GRADIENTS[selectedColor][1];
  } else {
    newColor = GRADIENTS[selectedColor][2];
  }

  setSelectedGradientColor(newColor);
};

  return (
    <View style={styles.container}>
      <CustomStackHeader title="생성하기" onClick={handleSave} isSave={true} />
      <QrDetailCard backgroundColor={selectedColor} gradientColor={selectedGradientColor}/>

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

      <FlatList
        horizontal
        data={COLORS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.colorCircle,
              { backgroundColor: item },
            ]}
            onPress={() => {
              setSelectedColor(item);
              setSelectedGradientColor(item);
            }}
          />
        )}
        contentContainerStyle={styles.colorList}
      />

      <View style={styles.gradientContainer}>
        <View style={styles.gradientHeader}>
          <Image source={require("../../assets/icons/qr_gradient_icon.png")} style={styles.gradientIcon} />
          <Text style={styles.gradientTitle}>그라데이션</Text>
        </View>
        <TouchableOpacity
          style={styles.gradientTouchable}
          onPress={handleGradientPress}
          onLayout={handleLayout}
        >
          <LinearGradient
            colors={GRADIENTS[selectedColor] || ["#DDDDDD", "#EEEEEE", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
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
  colorList: {
    width: "100%",
    height: 36,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
  gradientContainer: {
    width: "100%",
    padding: 20,
    gap: 15,
  },
  gradientHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  gradientTitle: {
    fontSize: 14,
    color: "#38B7FF",
    fontWeight: 600,
  },
  gradientTouchable: {
    width: "100%",
    height: 12,
  },
  gradientBar: {
    width: "100%",
    height: 12,
    borderRadius: 10,
  },
});

export default QrScreenAdd;
