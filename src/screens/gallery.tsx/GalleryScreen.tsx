import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import CommonModal from '../../components/CommonModal';
import TrashIcon from '../../assets/icons/trashIcon.svg';

// 더미 데이터
const galleryData = [
  {
    id: '1',
    image: 'https://via.placeholder.com/96',
    name: '하이피랑 다이아트 센',
    date: '2024.07.27',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/96',
    name: '그린민영주차장',
    date: '2024.06.24',
  }
];

const GalleryScreen = () => {
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDelete = () => {
    setShowModal(false);
    setSelectedItems([]);
    setSelected(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>갤러리</Text>
        {!selected ? (
          <TouchableOpacity onPress={() => setSelected(true)}>
            <Text style={styles.selectButton}>선택</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => {
              setSelected(false);
              setSelectedItems([]);
            }}>
              <Text style={styles.selectButton}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              disabled={selectedItems.length === 0}
              style={{ opacity: selectedItems.length === 0 ? 0.3 : 1 }}
            >
              <TrashIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.imageList}>
        {galleryData.map(({ id, image, name, date }) => (
          <TouchableOpacity
            key={id}
            style={[
              styles.imageContainer,
              selected && selectedItems.includes(id) && styles.selectedItem,
            ]}
            onPress={() => selected && toggleSelectItem(id)}
            activeOpacity={selected ? 0.7 : 1}
          >
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.parkingName}>{name}</Text>
            <Text style={styles.parkedDate}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {showModal && (
        <CommonModal
          content="사진을 삭제하시겠습니까?"
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
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: 96,
    marginBottom: 12,
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    padding: 4,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#38B7FF',
    backgroundColor: '#E8F4FF',
    borderRadius: 8,
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