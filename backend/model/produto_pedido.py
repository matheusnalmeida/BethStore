from sqlalchemy import Column
from extensions.extensions import db
from model.shared.result import Result
from utils import model_to_json

class ProdutoPedido(db.Model):
    __tablename__ = 'produtoPedidos'

    codigo = db.Column(db.Integer, primary_key=True)
    produto_codigo = Column(db.Integer, db.ForeignKey('produtos.codigo'))
    produto = db.relationship("Produto", backref="produto", uselist=False)
    pedido_codigo = Column(db.Integer, db.ForeignKey('pedidos.codigo'))
    preco = Column(db.Float, nullable=False)
    tamanho = Column(db.Float, nullable = False)
    quantidade = Column(db.Integer, nullable=False)

    def to_json(self):
        return {
            "codigo": self.codigo,
            "produto": model_to_json(self.produto),
            "preco": self.preco,
            "tamanho": self.tamanho,
            "quantidade": self.quantidade
        }