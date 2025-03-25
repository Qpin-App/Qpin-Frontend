import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({
  title,
  onClick,
  isSave = false,
}: {
  title: string;
  onClick: () => void;
  isSave?: boolean;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.customStackHeader}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("../assets/icons/navigation_back_btn.png")} style={{ width: 11, height: 20 }} />
      </TouchableOpacity>

      {/* 중앙 제목 */}
      <Text style={styles.title}>{title}</Text>

      {/* 조건에 따라 버튼 변경 */}
      <TouchableOpacity onPress={onClick}>
        {isSave ? (
          <Text style={styles.saveButton}>저장</Text> // 저장 텍스트 버튼
        ) : (
          <Image
            source={require("../assets/icons/trash_btn.png")}
            style={styles.button} // 삭제 아이콘
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    customStackHeader: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 70,
      padding: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "600"
    },
    button: {
      width: 13,
      height: 15
    },
    saveButton: {
      fontSize: 12,
      color: "#999999",
    },
})

export default CustomHeader;
