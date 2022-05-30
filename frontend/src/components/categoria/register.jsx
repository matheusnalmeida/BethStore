import React from 'react';
import '../../styles/categoria/categoria.css';

const RegisterC = () => {

    return (
        
        <div class="container">
            <form action="#" method="post">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="descricao">Descrição</label>
                        <input type="text" class="form-control" id="descricao" placeholder="Descrição" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="setor">Setor</label>
                        <input type="text" class="form-control" id="setor" placeholder="Setor" />
                    </div>
                </div>
                <div class="form-row pt-3" style="float: right;">
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterC;