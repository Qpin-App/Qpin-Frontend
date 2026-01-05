import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type SearchStackParamList = {
  SearchScreen: undefined;
  CameraScreen: undefined;
  GalleryScreen: undefined;
};

type CameraScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParamList,
  "CameraScreen"
>;

const uploadPhotoPath = async (localPath: string) => {
  try {
    await fetch('http://43.202.105.137:8080/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 0,
        parkingAreaId: 0,
        carPhotoUrl: localPath,
      }),
    });
  } catch (e) {
    console.error('사진 정보 전송 실패', e);
  }
};

export default function CameraScreen() {
  const camera = useRef<Camera>(null);
  const navigation = useNavigation<CameraScreenNavigationProp>();

  // 뒤쪽 카메라 사용
  const device = useCameraDevice('back');

  // 카메라 권한
  const { hasPermission, requestPermission } = useCameraPermission();

  const [isActive, setIsActive] = useState(true);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [isRecording, setIsRecording] = useState(false);

  // 화면 포커스에 따라 카메라 활성화
  useFocusEffect(
    React.useCallback(() => {
      setIsActive(true);
      return () => setIsActive(false);
    }, [])
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const takePhoto = async () => {
    try {
      const cam = camera.current;
      if (cam) {
        const photo = await cam.takePhoto({ flash });
  
        const localPath = `file://${photo.path}`;
        console.log('Photo path:', localPath);
  
        await uploadPhotoPath(localPath);
  
        Alert.alert(
          '사진 촬영',
          '사진이 촬영되었습니다!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate("SearchScreen"),
            },
          ]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '사진 촬영에 실패했습니다.');
    }
  };  

  const startRecording = async () => {
    try {
      const cam = camera.current;
      if (cam && !isRecording) {
        await cam.startRecording({
          flash,
          onRecordingFinished: async (video) => {
            const localPath = `file://${video.path}`;
            console.log('Video path:', localPath);
  
            await uploadPhotoPath(localPath);
  
            setIsRecording(false);
            Alert.alert('녹화 완료', '비디오가 저장되었습니다!');
          },
          onRecordingError: (err) => {
            console.error(err);
            setIsRecording(false);
            Alert.alert('오류', '녹화 중 오류 발생');
          },
        });
        setIsRecording(true);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '녹화 시작 실패');
    }
  };  

  const stopRecording = async () => {
    try {
      const cam = camera.current;
      if (cam && isRecording) {
        await cam.stopRecording();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFlash = () => setFlash((f) => (f === 'off' ? 'on' : 'off'));
  const getFlashIcon = () => (flash === 'on' ? '⚡' : '⚡̶');

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>카메라를 찾을 수 없습니다</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>카메라 권한이 필요합니다</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>권한 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
        video={true}
        audio={true}
      />

      {/* 상단 플래시 */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Text style={styles.controlText}>{getFlashIcon()}</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 촬영 버튼 */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={[styles.captureButton, isRecording && styles.recordingButton]}
          onPress={isRecording ? stopRecording : takePhoto}
          onLongPress={startRecording}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        {isRecording && <Text style={styles.recordingText}>녹화 중...</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: 'white',
    fontSize: 24,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  recordingButton: {
    backgroundColor: 'red',
  },
  recordingText: {
    color: 'white',
    marginTop: 10,
    fontWeight: '600',
  },
});