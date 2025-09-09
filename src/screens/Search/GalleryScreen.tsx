import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CommonModal from '../../components/CommonModal';
import SearchStackHeader from "../../components/SearchStackHeader";

// 더미 데이터
const galleryData = [
  {
    id: '1',
    image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDhfMTE1%2FMDAxNzQ0MTA5NTAzMjEw.bhHofXdiC7pEeGwgx-UKU-fjqn0yodA7pyUZ4-11Z9Ig.nRt_utgcixR_ejoZMDo-jMckejf7-RyYCFba4SS7INgg.JPEG%2F20250310_180946.jpg&type=a340',
    name: '하이피랑 다이아트 센',
    date: '2024.07.27',
  },
  {
    id: '2',
    image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAxMTFfMiAg%2FMDAxNzM2NTY2NjA2NTAw.F8d2tlakR0NxCGIxSsVnkjOcY-rjLMPR-IBGvKztdc0g.dX1cmUpDjDmnhCDF5VDyWU-wJTC5Q4QoiDL1fhykAF0g.JPEG%2FKakaoTalk_Photo_2025-01-11-12-22-21_004.jpeg&type=a340',
    name: '그린민영주차장',
    date: '2024.06.24',
  },
  {
    id: '3',
    image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAxMTFfMiAg%2FMDAxNzM2NTY2NjA2NTAw.F8d2tlakR0NxCGIxSsVnkjOcY-rjLMPR-IBGvKztdc0g.dX1cmUpDjDmnhCDF5VDyWU-wJTC5Q4QoiDL1fhykAF0g.JPEG%2FKakaoTalk_Photo_2025-01-11-12-22-21_004.jpeg&type=a340',
    name: '그린민영주차장',
    date: '2024.06.24',
  },
  {
    id: '4',
    image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAxMTFfMiAg%2FMDAxNzM2NTY2NjA2NTAw.F8d2tlakR0NxCGIxSsVnkjOcY-rjLMPR-IBGvKztdc0g.dX1cmUpDjDmnhCDF5VDyWU-wJTC5Q4QoiDL1fhykAF0g.JPEG%2FKakaoTalk_Photo_2025-01-11-12-22-21_004.jpeg&type=a340',
    name: '그린민영주차장',
    date: '2024.06.24',
  }
];

const handleSave = () => {
  return null;
};

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
      <View>
        <SearchStackHeader
          title="갤러리"
          selected={selected}
          selectedItemsCount={selectedItems.length}
          onSelectPress={() => setSelected(true)}
          onCancelPress={() => {
            setSelected(false);
            setSelectedItems([]);
          }}
          onDeletePress={() => setShowModal(true)}
        />
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
            <Text 
              style={styles.parkingName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{name}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: "15%",
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontWeight: "bold",
    fontSize: 20,
  },
  selectButton: {
    color: '#999',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    right: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  imageList: {
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: (Dimensions.get('window').width - 40 - 16*2) / 3,
    marginRight: 8,
    marginBottom: 5,
    alignItems: 'center',
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
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 6,
  },
  parkingName: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: 95,
    padding: 2,
    left: 2,
  },
  parkedDate: {
    color: '#B9B9B9',
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: 95,
    left: 4,
  },
});