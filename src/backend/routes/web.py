from flask import Flask, render_template, request, send_from_directory
from os import path

def declare_web_routes(app: Flask):
    @app.route('/')
    def route_index():
        return render_template('index.html')

    @app.route('/download/<media_type>/<file_name>')
    def route_download_audio(media_type, file_name):
        storage_path = path.abspath(path.join(app.root_path, '..', 'storage', media_type))
        
        # Remove the hash, use the title as the file download name
        file_name_without_hash = ''.join(file_name.split('_')[1:])
        print(storage_path)
        print(file_name)
        print(file_name_without_hash)

        return send_from_directory(storage_path, file_name, as_attachment=True, attachment_filename=file_name_without_hash)