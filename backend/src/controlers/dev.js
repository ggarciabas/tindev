// como este módulo é um objeto, pode ser exportado diretamente!

const axios = require('axios');
const devModel = require('../models/dev');

module.exports = {
    async index (req, res) {
        const {user} = req.headers;

        const loggedDev = await devModel.findById(user);

        const users = await devModel.find({
            $and: [// aplica os 3 filtros de uma vez só
                {_id: { $ne: user }}, // passe todos os usuarios que nao seja o que esta logado
                { _id: { $nin: loggedDev.likes }}, // exclui todos os usuarios que estao na lista
                { _id: { $nin: loggedDev.dislikes }}
            ],
        })

        return res.json(users);
    },
    // para criar pode-se utilizar o método create, mas recomenda-se utilizar o método store
    async store(req, res) {
        // console.log(req.body.username);
        const { username } = req.body;// sintaxe de desestruturação, permite pegar uma informação dentro do JSON acessando direto pelas {}

        const userExist = await devModel.findOne({user: username});

        if (userExist) {
            return res.json(userExist);
        }

        // acessar API do github
        const response = await axios.get(`https://api.github.com/users/${username}`); // obtem a resposta da API -- método assíncrono, ele demora para executar. Então o response.data pode dar undefined. Utilizar o await permite esperar a resposta do servidor. Necessitando modificar a função para async!

        console.log(response.data);
        const { name, bio, avatar_url: avatar} = response.data; // short sintax, utilizada para alterar avatar

        const dev = await devModel.create({
            name,
            user: username,
            bio: bio, 
            avatar
        });

        return res.json(dev);
    }
}; 
