from flask import Flask
from backend.routes.web import declare_web_routes
from backend.routes.api import declare_api_routes
from dotenv import load_dotenv
from os import getenv, path
import logging
from datetime import datetime

load_dotenv()

# Set up logger
FORMAT = '[%(asctime)s] %(message)s'
log_filename = path.join(getenv('LOG_DIR'), f"{datetime.today().strftime('%d-%m-%Y')}.log")
logging.basicConfig(filename=log_filename, format=FORMAT)

app = Flask(__name__,
        static_url_path='',
        static_folder='frontend/dist',
        template_folder='frontend/templates')

declare_web_routes(app)
declare_api_routes(app)

if __name__ == '__main__':
    port = getenv('SERVER_PORT')
    print(f'Running server on port {port}')
    app.run(host='0.0.0.0', port=port)


# vim: set et ts=4 sw=4: