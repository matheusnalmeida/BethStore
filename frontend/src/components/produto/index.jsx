import React from "react";
import "../../styles/produto/index.css";

const Index = () => {
    return (
        <div className="container">
            <div className="top-table">
                <a className="btn btn-success" href="{{url_for('produto.register')}}"><i className="material-icons"
                >&#xE147;</i> <span>Adicionar</span></a>
            </div>
            <table className="table justify-content-center align-items-center">
                <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Tamanho</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>
                            <a id="edit-produto-{{item.codigo}}" className="edit" href="{{url_for('produto.update', id=item.codigo)}}" data-toggle="modal" ><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a id="delete-produto-{{item.codigo}}" className="delete" href="{{ url_for('produto.delete', id=item['codigo'])}}" data-toggle="modal">
                                <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}