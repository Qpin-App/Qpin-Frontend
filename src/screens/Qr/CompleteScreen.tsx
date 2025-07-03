import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Button, Dimensions, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

const screenWidth = Dimensions.get("window").width;
const halfWidth = screenWidth / 2;

const CompleteScreen = () => {
  const navigation = useNavigation<any>();
  const handleOutQr = () => {
    navigation.navigate("QrScreen", {});
  }

  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.delay(5000), // 5초 기다린 후
      Animated.timing(opacity, {
        toValue: 0, // 완전히 투명해짐
        duration: 2000, // 2초 동안 점점 사라짐
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require("../../assets/icons/thumb_up_on_icon.png")} style={styles.completeIcon}/>
          <View style={styles.textContainer}>
            <Text style={styles.normalText}>
              <Text style={styles.highlightText}>QR 안심 카드</Text>가
            </Text>
            <Text style={styles.normalText}>완성되었어요!</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.latelySubmitBtn} onPress={() => handleOutQr()}>
            <Text style={styles.latelyBtnText}>나중에 내보낼래요</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightSubmitBtn} onPress={() => handleOutQr()}>
            <Text style={styles.rightBtnText}>내보내기</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.confettiContainer, { opacity }]}>
          <ConfettiCannon
            count={200}
            origin={{ x: halfWidth, y: -10 }}
            autoStart={true}
            fadeOut={true}
            fallSpeed={5000}
            explosionSpeed={1000}
            colors={['#38B7FF', '#57DFE8']}
          />
        </Animated.View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  completeIcon: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  normalText: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 5,
  },
  highlightText: {
    color: '#38B7FF',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
  },
  latelySubmitBtn: {
    zIndex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  latelyBtnText: {
    borderBottomWidth: 1,
    borderColor: "#B9B9B9",
    color: "#B9B9B9",
  },
  rightSubmitBtn: {
    zIndex: 1,
    width: 180,
    height: 40,
    backgroundColor: "#38B7FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  rightBtnText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#FEFFFE",
  },
  confettiContainer: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CompleteScreen;
