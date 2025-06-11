import express, { Request, Response } from 'express';
import router from './routes/totem_router';
import sequelize from './database/sequelize';
import path from 'path';

import qrCodeRoutes from './routes/qrcode_router';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Bem-vindo ao Totem de Pagamento');
});

// Usando as rotas do módulo
app.use(router);
app.use(qrCodeRoutes);
app.use('/boletos', express.static(path.resolve(__dirname, '../boletos')));

// Função de inicialização que conecta ao banco e sobe o servidor
async function initialize() {
    try {

        // Conectando ao banco de dados
        await sequelize.authenticate();
        sequelize.sync({ force: false, alter: false });
        console.log('A conexão com o banco de dados foi estabelecida com sucesso');
    } catch (erro: any) {
        throw new Error('Não foi possível estabelecer conexão com o banco de dados: ' + erro.message);
    }

    try {
        // Levantando o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (erro: any) {
        throw new Error('Não foi possível iniciar o servidor de API: ' + erro.message);
    }
}

// Inicializando a aplicação
initialize();
