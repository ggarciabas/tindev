import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login'
import Main from './pages/Main'

export default function Routes () {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/> {/* Necessario utilizar o exact para que seja possivel acessar as demais paginas. A rota somente verificar se o início é igual e como todas possuem / como inicio, ele somente apresentará a tela de login. O exact obriga a ser exatamente o que esta no path. */}
            <Route path="/dev/:id" component={Main}/>
        </BrowserRouter>
    ); // sintaxe se chama JSX
}