import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import SaveScrapIcon from "../../assets/icons/saveScrap.svg";

type RootStackParamList = {
  ScrapScreen: undefined;
};

const { width, height } = Dimensions.get("window");
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScrapScreen'>;

interface ParkingInfo {
  name: string;
  status: string;
  location: string;
  distance: string;
  parkingTime: string;
  lastTime: string;
  fees: { title: string; price: string }[];
  image: string;
}

const dummyData: ParkingInfo = {
  name: "하이파킹 디아뜨 센트럴 주차장",
  status: "현재 주차중입니다",
  location: "서울특별시 용산구 원효로 268",
  distance: "0.5km",
  parkingTime: "2023.01.24 14:00 ~ 주차중",
  lastTime: "주차한지 2시간 30분이 지났어요",
  fees: [
    { title: "종일권", price: "10,000원" },
    { title: "오후권", price: "4,500원" },
    { title: "1시간 이용시", price: "2,500원" },
  ],
  image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMDVfNzkg%2FMDAxNzMwNzUzMTgxMzM5.U7c0LhEIbAJ8Ni5_SO-E195mfc_7Gy5r_2xDdzPl7Jog.3gLU1JyRYN-HwBZJ9L5dH2FB4ncPFT4lTYPr87S2FMsg.JPEG%2Fchild%25A3%25DFimg01%25A3%25DF20241105053220.jpg&type=l340_165",
};

interface ParkingItem {
  parkingId: number;
  name: string;
  lat: number;
  lng: number;
}

interface ParkingDetail {
  parkingId: number;
  name: string;
  address: string;
  price: number;
}

const MEMBER_ID = 0;

export default function ParkingScreen() {
  const webViewRef = useRef<WebView>(null);
  const navigation = useNavigation<NavigationProp>();

  const [searchValue, setSearchValue] = useState("");
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const [parkingDetail, setParkingDetail] =
    useState<ParkingDetail | null>(null);
  const [selectedParkingId, setSelectedParkingId] =
    useState<number | null>(null);

  // ✅ 구글맵 HTML
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
                var center = { lat: 37.5665, lng: 126.9780 }; // 서울시청
                map = new google.maps.Map(document.getElementById('map'), {
                    center: center,
                    zoom: 15
                });

                var markers = [
                    { position: { lat: 37.5665, lng: 126.9780 }, title: '서울시청' },
                    { position: { lat: 37.5651, lng: 126.9895 }, title: '명동역' },
                    { position: { lat: 37.5640, lng: 126.9854 }, title: '하이마트 다이어트샵', price: '10,000원' }
                ];

                markers.forEach(function(markerInfo) {
                    var marker = new google.maps.Marker({
                        position: markerInfo.position,
                        map: map,
                        title: markerInfo.title
                    });

                    marker.addListener('click', function() {
                        if (window.ReactNativeWebView) {
                            window.ReactNativeWebView.postMessage(JSON.stringify({
                                type: 'MARKER_CLICK',
                                title: markerInfo.title,
                                lat: markerInfo.position.lat,
                                lng: markerInfo.position.lng,
                                price: markerInfo.price || null
                            }));
                        }
                    });
                });

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

            window.onload = initMap;
        </script>
    </body>
    </html>
  `;

  const fetchParkingDetail = async (parkingId: number) => {
    try {
      const res = await fetch(
        `http://43.202.105.137:8080/parking/select?parkingId=${parkingId}`
      );
      const data: ParkingDetail = await res.json();
      setParkingDetail(data);
      setSelectedParkingId(parkingId);
      setBottomSheetOpen(true);
    } catch (e) {
      console.error("주차장 상세 조회 실패", e);
    }
  };
  
  const startParking = async () => {
    if (!selectedParkingId) return;

    await fetch("http://43.202.105.137:8080/parking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: MEMBER_ID,
        parkingId: selectedParkingId,
      }),
    });

    Alert.alert("주차 시작", "주차가 시작되었습니다.");
  };
  
  const endParking = async () => {
    if (!selectedParkingId) return;

    await fetch("http://43.202.105.137:8080/parking", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: MEMBER_ID,
        parkingId: selectedParkingId,
      }),
    });

    Alert.alert("주차 종료", "주차가 종료되었습니다.");
    setBottomSheetOpen(false);
    setParkingDetail(null);
    setSelectedParkingId(null);
  };

  const handleWebViewMessage = (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.type === "MARKER_CLICK") {
      fetchParkingDetail(message.parkingId);
    }
  }; 

  const handleWebViewError = () => {
    console.error("WebView error 발생");
  };
  
  const handleWebViewHttpError = () => {
    console.error("WebView HTTP error 발생");
  };  

  return (
    <View style={styles.container}>
      <View style={styles.rootContainer}>
        {<View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="🔍 목적지를 검색하세요"
            />
          </View>
        }
        <TouchableOpacity
          style={styles.scrapButton}
          onPress={() => navigation.navigate('ScrapScreen')}
        >
          <SaveScrapIcon width="100%" height="100%" />
        </TouchableOpacity>
      </View>

      {/* 구글 지도 */}
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


      {/* 하단 슬라이드 뷰 */}
      {bottomSheetOpen && (
        <ParkingBottomSheet onClose={() => setBottomSheetOpen(false)} />
      )}
    </View>
  );
}


function ParkingBottomSheet({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.bottomSheet}>
      {/* 상단: 이미지 + 타이틀 */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.titleCon}>
            <Text style={styles.title}>{dummyData.name}</Text>

            <View style={styles.buttonCon}>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>{dummyData.status}</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert("저장 완료", "스크랩 저장이 완료되었습니다!")}>
                <SaveScrapIcon />
              </TouchableOpacity>
            </View>
          </View>
          <Image source={{ uri: dummyData.image }} style={styles.image} />
        </View>
      </View>

      {/* 차량 위치 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 차량 위치</Text>
        <Text style={styles.text}>{dummyData.distance} | {dummyData.location}</Text>
      </View>

      {/* 주차 시간 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🕒 주차 시간</Text>
        <Text style={styles.text}>{dummyData.parkingTime}</Text>
        <Text style={styles.text}>{dummyData.lastTime}</Text>
      </View>

      {/* 요금 정보 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 요금 정보</Text>
        {dummyData.fees.map((fee, index) => (
          <View key={index} style={styles.feeRow}>
            <Text style={styles.text}>{fee.title}</Text>
            <Text style={styles.text}>{fee.price}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  map: {
    flex: 1,
  },
  topTab: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 20,
  },
  tabButton: { paddingHorizontal: 20, paddingVertical: 10 },
  tabText: { fontSize: 16, color: "#6b7280" },
  activeTab: { color: "#111", fontWeight: "bold" },
  rootContainer: {
    position: "absolute",
    top: 80,
    left: 16,
    right: 16,
    flexDirection: "row",
    zIndex: 20,
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 40,
    alignItems: "baseline",
  },
  searchInput: {
    fontSize: 14,
    color: "#374151",
  },
  webView: { flex: 1, width, height },
  scrapButton: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
    justifyContent: "space-between",
  },
  titleCon: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  image: {
    width: 130,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  status: {
    height: 20,
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "#000",
    marginBottom:5,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    marginBottom: 16,
  },
  statusContainer: {
    backgroundColor: "#38B7FF",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  buttonCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});