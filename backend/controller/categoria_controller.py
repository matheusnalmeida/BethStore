from flask import Blueprint, jsonify, request
from extensions.extensions import db
from model.categoria import Categoria
from model.shared.result import Result
from utils import get_json_val

categoria = Blueprint('categoria', __name__, template_folder="../view", url_prefix="/categoria")

@categoria.route('/')
def index():    
    categorias = Categoria.query.filter(Categoria.ativo==True).all()
    result = Result(success=True, data=categorias).to_json()
    return jsonify(result)

@categoria.route('/register', methods=['POST'])
def register():
    categoria_json = request.get_json()
    categoria = Categoria(        
        descricao = get_json_val(categoria_json, 'descricao'),
        setor = get_json_val(categoria_json, 'setor')
    )

    result = categoria.is_valid()
    if result.success:
        db.session.add(categoria)
        db.session.commit()
        result.data = categoria
        result.message = 'Categoria cadastrada com sucesso!'
        
    return jsonify(result.to_json())

@categoria.route('<int:id>/update', methods=['PUT'])
def update(id):
    categoria_atual: Categoria = Categoria.query.get(id)
    if (not categoria_atual):
        result = Result(success=False, message="Id de categoria invalido!")
        return jsonify(result.to_json())

    categoria_json = request.get_json()
    categoria = Categoria(        
        descricao = get_json_val(categoria_json, 'descricao'),
        setor = get_json_val(categoria_json, 'setor')
    )

    categoria_atual.fill_update(categoria)
    result = categoria_atual.is_valid()

    if result.success:
        db.session.commit()
        result.message = 'Categoria atualizada com sucesso!'
        result.data = categoria_atual

    return jsonify(result.to_json())

@categoria.route("<int:id>/delete", methods=['DELETE'])
def delete(id):
    categoria_atual: Categoria = Categoria.query.get(id)
    if (not categoria_atual or categoria_atual.ativo == False):
        result = Result(success=False, message="Id de categoria invalido!")
        return jsonify(result.to_json())

    categoria_atual.ativo = False
    db.session.commit()
    result = Result(success=True, message="Categoria deletada com sucesso!")
    return jsonify(result.to_json())