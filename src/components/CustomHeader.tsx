import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Image
          source={require("../assets/icons/menu.png")}
          style={styles.menu}
        />
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logo}
        />
      </View>
      <Image
        source={require("../assets/icons/alarm.png")}
        style={styles.alarm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    leftHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      marginLeft: 10
    }
});

export default CustomHeader;
