import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultProfileIcon from "../assets/icons/default_profile.svg";
import CommonModal from "./CommonModal";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose, onNavigate, onLogout }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);

  const handleMenuPress = (screen: string) => {
    onClose();
    onNavigate(screen);
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    onClose();
    // TODO: 실제 로그아웃 API 호출 및 로컬 인증 정보 삭제 구현 필요
    // - AsyncStorage에서 토큰 삭제
    // - 전역 상태에서 유저 정보 초기화
    // - 필요 시 로그아웃 API 호출
    onLogout();
  };

  const handleDeleteAccount = () => {
    setDeleteAccountModalVisible(false);
    onClose();
    // TODO: 실제 회원 탈퇴 API 호출 및 데이터 정리 구현 필요
    // - 회원 탈퇴 API 호출
    // - AsyncStorage에서 모든 인증 정보 삭제
    // - 서버에 저장된 사용자 데이터 삭제 처리
    onLogout();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Overlay - 클릭 시 닫기 */}
        <Pressable style={styles.overlay} onPress={onClose} />

        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <DefaultProfileIcon width={60} height={60} />
            </View>
            <View style={styles.profileInfoSection}>
              <Text style={styles.profileName}>나초보</Text>
              <Text style={styles.profileDate}>가입일 :2024.01.25</Text>
            </View>
            </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Menu Items */}
          <View style={styles.menuList}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuPress("ProfileEdit")}
            >
              <Text style={styles.menuText}>내 프로필 수정</Text>
              <Icon name="chevron-forward" size={20} color="#B9B9B9" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuPress("Settings")}
            >
              <Text style={styles.menuText}>설정</Text>
              <Icon name="chevron-forward" size={20} color="#B9B9B9" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuPress("CustomerService")}
            >
              <Text style={styles.menuText}>고객센터</Text>
              <Icon name="chevron-forward" size={20} color="#B9B9B9" />
            </TouchableOpacity>
          </View>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setLogoutModalVisible(true)}
            >
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteAccountButton}
              onPress={() => setDeleteAccountModalVisible(true)}
            >
              <Text style={styles.deleteAccountText}>회원 탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Logout Confirmation Modal */}
      {logoutModalVisible && (
        <CommonModal
          content="로그아웃 하시겠습니까?"
          onClose={() => setLogoutModalVisible(false)}
          onSubmit={handleLogout}
        />
      )}

      {/* Delete Account Confirmation Modal */}
      {deleteAccountModalVisible && (
        <CommonModal
          content="회원탈퇴 하시겠습니까?"
          onClose={() => setDeleteAccountModalVisible(false)}
          onSubmit={handleDeleteAccount}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    width: "80%",
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  profileSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfoSection: {
    display: "flex",
    marginBottom: 20,
    marginLeft: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 15,
    overflow: "hidden",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  profileDate: {
    fontSize: 14,
    color: "#999",
  },
  divider: {
    height: 1,
    backgroundColor: "#E1E6E9",
    // marginBottom: 20,
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  bottomActions: {
    gap: 15,
  },
  logoutButton: {
    backgroundColor: "#38B7FF",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteAccountButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  deleteAccountText: {
    color: "#999",
    fontSize: 14,
  },
});

export default DrawerMenu;
