from sqlalchemy import Column
from extensions.extensions import db
from model.produto_pedido import ProdutoPedido
from model.shared.result import Result
from utils import model_to_json

class Produto(db.Model):
    __tablename__ = 'produtos'

    codigo = Column(db.Integer, primary_key=True)
    marca = Column(db.String(250), nullable = False)
    modelo = Column(db.String(250), nullable = False)
    preco = Column(db.Float, nullable=False)
    estoque = Column(db.Integer, nullable=False)
    tamanho = Column(db.Float, nullable = False)
    descricao = Column(db.String(250), nullable = False)
    categoria_codigo = db.Column(db.Integer, db.ForeignKey('categoria.codigo'), nullable=False)
    categoria = db.relationship("Categoria", backref="categoria", uselist=False) 
    ativo = Column(db.Boolean, default=True, nullable=False)
    pedidos = db.relationship('Pedido', secondary=ProdutoPedido.__table__, backref='Produto')

    def is_valid(self) -> Result:
        if (
            not self.marca or len(self.marca) == 0 or
            not self.modelo or len(self.modelo) == 0 or
            not self.categoria_codigo or self.categoria_codigo == 0 or
            not self.preco or self.preco == 0 or
            not self.tamanho or self.tamanho == 0 or
            not self.descricao or len(self.descricao) == 0
        ):
            return Result(success= False, message="Preencha todos os campos!")

        if (not self.estoque or int(self.estoque) <= 0):
            return Result(success= False, message="A quantidade de produtos em estoque é inválida!")        

        return Result(success=True)            
    
    def fill_update(self, produto):
        self.marca = produto.marca
        self.modelo = produto.modelo        
        self.preco = produto.preco
        self.estoque = produto.estoque
        self.tamanho = produto.tamanho
        self.descricao = produto.descricao
        self.categoria_codigo = produto.categoria_codigo
    
    def to_json(self):
        return {
            "codigo": self.codigo,
            "marca": self.marca,
            "modelo": self.modelo,
            "preco": self.preco,
            "estoque": self.estoque,
            "tamanho": self.tamanho,
            "descricao": self.descricao,
            "ativo": self.ativo,
            "categoria_codigo": self.categoria_codigo,
            "categoria": model_to_json(self.categoria),
        }