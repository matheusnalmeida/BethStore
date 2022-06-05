from config import DefaultConfig
from flask import Flask, render_template
from controller.produto_controller import produto
from controller.categoria_controller import categoria
from controller.cliente_controller import cliente
from controller.frete_controller import frete
from extensions.extensions import db
from model.categoria import Categoria
from constants import CategoriaBeleza, CategoriaCama, CategoriaDecoracao, CategoriaVestuario
from flask_cors import CORS

app = Flask(__name__, template_folder='view')
CORS(app)

# Load app config
app.config.from_object(DefaultConfig)

# flask-sqlalchemy
db.init_app(app)
with app.app_context():
    db.create_all()
    
def init_db(app):
    with app.app_context():
        existeCategoria = db.session.query(Categoria).first()
        if not existeCategoria:
            db.session.add(CategoriaBeleza)
            db.session.add(CategoriaCama)
            db.session.add(CategoriaDecoracao)
            db.session.add(CategoriaVestuario)
            db.session.commit()

# Produto Controller
app.register_blueprint(produto)
# Categoria Controller
app.register_blueprint(categoria)
# Cliente Controller
app.register_blueprint(cliente)
# Frete Controller
app.register_blueprint(frete)

init_db(app)

# App 404 error handler
@app.errorhandler(404)
def page_not_found(error):
    return render_template("erros/404.html"), 404

if __name__ == '__main__':
    app.run()