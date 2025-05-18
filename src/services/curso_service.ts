import { CursoModel } from '../models/curso_model';
import { ICurso } from '../interface/curso_interface';

export class CursoService {
    constructor() {}

    public async criar(novo_item: ICurso) {
        try {
            const novoCurso = new CursoModel();
            novoCurso.nomeCurso = novo_item.nomeCurso;
            novoCurso.descricaoCurso = novo_item.descricaoCurso;

            await CursoModel.create({
                nomeCurso: novoCurso.nomeCurso,
                descricaoCurso: novoCurso.descricaoCurso
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
            curso.descricaoCurso = item.descricaoCurso;

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
