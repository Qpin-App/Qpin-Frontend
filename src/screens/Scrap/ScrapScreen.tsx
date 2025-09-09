import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ScrapCardItem from './ScrapCardItem';
import ScrapStackHeader from '../../components/ScrapStackHeader';

const initialData = [
  { id: '1', name: '강남역 공영주차장', distance: '100m', image: 'https://via.placeholder.com/150', isDone: false },
  { id: '2', name: '역삼동 제1주차장', distance: '150m', image: 'https://via.placeholder.com/150', isDone: true },
  { id: '3', name: '삼성동 공영주차장', distance: '200m', image: 'https://via.placeholder.com/150', isDone: false },
  { id: '4', name: '논현동 제2주차장', distance: '300m', image: 'https://via.placeholder.com/150', isDone: true },
  { id: '5', name: '청담동 공영주차장', distance: '350m', image: 'https://via.placeholder.com/150', isDone: false },
  { id: '6', name: '압구정 주차장', distance: '400m', image: 'https://via.placeholder.com/150', isDone: true },
];

const ScrapScreen = () => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const enterDeleteMode = () => {
    setDeleteMode(true);
    setSelectedItems({});
  };

  const cancelDeleteMode = () => {
    setDeleteMode(false);
    setSelectedItems({});
  };

  const handleDelete = () => {
    console.log('삭제할 아이템:', Object.keys(selectedItems).filter(id => selectedItems[id]));
    cancelDeleteMode();
  };

  return (
    <View style={styles.container}>
      <ScrapStackHeader
        title="스크랩한 주차장"
        deleteMode={deleteMode}
        selectedCount={Object.values(selectedItems).filter(v => v).length}
        onSelectPress={enterDeleteMode}
        onCancelPress={cancelDeleteMode}
        onDeletePress={handleDelete}
      />

      <FlatList
        data={initialData}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ScrapCardItem
            {...item}
            selected={!!selectedItems[item.id]}
            onToggleSelect={() => toggleSelectItem(item.id)}
            deleteMode={deleteMode}
          />
        )}
      />
    </View>
  );
};

export default ScrapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});