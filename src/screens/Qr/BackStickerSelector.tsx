import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";

const STICKERS: string[] = ["star", "heart", "cherry", "thumb_up", "car", "calling"];
const stickerImages: { [key: string]: any } = {
  star: require("../../assets/icons/star_icon.png"),
  heart: require("../../assets/icons/heart_icon.png"),
  cherry: require("../../assets/icons/cherry_icon.png"),
  thumb_up: require("../../assets/icons/thumb_up_icon.png"),
  car: require("../../assets/icons/car_icon.png"),
  calling: require("../../assets/icons/calling_icon.png"),
};

type BackStickerSelectorProps = {
  onSelectSticker: (sticker: string) => void;
};

const BackStickerSelector = ({ onSelectSticker }: BackStickerSelectorProps) => {
  return (
    <>
      <FlatList
        horizontal
        data={STICKERS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stickerIcon}
            onPress={() => {
              onSelectSticker(item);
            }}
          >
            <Image source={stickerImages[item]} style={styles.stickerIconImage}/>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.stickerList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  stickerList: {
    width: "100%",
    height: 36,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  stickerIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#B9B9B9",
  },
  stickerIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default BackStickerSelector;