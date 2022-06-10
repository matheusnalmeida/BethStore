import os

class DefaultConfig:
    SECRET_KEY = os.environ.get('SECRET_KEY', "ef280044-fc3b-4205-8978-ae2849a49933")
    PROJECT = "Beth Store"
    DEBUG = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:admin@localhost/BethStore' if not os.environ.get('DATABASE_URL') else not os.environ.get('DATABASE_URL').replace('postgres', 'postgresql')