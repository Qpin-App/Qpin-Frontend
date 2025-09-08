// CustomStackHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TrashIcon from "../assets/icons/trashIcon.svg";

const CustomStackHeader = ({
  title,
  selected = false,
  selectedItemsCount = 0,
  onSelectPress,
  onCancelPress,
  onDeletePress,
}: {
  title: string;
  selected?: boolean;
  selectedItemsCount?: number;
  onSelectPress?: () => void;
  onCancelPress?: () => void;
  onDeletePress?: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("../assets/icons/navigation_back_btn.png")} style={{ width: 11, height: 20 }} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {!selected ? (
        <TouchableOpacity onPress={onSelectPress}>
          <Text style={styles.selectText}>선택</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.selectedActions}>
          <TouchableOpacity onPress={onCancelPress}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDeletePress}
            disabled={selectedItemsCount === 0}
            style={{ opacity: selectedItemsCount === 0 ? 0.3 : 1 }}
          >
           <TrashIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "600" },
  selectText: { color: "#999999", fontSize: 12 },
  cancelText: { color: "#999999", fontSize: 12, marginRight: 12 },
  trashIcon: { fontSize: 18 },
  selectedActions: { flexDirection: "row", alignItems: "center" },
});

export default CustomStackHeader;