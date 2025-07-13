import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CommonModal from '../../components/CommonModal';
import TrashIcon from '../../assets/icons/trashIcon.svg';

const GalleryScreen = () => {
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>갤러리</Text>
        {!selected ? (
          <TouchableOpacity onPress={() => setSelected(true)}>
            <Text style={styles.selectButton}>선택</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => setSelected(false)}>
              <Text style={styles.selectButton}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <TrashIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 이미지 프리뷰 */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/96' }}
          style={styles.image}
        />
        <Text style={styles.parkingName}>주차장 이름</Text>
        <Text style={styles.parkedDate}>2024. 12. 31</Text>
      </View>

      {/* 삭제 확인 모달 */}
      {showModal && (
        <CommonModal
          content="정말 삭제하시겠습니까?"
          onClose={() => setShowModal(false)}
          onSubmit={handleDelete}
        />
      )}
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    pageTitle: {
      color: '#000',
      textAlign: 'center',
      fontFamily: 'Pretendard',
      fontSize: 16,
      fontWeight: '500',
    },
    selectButton: {
      color: '#999',
      textAlign: 'center',
      fontFamily: 'Pretendard',
      fontSize: 12,
      fontWeight: '400',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
    trashIcon: {
      fontSize: 16,
    },
    imageContainer: {
      alignItems: 'center',
      gap: 4,
    },
    image: {
      width: 96,
      height: 96,
      borderRadius: 6,
    },
    parkingName: {
      color: '#000',
      fontFamily: 'Pretendard',
      fontSize: 12,
      fontWeight: '400',
    },
    parkedDate: {
      color: '#B9B9B9',
      fontFamily: 'Pretendard',
      fontSize: 10,
      fontWeight: '500',
    },
});