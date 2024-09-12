import logging
from hashlib import md5
from os import path, remove
from shutil import move
from time import time
from subprocess import CalledProcessError, run
from yt_dlp import YoutubeDL
from mutagen.easyid3 import EasyID3
from ..utils import sanitize_filename, timestamp_to_seconds, seconds_to_timestamp
import re

logger = logging.getLogger()

class InvalidLinkError(Exception):
    pass

class BadParamError(Exception):
    pass

def convert_audio(link: str, start_timestamp: str, end_timestamp: str, destination_folder: str):
    logger.info(f'Converting from link {link}')

    timestamp_regex = '^\d{2}:\d{2}:\d{2}$'
    if ((start_timestamp and re.match(timestamp_regex, start_timestamp) is None) or
        (end_timestamp and re.match(timestamp_regex, end_timestamp) is None)):
        raise BadParamError('Timestamp malformed')

    # Create md5 hash from the link to form a unique download link
    hash = md5(link.encode()).hexdigest()

    file_name = f'{hash}{int(time())}'

    opts = {
        'postprocessors': [
            {
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '320'
            }
        ],
        'outtmpl': path.join(destination_folder, file_name),
        'noplaylist': True
    }

    with YoutubeDL(opts) as ytdl:
        logger.info(f'Downloading from {link}...')

        # For now, assume that any error is due to invalid link.
        try:
            # uploader, track (曲), title, fulltitle, artist, album,
            # availability, categories, channel, channel_url, creator,
            # duration (seconds), duration_string (hh:mm:ss), ext (webm),
            # filesize_approx (bytes), description, tags, thumbnail (url),
            # upload_date (YYYYMMDD)
            info = ytdl.extract_info(link)
        except:
            raise InvalidLinkError('Invalid link')
            
        title = info.get('title')
        artist = info.get('artist')
        thumbnail = info.get('thumbnail')
        duration = info.get('duration')
        duration_string = info.get('duration_string')
    
    # YoutubeDL automatically puts mp3 extension
    file_path = path.join(destination_folder, f'{file_name}.mp3')

    new_file_name = sanitize_filename(f'{file_name}_{title}')
    new_file_path = path.join(destination_folder, new_file_name)

    # Rename, add the title
    if path.exists(new_file_path):
        remove(new_file_path)

    move(file_path, new_file_path)

    file_name = new_file_name
    file_path = new_file_path

    # Trim media, output to new file
    command_trim = ''
    file_path_with_ext = f'{file_path}.mp3'
    if start_timestamp and end_timestamp:
        command_trim = f'ffmpeg -ss {start_timestamp} -to {end_timestamp} -i "{file_path}" "{file_path_with_ext}"'
    elif start_timestamp:
        command_trim = f'ffmpeg -ss {start_timestamp} -i "{file_path}" "{file_path_with_ext}"'
    elif end_timestamp:
        command_trim = f'ffmpeg -ss 00:00:00 -to {end_timestamp} -i "{file_path}" "{file_path_with_ext}"'

    # The mp3 extension is added here
    if command_trim != '':
        logger.info(f'Command: {command_trim}')
        process = run(command_trim, shell=True, encoding='utf-8', capture_output=True)
        logger.info(f'ffmpeg stderr:\n{process.stderr}')
        logger.info(f'ffmpeg stdout:\n{process.stdout}')
        try:
            process.check_returncode()
        except CalledProcessError:
            raise BadParamError('Bad parameter passed to ffmpeg')
            
    else:
        move(file_path, file_path_with_ext)

    # Add metadata
    try:
        metatag = EasyID3(file_path_with_ext)
        metatag['title'] = title
        metatag['artist'] = artist
        metatag.save()
    except:
        pass

    # Delete the file before it was trimmed: the one without extension
    if path.exists(file_path):
        remove(file_path)

    # Process info to return.
    # If no trimming was done, return the original duration
    if start_timestamp or end_timestamp:
        start_timestamp = 0 if not start_timestamp else timestamp_to_seconds(start_timestamp)
        end_timestamp = duration if not end_timestamp else timestamp_to_seconds(end_timestamp)
        duration_string = seconds_to_timestamp(abs(end_timestamp - start_timestamp))
    
    return {
        'title': title,
        'artist': artist,
        'thumbnail': thumbnail,
        'duration_string': duration_string,
        'filename': f'{file_name}.mp3'
    }