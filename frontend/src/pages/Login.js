import React, { useState } from 'react';
import './Login.css'
import logo from '../assets/logo.svg' // importa qualquer informacao pelo js

import api from '../services/api';

export default function Login ({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit (e) { /* evento */
        e.preventDefault(); // previne o comportamento padrão do formulario

        const response = await api.post('/devs', {
            username: username, /* ou somente username pois o nome e valor são iguais */
        });
 
        // console.log(response);
        const { _id } = response.data;


        history.push(`/dev/${_id}`); // parâmetros
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
             <img src={logo} alt='Tindev'/> {/*chaves indica que quero colocar um js dentro do codigo do reac t */}
             <input 
                placeholder= "Digite seu usuário no Github"
                value={username}
                onChange={ e => setUsername(e.target.value)} /* recebe um evento e nao o valor */
             />
             <button type="submit">Entrar</button>
            </form>
        </div>
    ); // se for hml com mais de uma linha usa o ()
}

// o estado de um componente é toda informacao que irá manipular

// export default login; /// ou direto na function