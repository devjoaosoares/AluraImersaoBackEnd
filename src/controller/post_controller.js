import fs from "fs";
import { getTodososPosts, criarPost, atualizarput } from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/gemini_service.js";

export async function Listarposts(req, res) {
  const posts = await getTodososPosts();
  res.status(200).json(posts);
}
//funcao que lista todos os posts

export async function Enviarpost(req, res) {
  const novopost = req.body;
  try {
    const postCriado = await criarPost(novopost);
    res.status(201).send(postCriado);
  } catch (erro) {
    res.status(500).json({ Erro: "Erro na requisicao" });
    console.error(erro.message);
  }
}
//funcao para enviar/cadastrar etc... um post

export async function uploadImagem(req, res) {
  const novopost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    const postCriado = await criarPost(novopost);
    const imagematualizada = `uploads/${postCriado.insertedId}.png`; //obs, so funciona com png essa merda. entao e quase inutil esse lixo de codigo mas funciona rsrs
    fs.renameSync(req.file.path, imagematualizada);
    res.status(201).send(postCriado);
  } catch (erro) {
    res.status(500).json({ Erro: "Erro na requisicao" });
    console.error(erro.message);
  }
}
//funcao para upload de imagem para que essa porcaria do multer possa funcionar
//essa porcaria ai tambem renomeia o arquivo adicionando o id caso a imagem seja a mesma que outra ja upada

export async function atualizapost(req, res) {
  const id_post = req.params.id;
  const url_imagem = `http://localhost:3000/${id_post}.png`;
  
  try {
    
    const imageBuffer = fs.readFileSync(`uploads/${id_post}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer);
    
    const post = {
        imgurl: url_imagem,
        descricao: descricao,
        alt: req.body.alt,
    };

    const postCriado = await atualizarput(id_post, post);
    res.status(201).json(postCriado);
  } catch (erro) {
    res.status(500).json({ Erro: "Erro na requisicao" });
    console.error(erro.message);
  }
}
