import { MatriculaModel } from '../models/matriculas_model';
import { IMatricula } from '../interface/matriculas_interface';

export class MatriculaService {
  constructor() {}

  public async criar(novo_item: IMatricula): Promise<void> {
    try {
      await MatriculaModel.create({
        idAluno: novo_item.idAluno,
        idCurso: novo_item.idCurso,
        statusMatricula: novo_item.statusMatricula
      });
    } catch (erro: any) {
      throw new Error(`Erro ao tentar incluir matrícula [${erro.message}]`);
    }
  }

  public async listar(): Promise<MatriculaModel[]> {
    try {
      return await MatriculaModel.findAll();
    } catch (erro: any) {
      throw new Error(`Erro ao listar matrículas [${erro.message}]`);
    }
  }

  public async buscar(id: number): Promise<MatriculaModel> {
    try {
      const matricula = await MatriculaModel.findByPk(id);
      if (!matricula) throw new Error(`Matrícula com id ${id} não encontrada`);
      return matricula;
    } catch (erro: any) {
      throw new Error(`Erro ao buscar matrícula [${erro.message}]`);
    }
  }

  public async alterar(id: number, item: IMatricula): Promise<void> {
    try {
      const matricula = await this.buscar(id);
      matricula.idAluno = item.idAluno;
      matricula.idCurso = item.idCurso;
      matricula.statusMatricula = item.statusMatricula;
      await matricula.save();
    } catch (erro: any) {
      throw new Error(`Erro ao alterar matrícula com id ${id} [${erro.message}]`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const matricula = await this.buscar(id);
      await matricula.destroy();
    } catch (erro: any) {
      throw new Error(`Erro ao deletar matrícula com id ${id} [${erro.message}]`);
    }
  }
}
