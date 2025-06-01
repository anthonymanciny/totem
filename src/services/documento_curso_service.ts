import { DocumentoCursoModel } from '../models/documento_curso_model';
import { IDocumentoCurso } from '../interface/documento_curso_interface';

export class DocumentoCursoService {
  constructor() {}

  public async criar(novo_item: IDocumentoCurso): Promise<void> {
    try {
      await DocumentoCursoModel.create({
        idCurso: novo_item.idCurso,
        nomeDocumento: novo_item.nomeDocumento,
      });
    } catch (erro: any) {
      throw new Error(`Erro ao tentar incluir novo documento do curso [${erro.message}]`);
    }
  }

  public async listar(): Promise<DocumentoCursoModel[]> {
    try {
      return await DocumentoCursoModel.findAll();
    } catch (erro: any) {
      throw new Error(`Erro ao tentar listar documentos do curso [${erro.message}]`);
    }
  }

  public async buscar(id: number): Promise<DocumentoCursoModel> {
    try {
      const documento = await DocumentoCursoModel.findByPk(id);
      if (!documento) throw new Error(`Documento do curso com id ${id} não encontrado`);
      return documento;
    } catch (erro: any) {
      throw new Error(`Erro ao buscar documento do curso [${erro.message}]`);
    }
  }

  public async alterar(id: number, item: IDocumentoCurso): Promise<void> {
    try {
      const documento = await this.buscar(id);
      documento.idCurso = item.idCurso;
      documento.nomeDocumento = item.nomeDocumento;
      await documento.save();
    } catch (erro: any) {
      throw new Error(`Erro ao alterar documento do curso com id ${id} [${erro.message}]`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const documento = await this.buscar(id);
      await documento.destroy();
    } catch (erro: any) {
      throw new Error(`Erro ao deletar documento do curso com id ${id} [${erro.message}]`);
    }
  }
}
