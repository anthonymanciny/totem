import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

interface DBConfig {
  host: string;
  user: string;
  password: string;
}

// Configurações do banco de dados usando variáveis de ambiente
const dbConfig: DBConfig = {
  host: process.env.HOST || 'localhost',
  user: process.env.USER_NAME || 'root',
  password: process.env.PASSWORD || '',
};

const createDatabase = async (dbName: string): Promise<void> => {
  let connection: Connection | null = null;

  try {
    // Cria a conexão com o MySQL (sem especificar o banco de dados ainda)
    connection = await mysql.createConnection(dbConfig);

    // Comando SQL para criar o banco de dados
    const query = `CREATE DATABASE IF NOT EXISTS \`${dbName}\``;

    // Executa o comando
    await connection.execute(query);

    console.log(`Banco de dados "${dbName}" criado ou já existe.`);
  } catch (error: any) {
    console.error('Erro ao criar o banco de dados:', error.message);
  } finally {
    // Fecha a conexão com o banco de dados
    if (connection) {
      await connection.end();
    }
  }
};

// Cria o banco de dados usando o nome do banco de dados do arquivo .env
const databaseName = process.env.DATABASE_NAME;

if (!databaseName) {
  throw new Error('Nome do banco de dados não definido no arquivo .env');
}

createDatabase(databaseName);
