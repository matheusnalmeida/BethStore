from sqlalchemy import Column
from extensions.extensions import db
from model.shared.result import Result

class Cliente(db.Model):
    __tablename__ = 'clientes'

    nome = Column(db.String(250), nullable = False)
    telefone = Column(db.String(11), nullable = False)
    email = Column(db.String(250), nullable = False)
    cpf = Column(db.String(11), nullable = False)
    cep = Column(db.String(8), nullable = False)


    def is_valid(self) -> Result:
        if (
            not self.nome or len(self.nome) == 0 or
            not self.telefone or len(self.telefone) == 0 or
            not self.email or len(self.email) == 0 or
            not self.cpf or len(self.cpf) == 0 or
            not self.cep or len(self.cep) == 0
        ):
            return Result(success= False, message="Preencha todos os campos!")

        return Result(success=True)

    
    def fill_update(self, cliente):
        self.nome = cliente.nome
        self.telefone = cliente.telefone
        self.email = cliente.email
        self.cpf = cliente.cpf
        self.cep = cliente.cep

    def to_json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "telefone": self.telefone,
            "email": self.email,
            "cpf": self.cpf,
            "cep": self.cep
        }