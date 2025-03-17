import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import HomeInfo from "./HomeInfo";
import WeeklyCalendar from "./WeeklyCalendar";

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
        <HomeInfo />
        <WeeklyCalendar />
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
    padding: 20,
  },
  calendar: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },

});

export default HomeScreen;
