// // src/utils/mailer.ts
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'hotmail', // ou 'hotmail', 'outlook', etc.
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function sendMail(to: string, subject: string, html: string) {
//   const mailOptions = {
//     from: `"Totem de Pagamentos" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email enviado:', info.messageId);
//     return info;
//   } catch (error) {
//     console.error('Erro ao enviar email:', error);
//     throw error;
//   }
// }
