import { Request, Response } from 'express';
import { BoletoService } from '../services/boleto_service';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { EmailService } from '../services/email_service';
import * as fs from 'fs';
import * as path from 'path';
import { AlunoModel } from '../models/aluno_model';
import { Aluno } from '../models/aluno'; // Adicione esta linha, ajuste o caminho conforme necessário

export class BoletoController {
  private boletoService: BoletoService;

  constructor() {
    this.boletoService = new BoletoService();
  }

  public async criar(req: Request, res: Response): Promise<void> {
    const dados = req.body;

    if (!dados || (Array.isArray(dados) && dados.length === 0)) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      if (Array.isArray(dados)) {
        await Promise.all(dados.map((boleto) => this.boletoService.criar(boleto)));
        res.status(201).json({ message: 'Boletos criados com sucesso' });
      } else {
        await this.boletoService.criar(dados);
        res.status(201).json({ message: 'Boleto criado com sucesso' });
      }
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const boletos = await this.boletoService.listar();
      res.status(200).json(boletos);
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async buscar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Parâmetro de ID inválido' });
      return;
    }

    try {
      const boleto = await this.boletoService.buscar(id);
      res.status(200).json(boleto);
    } catch (erro: any) {
      res.status(404).json({ message: erro.message });
    }
  }

  public async alterar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Parâmetro de ID inválido' });
      return;
    }

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      await this.boletoService.alterar(id, req.body);
      res.status(200).json({ message: 'Boleto alterado com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async excluir(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Parâmetro de ID inválido' });
      return;
    }

    try {
      await this.boletoService.delete(id);
      res.status(200).json({ message: 'Boleto excluído com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async enviarEmail(req: Request, res: Response): Promise<void> {
    try {
      const { cpf } = req.body;

      // Busca o aluno pelo CPF
      const aluno = await AlunoModel.findOne({ where: { cpf } });

      if (!aluno) {
        res.status(404).json({ error: 'Aluno não encontrado.' });
        return;
      }

      const { emailAluno, nomeAluno } = aluno;

      // Caminho do boleto (mockado ou real)
      const boletoPath = path.resolve(__dirname, '../../boletos/boleto.pdf');

      if (!fs.existsSync(boletoPath)) {
        res.status(404).json({ error: 'Boleto não encontrado.' });
        return;
      }

      const assunto = `Boleto da Mensalidade - ${nomeAluno}`;
      const texto = `Olá ${nomeAluno},\n\nSegue em anexo o boleto da sua mensalidade.\n\nAtenciosamente,\nSistema SENAC`;

      await EmailService.enviarEmailComAnexo(emailAluno, assunto, texto, boletoPath, 'boleto.pdf');

      res.status(200).json({ message: 'Boleto enviado por e-mail com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ error: 'Erro ao enviar o e-mail com o boleto.' });
    }
  }
}
