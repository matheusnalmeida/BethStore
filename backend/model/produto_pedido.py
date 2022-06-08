from sqlalchemy import Column
from extensions.extensions import db
from model.shared.result import Result

class ProdutoPedido(db.Model):
    __tablename__ = 'produtoPedido'

    codigo = db.Column(db.Integer, primary_key=True)
    produtoCodigo = Column(db.Integer, db.ForeignKey('produtos.codigo'))
    pedidoCodigo = Column(db.Integer, db.ForeignKey('pedidos.codigo'))
    
    def is_valid(self) -> Result:
        pass