import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import HomeInfo from "./HomeInfo";
import WeeklyCalendar from "./WeeklyCalendar";
import QrCard from "./QrCard";
import { qrMockData } from "../../models/qr";

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
      />
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
          {qrMockData.filter(qr => qr.id !== "add").map((qr) => (
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
