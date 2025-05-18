import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Validação de variáveis de ambiente
const DATABASE_NAME = process.env.DATABASE_NAME || '';
const USER_NAME = process.env.USER_NAME || '';
const PASSWORD = process.env.PASSWORD || '';
const HOST = process.env.HOST || 'localhost';

// Obtemos o valor de DIALECT diretamente e garantimos que seja um valor válido
const DIALECT = process.env.DIALECT as Dialect;

if (!DIALECT) {
  throw new Error('A variável de ambiente DIALECT não está definida!');
}

// Criação da instância do Sequelize
const sequelize = new Sequelize(DATABASE_NAME, USER_NAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT, // Passando o valor diretamente
});

// Função para verificar a conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
})();

export default sequelize;
