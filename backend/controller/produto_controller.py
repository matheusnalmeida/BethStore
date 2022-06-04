from flask import Blueprint, jsonify, request
from model.categoria import Categoria
from model.produto import Produto
from extensions.extensions import db
from model.shared.result import Result
from utils import get_json_val

produto = Blueprint('produto', __name__, template_folder="../view", url_prefix="/produto")

@produto.route('/')
def index():
    produtos = Produto.query.filter(Produto.ativo==True).all()
    result = Result(success=True, data=produtos).to_json()
    return jsonify(result)

@produto.route('/<int:id>')
def get_by_id(id):    
    cliente_atual: Produto = Produto.query.get(id)
    if (not cliente_atual):
        result = Result(success=False, message="Id de produto invalido!")
        return jsonify(result.to_json())

    result = Result(success=True, data=cliente_atual).to_json()
    return jsonify(result)

@produto.route('/register', methods=['POST'])
def register():
    produto_json = request.get_json()
    produto = Produto(
        marca = get_json_val(produto_json, 'marca'),
        modelo = get_json_val(produto_json, 'modelo'),
        preco = get_json_val(produto_json, 'preco'),
        quantidade = get_json_val(produto_json, 'quantidade'),
        tamanho = get_json_val(produto_json, 'tamanho'),
        descricao = get_json_val(produto_json, 'descricao'),
        categoria_codigo = get_json_val(produto_json, 'categoria_codigo')
    )

    result = produto.is_valid()        
    if not result.success: 
        return jsonify(result.to_json())

    produto_validate = validate_produto(produto)
    if (not produto_validate.success):
        return jsonify(produto_validate.to_json())

    db.session.add(produto)
    db.session.commit()
    result.data = produto
    result.message = "Produto cadastrado com sucesso!"

    return jsonify(result.to_json())

@produto.route("<int:id>/update", methods=['PUT'])
def update(id):
    produto_atual: Produto = Produto.query.get(id)
    if (not produto_atual):
        result = Result(success=False, message="Id invalido!")
        return jsonify(result.to_json())

    produto_json = request.get_json()
    produto = Produto(
        marca = get_json_val(produto_json, 'marca'),
        modelo = get_json_val(produto_json, 'modelo'),
        preco = get_json_val(produto_json, 'preco'),
        quantidade = get_json_val(produto_json, 'quantidade'),
        tamanho = get_json_val(produto_json, 'tamanho'),
        descricao = get_json_val(produto_json, 'descricao'),
        categoria_codigo = get_json_val(produto_json, 'categoria_codigo')
    )
    produto_atual.fill_update(produto)

    produto_validate = validate_produto(produto_atual)
    if (not produto_validate.success):
        return jsonify(produto_validate.to_json())

    result = produto_atual.is_valid()

    if result.success:
        db.session.commit()
        result.message = 'Produto atualizado com sucesso!'
        result.data = produto_atual

    return jsonify(result.to_json())
        
@produto.route("<int:id>/delete", methods=['DELETE'])
def delete(id):
    produto_atual: Produto = Produto.query.get(id)
    if (not produto_atual or produto_atual.ativo == False):
        result = Result(success=False, message="Id invalido!")
        return jsonify(result.to_json())

    produto_atual.ativo = False
    db.session.commit()
    result = Result(success=True, message="Produto deletado com sucesso!")
    return jsonify(result.to_json())

def validate_produto(produto: Produto) -> Result:
    if Categoria.query.filter_by(codigo=produto.categoria_codigo, ativo=True).first() == None:
        return Result(success=False, message="Codigo de categoria invalido!")

    return Result(success=True)