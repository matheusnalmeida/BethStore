from sqlalchemy import Column
from extensions.extensions import db
from model.shared.result import Result

class Aprovacao(db.Model):
    __tablename__ = 'aprovacoes'

    id = db.Column(db.Integer, primary_key=True)
    codigo_aprovacao = Column(db.String(250), nullable=False)
    status = Column(db.String(250), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "codigo_aprovacao": self.codigo_aprovacao,
            "status": self.status
        }