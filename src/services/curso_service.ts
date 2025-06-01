import { CursoModel } from '../models/curso_model';
import { ICurso } from '../interface/curso_interface';

export class CursoService {
    constructor() {}

    public async criar(novo_item: ICurso) {
        try {
            const novoCurso = await CursoModel.create({
      nomeCurso: novo_item.nomeCurso,
      periodoCurso: novo_item.periodoCurso,
      turnoCurso: novo_item.turnoCurso,
      statusCurso: novo_item.statusCurso,
    });
        } catch (erro: any) {
            throw new Error("Erro ao tentar incluir um novo curso [" + erro.message + "]");
        }
    }

    public async listar() {
        try {
            const cursos = await CursoModel.findAll();
            return cursos;
        } catch (erro: any) {
            throw new Error("Erro ao tentar listar cursos [" + erro.message + "]");
        }
    }

    public async buscar(id: number): Promise<CursoModel> {
        try {
            const curso = await CursoModel.findByPk(id);
            if (!curso) throw new Error("Curso não encontrado");
            return curso;
        } catch (erro: any) {
            throw new Error("Erro ao buscar curso [" + erro.message + "]");
        }
    }

    public async alterar(id: number, item: ICurso) {
        try {
            const curso = await this.buscar(id);
            curso.nomeCurso = item.nomeCurso;

            await curso.save();
        } catch (erro: any) {
            throw new Error("Erro ao alterar curso [" + erro.message + "]");
        }
    }

    public async delete(id: number) {
        try {
            const curso = await this.buscar(id);
            await curso.destroy();
        } catch (erro: any) {
            throw new Error("Erro ao deletar curso [" + erro.message + "]");
        }
    }
}
