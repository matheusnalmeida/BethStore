import React from 'react';
import '../../styles/categoria/categoria.css';

const  IndexC = () => {

    return (
        <div className="container">
            <div className="top-table">
                <a className="btn btn-success" href="{{url_for('categoria.register')}}"><i className="material-icons"
                    >&#xE147;</i> <span>Adicionar</span></a>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Setor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>
                            <a id="edit-categoria-{{categoria.codigo}}" className="edit" href="{{url_for('categoria.update', id=categoria.codigo)}}" data-toggle="modal" ><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a id="delete-categoria-{{categoria.codigo}}" className="delete" href="{{ url_for('categoria.delete', id=categoria['codigo'])}}" data-toggle="modal">
                                <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default IndexC;