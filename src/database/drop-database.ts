import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

// Configurações do banco de dados usando variáveis de ambiente
const dbConfig: DBConfig = {
  host: process.env.HOST || 'localhost', // Definindo um valor padrão
  user: process.env.USER_NAME || 'root',  // Definindo um valor padrão
  password: process.env.PASSWORD || '',  // Definindo um valor padrão
  database: process.env.DATABASE_NAME || '', // Certifique-se de que DATABASE_NAME está configurado no .env
};

// Nome do banco que você deseja dropar, deve ser configurado no .env
const dbname = process.env.DATABASE_NAME; // Usando a variável TABLE_NAME para o nome do banco

// Verifica se o nome do banco foi definido no arquivo .env
if (!dbname) {
  throw new Error('Nome do banco não definido no arquivo .env');
}

const dropDatabase = async (database: string): Promise<void> => {
  let connection: Connection | null = null;

  try {
    // Cria a conexão com o banco de dados
    connection = await mysql.createConnection(dbConfig);

    // Verifica se o banco de dados foi definido e seleciona o banco
    if (dbConfig.database) {
      console.log(`Conectando ao banco de dados: ${dbConfig.database}`);
      await connection.query(`USE \`${dbConfig.database}\`;`);  // Garante que o banco correto está sendo usado
    }

    // Comando SQL para dropar o banco
    const query = `DROP DATABASE IF EXISTS \`${database}\``;
    console.log(`Executando o comando SQL: ${query}`);

    // Executa o comando
    const [result] = await connection.execute(query);

    // Se o resultado não for vazio, o banco foi droppado
    console.log(`Banco de dados "${database}" foi removida com sucesso.`);
  } catch (error: any) {
    console.error('Erro ao dropar o banco de dados:', error.message);
    console.error('Detalhes do erro:', error);
  } finally {
    // Fecha a conexão com o banco de dados
    if (connection) {
      await connection.end();
    }
  }
};

// Executa a função para dropar o banco
dropDatabase(dbname);
