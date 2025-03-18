import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from 'react-native-qrcode-svg';

type QrCardProps = {
  data: {
    id: number;
    code: string;
    number: string;
    comment: string;
  };
};
const COLORS = ['#F4A733', '#FFA477', '#B5B2F9', '#FF33A8', '#F4A733'];

const QrCard = ({ data }: QrCardProps ) => {
  const textColor = COLORS[data.id % COLORS.length];

  return (
    <View style={styles.container}>
      <QRCode value={data.number} size={80} />
      <Text style={[{ color: textColor }, styles.qrNumber]}>{data.number}</Text>
      <Text
        style={styles.qrComment}
        numberOfLines={1}
        ellipsizeMode="tail"
      >{data.comment}</Text>
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
