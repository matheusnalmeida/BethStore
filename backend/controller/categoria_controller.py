import json
from flask import Blueprint, jsonify, redirect, render_template, request, url_for, session
from extensions.extensions import db
from model.categoria import Categoria
from model.shared.result import Result
from utils import get_json_val

categoria = Blueprint('categoria', __name__, template_folder="../view", url_prefix="/categoria")

@categoria.route('/')
def index():    
    categorias = Categoria.query.all()
    result = Result(success=True, data=categorias).to_json()
    return jsonify(result)

@categoria.route('/register', methods=['POST'])
def register():
    categoria_json = request.get_json()
    categoria = Categoria(        
        descricao = get_json_val(categoria_json, 'descricao'),
        setor = get_json_val(categoria_json, 'setor')
    )
    return categoria_json

@categoria.route('<int:id>/update', methods=['GET', 'POST'])
def update(id):
    categoria_atual: Categoria = Categoria.query.get_or_404(id)
    if request.method == 'GET':
        return render_template('categoria/update.html', categoria=categoria_atual)
    else:
        categoria = Categoria(
            descricao = request.form['descricao'],
            setor = request.form['setor']
        )

        categoria_atual.fill_update(categoria)
        result = categoria_atual.is_valid()

        if result.success:
            db.session.commit()
            result.message = 'Categoria atualizada com sucesso!'
            session['categoria_result'] = result.to_json()
            return redirect(url_for('categoria.index'))
        return render_template('categoria/update.html', categoria=categoria_atual, result=result.to_json())

@categoria.route("<int:id>/delete", methods=['GET'])
def delete(id):
    categoria_atual = Categoria.query.get_or_404(id)
    db.session.delete(categoria_atual)
    db.session.commit()
    return redirect(url_for('categoria.index'))