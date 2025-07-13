import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import ScrapCardItem from './ScrapCardItem';
import ReturnIcon from '../../assets/icons/return.svg';

interface ParkingData {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
  isDone: boolean;
}

const initialData: ParkingData[] = [
  {
    id: '1',
    name: '강남역 공영주차장',
    address: '서울시 강남구 테헤란로 123',
    distance: '100m',
    image: 'https://via.placeholder.com/150',
    isDone: false,
  },
  {
    id: '2',
    name: '역삼동 제1주차장',
    address: '서울시 강남구 역삼로 45',
    distance: '150m',
    image: 'https://via.placeholder.com/150',
    isDone: true,
  },
];

const ScrapScreen = () => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ReturnIcon width={12} height={20} />
        </TouchableOpacity>
        <Text style={styles.title}>타이틀</Text>
      </View>

      <FlatList
        data={initialData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ScrapCardItem
            {...item}
            selected={!!selectedItems[item.id]}
            onToggleSelect={() => toggleSelect(item.id)}
          />
        )}
      />
    </View>
  );
};

export default ScrapScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    width: 26,
    height: 22,
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
  },
});