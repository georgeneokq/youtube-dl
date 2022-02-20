from flask import Flask, render_template

def declare_web_routes(app: Flask):
    @app.route('/')
    def index():
        return render_template('index.html')

    # TODO: Create a route to download files for the current user