import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

interface DocumentData {
  alunoNome: string;
  alunoCpf: string;
  tipoDocumento: string;
  dataSolicitacao: string;
  observacoes?: string;
}

export async function gerarDocumentoPdf(dados: DocumentData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk: Buffer<ArrayBufferLike>) => buffers.push(chunk));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.on('error', reject);

    // Conteúdo do documento
    doc.fontSize(18).text(`Documento: ${dados.tipoDocumento}`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Nome do Aluno: ${dados.alunoNome}`);
    doc.text(`CPF: ${dados.alunoCpf}`);
    doc.text(`Data da Solicitação: ${dados.dataSolicitacao}`);
    
    if (dados.observacoes) {
      doc.moveDown();
      doc.text(`Observações:`);
      doc.text(dados.observacoes);
    }

    doc.moveDown().text('--- Documento gerado automaticamente ---', { align: 'center' });

    doc.end();
  });
}
