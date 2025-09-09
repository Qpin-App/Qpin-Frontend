import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ScrapStackHeaderProps {
  title: string;
  deleteMode: boolean;
  selectedCount: number;
  onSelectPress: () => void;
  onCancelPress: () => void;
  onDeletePress: () => void;
}

const ScrapStackHeader = ({
  title,
  deleteMode,
  selectedCount,
  onSelectPress,
  onCancelPress,
  onDeletePress,
}: ScrapStackHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("../assets/icons/navigation_back_btn.png")} style={{ width: 11, height: 20 }} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {deleteMode ? (
        <TouchableOpacity onPress={onDeletePress} disabled={selectedCount === 0}>
          <Text style={[styles.deleteText]}>삭제</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSelectPress}>
          <Text style={styles.selectText}>선택</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScrapStackHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  backText: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  selectText: {
    fontSize: 14,
    color: '#999',
  },
  deleteText: {
    fontSize: 14,
    color: '#999',
  },
});
