// services/document_service.ts
import Document from '../models/documento_model';
import DocumentRequest from '../models/documentrequest_model';
import { EmailService } from './email_service';

export class DocumentoService {
  constructor() {}

  public async listAvailableDocuments(): Promise<any[]> {
    try {
      return await Document.findAll();
    } catch (error: any) {
      throw new Error(`Erro ao listar documentos disponíveis [${error.message}]`);
    }
  }

  public async requestDocumentAutomatic(data: any): Promise<InstanceType<typeof DocumentRequest>> {
    try {
      const { studentId, documentId, email } = data;

      const request = await DocumentRequest.create({
        studentId,
        documentId,
        email,
        status: 'Gerado'
      });

      try {
        await EmailService.enviarTokenEmail(email, 'Aqui está seu documento.');
        request.set('status', 'Enviado por E-mail');
      } catch (emailError: any) {
        throw new Error(`Erro ao enviar e-mail: ${emailError.message}`);
      }

      await request.save();

      return request;
    } catch (error: any) {
      throw new Error(`Erro ao solicitar documento automático [${error.message}]`);
    }
  }

  public async requestDocumentManual(data: any): Promise<InstanceType<typeof DocumentRequest>> {
    try {
      const { studentId, documentId, email, additionalInfo } = data;

      return await DocumentRequest.create({
        studentId,
        documentId,
        email,
        additionalInfo,
        status: 'Em Análise pela Secretaria'
      });
    } catch (error: any) {
      throw new Error(`Erro ao solicitar documento manual [${error.message}]`);
    }
  }

  public async getRequestStatus(studentId: number): Promise<InstanceType<typeof DocumentRequest>[]> {
    try {
      return await DocumentRequest.findAll({ where: { studentId } });
    } catch (error: any) {
      throw new Error(`Erro ao buscar status das solicitações [${error.message}]`);
    }
  }
}
