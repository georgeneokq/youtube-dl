import logging
from tempfile import gettempdir
from flask import Flask, redirect, render_template, send_file, send_from_directory
from os import path, getenv

logger = logging.getLogger()

def declare_web_routes(app: Flask):
    @app.route('/')
    def route_index():
        return send_file(path.abspath(path.join(app.root_path, 'frontend', 'dist', 'index.html')))

    @app.route('/index.html')
    def redirect_to_index():
        return redirect('/')

    @app.route('/download/audio/<file_name>')
    def route_download_audio(file_name):
        storage_path = path.abspath(path.join(app.root_path, getenv('STORAGE_DIR'), 'audio') or path.join(gettempdir(), 'kanade', 'audio'))
        
        # Remove the hash, use the title as the file download name
        file_name_without_hash = ''.join(file_name.split('_')[1:])
        logger.info(storage_path)
        logger.info(file_name)
        logger.info(file_name_without_hash)

        return send_from_directory(storage_path, file_name, as_attachment=True, attachment_filename=file_name_without_hash)