import { AlunoModel } from '../models/aluno_model';
import { IAluno } from '../interface/aluno_interface';

export class AlunoService {
    constructor() {}

    public async criar(novo_item: IAluno): Promise<void> {
        try {
            await AlunoModel.create({
                nomeAluno: novo_item.nomeAluno,
                emailAluno: novo_item.emailAluno,
                senhaAluno: novo_item.senhaAluno
            });
        } catch (erro: any) {
            throw new Error(`Erro ao tentar incluir um novo aluno [${erro.message}]`);
        }
    }

    public async listar(): Promise<AlunoModel[]> {
        try {
            return await AlunoModel.findAll();
        } catch (erro: any) {
            throw new Error(`Erro ao tentar listar alunos [${erro.message}]`);
        }
    }

    public async buscar(id: number): Promise<AlunoModel> {
        try {
            const aluno = await AlunoModel.findByPk(id);
            if (!aluno) throw new Error(`Aluno com id ${id} não encontrado`);
            return aluno;
        } catch (erro: any) {
            throw new Error(`Erro ao buscar aluno [${erro.message}]`);
        }
    }

    public async alterar(id: number, item: IAluno): Promise<void> {
        try {
            const aluno = await this.buscar(id);
            aluno.nomeAluno = item.nomeAluno;
            aluno.emailAluno = item.emailAluno;
            aluno.senhaAluno = item.senhaAluno;
            await aluno.save();
        } catch (erro: any) {
            throw new Error(`Erro ao alterar aluno com id ${id} [${erro.message}]`);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const aluno = await this.buscar(id);
            await aluno.destroy();
        } catch (erro: any) {
            throw new Error(`Erro ao deletar aluno com id ${id} [${erro.message}]`);
        }
    }
}
