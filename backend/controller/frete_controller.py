from flask import Blueprint, request, jsonify
from sqlalchemy import true
from model.cliente import Cliente
from extensions.extensions import db
from model.shared.result import Result
from utils import get_json_val

from correios_frete.client import Client 
from correios_frete.package import Package 
from correios_frete.constants import CAIXA_PACOTE
from correios_frete.constants import SEDEX, PAC

# https://github.com/adonescunha/correios-frete
# https://github.com/Deividy/frete

frete = Blueprint('frete', __name__, url_prefix="/frete")

@frete.route('/calcular-frete/<str:cep>' , methods=['POST'])
def calcular_frete(cep):
    #produtos_json = request.get_json()
    #
    #cliente = Cliente(
    #    nome = get_json_val(cliente_json, 'nome'),
    #    telefone = get_json_val(cliente_json, 'telefone'),
    #    email = get_json_val(cliente_json, 'email'),
    #    cpf = get_json_val(cliente_json, 'cpf'),
    #    cep = get_json_val(cliente_json, 'cep')
    #)

    client = Client(cep_origem='01310-200')
    package = Package(formato=CAIXA_PACOTE)
    package.add_item(
        weight = 0.5,
        height = 6.0,
        width  = 16.0,
        length = 16.0
    )
    servicos = client.calc_preco_prazo(package, '52020-010', SEDEX)

    result = Result(success=True).to_json()
    return jsonify(result)