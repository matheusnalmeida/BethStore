from statistics import quantiles
from unicodedata import category
from flask import Blueprint, redirect, render_template, request, url_for, session
from model.categoria import Categoria
from model.produto import Produto
from extensions.extensions import db

produto = Blueprint('produto', __name__, template_folder="../view", url_prefix="/produto")

@produto.route('/')
def index():
    result = None
    if session.get("produto_result") != None:
        result = session["produto_result"]
        session.pop("produto_result")
    produtos = Produto.query.all()
    return render_template('produto/index.html', produtos=produtos, result = result)

@produto.route('/register', methods=['GET', 'POST'])
def register():
    categorias = Categoria.query.all()
    if request.method == 'GET':                
        produto=Produto(
            marca = '',
            modelo = '',
            preco  = None,
            quantidade = None,
            tamanho = None,
            descricao = '',
            categoria_codigo = None
        )
        return render_template('produto/register.html', produto=produto, categorias=categorias)

    if request.method == 'POST':                
        produto = Produto(
            marca = request.form['marca'],
            modelo = request.form['modelo'],
            preco = request.form['preco'],
            quantidade = request.form['quantidade'],
            tamanho = request.form['tamanho'],
            descricao = request.form['descricao'],
            categoria_codigo = request.form['categoria_codigo']
        )

        result = produto.is_valid()        
        if result.success: 
            db.session.add(produto)
            db.session.commit()
            result.message = "Produto cadastrado com sucesso!"
            session["produto_result"] = result.to_json()
            return redirect(url_for('produto.index'))

        return render_template('produto/register.html', produto=produto, categorias=categorias, result=result.to_json())

@produto.route("<int:id>/update", methods=['GET', 'POST'])
def update(id):
    categorias = Categoria.query.all()
    produto_atual: Produto = Produto.query.get_or_404(id)
    if request.method == 'GET':
        return render_template('produto/update.html', produto=produto_atual, categorias=categorias)
    else:
        produto = Produto(
            marca = request.form['marca'],
            modelo = request.form['modelo'],
            preco = request.form['preco'],
            quantidade = request.form['quantidade'],
            tamanho = request.form['tamanho'],
            descricao = request.form['descricao'],
            categoria_codigo = request.form['categoria_codigo']
        )
        
        produto_atual.fill_update(produto)
        result = produto_atual.is_valid()

        if result.success:
            db.session.commit()
            result.message = "Produto atualizado com sucesso!"
            session["produto_result"] = result.to_json()
            return redirect(url_for('produto.index'))

        return render_template('produto/update.html', produto=produto, categorias=categorias, result=result.to_json())
        
@produto.route("<int:id>/delete", methods=['GET'])
def delete(id):
    produto_atual = Produto.query.get_or_404(id)
    db.session.delete(produto_atual)
    db.session.commit()
    return redirect(url_for('produto.index'))