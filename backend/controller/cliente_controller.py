from statistics import quantiles
from unicodedata import category
from flask import Blueprint, redirect, render_template, request, url_for, session, jsonify
from model.cliente import Cliente
from extensions.extensions import db

cliente = Blueprint('cliente', __name__, template_folder='../view', url_prefix='/cliente')

@cliente.route('/')
def index():
    result = None
    if session.get("cliente_result") != None:
        result = session["cliente_result"]
        session.pop("cliente_result")
    clientes = Cliente.query.all()
    return render_template('cliente/index.html', clientes=clientes, result=result)

@cliente.route('/register', methods=['GET', 'POST'])
def register():
    cliente = Cliente.query.all()
    if request.method == 'GET':
        cliente=Cliente(
            nome = "",
            telefone = "",
            email = "",
            cpf = "",
            cep = None
        )
        return jsonify(cliente.to_json())
    
    if request.method == 'POST':
        cliente = Cliente(
            nome = request.form['nome'],
            telefone = request.form['telefone'],
            email = request.form['email'],
            cpf = request.form['cpf'],
            cep = request.form['cep']
        )

        if Cliente.query.filter_by(cpf=cliente.cpf).first() != None:
            result = result(success=False, message="Já existe um cliente com este CPF")
            return render_template('cliente/register.html', cliente=cliente, result=result.to_json())

        result = cliente.is_valid()
        if result.success:
            db.session.add(cliente)
            db.session.commit()
            result.message = "Cliente cadastrado com sucesso!"
            session["cliente_result"] = result.to_json()
            return redirect(url_for('cliente.index'))
        
        return render_template('cliente/register.html', cliente=cliente, result=result.to_json())

@cliente.route('<int:id>/update', methods=['GET', 'POST'])
def update(id):
    cliente = Cliente.query.all()
    cliente_atual: Cliente = Cliente.get_or_404(id)
    if request.method == 'GET':
        return render_template('cliente/update.html', cliente=cliente_atual)
    else:
        cliente = Cliente(
            nome = request.form['nome'],
            telefone = request.form['telefone'],
            email = request.form['email'],
            cpf = request.form['cpf'],
            cep = request.form['cep']
        )

        cliente_atual.fill_update(cliente)
        result = cliente_atual.is_valid()

        if result.success:
            db.session.commit()
            result.message = "Cliente atualizado com sucesso!"
            session["cliente_result"] = result.to_json()
            return redirect(url_for('cliente.index'))

        return render_template('cliente/update.html', cliente=cliente_atual, result=result.to_json())


@cliente.route('<int:id>/delete', methods=['GET', 'POST'])
def delete(id):
    cliente_atual = Cliente.query.get_or_404(id)
    db.session.add(cliente_atual)
    db.session.commit()
    return redirect(url_for('cliente.index'))