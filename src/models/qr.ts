export interface QrData {
  id: string | number;
  backgroundColor: string;
  gradientColor: string;
  sticker: string | null;
  imageUri: string | null;
  phoneNumber: string;
  comment: string;
  qrUrl?: string; // 백엔드에서 생성된 QR URL
}

// Mock 데이터
export const qrMockData: QrData[] = [
  {
    id: "add",
    backgroundColor: "",
    gradientColor: "",
    sticker: null,
    imageUri: null,
    phoneNumber: "",
    comment: "안심 QR 카드 생성"
  },
  {
    id: 1,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "heart",
    imageUri: "file:///data/user/0/com.myapp/cache/rn_image_picker_lib_temp_1b34151c-dc51-4b77-98a2-b193f99cbe7f.jpg",
    phoneNumber: "010-4820-9952",
    comment: "잠깐 편의점 갑니다!",
    qrUrl: "http://localhost:8080/qr/1"
  },
  {
    id: 2,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "heart",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "10분간 자리 비웁니다",
    qrUrl: "http://localhost:8080/qr/2"
  },
  {
    id: 3,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "star",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "여행 다녀옵니다",
    qrUrl: "http://localhost:8080/qr/3"
  }
];
