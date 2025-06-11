import path from 'path';
import fs from 'fs';
import { BoletoModel } from '../models/boletos_model';
import { AlunoModel } from '../models/aluno_model';
import { CursoModel } from '../models/curso_model';
import PDFDocument from 'pdfkit';

export async function gerarBoleto({
  idAluno,
  idCurso,
  valorBoleto,
  vencimentoBoleto
}: {
  idAluno: number;
  idCurso: number;
  valorBoleto: number;
  vencimentoBoleto: string | Date;  // aceita string ou Date
}): Promise<BoletoModel> {
  const aluno = await AlunoModel.findByPk(idAluno);
  const curso = await CursoModel.findByPk(idCurso);

  if (!aluno || !curso) {
    throw new Error('Aluno ou curso não encontrado.');
  }

  // Converte para Date, caso seja string
  const dataVencimento = vencimentoBoleto instanceof Date ? vencimentoBoleto : new Date(vencimentoBoleto);

  const nomeArquivo = `boleto_${idAluno}_${Date.now()}.pdf`;
  const caminhoPDF = path.resolve(__dirname, 'src/../../boletos', nomeArquivo);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(caminhoPDF));

  doc.fontSize(20).text('Boleto de Mensalidade', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Aluno: ${aluno.nomeAluno}`);
  doc.text(`Curso: ${curso.nomeCurso}`);
  doc.text(`Valor: R$ ${valorBoleto.toFixed(2)}`);
  doc.text(`Vencimento: ${dataVencimento.toLocaleDateString('pt-BR')}`);
  doc.text(`Status: Em aberto`);

  doc.end();

  const boleto = await BoletoModel.create({
    idAluno,
    idCurso,
    valorBoleto,
    vencimentoBoleto: dataVencimento,
    statusBoleto: 'Em aberto',
    linkBoletoPDF: `/boletos/${nomeArquivo}`
  });

  return boleto;
}
