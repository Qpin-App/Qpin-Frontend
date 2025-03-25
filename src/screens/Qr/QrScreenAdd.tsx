import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import CustomStackHeader from "../../components/CustomStackHeader";
import QrDetailCard from "./QrDetailCard";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const COLORS = ["#EF8582", "#F7CCA5", "#FCF2B8", "#C0FCBE", "#B5E1FC", "#9C98F8"];

const QrScreenAdd = () => {
  const [selectedColor, setSelectedColor] = useState("#F8F8F8");
  const [activeTab, setActiveTab] = useState("배경색");

  const handleSave = () => {
    console.log("Save button clicked");
  };

  return (
    <View style={styles.container}>
      <CustomStackHeader title="생성하기" onClick={handleSave} isSave={true} />
      <QrDetailCard backgroundColor={selectedColor} />

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
            onPress={() => setSelectedColor(item)}
          />
        )}
        contentContainerStyle={styles.colorList}
      />

      <Text style={styles.sectionTitle}>그라데이션</Text>
      <LinearGradient
        colors={["#A5D6A7", "#90CAF9", "#9575CD"]}
        style={styles.gradientBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  gradientBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default QrScreenAdd;
