from flask import Blueprint, request, jsonify
from sqlalchemy import true
from model.cliente import Cliente
from extensions.extensions import db
from model.shared.result import Result
from utils import get_json_val
from viewmodels.produto_carrinho import ProdutoCarrinho

# https://github.com/adonescunha/correios-frete
# https://github.com/Deividy/frete

frete = Blueprint('frete', __name__, url_prefix="/frete")

@frete.route('/calcular-frete/<cep>' , methods=['POST'])
def calcular_frete(cep):
    produtos_json = request.get_json()
    produtos_carrinho = []
    for produto_json in produtos_json:
        new_produto = ProdutoCarrinho(
            codigo = get_json_val(produto_json, 'codigo'),
            preco = get_json_val(produto_json, 'preco'),
            quantidade = get_json_val(produto_json, 'quantidade'),
            tamanho = get_json_val(produto_json, 'tamanho')
        )
        produtos_carrinho.append(new_produto)
    
    frete = calcular_frete_produtos(produtos_carrinho)
    
    result = Result(success=True, data=frete).to_json()
    return jsonify(result)


def calcular_frete_produtos(produtos_carrinho):
    valor = 0
    for produto in produtos_carrinho:
        valor += ((produto.tamanho ** 3)/1000) * produto.quantidade
    return valor