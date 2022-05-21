from flask import Blueprint, render_template, request

homepage = Blueprint('homepage', __name__, template_folder="../view", url_prefix="/")

@homepage.route('/')
def index():
    if request.method == 'GET':                
        return render_template('homepage.html')