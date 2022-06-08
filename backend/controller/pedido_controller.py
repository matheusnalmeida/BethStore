from flask import Blueprint, request, jsonify
from sqlalchemy import true
from model.pedido import Pedido
from extensions.extensions import db
from model.shared.result import Result
from utils import get_json_val

pedido = Blueprint('pedido', __name__, url_prefix="/pedido")

@pedido.route('/')
def index():
    return 'hello world :)'