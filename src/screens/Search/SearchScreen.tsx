import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Geolocation from "react-native-geolocation-service";

import GalleryIcon from "../../assets/icons/galleryIcon.svg"
import CameraIcon from "../../assets/icons/cameraIcon.svg"
import LocationIcon from "../../assets/icons/locationIcon.svg"

type RootStackParamList = {
  SearchScreen: undefined;
  GalleryScreen: undefined;
  CameraScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchScreen'>;

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // 카카오맵 HTML (JavaScript API 사용)
//   const kakaoMapHTML = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title>카카오맵</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
//         <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=f503062894afc90f6ea7384761797a32"></script>
//         <style>
//             html, body { 
//                 margin: 0; 
//                 padding: 0; 
//                 width: 100%; 
//                 height: 100%; 
//                 overflow: hidden;
//             }
//             #map { 
//                 width: 100%; 
//                 height: 100%; 
//             }
//         </style>
//     </head>
//     <body>
//         <div id="map"></div>
//         <script>
//             // 지도 초기화
//             var container = document.getElementById('map');
//             var options = {
//                 center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울시청
//                 level: 3 // 확대 레벨
//             };
//             var map = new kakao.maps.Map(container, options);
            
//             // 마커 추가
//             var markers = [
//                 {
//                     position: new kakao.maps.LatLng(37.5665, 126.9780),
//                     title: '서울시청'
//                 },
//                 {
//                     position: new kakao.maps.LatLng(37.5651, 126.9895),
//                     title: '명동역'
//                 }
//             ];
            
//             markers.forEach(function(markerInfo) {
//                 var marker = new kakao.maps.Marker({
//                     position: markerInfo.position,
//                     title: markerInfo.title
//                 });
//                 marker.setMap(map);
                
//                 // 마커 클릭 이벤트
//                 kakao.maps.event.addListener(marker, 'click', function() {
//                     if (window.ReactNativeWebView) {
//                         window.ReactNativeWebView.postMessage(JSON.stringify({
//                             type: 'MARKER_CLICK',
//                             title: markerInfo.title,
//                             lat: markerInfo.position.getLat(),
//                             lng: markerInfo.position.getLng()
//                         }));
//                     }
//                 });
//             });
            
//             // 지도 클릭 이벤트
//             kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//                 var latlng = mouseEvent.latLng;
//                 if (window.ReactNativeWebView) {
//                     window.ReactNativeWebView.postMessage(JSON.stringify({
//                         type: 'MAP_CLICK',
//                         lat: latlng.getLat(),
//                         lng: latlng.getLng()
//                     }));
//                 }
//             });
            
//             // 현재 위치로 이동하는 함수
//             window.moveToCurrentLocation = function() {
//                 if (navigator.geolocation) {
//                     navigator.geolocation.getCurrentPosition(function(position) {
//                         var lat = position.coords.latitude;
//                         var lng = position.coords.longitude;
//                         var moveLatLon = new kakao.maps.LatLng(lat, lng);
//                         map.setCenter(moveLatLon);
                        
//                         // 현재 위치 마커 추가
//                         var currentMarker = new kakao.maps.Marker({
//                             position: moveLatLon
//                         });
//                         currentMarker.setMap(map);
                        
//                         if (window.ReactNativeWebView) {
//                             window.ReactNativeWebView.postMessage(JSON.stringify({
//                                 type: 'LOCATION_FOUND',
//                                 lat: lat,
//                                 lng: lng
//                             }));
//                         }
//                     });
//                 }
//             };
            
// \            window.addEventListener('message', function(event) {
//               var data = JSON.parse(event.data);
//               if (data.type === 'GET_CURRENT_LOCATION') {
//                 window.moveToCurrentLocation();
//               }
//               if (data.type === 'LOCATION_FROM_NATIVE') {
//                 var moveLatLon = new kakao.maps.LatLng(data.lat, data.lng);
//                 map.setCenter(moveLatLon);
//                 var currentMarker = new kakao.maps.Marker({ position: moveLatLon });
//                 currentMarker.setMap(map);
//               }
//             });
//         </script>
//     </body>
//     </html>
//   `;

const googleMapHTML = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>Google Map</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_hFmpeBIUH60FuYIwGAZFey5d-gBI6Ws"></script>
      <style>
          html, body { 
              margin: 0; 
              padding: 0; 
              width: 100%; 
              height: 100%; 
              overflow: hidden;
          }
          #map { 
              width: 100%; 
              height: 100%; 
          }
      </style>
  </head>
  <body>
      <div id="map"></div>
      <script>
          var map;
          function initMap() {
              // 지도 초기화
              var center = { lat: 37.5665, lng: 126.9780 }; // 서울시청
              map = new google.maps.Map(document.getElementById('map'), {
                  center: center,
                  zoom: 15
              });

              // 마커 추가
              var markers = [
                  { position: { lat: 37.5665, lng: 126.9780 }, title: '서울시청' },
                  { position: { lat: 37.5651, lng: 126.9895 }, title: '명동역' }
              ];

              markers.forEach(function(markerInfo) {
                  var marker = new google.maps.Marker({
                      position: markerInfo.position,
                      map: map,
                      title: markerInfo.title
                  });

                  // 마커 클릭 이벤트
                  marker.addListener('click', function() {
                      if (window.ReactNativeWebView) {
                          window.ReactNativeWebView.postMessage(JSON.stringify({
                              type: 'MARKER_CLICK',
                              title: markerInfo.title,
                              lat: markerInfo.position.lat,
                              lng: markerInfo.position.lng
                          }));
                      }
                  });
              });

              // 지도 클릭 이벤트
              map.addListener('click', function(event) {
                  var lat = event.latLng.lat();
                  var lng = event.latLng.lng();
                  if (window.ReactNativeWebView) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                          type: 'MAP_CLICK',
                          lat: lat,
                          lng: lng
                      }));
                  }
              });
          }

          // 현재 위치로 이동하는 함수
          window.moveToCurrentLocation = function() {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position) {
                      var lat = position.coords.latitude;
                      var lng = position.coords.longitude;
                      var moveLatLon = { lat: lat, lng: lng };
                      map.setCenter(moveLatLon);

                      var currentMarker = new google.maps.Marker({
                          position: moveLatLon,
                          map: map
                      });

                      if (window.ReactNativeWebView) {
                          window.ReactNativeWebView.postMessage(JSON.stringify({
                              type: 'LOCATION_FOUND',
                              lat: lat,
                              lng: lng
                          }));
                      }
                  });
              }
          };

          // RN → Web 통신 처리
          window.addEventListener('message', function(event) {
              var data = JSON.parse(event.data);
              if (data.type === 'GET_CURRENT_LOCATION') {
                  window.moveToCurrentLocation();
              }
              if (data.type === 'LOCATION_FROM_NATIVE') {
                  var moveLatLon = { lat: data.lat, lng: data.lng };
                  map.setCenter(moveLatLon);
                  var currentMarker = new google.maps.Marker({ 
                      position: moveLatLon, 
                      map: map 
                  });
              }
          });

          // 초기화 실행
          window.onload = initMap;
      </script>
  </body>
  </html>
