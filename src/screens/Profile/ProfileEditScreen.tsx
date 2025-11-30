import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import CustomStackHeader from "../../components/CustomStackHeader";
import DefaultProfileIcon from "../../assets/icons/default_profile.svg";
import ProfileCameraIcon from "../../assets/icons/profile_camera.svg";
import SuccessModal from "../../components/SuccessModal";

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("나초보");
  const [email, setEmail] = useState("rose06166@naver.com");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          Alert.alert("오류", "이미지를 불러오는데 실패했습니다.");
        } else if (response.assets && response.assets[0].uri) {
          setProfileImage(response.assets[0].uri);
          // TODO: 서버에 이미지 업로드 로직 추가 필요
        }
      }
    );
  };

  const handleSave = () => {
    // 비밀번호 확인 검증
    if (password && password !== passwordConfirm) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 실제 프로필 업데이트 API 호출
    setShowSuccessModal(true);
  };

  const handleSuccessComplete = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomStackHeader
        title="내 프로필 수정"
        hideRightButton={true}
      />

      <View style={styles.content}>
        {/* Profile Image Section */}
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={handleImagePick}
        >
          <View style={styles.profileImageWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <DefaultProfileIcon width={100} height={100} />
            )}
            <View style={styles.cameraIconWrapper}>
              <ProfileCameraIcon width={32} height={32} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>이름 변경</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>아이디 변경</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="이메일을 입력하세요"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>비밀번호 변경</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
        </View>

        {/* Password Confirm Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            placeholder="••••••••"
            secureTextEntry
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>변경</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        message="변경 완료!"
        onComplete={handleSuccessComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconWrapper: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#38B7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#38B7FF",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileEditScreen;
