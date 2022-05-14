from flask import Blueprint, redirect, render_template, request, url_for, session
from extensions.extensions import db
from model.categoria import Categoria

categoria = Blueprint('categoria', __name__, template_folder='templates', url_prefix="/categoria")

@categoria.route('/')
def index():
    result = None
    if session.get("categoria_result") != None:
        result = session["categoria_result"]
        session.pop("categoria_result")

    categorias = Categoria.query.all()
    return render_template('categoria/index.html', categorias=categorias, result=result)

@categoria.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        categoria=Categoria(
            descricao = '',
            setor = ''
        )
        return render_template('categoria/register.html', categoria=categoria)

    if request.method == 'POST':
        categoria = Categoria(
            
            descricao = request.form['descricao'],
            setor = request.form['setor']
        )

        result = categoria.is_valid()
        if result.success:
            db.session.add(categoria)
            db.session.commit()
            result.message = 'Categoria cadastrada com sucesso!'
            session['categoria_result'] = result.to_json()
            return redirect(url_for('categoria.index'))

        return render_template('categoria/register.html', categoria=categoria, result=result.to_json())

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