import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);
//conecta ao banco de dados de forma segura atraves da string connection
//string connection : conexao é uma variavel que armazena a conexão com o banco de dados

export async function getTodososPosts() {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}
//pega todos os posts da merda do banco de dados e os retorna em formato JSON

export async function criarPost(novopost) {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posts");
  return colecao.insertOne(novopost);
}
//cria um novo post na porcaria do banco de dados alem de especificar o banco de dados e a coleção que ele pertence

export async function atualizarput(id, novopost) {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novopost});
  }