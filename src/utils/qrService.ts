import getHttpClient from "./http";
import { ApiQrListResponse, QrCreateRequest, QrData } from "../models/qr";

const BASE = "/qr"; // 백엔드 실제 경로에 맞게 수정

// 백엔드 Enum을 HEX 색상으로 매핑
const mapEnumToColor = (enumColor: string): string => {
  const enumToColorMap: { [key: string]: string } = {
    "RED": "#FF6B6B",
    "YELLOW": "#FFD93D",
    "GREEN": "#6BCB77",
    "BLUE": "#4D96FF",
    "PURPLE": "#C3B1E1",
    "ORANGE": "#FFB84D",
  };

  return enumToColorMap[enumColor.toUpperCase()] || "#F8F8F8";
};

export const fetchQrList = async (): Promise<QrData[]> => {
  const http = getHttpClient();
  // 실제 엔드포인트: /qr/selectList
  const { data } = await http.get<ApiQrListResponse>(`${BASE}/selectList/1`); // TODO: 현재 1로 고정
  const items = Array.isArray(data) ? data : [];
  return items.map((item) => ({
    id: item.qrId,
    backgroundColor: mapEnumToColor(item.myColor), // Enum을 HEX로 변환
    gradientColor: item.gradation,
    sticker: item.sticker || null,
    imageUri: item.background_picture || null,
    phoneNumber: item.safePhoneNumber,
    comment: item.memo ?? null,
    qrUrl: item.qrImage ? `data:image/png;base64,${item.qrImage}` : undefined,
  }));
};

export const createQr = async (payload: QrCreateRequest): Promise<void> => {
  const http = getHttpClient();
  await http.post<string>(`${BASE}/create`, payload);
};

export const updateQr = async (id: string | number, payload: QrCreateRequest): Promise<void> => {
  const http = getHttpClient();
  const numericId = typeof id === "number" ? id : Number(id);

  const modifyPayload = {
    ...payload,
    backGroundImage: payload.backgroundPicture,
  };

  await http.put<string>(`${BASE}/modify/${numericId}`, modifyPayload);
};

export const deleteQrs = async (ids: Array<string | number>): Promise<void> => {
  const http = getHttpClient();
  const numericIds = ids
    .map((v) => (typeof v === "number" ? v : Number(v)))
    .filter((v) => Number.isFinite(v));
  await http.delete(`${BASE}/remove`, { data: numericIds });
};

export default {
  fetchQrList,
  createQr,
  updateQr,
  deleteQrs,
};


