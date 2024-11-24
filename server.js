import express from "express";
import conectarAoBanco from "./src/config/dbconfig.js";
import routes from "./src/routes/postsRoutes.js";

const app = express();
//variavel app recebe tudo da biblioteca express

app.use(express.static("uploads"))
//servir arquivos estaticos da pasta uploads, resumindo, pra qualquer pessoa conseguir ver essa bosta de pagina ai

routes(app);
//chamando a função routes e passando a variavel app como parametro

app.use(express.json());
//Para o express utilizar o JSON

app.listen(3000, () => {
  console.log("Servidor escutando");
});
//liga o servidor na porta 3000 do localhost

