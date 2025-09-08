import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface CustomHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onAlarmPress?: () => void;
}

const CustomHeader = ({ 
  title, 
  onMenuPress, 
  onAlarmPress 
}: CustomHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Image
            source={require("../assets/icons/menu.png")}
            style={styles.menu}
          />
        </TouchableOpacity>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logo}
        />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <TouchableOpacity onPress={onAlarmPress} style={styles.alarmButton}>
        <Image
          source={require("../assets/icons/alarm.png")}
          style={styles.alarm}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 5,
  },
  menu: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logo: {
    width: 80,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  alarmButton: {
    padding: 5,
  },
  alarm: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default CustomHeader;