import React from 'react'
import '../../styles/homepage/homepage.css'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

const Home = () => {

    return (
        <div className="homepage">
            <div className="container">
                <div className='h'>Bem vindo a Beth Store!</div>
                <div className="sub-text">
                    O que deseja fazer?
                </div>
                <div className="buttons-options">
                    <Button variant="contained">
                        <a className="btn-primary">
                            <Link to="/produto/index">Gerenciar Produtos</Link>
                        </a>
                    </Button>
                    <Button variant="contained">
                        <a className="btn-primary" href="{{ url_for('categoria.index') }}">
                            Gerenciar categorias
                        </a>
                    </Button>
                    <Button variant="contained">
                        <a className="btn-primary" href="{{ url_for('cliente.index') }}">
                            Gerenciar clientes
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;