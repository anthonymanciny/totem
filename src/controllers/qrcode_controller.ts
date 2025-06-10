import { Request, Response } from 'express';
import { gerarQRCode } from '../services/qrcode_service';

export const gerarQRCodeController = async (req: Request, res: Response): Promise<Response> => {
  const { idBoleto } = req.body;

  if (!idBoleto) {
    return res.status(400).json({ message: 'idBoleto é obrigatório' });
  }

  try {
    const qrCodeDataUrl = await gerarQRCode(idBoleto);
    return res.status(200).json({ qrCode: qrCodeDataUrl });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};