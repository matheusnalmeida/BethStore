from sqlalchemy import Column
from extensions.extensions import db
from model.produto_pedido import ProdutoPedido
from model.shared.result import Result

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    codigo = db.Column(db.Integer, primary_key=True)
    forma_pagamento = Column(db.String(250), nullable=False)
    previsao_entrega = Column(db.Date, nullable = False)
    valor_frete = Column(db.Float, nullable = False)
    valor_total = Column(db.Float, nullable = False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    cliente = db.relationship("Cliente", backref="cliente", uselist=False)
    produtos = db.relationship("Produto", secondary=ProdutoPedido.__table__, backref='Pedido')

    def is_valid(self) -> Result:
        pass