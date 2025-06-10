// src/controllers/qrcode.controller.ts
import { Request, Response } from 'express';
import { gerarQRCode } from '../services/qrcode_service';

export const gerarQRCodeController = async (req: Request, res: Response): Promise<Response> => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ message: 'Texto é obrigatório' });
  }

  try {
    const qrCodeDataUrl = await gerarQRCode(texto);
    return res.status(200).json({ qrCode: qrCodeDataUrl });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
