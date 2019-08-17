const devModel = require('../models/dev');

module.exports = {
    async store(req, res) {
        // console.log(req.io, req.connectedUsers);
        // console.log(req.params);
        // console.log(req.headers);

        const {devId} = req.params; // estava errado chamar req.params.devId -- erro ao buscar no banco de dados, apesar de ser a mesma informação
        const {user} = req.headers;

        console.log(devId);
        console.log(user);

        const loggedDev = await devModel.findById(user);
        const targetDev = await devModel.findById(devId);

        console.log(loggedDev);
        console.log(targetDev);

        if (!targetDev) {
            return res.status(400).json({error:'Dev Not Exists.'}); // usuario informou algo errado.
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            // utilizar web sockets para backend enviar informacoes para frontend
            // console.log('Match!');
            // buscar conexao de socket ativa
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id); // não modifica a informação no banco de dados

        await loggedDev.save(); // agora salva!

        return res.json(loggedDev);
    }
};