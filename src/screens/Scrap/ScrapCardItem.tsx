import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import SaveScrapIcon from '../../assets/icons/saveScrap.svg';
import SelectScrapIcon from '../../assets/icons/selectScrap.svg';
import NonScrapIcon from '../../assets/icons/nonScrap.svg';

interface ParkingCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
  isDone: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}

const ScrapCardItem = ({
  name,
  address,
  distance,
  image,
  isDone,
  selected,
  onToggleSelect,
}: ParkingCardProps) => {
  const renderScrapIcon = () => {
    if (isDone) return <SaveScrapIcon width={20} height={20} />;
    if (selected) return <SelectScrapIcon width={20} height={20} />;
    return <NonScrapIcon width={20} height={20} />;
  };

  return (
    <View style={styles.container}>
      {/* 헤더는 리스트 상단에서 따로 처리할 수 있음 */}

      {/* 선택 텍스트 */}
      <TouchableOpacity onPress={onToggleSelect}>
        <Text style={styles.selectText}>
          {selected ? '삭제' : '선택'}
        </Text>
      </TouchableOpacity>

      {/* 스크랩 버튼 */}
      <TouchableOpacity style={styles.scrapButton} onPress={onToggleSelect}>
        {renderScrapIcon()}
      </TouchableOpacity>

      {/* 이미지 */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* 이름 및 주소 */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{distance} · {address}</Text>
    </View>
  );
};

export default ScrapCardItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  selectText: {
    color: '#999',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 8,
  },
  scrapButton: {
    width: 20,
    height: 20,
    marginBottom: 12,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 3,
    backgroundColor: 'lightgray',
    marginBottom: 8,
  },
  name: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
  },
  address: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
  },
});