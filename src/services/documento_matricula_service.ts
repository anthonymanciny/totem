import { DocumentoMatriculaModel } from '../models/documento_matricula_model';
import { IDocumentoMatricula } from '../interface/documento_matricula_interface';

export class DocumentoMatriculaService {
  constructor() {}

  public async criar(novo_item: IDocumentoMatricula): Promise<void> {
    try {
      await DocumentoMatriculaModel.create({
        idMatricula: novo_item.idMatricula,
        idDocumentoCurso: novo_item.idDocumentoCurso,
        statusEntrega: novo_item.statusEntrega,
        dataEntrega: novo_item.dataEntrega
      });
    } catch (erro: any) {
      throw new Error(`Erro ao tentar incluir documento da matrícula [${erro.message}]`);
    }
  }

  public async listar(): Promise<DocumentoMatriculaModel[]> {
    try {
      return await DocumentoMatriculaModel.findAll();
    } catch (erro: any) {
      throw new Error(`Erro ao listar documentos da matrícula [${erro.message}]`);
    }
  }

  public async buscar(id: number): Promise<DocumentoMatriculaModel> {
    try {
      const documento = await DocumentoMatriculaModel.findByPk(id);
      if (!documento) throw new Error(`Documento da matrícula com id ${id} não encontrado`);
      return documento;
    } catch (erro: any) {
      throw new Error(`Erro ao buscar documento da matrícula [${erro.message}]`);
    }
  }

  public async alterar(id: number, item: IDocumentoMatricula): Promise<void> {
    try {
      const documento = await this.buscar(id);
      documento.idMatricula = item.idMatricula;
      documento.idDocumentoCurso = item.idDocumentoCurso;
      documento.statusEntrega = item.statusEntrega;
      documento.dataEntrega = item.dataEntrega;
      await documento.save();
    } catch (erro: any) {
      throw new Error(`Erro ao alterar documento da matrícula com id ${id} [${erro.message}]`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const documento = await this.buscar(id);
      await documento.destroy();
    } catch (erro: any) {
      throw new Error(`Erro ao deletar documento da matrícula com id ${id} [${erro.message}]`);
    }
  }
}
