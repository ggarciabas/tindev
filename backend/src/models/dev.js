const { Schema, model } = require('mongoose');

const DevSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev' // mesmo declarado abaixo
    }], // muitos
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev' // mesmo declarado abaixo
    }] // muitos
}, {
    timestamps: true,
});

// createdAt, updatedAt - criado automático e atualizado pelo mongoose pela estrutura timestamp adicionada ao final

module.exports = model('Dev', DevSchema); // nome do módulo e o esquema