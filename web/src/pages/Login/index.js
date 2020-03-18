import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    // Fazendo uma chamada a API e armazenando o id do usuario no Local Storage do Navegador
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('/sessions', { email });
        const { _id } = response.data;
        localStorage.setItem('user', _id);
        history.push('/dashboard');
    }

    return (
        <>
            <p>
                Ofereca <strong>spots</strong> para programadores e encontre <strong>talentos para sua empresa</strong>
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Digite seu melhor email"
                    value={email}
                    onChange={event => setEmail(event.target.value)} />

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}