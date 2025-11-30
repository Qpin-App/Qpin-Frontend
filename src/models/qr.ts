export interface QrData {
  id: string | number;
  backgroundColor: string;
  gradientColor: string;
  sticker: string | null;
  imageUri: string | null;
  phoneNumber: string;
  comment: string | null;
  qrUrl?: string | number | { uri: string }; // 백엔드에서 생성된 QR URL 또는 로컬 이미지
}

export interface QrCreateRequest {
  memberId: number;
  safePhoneNum: string;
  phoneNum: string;
  memo: string | null;
  myColor: string;
  sticker: string | null;
  gradation: string;
  backgroundPicture: string | null;
}

export interface QrListResponse {
  items: QrData[];
}

// TODO: 현재 백엔드 응답값으로 일단 맞춰서 진행
export interface ApiQrItem {
  qrId: number;
  safePhoneNumber: string;
  memo: string;
  myColor: string;
  sticker: string;
  gradation: string;
  qrImage: string;
  background_picture?: string;
}

export type ApiQrListResponse = ApiQrItem[];

// Mock 데이터
const mockQrUrl = require('../assets/icons/mock_qrcode.png');

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
    imageUri: "",
    phoneNumber: "010-4820-9952",
    comment: "잠깐 편의점 갑니다!",
    qrUrl: mockQrUrl
  },
  {
    id: 2,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "heart",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "10분간 자리 비웁니다",
    qrUrl: mockQrUrl
  },
  {
    id: 3,
    backgroundColor: "#B5E1FC",
    gradientColor: "#9C98F8",
    sticker: "star",
    imageUri: "",
    phoneNumber: "098-765-4321",
    comment: "여행 다녀옵니다",
    qrUrl: mockQrUrl
  }
];


export interface phoneNumber {
  phoneNumberId: number,
  isSecureNumber: boolean,
  number: string,
}

export const phoneNumberMock: phoneNumber[] = [
  {
    phoneNumberId: 0,
    isSecureNumber: false,
    number: "010-4820-9952",
  },
  {
    phoneNumberId: 1,
    isSecureNumber: true,
    number: "098-765-4321",
  },
  {
    phoneNumberId: 2,
    isSecureNumber: true,
    number: "098-765-4321",
  }
]
