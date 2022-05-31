import React from 'react';
import '../../styles/cliente/index.css';

const Index = () => {
    return (
        <div className="container">
            <div className="top-table">
                <a className="btn btn-success" href="{{url_for('cliente.register')}}"><i className="material-icons"
                    >&#xE147;</i> <span>Adicionar</span></a>
            </div>
            <table className="table justify-content-center align-items-center">
                <thead>
                    <tr>
                        <th scope="col">1</th>
                        <th scope="col">2</th>
                        <th scope="col">3</th>
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
                        <td>
                            <a id="edit-cliente-{{cliente.id}}" className="edit" href="{{url_for('cliente.update', id=cliente.id)}}" data-toggle="modal" ><i className="material-icons" style="color: yellow;" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a id="delete-cliente-{{cliente.id}}" className="delete" href="{{ url_for('cliente.delete', id=cliente['id'])}}" data-toggle="modal">
                                <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Index;