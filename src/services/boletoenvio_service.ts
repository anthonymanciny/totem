import { BoletoModel } from '../models/boletos_model';
import { AlunoModel } from '../models/aluno_model';
import { EmailService } from './email_service';

export class BoletoService {
  constructor() {}

  public async enviarBoletoPorEmail(idBoleto: number): Promise<void> {
    try {
      const boleto = await BoletoModel.findByPk(idBoleto);
      if (!boleto) {
        throw new Error(`Boleto com id ${idBoleto} não encontrado`);
      }

      const aluno = await AlunoModel.findByPk(boleto.idAluno);
      if (!aluno) {
        throw new Error(`Aluno com id ${boleto.idAluno} não encontrado`);
      }

      if (!aluno.emailAluno) {
        throw new Error(`Aluno não possui e-mail cadastrado`);
      }

      // Preparar conteúdo do e-mail
      const assunto = 'Seu boleto de pagamento';
      const textoEmail = `
        Olá ${aluno.nomeAluno},

        Segue o link do seu boleto para pagamento:

        Valor: R$ ${boleto.valorBoleto.toFixed(2)}
        Vencimento: ${boleto.vencimentoBoleto.toISOString().split('T')[0]}
        Status: ${boleto.statusBoleto}
        Link do boleto: ${boleto.linkBoletoPDF ?? 'Não disponível'}

        Qualquer dúvida, entre em contato com a secretaria.
      `;

      // Envio do e-mail usando o método correto do EmailService
      await EmailService.enviarEmailPersonalizado(
        aluno.emailAluno,
        assunto,
        textoEmail
      );
    } catch (error: any) {
      throw new Error(`Erro ao enviar boleto por e-mail: ${error.message}`);
    }
  }
}
