import QRCode from 'qrcode';

async function gerarQRCode() {
  const texto = 'https://www.example.com'; // Conteúdo para o QR Code

  try {
    // Gera o QR Code em formato base64 (data URL)
    const qrCodeBase64 = await QRCode.toDataURL(texto);

    // Exibe a string base64 no console
    console.log('QR Code gerado em base64:\n', qrCodeBase64);
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
  }
}

gerarQRCode();
