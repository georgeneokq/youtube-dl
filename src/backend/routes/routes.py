from flask import Flask
from .web import declare_web_routes

def declare_routes(app: Flask):
    declare_web_routes(app)