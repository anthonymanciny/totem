import { BoletoModel } from '../models/boletos_model';
import { IBoleto } from '../interface/boletos_interface';
import { gerarBoleto } from './gerarboleto_service';

export class BoletoService {
    enviarBoletoPorEmail: any;
    constructor() {}

public async criar(novo_item: IBoleto): Promise<void> {
  try {
    // Usa a função centralizada para gerar o boleto completo
    await gerarBoleto({
      idAluno: novo_item.idAluno,
      idCurso: novo_item.idCurso,
      valorBoleto: novo_item.valorBoleto,
      vencimentoBoleto: novo_item.vencimentoBoleto,
    });
  } catch (erro: any) {
    throw new Error(`Erro ao tentar incluir um novo boleto [${erro.message}]`);
  }
}

    public async listar(): Promise<BoletoModel[]> {
        try {
            return await BoletoModel.findAll();
        } catch (erro: any) {
            throw new Error(`Erro ao tentar listar boletos [${erro.message}]`);
        }
    }

    public async buscar(id: number): Promise<BoletoModel> {
        try {
            const boleto = await BoletoModel.findByPk(id);
            if (!boleto) throw new Error(`Boleto com id ${id} não encontrado`);
            return boleto;
        } catch (erro: any) {
            throw new Error(`Erro ao buscar boleto [${erro.message}]`);
        }
    }

    public async alterar(id: number, item: IBoleto): Promise<void> {
        try {
            const boleto = await this.buscar(id);
            boleto.idAluno = item.idAluno;
            boleto.idCurso = item.idCurso;
            boleto.valorBoleto = item.valorBoleto;
            boleto.vencimentoBoleto = item.vencimentoBoleto;
            boleto.statusBoleto = item.statusBoleto;
            boleto.linkBoletoPDF = item.linkBoletoPDF;
            await boleto.save();
        } catch (erro: any) {
            throw new Error(`Erro ao alterar boleto com id ${id} [${erro.message}]`);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const boleto = await this.buscar(id);
            await boleto.destroy();
        } catch (erro: any) {
            throw new Error(`Erro ao deletar boleto com id ${id} [${erro.message}]`);
        }
    }
}


