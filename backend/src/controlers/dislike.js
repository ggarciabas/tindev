const devModel = require('../models/dev');

module.exports = {
    async store(req, res) {
        const {devId} = req.params; 
        const {user} = req.headers;

        const loggedDev = await devModel.findById(user);
        const targetDev = await devModel.findById(devId);

        if (!targetDev) {
            return res.status(400).json({error:'Dev Not Exists.'});
        }

        loggedDev.dislikes.push(targetDev._id); // não modifica a informação no banco de dados

        await loggedDev.save(); // agora salva!

        return res.json(loggedDev);
    }
};