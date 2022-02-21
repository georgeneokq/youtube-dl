from flask import Flask
from backend.routes.web import declare_web_routes
from backend.routes.api import declare_api_routes
from dotenv import find_dotenv, load_dotenv
from os import getenv

load_dotenv(find_dotenv())

app = Flask(__name__)

declare_web_routes(app)
declare_api_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=getenv('SERVER_PORT'))