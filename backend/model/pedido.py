from sqlalchemy import Column
from extensions.extensions import db
from model.produto_pedido import ProdutoPedido
from model.shared.result import Result
from model.aprovacao import Aprovacao
from utils import model_to_json

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    codigo = db.Column(db.Integer, primary_key=True)
    forma_pagamento = Column(db.String(250), nullable=False)
    previsao_entrega = Column(db.Date, nullable = False)
    valor_frete = Column(db.Float, nullable = False)
    valor_total = Column(db.Float, nullable = False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    cliente = db.relationship("Cliente", backref="cliente", uselist=False)
    produtoPedido = db.relationship("ProdutoPedido", backref='Pedido')
    aprovacao_id = db.Column(db.Integer, db.ForeignKey('aprovacoes.id'), nullable=False, unique=True)
    aprovacao = db.relationship("Aprovacao", backref="aprovacao", uselist=False)

    def to_json(self):
        return {
            "codigo": self.codigo,
            "forma_pagamento": self.forma_pagamento,
            "previsao_entrega": self.previsao_entrega,
            "valor_frete": self.valor_frete,
            "valor_total": self.valor_total,
            "cliente": model_to_json(self.cliente),
            "produtos_pedido": model_to_json(self.produtoPedido),
            "aprovacao": model_to_json(self.aprovacao),
        }