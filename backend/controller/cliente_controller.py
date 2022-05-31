from flask import Blueprint, request, jsonify
from sqlalchemy import true
from model.cliente import Cliente
from extensions.extensions import db
from model.shared.result import Result
from utils import get_json_val

cliente = Blueprint('cliente', __name__, template_folder="../view", url_prefix="/cliente")

@cliente.route('/')
def index():
    clientes = Cliente.query.filter(Cliente.ativo==True).all()
    result = Result(success=True, data=clientes).to_json()
    return jsonify(result)

@cliente.route('/register', methods=['POST'])
def register():
    cliente_json = request.get_json()
    
    cliente = Cliente(
        nome = get_json_val(cliente_json, 'nome'),
        telefone = get_json_val(cliente_json, 'telefone'),
        email = get_json_val(cliente_json, 'email'),
        cpf = get_json_val(cliente_json, 'cpf'),
        cep = get_json_val(cliente_json, 'cep')
    )

    result = cliente.is_valid()
    if not result.success:
        return jsonify(result.to_json())

    cliente_validate = validate_cliente(cliente)    
    if not cliente_validate.success:
        return jsonify(cliente_validate.to_json())

    db.session.add(cliente)
    db.session.commit()
    result.data = cliente
    result.message = 'Cliente cadastrado com sucesso!'

    return jsonify(result.to_json())

@cliente.route('<int:id>/update', methods=['PUT'])
def update(id):
    cliente_atual: Cliente = Cliente.query.get(id)
    if (not cliente_atual):
        result = Result(success=False, message="Id invalido!")
        return jsonify(result.to_json())

    cliente_json = request.get_json()
    cliente = Cliente(
        nome = get_json_val(cliente_json, 'nome'),
        telefone = get_json_val(cliente_json, 'telefone'),
        email = get_json_val(cliente_json, 'email'),
        cpf = get_json_val(cliente_json, 'cpf'),
        cep = get_json_val(cliente_json, 'cep')
    )

    cliente_atual.fill_update(cliente)
    result = cliente_atual.is_valid()
    if not result.success:
        return jsonify(result.to_json())

    cliente_validate = validate_cliente_update(cliente_atual)    
    if not cliente_validate.success:
        return jsonify(cliente_validate.to_json())

    db.session.commit()
    result.message = 'Cliente atualizado com sucesso!'
    result.data = cliente_atual

    return jsonify(result.to_json())


@cliente.route('<int:id>/delete', methods=['DELETE'])
def delete(id):
    cliente_atual: Cliente = Cliente.query.get(id)
    if (not cliente_atual or cliente_atual.ativo == False):
        result = Result(success=False, message="Id invalido!")
        return jsonify(result.to_json())

    cliente_atual.ativo = False
    db.session.commit()
    result = Result(success=True, message="Cliente deletado com sucesso!")
    return jsonify(result.to_json())


def validate_cliente(cliente: Cliente) -> Result:
    if Cliente.query.filter_by(cpf=cliente.cpf).first() != None:
        return Result(success=False, message="Já existe um cliente com este CPF")

    if Cliente.query.filter_by(email=cliente.email).first() != None:
        return Result(success=False, message="Já existe um cliente com este email")

    return Result(success=True)

def validate_cliente_update(cliente: Cliente) -> Result:
    if Cliente.query.filter_by(cpf=cliente.cpf).filter(Cliente.id != cliente.id).first() != None:
        return Result(success=False, message="Já existe um cliente com este CPF")

    if Cliente.query.filter_by(email=cliente.email).filter(Cliente.id != cliente.id).first() != None:
        return Result(success=False, message="Já existe um cliente com este email")

    return Result(success=True)