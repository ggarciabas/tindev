const express = require("express");
const devController = require('./controlers/dev');
const likeController = require('./controlers/like');
const dislikeController = require('./controlers/dislike');

const routes = express.Router();

// Rest: GET, POST, PUT (nao funciona por html), DELETE (nao funciona por html)

routes.get('/', (req, res) => {
    // req: a requisição possui todas as informacoes sobre a solicitacao do usuário. Dentro do querry possui todos os parâmetro
    // res: resposta possui o que vai ser enviado para a tela
    return res.json({message:`Hello ${req.query.name}`}); // usar ` permite criar uma estrutura de template strings -- com aspas simples ou dupla não funciona! 
    // JSON: nova estrutura para comunicação backend/frontend! Enviando um objeto{} ou um vetor[]

}); // raiz, passando uma funcao utilizando o Arrow function


routes.get('/devs', devController.index);
// cadastrar utilizando banco de dados
routes.post('/devs', devController.store);
routes.post('/devs/:devId/likes', likeController.store); // :quaquer coisa é o nome que dá pra informação passada nesta posicao
routes.post('/devs/:devId/dislikes', dislikeController.store);

// cadastrar nova informação, sem banco de dados
// routes.post('/devs', (req, res) => {
//     console.log(req.body);
//     return res.json(req.body);
// }); // end


module.exports = routes; // para exportar a informacao