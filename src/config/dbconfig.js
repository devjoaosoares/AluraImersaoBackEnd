import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
      mongoClient = new MongoClient(stringConexao);
      console.log('Conectando ao cluster do banco de dados...');
      await mongoClient.connect();
      console.log('Conectado ao MongoDB Atlas com sucesso!');
      return mongoClient;
    } catch (erro) {
      console.error('Falha na conexão com o banco!', erro);
      process.exit();
    }
}
//Funcao Coringa(pode ser utilizada em qualquer sistema que utiliza mongoDB) para configurar a sua conexao
//alem de retornar mensagens de sucesso ou erro caso a conexao com o banco de dados venha a falhar223