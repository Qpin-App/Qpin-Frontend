import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen"; // src 안에 있으므로 경로 주의

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
