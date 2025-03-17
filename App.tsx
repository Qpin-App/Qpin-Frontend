import React from "react";
import { Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home/HomeScreen";
import QrScreen from "./src/screens/Qr/QrScreen";
import ParkingScreen from "./src/screens/Parking/ParkingScreen";
import SearchScreen from "./src/screens/Search/SearchScreen";
import InsuranceScreen from "./src/screens/Insurance/InsuranceScreen";
import CustomHeader from './src/components/CustomHeader';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
           name="Home"
           component={HomeScreen}
            options={{
                header: () => <CustomHeader title="Home Screen" />,
            }}
        />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 100,
          },
          tabBarItemStyle: {
            alignItems: 'center',
            flexDirection: 'row',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                  ? require("./src/assets/icons/on_home.png")
                  : require("./src/assets/icons/off_home.png")
                }
              />
            ),
            tabBarLabel: '홈',
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 10,
            },
          }}
        />
        <Tab.Screen
          name="Qr"
          component={QrScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                  ? require("./src/assets/icons/on_qr.png")
                  : require("./src/assets/icons/off_qr.png")
                }
              />
            ),
            tabBarLabel: 'QR생성',
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 10,
            },
          }}
        />
        <Tab.Screen
          name="Parking"
          component={ParkingScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                  ? require("./src/assets/icons/on_parking.png")
                  : require("./src/assets/icons/off_parking.png")
                }
              />
            ),
            tabBarLabel: '간편주차',
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 10,
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                  ? require("./src/assets/icons/on_search.png")
                  : require("./src/assets/icons/off_search.png")
                }
              />
            ),
            tabBarLabel: '차량찾기',
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 10,
            },
          }}
        />
        <Tab.Screen
          name="Insurance"
          component={InsuranceScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                  ? require("./src/assets/icons/on_insurance.png")
                  : require("./src/assets/icons/off_insurance.png")
                }
              />
            ),
            tabBarLabel: '내보험',
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 10,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
