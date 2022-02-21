from flask import Flask
from backend.routes.web import declare_web_routes
from backend.routes.api import declare_api_routes

app = Flask(__name__)

declare_web_routes(app)
declare_api_routes(app)