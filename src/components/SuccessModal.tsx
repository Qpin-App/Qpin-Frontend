import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Animated } from 'react-native';
import Svg, { Circle, Polyline } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

const SuccessModal = ({ visible, message, onComplete }: {
  visible: boolean;
  message: string;
  onComplete: () => void;
}) => {
  const circleScale = useRef(new Animated.Value(0)).current;
  const checkmarkProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // 원 애니메이션
      Animated.sequence([
        Animated.spring(circleScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        // 체크마크 애니메이션
        Animated.timing(checkmarkProgress, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 애니메이션 완료 후 1초 대기 후 onComplete 호출
        setTimeout(() => {
          onComplete();
        }, 1000);
      });
    } else {
      // 리셋
      circleScale.setValue(0);
      checkmarkProgress.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Animated.View style={{ transform: [{ scale: circleScale }] }}>
            <Svg width="80" height="80" viewBox="0 0 80 80">
              {/* 원 배경 */}
              <Circle
                cx="40"
                cy="40"
                r="38"
                fill="none"
                stroke="#38B7FF"
                strokeWidth="3"
              />
              {/* 체크마크 */}
              <AnimatedPolyline
                points="20,40 35,55 60,25"
                fill="none"
                stroke="#38B7FF"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="100"
                strokeDashoffset={checkmarkProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                })}
              />
            </Svg>
          </Animated.View>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 280,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  messageText: {
    marginTop: 24,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default SuccessModal;
