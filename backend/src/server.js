// ponto de entrada das requisições!

const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors');
const routes = require('./routes.js');
const app = express(); // criando um servidor do express
const server = require('http').Server(app); // ja ven instalado, para extrair o servidor de sentro do express

// avisar para ouvir o websocket
const io = require('socket.io')(server); //yarn add socket.io 

const connectedUsers = {
    // 'id_do_banco' : 'id_do_socket',
}; // nao usar para producao (precisa ser stateless)

io.on('connection', socket => {
    // permite a transicao de mensagens entre back e front
    // console.log('Nova conexao', socket.id);
    // socket.on('hello', message => {
    //     console.log(message);
    // });

    // setTimeout(() => {
    //     socket.emit('world', {
    //         message: 'Eu sou foda',
    //     });
    // }, 5000);

    // connectedUsers[ID_USUARIO] = id
    const {user} = socket.handshake.query;
    // console.log(user, socket.id)
    connectedUsers[user] = socket.id;
});

// antes das rotas
mongoose.connect('mongodb+srv://rasengan:Marhiz-nynjer-xabgu9@cluster0-s1vy9.mongodb.net/omnistack8?retryWrites=true&w=majority', {useNewUrlParser:true}); // ele cria o banco se não existir

// middleware interceptador
app.use((req, res, next) => { //repassando as informacoes
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

// antes das rotas avisa o express
app.use(cors()); // tem que ser antes das rotas
app.use(express.json());
app.use(routes); // adicionando no servidor as rotas

server.listen(3333); // como não tem um caminho, mantém escutando em uma determinada pasta
