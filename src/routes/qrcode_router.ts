// src/routes/qrcode.routes.ts
import { Router } from 'express';
import { gerarQRCodeController } from '../controllers/qrcode_controller';

const router = Router();

router.post('/qrcode', gerarQRCodeController);

export default router;
