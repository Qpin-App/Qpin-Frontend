import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const CommonModal = ({ content, onClose, onSubmit }: {
  content: string;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalContent}>{content}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={onClose}>
              <Text style={styles.modalCancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={onSubmit}>
              <Text style={styles.modalSubmitText}>확인</Text>
            </TouchableOpacity>
          </View>
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
      width: 250,
      height: 120,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    modalContent: {
      width: "100%",
      height: "60%",
      textAlign: "center",
      fontSize: 14,
      paddingTop: 20,
    },
    buttonContainer: {
      width: "100%",
      height: "30%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalOption: {
      width: "40%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalCancelText: {
      fontSize: 14,
      color: "#38B7FF",
    },
    modalSubmitText: {
      fontSize: 14,
      color: "#B9B9B9",
    }
});

export default CommonModal;
