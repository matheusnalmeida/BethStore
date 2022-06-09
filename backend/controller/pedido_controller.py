from time import strptime
from flask import Blueprint, request, jsonify
from sqlalchemy import true
from model.aprovacao import Aprovacao
from model.cliente import Cliente
from model.pedido import Pedido
from extensions.extensions import db
from model.produto import Produto
from model.produto_pedido import ProdutoPedido
from model.shared.result import Result
from utils import get_json_val
from datetime import datetime
import uuid

pedido = Blueprint('pedido', __name__, url_prefix="/pedido")

@pedido.route('/')
def index():
    pedidos = Pedido.query.all()
    result = Result(success=True, data=pedidos).to_json()
    return jsonify(result)

@pedido.route('/<int:id>')
def get_by_id(id):
    pedido_atual: Pedido = Pedido.query.get(id)
    if (not pedido_atual):
        result = Result(success=False, message="Id de pedido invalido!")
        return jsonify(result.to_json())

    result = Result(success=True, data=pedido_atual).to_json()
    return jsonify(result)

@pedido.route('/register' , methods=['POST'])
def register():
    pedido_json = request.get_json()
    result = Result()
    with db.session.begin():
        aprovacao = Aprovacao(
            codigo_aprovacao = str(uuid.uuid4()),
            status = "Aprovado"
        )
        db.session.add(aprovacao)
        db.session.flush()
        pedido = Pedido(
            forma_pagamento = get_json_val(pedido_json, 'forma_pagamento'),
            previsao_entrega = datetime.strptime(
                get_json_val(pedido_json, 'previsao_entrega'), '%d/%m/%Y'
                ),
            valor_frete = get_json_val(pedido_json, 'valor_frete'),
            valor_total = get_json_val(pedido_json, 'valor_total'),
            cliente_id = get_json_val(pedido_json, 'cliente_codigo'),
            aprovacao_id = aprovacao.id
        )
        db.session.add(pedido)
        db.session.flush()
        produtosPedido = []
        for produto_json in pedido_json['produtos']:
            produtosPedido.append(ProdutoPedido(
                produto_codigo = get_json_val(produto_json, 'codigo'),
                pedido_codigo = pedido.codigo,
                preco = get_json_val(produto_json, 'preco'),
                tamanho = get_json_val(produto_json, 'tamanho'),
                quantidade = get_json_val(produto_json, 'quantidade')
            ))
        db.session.add_all(produtosPedido)
        db.session.commit()
        result.message = 'Pedido inserido com sucesso!'
        result.data = pedido

    return jsonify(result.to_json())