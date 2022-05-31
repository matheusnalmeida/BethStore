class DefaultConfig:
    SECRET_KEY = "ef280044-fc3b-4205-8978-ae2849a49933"
    PROJECT = "Beth Store"
    DEBUG = True
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'