from tempfile import gettempdir
from flask import Flask, request
from os import path, getenv
from backend.features.convert import BadParamError, InvalidLinkError, convert_audio
from threading import Thread

cleanup_interval = getenv('CLEANUP_INTERVAL_HOURS') or 10

"""
Clean up old audio files, from 10 hours ago
"""
def cleanup():
    # Read all files from storage folder
    pass

def declare_api_routes(app: Flask):
    @app.route('/api/convert/audio', methods=['POST'])
    def route_convert_audio():
        link = request.json.get('link')
        start_timestamp = request.json.get('start_timestamp')
        end_timestamp = request.json.get('end_timestamp')
        destination = path.join(app.root_path, '..', getenv('STORAGE_DIR'), 'audio') or path.join(gettempdir(), 'kanade', 'audio')

        try:
            info = convert_audio(link, start_timestamp, end_timestamp, destination)
        except (InvalidLinkError, BadParamError) as e:
            return {'error': str(e)}, 422  # Unprocessible entity

        Thread(target=cleanup).start()

        return {
            **info,
            'link': f"/download/audio/{info.get('filename')}"
        }