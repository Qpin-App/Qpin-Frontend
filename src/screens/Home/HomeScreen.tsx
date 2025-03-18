import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import HomeInfo from "./HomeInfo";
import WeeklyCalendar from "./WeeklyCalendar";
import QrCard from "./QrCard";

const qrMockData = [
  { id: 1, code: 'Qr1', number: '123-456-7890', comment: '잠깐 편의점 갑니다!' },
  { id: 2, code: 'Qr2', number: '098-765-4321', comment: '10분간 자리 비웁니다' },
  { id: 3, code: 'Qr3', number: '123-987-6543', comment: '은행 다녀옵니다' },
  { id: 4, code: 'Qr4', number: '876-543-2109', comment: '1박 2일 여행 다녀옵니다' },
  { id: 5, code: 'Qr5', number: '789-012-3456', comment: '유료 주차장입니다' },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(126, 255, 222, 0.2)",
          "rgba(56, 183, 255, 0)",
          "rgba(255, 255, 255, 1)",
        ]}
        locations={[0, 0.3, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />k
      <View style={styles.content}>
        <View style={styles.nonScrollContent}>
          <HomeInfo />
          <WeeklyCalendar />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {qrMockData.map((qr) => (
            <QrCard key={qr.id} data={qr} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  gradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    width: "100%",
    height: "100%",
  },
  nonScrollContent: {
    width: "100%",
    padding: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 10,
  },
});

export default HomeScreen;
