import React from 'react';
import '../../styles/produto/index.css';

const Register = () => {
    return (
        <div className="container">
            <form action="#" method="post">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="marca">Marca</label>
                        <input type="text" className="form-control" id="marca" name="marca" value="{{ produto.marca }}"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="modelo">Modelo</label>
                        <input type="text" className="form-control" id="modelo" name="modelo" value="{{ produto.modelo }}"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="preco">Preço</label>
                        <input type="number" step="0.01" className="form-control" id="preco" name="preco" value="{{ produto.preco }}"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="quantidade">Quantidade</label>
                        <input type="number" step="0" className="form-control" id="quantidade" name="quantidade" value="{{ produto.quantidade }}"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="tamanho">Tamanho</label>
                        <input type="number" step="0" className="form-control" id="tamanho" name="tamanho" value="{{ produto.tamanho }}"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="descricao">Descrição</label>
                        <input type="text" className="form-control" id="descricao" name="descricao" value="{{ produto.descricao }}"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label for="categoria">Categoria</label>
                        <select className="form-control" id="categoria" name="categoria_codigo">
                            <option value="">Selecione</option>
                            <option value="{{categoria.codigo}}">{{ }}</option>
                        </select>
                    </div>
                </div>
                <div className="form-row pt-3">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default Register;