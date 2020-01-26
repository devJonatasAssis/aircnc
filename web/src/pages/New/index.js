import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../services/api';
import './style.css';
import camera from '../../assets/camera.svg';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
        [thumbnail]
    );

    async function handleSubmit(event) {
        event.preventDefault();
        const user_id = localStorage.getItem('user');
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await Api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="camera" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input id="company" placeholder="Digite sua empresa" value={company}
                onChange={event => setCompany(event.target.value)} />

            <label htmlFor="techs">Tecnlogias * <span>(separadas por vírgula)</span></label>
            <input id="techs" placeholder="Digite as tecnologias" value={techs}
                onChange={event => setTechs(event.target.value)} />

            <label htmlFor="price">Valor Diária * <span>(em branco para Gratuito)</span></label>
            <input id="price" placeholder="Digite o valor da Diária" value={price}
                onChange={event => setPrice(event.target.value)} />

            <div id="botao-submit">
                <Link to="/dashboard" className="linkCancelar"><button type="submit" className="btn">Cancelar</button></Link>
                <button type="submit" className="btnSucesso">Confirmar</button>
            </div>

        </form>
    )
}