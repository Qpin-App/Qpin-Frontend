import React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import GalleryIcon from '../../assets/galleryIcon.svg'; 
import CameraIcon from '../../assets/cameraIcon.svg';
import LocationIcon from '../../assets/locationIcon.svg';
import PinSvg from '../../assets/pinIcon.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// 차량찾기 메인 페이지

// 지도 웹뷰에 넣을 기본 HTML (카카오 지도 API 웹버전, YOUR_APP_KEY 넣어야함)
const kakaoMapHTML = `
<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8" />
  <title>카카오 지도</title>
  <style>
    #map {width:100%; height:100%;}
  </style>
  </head>
  <body>
  <div id="map"></div>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY"></script>
  <script>
    var mapContainer = document.getElementById('map');
    var mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 4
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);
  </script>
  </body>
</html>
`;

export default function FindCarScreen() {
  return (
    <View style={styles.container}>
      {/* 지도 영역 */}
      <WebView
        originWhitelist={['*']}
        source={{ html: kakaoMapHTML }}
        style={styles.map}
        scrollEnabled={false}
      />

      {/* 핀 아이콘 - 오버레이*/}
      <PinSvg width={24} height={24} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <GalleryIcon width={28} height={28} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <CameraIcon width={28} height={28} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <LocationIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  pin: {
    position: 'absolute',
    width: 47.49,
    height: 47.49,
    left: windowWidth / 2 - 47.49 / 2,
    top: windowHeight / 2 - 47.49,
    backgroundColor: 'lightgray',
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 120,
  },
  button: {
    width: 28,
    height: 28,
    marginBottom: 16,
  },
});