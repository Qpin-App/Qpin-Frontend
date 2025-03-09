import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home/HomeScreen";
import QrScreen from "./src/screens/Qr/QrScreen";
import ParkingScreen from "./src/screens/Parking/ParkingScreen";
import SearchScreen from "./src/screens/Search/SearchScreen";
import InsuranceScreen from "./src/screens/Insurance/InsuranceScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Qr" component={QrScreen} />
        <Tab.Screen name="Parking" component={ParkingScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Insurance" component={InsuranceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
