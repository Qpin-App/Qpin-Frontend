import React, { useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import CustomStackHeader from "../../components/CustomStackHeader";
import { useNavigation, useRoute } from "@react-navigation/native";

const QrScreenDetail = ({ navigation }: any) => {
  const handleDelete = () => {
    console.log("삭제 버튼 눌림");

    // navigation.isFocused()로 현재 화면이 포커스를 받고 있는지 확인
    if (navigation.isFocused()) {
      setTimeout(() => {
        Alert.alert("삭제 확인", "이 QR을 삭제할까요?", [
          { text: "취소", style: "cancel" },
          { text: "삭제", onPress: () => console.log("QR 삭제됨") },
        ]);
      }, 0);
    }
  };

  useEffect(() => {
    // 화면이 로드되었을 때
    if (navigation.isFocused()) {
      console.log("QrScreenDetail이 포커스를 받음");
    }
  }, [navigation]);
  return (
    <View style={styles.container}>
      <CustomStackHeader title="QR 안심 카드" onClick={handleDelete} />
      <Text>QR 코드 수정 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default QrScreenDetail;
