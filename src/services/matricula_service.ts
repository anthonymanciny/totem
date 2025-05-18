import { MatriculaModel } from '../models/matricula_model';
import { IMatricula } from '../interface/matricula_interface';
import { UsuarioModel } from '../models/usuario_model';
import { CursoModel } from '../models/curso_model';

export class MatriculaService {
  constructor() {}

public async criar(dados: IMatricula) {
    try {
      const usuarioExiste = await UsuarioModel.findByPk(dados.idUsuario);
      if (!usuarioExiste) {
        throw new Error(`Usuário com ID ${dados.idUsuario} não encontrado`);
      }

      const cursoExiste = await CursoModel.findByPk(dados.idCurso);
      if (!cursoExiste) {
        throw new Error(`Curso com ID ${dados.idCurso} não encontrado`);
      }

      await MatriculaModel.create({
      idUsuario: dados.idUsuario,
      idCurso: dados.idCurso,
      dataMatricula: dados.dataMatricula // pode ser omitido, se quiser usar o default
    });
    } catch (erro: any) {
      throw new Error(`Erro ao criar matrícula [${erro.message}]`);
    }
  }
  public async listar() {
    try {
      const matriculas = await MatriculaModel.findAll();
      return matriculas;
    } catch (erro: any) {
      throw new Error('Erro ao tentar listar matrículas [' + erro.message + ']');
    }
  }

  public async buscar(id: number): Promise<MatriculaModel> {
    try {
      const matricula = await MatriculaModel.findByPk(id);
      if (!matricula) throw new Error('Matrícula não encontrada');
      return matricula;
    } catch (erro: any) {
      throw new Error('Erro ao buscar matrícula [' + erro.message + ']');
    }
  }

  public async alterar(id: number, dados: IMatricula) {
    try {
      const matricula = await this.buscar(id);
      matricula.idUsuario = dados.idUsuario;
      matricula.idCurso = dados.idCurso;
      matricula.dataMatricula = dados.dataMatricula ?? matricula.dataMatricula;

      await matricula.save();
    } catch (erro: any) {
      throw new Error('Erro ao alterar matrícula [' + erro.message + ']');
    }
  }

  public async delete(id: number) {
    try {
      const matricula = await this.buscar(id);
      await matricula.destroy();
    } catch (erro: any) {
      throw new Error('Erro ao deletar matrícula [' + erro.message + ']');
    }
  }
}
