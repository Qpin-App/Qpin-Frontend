export interface QrData {
  id: string | number;
  backgroundColor: string | null,
  gradientColor: string | null,
  sticker: string | null,
  imageUri: string | null,
  phoneNumber: string | null,
  comment: string | null,
  isEdit?: boolean,
}