`;


  // 타입 정의
  type WebViewMessageEvent = {
    nativeEvent: {
      data: string;
    };
  };

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('카카오맵에서 받은 데이터:', data);
      
      switch (data.type) {
        case 'MAP_CLICK':
          console.log(`지도 클릭: ${data.lat}, ${data.lng}`);
          break;
        case 'MARKER_CLICK':
          Alert.alert('마커 클릭', `${data.title}\n위도: ${data.lat}\n경도: ${data.lng}`);
          break;
        case 'LOCATION_FOUND':
          Alert.alert('현재 위치', `위도: ${data.lat}\n경도: ${data.lng}`);
          break;
      }
    } catch (error) {
      console.error('WebView 메시지 파싱 오류:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  
        // WebView로 현재 위치 전달
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "LOCATION_FROM_NATIVE",
            lat: latitude,
            lng: longitude,
          })
        );
      },
      (error) => {
        console.error("위치 가져오기 실패:", error);
        Alert.alert("위치 오류", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleWebViewError = () => {
    console.error("WebView error 발생");
  };
  
  const handleWebViewHttpError = () => {
    console.error("WebView HTTP error 발생");
  };  
  
  const webViewRef = React.useRef<any>(null);

  return (
    <View style={styles.container}>
      {/* 투명 상태바 */}
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="dark-content" 
      />

      {/* 카카오맵 WebView */}
      <WebView
        ref={webViewRef}
        style={styles.map}
        source={{ html: googleMapHTML }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        onError={handleWebViewError}
        onHttpError={handleWebViewHttpError}
      />

      <View style={styles.floatingButtons}>
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => navigation.navigate('GalleryScreen')}
          >
          <GalleryIcon width={40} height={40} />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={() => navigation.navigate('CameraScreen')}
            >
            <CameraIcon width={40} height={40} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={getCurrentLocation}
          >
            <LocationIcon width={40} height={40} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  floatingButtons: {
    position: 'absolute',
    left: 25,
    right: 25,
    bottom: 25,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  floatingButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonIcon: {
    fontSize: 20,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    paddingBottom: 20,
    paddingTop: 10,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default SearchScreen;