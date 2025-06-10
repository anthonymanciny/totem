import QRCode from 'qrcode';
import { QrCodePix } from 'qrcode-pix';
import { BoletoModel } from '../models/boletos_model';

export const gerarQRCode = async (idBoleto: number): Promise<string> => {
  const boleto = await BoletoModel.findByPk(idBoleto);

  if (!boleto) {
    throw new Error('Boleto não encontrado');
  }

  // Pega o valor do boleto, que pode ser string ou number, e garante que é number
  const valorRaw = boleto.valorBoleto;
  const valorNumber = typeof valorRaw === 'string' ? parseFloat(valorRaw) : valorRaw;

  if (isNaN(valorNumber)) {
    throw new Error('Valor do boleto inválido');
  }

  const valorFormatado = valorNumber.toFixed(2);

  const qrPix = QrCodePix({
    version: '01',
    key: '03722924294', // coloque sua chave Pix aqui
    name: 'FACULDADE XYZ',
    city: 'MANAUS',
    value: Number(valorFormatado),
    transactionId: `boleto${boleto.idBoleto}`,
  });

  const payload = await qrPix.payload();
  const qrCodeDataUrl = await QRCode.toDataURL(payload);

  return qrCodeDataUrl;
};
