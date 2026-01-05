import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ScrapCardItem from './ScrapCardItem';
import ScrapStackHeader from '../../components/ScrapStackHeader';

interface ScrapItem {
  id: string;
  name: string;
  distance: string;
  image: string;
  isDone: boolean;
}

const MEMBER_ID = 0;

const ScrapScreen = () => {
  const [scrapData, setScrapData] = useState<ScrapItem[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  /* 스크랩 조회 */
  const fetchScraps = async () => {
    try {
      const res = await fetch(
        `http://43.202.105.137:8080/scrap/${MEMBER_ID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      setScrapData(data);
    } catch (e) {
      console.error('스크랩 조회 실패', e);
    }
  };

  useEffect(() => {
    fetchScraps();
  }, []);

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

  /* 스크랩 삭제 */
  const handleDelete = async () => {
    const deleteTargets = Object.keys(selectedItems).filter(
      id => selectedItems[id]
    );

    try {
      await Promise.all(
        deleteTargets.map(scrapId =>
          fetch(`http://43.202.105.137:8080/scrap/${scrapId}`, {
            method: 'DELETE',
          })
        )
      );

      setScrapData(prev =>
        prev.filter(item => !deleteTargets.includes(item.id))
      );
    } catch (e) {
      console.error('스크랩 삭제 실패', e);
    } finally {
      cancelDeleteMode();
    }
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
        data={scrapData}
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