import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { QrData } from "../../models/qr";

const COLORS = ['#F4A733', '#FFA477', '#B5B2F9', '#FF33A8', '#F4A733'];

interface QrCardProps {
  data: QrData;
}

const QrCard: React.FC<QrCardProps> = ({ data }) => {
  const textColor = COLORS[Number(data.id) % COLORS.length];

  return (
    <View style={styles.container}>
      {data.qrUrl ? (
        <Image 
          source={typeof data.qrUrl === 'string' ? { uri: data.qrUrl } : data.qrUrl}
          style={styles.qrImage}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.qrPlaceholder} />
      )}
      <Text style={[{ color: textColor }, styles.qrNumber]}>{data.phoneNumber}</Text>
      <Text
        style={styles.qrComment}
        numberOfLines={1}
        ellipsizeMode="tail"
      >{data.comment || ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 136,
    height: 156,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  qrImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E1E6E9',
    borderRadius: 5,
  },
  qrNumber: {
    marginTop: 8,
    fontSize: 12,
  },
  qrComment: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default QrCard;
