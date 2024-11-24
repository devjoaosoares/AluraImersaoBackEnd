import multer from "multer";
import express from "express";
import { Enviarpost, Listarposts, uploadImagem, atualizapost } from "../controller/post_controller.js";
import cors from "cors";

const corsoptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//Codigo nescessario para essa merda de biblioteca funcionar, porque
//essa porcaria(multer) nao salva as imagens com o nome certo no Windows sem isso

const upload = multer({ dest: "./uploads", storage });
//Caso o sistema for Linux,MacOS essa linha basta, ignorando as linhas 5 a 12

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsoptions));
  app.get("/posts", Listarposts);
  app.post("/posts", Enviarpost);
  app.post("/upload", upload.single("Imagem"), uploadImagem);
  app.put("/upload/:id", atualizapost)
};
//todas as routas e seu tipo presentes no sistema

export default routes;
//exporta a const routes, ou seja, todas as rotas
