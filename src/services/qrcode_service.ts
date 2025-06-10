import QRCode from 'qrcode';

export const gerarQRCode = async (texto: string): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(texto);
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error('Erro ao gerar QR Code');
  }
};