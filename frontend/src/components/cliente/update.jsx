import React from 'react';
import '../../styles/cliente/index.css';

const Update = () => {
    return (
        <div className="container">
            <form action="#" method="post">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" value="{{ cliente.nome }}"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="telefone">Telefone</label>
                        <input type="text" className="form-control" id="telefone" name="telefone" value="{{ cliente.telefone }}"/>
                    </div>
                    <div>
                        <label for="email">E-mail</label>
                        <input type="text" className="form-control" id="email" name="email" value="{{ cliente.email }}"/>
                    </div>
                    <div>
                        <label for="cep">CEP</label>
                        <input type="text" className="form-control" id="cep" name="cep" value="{{ cliente.cep }}"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="cpf">CPF</label>
                        <input type="text" maxlength="11" className="form-control" id="cpf" name="cpf" value="{{ cliente.cpf }}"/>
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