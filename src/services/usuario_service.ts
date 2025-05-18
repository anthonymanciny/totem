import { UsuarioModel } from '../models/usuario_model';
import { IUsuario } from '../interface/usuario_interface';

export class UsuarioService {
    constructor() {}

    public async criar(novo_item: IUsuario) {
        try {
            const novoUsuario = new UsuarioModel();
            novoUsuario.nomeUsuario = novo_item.nomeUsuario;
            novoUsuario.emailUsuario = novo_item.emailUsuario;
            novoUsuario.senhaUsuario = novo_item.senhaUsuario;

            await UsuarioModel.create({
                nomeUsuario: novoUsuario.nomeUsuario,
                emailUsuario: novoUsuario.emailUsuario,
                senhaUsuario: novoUsuario.senhaUsuario
            });
        } catch (erro: any) {
            throw new Error("Erro ao tentar incluir um novo usuário [" + erro.message + "]");
        }
    }

    public async listar() {
        try {
            const usuarios = await UsuarioModel.findAll();
            return usuarios;
        } catch (erro: any) {
            throw new Error("Erro ao tentar listar usuários [" + erro.message + "]");
        }
    }

    public async buscar(id: number): Promise<UsuarioModel> {
        try {
            const usuario = await UsuarioModel.findByPk(id);
            if (!usuario) throw new Error("Usuário não encontrado");
            return usuario;
        } catch (erro: any) {
            throw new Error("Erro ao buscar usuário [" + erro.message + "]");
        }
    }

    public async alterar(id: number, item: IUsuario) {
        try {
            const usuario = await this.buscar(id);
            usuario.nomeUsuario = item.nomeUsuario;
            usuario.emailUsuario = item.emailUsuario;
            usuario.senhaUsuario = item.senhaUsuario;

            await usuario.save();
        } catch (erro: any) {
            throw new Error("Erro ao alterar usuário [" + erro.message + "]");
        }
    }

    public async delete(id: number) {
        try {
            const usuario = await this.buscar(id);
            await usuario.destroy();
        } catch (erro: any) {
            throw new Error("Erro ao deletar usuário [" + erro.message + "]");
        }
    }
}
