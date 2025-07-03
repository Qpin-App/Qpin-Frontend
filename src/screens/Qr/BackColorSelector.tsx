import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { LayoutChangeEvent } from "react-native";

const INITIAL_COLOR = "#F8F8F8";
const COLORS: string[] = ["#EF8582", "#F7CCA5", "#FCF2B8", "#C0FCBE", "#B5E1FC", "#9C98F8"];
const GRADIENTS: { [key: string]: string[] } = {
  "#EF8582": ["#9C98F8", "#EF8582", "#F7CCA5"],
  "#F7CCA5": ["#EF8582", "#F7CCA5", "#FCF2B8"],
  "#FCF2B8": ["#F7CCA5", "#FCF2B8", "#C0FCBE"],
  "#C0FCBE": ["#FCF2B8", "#C0FCBE", "#B5E1FC"],
  "#B5E1FC": ["#C0FCBE", "#B5E1FC", "#9C98F8"],
  "#9C98F8": ["#B5E1FC", "#9C98F8", "#EF8582"],
};

type BackColorSelectorProps = {
  currentColor: string | null;
  onSelectColor: (color: string) => void;
  onSelectGradient: (color: string) => void;
};

const BackColorSelector = ({ currentColor, onSelectColor, onSelectGradient }: BackColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [gradientWidth, setGradientWidth] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setGradientWidth(width);
  };

  const handleGradientPress = (e: any) => {
    if(selectedColor == INITIAL_COLOR) return;

    const { locationX } = e.nativeEvent;

    if (gradientWidth === 0) return;

    // 0, 1, 2 중 하나로 계산
    const selectedIndex = Math.floor((locationX / gradientWidth) * 3);

    // selectedIndex에 따라 GRADIENTS에서 매핑된 색상 선택
    let newColor = "";
    if (selectedColor && GRADIENTS[selectedColor]) {
      if (selectedIndex === 0) {
        newColor = GRADIENTS[selectedColor][0];
      } else if (selectedIndex === 1) {
        newColor = GRADIENTS[selectedColor][1];
      } else {
        newColor = GRADIENTS[selectedColor][2];
      }
    }
    onSelectGradient(newColor);
  };
  return (
    <>
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
              onSelectColor(item);
              onSelectGradient(item);
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
            colors={GRADIENTS[selectedColor || ""] || ["#DDDDDD", "#EEEEEE", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBar}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    height: 80,
    padding: 20,
    gap: 15,
  },
  gradientHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
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
  gradientIcon: {
    width: 16,
    height: 16,
  },
});

export default BackColorSelector;