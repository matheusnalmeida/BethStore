from datetime import datetime
from sqlalchemy import Column
from extensions.extensions import db
from model.shared.result import Result

class Categoria(db.Model):
    __tablename__ = 'categoria'

    codigo = Column(db.Integer, primary_key=True)
    descricao = Column(db.String(50), nullable=False)
    setor = Column(db.String(50), nullable=False)

    def is_valid(self) -> Result:
        if (
            not self.descricao or len(self.descricao) == 0 or 
            not self.setor or len(self.setor) == 0
        ):
            return Result(success= False, message="Preencha todos os campos!")

        return Result(success= True)
        
    def fill_update(self, categoria):
        self.descricao = categoria.descricao
        self.setor = categoria.setor