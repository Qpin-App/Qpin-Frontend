import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import SaveScrapIcon from '../../assets/icons/saveScrap.svg';
import SelectScrapIcon from '../../assets/icons/selectScrap.svg';
import NonScrapIcon from '../../assets/icons/nonScrap.svg';

interface ScrapCardItemProps {
  id: string;
  name: string;
  address?: string;
  distance?: string;
  image: string;
  isDone: boolean;
  selected: boolean;
  onToggleSelect: () => void;
  deleteMode: boolean;
}

const ScrapCardItem = ({
  name,
  distance,
  image,
  isDone,
  selected,
  onToggleSelect,
  deleteMode,
}: ScrapCardItemProps) => {
  const renderScrapIcon = () => {
    if (isDone) return <SaveScrapIcon width={24} height={24} />;
    if (selected) return <SelectScrapIcon width={24} height={24} />;
    return <NonScrapIcon width={24} height={24} />;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        deleteMode && selected && styles.selectedContainer,
      ]}
      activeOpacity={0.8}
      onPress={deleteMode ? onToggleSelect : undefined}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        {distance && <Text style={styles.distance}>{distance}</Text>}
      </View>
      <View style={styles.icon}>{renderScrapIcon()}</View>
    </TouchableOpacity>
  );
};

export default ScrapCardItem;

const CARD_WIDTH = (Dimensions.get('window').width - 16 * 2 - 16) / 3; // 3열 + padding + margin

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedContainer: {
    borderColor: '#38B7FF',
    backgroundColor: '#E8F4FF',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH,
    borderRadius: 8,
  },
  info: {
    padding: 6,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  distance: {
    fontSize: 10,
    color: '#666',
  },
  icon: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
});