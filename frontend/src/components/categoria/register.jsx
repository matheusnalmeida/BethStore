import React from 'react';
import '../../styles/categoria/categoria.css';

const Register = () => {

    return (
        
        <div classNameName="container">
            <form action="#" method="post">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="descricao">Descrição</label>
                        <input type="text" className="form-control" id="descricao" placeholder="Descrição" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="setor">Setor</label>
                        <input type="text" className="form-control" id="setor" placeholder="Setor" />
                    </div>
                </div>
                <div className="form-row pt-3" style="float: right;">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default Register;