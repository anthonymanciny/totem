import nodemailer from 'nodemailer';
import path from 'path';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true se usar SSL/TLS (normalmente porta 465)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // <-- permite usar TLS com certificados autoassinados
    },
  });

  static async enviarTokenEmail(destinatario: string, token: string): Promise<void> {
    const mailOptions = {
      from: `"Sistema SENAC" <${process.env.SMTP_USER}>`,
      to: destinatario,
      subject: 'Seu código de autenticação',
      text: `Olá,\n\nSeu código de autenticação é: ${token}\n\nEste código é válido por 5 minutos.\n\nCaso não tenha solicitado, ignore este e-mail.`,
      // Você pode usar 'html' se preferir formatar o email
    };

    await this.transporter.sendMail(mailOptions);
  }

  static async enviarEmailComAnexo(destinatario: string, assunto: string, texto: string, caminhoAnexo: string, nomeAnexo: string): Promise<void> {
    const mailOptions = {
      from: `"Sistema SENAC" <${process.env.SMTP_USER}>`,
      to: destinatario,
      subject: assunto,
      text: texto,
      attachments: [
        {
          filename: nomeAnexo,
          path: caminhoAnexo,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  static async enviarEmailPersonalizado(destinatario: string, assunto: string, texto: string): Promise<void> {
    const mailOptions = {
      from: `"Sistema SENAC" <${process.env.SMTP_USER}>`,
      to: destinatario,
      subject: assunto,
      text: texto,
    };

    await this.transporter.sendMail(mailOptions);
  }

  static async enviarBoletoPorEmail(destinatario: string, caminhoPdfBoleto: string): Promise<void> {
    const nomeAnexo = path.basename(caminhoPdfBoleto);
    const assunto = 'Seu boleto SENAC';
    const texto = 'Olá,\n\nSegue em anexo o boleto referente ao seu curso.\n\nObrigado por escolher o SENAC!';

    const mailOptions = {
      from: `"Sistema SENAC" <${process.env.SMTP_USER}>`,
      to: destinatario,
      subject: assunto,
      text: texto,
      attachments: [
        {
          filename: nomeAnexo,
          path: caminhoPdfBoleto,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }
}
