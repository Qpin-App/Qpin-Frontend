import React from "react";
import { Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home/HomeScreen";
import QrScreen from "./src/screens/Qr/QrScreen";
import QrScreenDetail from "./src/screens/Qr/QrScreenDetail";
import QrScreenEditor from "./src/screens/Qr/QrScreenEditor";
import CompleteScreen from "./src/screens/Qr/CompleteScreen";
import ParkingScreen from "./src/screens/Parking/ParkingScreen";
import SearchScreen from "./src/screens/Search/SearchScreen";
import InsuranceScreen from "./src/screens/Insurance/InsuranceScreen";
import LoginScreen from "./src/screens/Login/LoginScreen";
import CustomHeader from './src/components/CustomHeader';
import GalleryScreen from "./src/screens/Search/GalleryScreen";
import CameraScreen from "./src/screens/Search/CameraScreen";
import ScrapScreen from "./src/screens/Scrap/ScrapScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
           name="Home"
           component={HomeScreen}
            options={{
                header: () => <CustomHeader title="" />,
            }}
        />
    </Stack.Navigator>
);

const QrStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#3498db" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
    }}
  >
    <Stack.Screen
      name="QrMain"
      component={QrScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="QrScreen"
      component={QrScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="QrScreenEditor"
      component={QrScreenEditor}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="QrScreenDetail"
      component={QrScreenDetail}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CompleteScreen"
      component={CompleteScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="scrap"
      component={ScrapScreen}
      options={{ headerShown: true}}
    />
    <Stack.Screen
      name="parking"
      component={ParkingScreen}
      options={{ headerShown: true}}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CameraScreen"
      component={CameraScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="GalleryScreen"
      component={GalleryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ScrapScreen"
      component={ScrapScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ParkingStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ParkingScreen"
      component={ParkingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ScrapScreen"
      component={ScrapScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)

// 메인 탭 네비게이터
const MainTabNavigator = () => (
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
      component={QrStack}
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
      component={ParkingStack}
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
      component={SearchStack}
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
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}