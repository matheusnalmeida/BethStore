import React from 'react';
import '../../styles/categoria/categoria.css';

const Update = () => {

    return (
        <div className="container">
        <form action="#" method="post">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="descricao">Descrição</label>
                    <input type="text" className="form-control" id="descricao" name="descricao" value="{{ categoria.descricao }}"/>
                </div>
                <div className="form-group col-md-6">
                    <label for="setor">Setor</label>
                    <input type="text" className="form-control" id="setor" name="setor" value="{{ categoria.setor }}"/>
                </div>
            </div>
            <div className="form-row pt-3">
                <button type="submit" className="btn btn-primary">Atualizar</button>
            </div>
        </form>
    </div>
    );
}

export default Update;