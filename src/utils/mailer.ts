import 'dotenv/config';
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Boleto" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      // attachments: [{ filename: 'boleto.pdf', path: './boleto.pdf' }],
    });
    console.log('E-mail enviado com sucesso!');
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
  }
}

// Exemplo de uso
sendEmail({
  to: 'emaildestino@gmail.com',
  subject: 'Boleto SENAC',
  text: 'Olá, segue o boleto em anexo.',
  html: '<h1>Olá, Turma!</h1><p>Esse email foi enviado usando o Nodemailer, segue o boleto em anexo.</p>',
});
