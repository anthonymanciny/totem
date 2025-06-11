import { Request, Response } from 'express';
import { BoletoService } from '../services/boleto_service';

const boletoService = new BoletoService();

export class BoletoController {
  public static async enviarEmail(req: Request, res: Response) {
    const idBoleto = Number(req.params.id);

    try {
      await boletoService.enviarBoletoPorEmail(idBoleto);
      return res.status(200).json({ message: 'Boleto enviado por e-mail com sucesso!' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
