from flask import Flask
from backend.routes.routes import declare_routes

app = Flask(__name__)

declare_routes(app)