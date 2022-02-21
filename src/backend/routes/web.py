from flask import Flask, render_template, request, send_file
from os import path

def declare_web_routes(app: Flask):
    @app.route('/')
    def route_index():
        return render_template('index.html')

    @app.route('/download/<media_type>/<file_name>')
    def route_download_audio(media_type, file_name):
        file_path = path.join(app.root_path, '..', 'storage', media_type, file_name)
        return send_file(file_path, as_attachment=True)