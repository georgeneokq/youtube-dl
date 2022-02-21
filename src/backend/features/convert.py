from hashlib import md5
from os import path
from yt_dlp import YoutubeDL
from pprint import pprint

# def progress_hook(d):
    # pprint(d)

def convert_audio(link: str, start_timestamp: str, end_timestamp: str, destination_folder: str):
    print(f'Converting from link {link}')

    # Create md5 hash from the link to form a unique download link
    hash = md5(link.encode()).hexdigest()

    opts = {
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '320',
        }],
        'outtmpl': path.join(destination_folder, f'{hash}_%(title)s'),
        # 'progress_hooks': [progress_hook]
    }
    print(opts)

    with YoutubeDL(opts) as ytdl:
        info = ytdl.extract_info(link)
        title = info.get('title')
        ytdl.download([link])
    
    return {
        'title': title,
        'filename': f'{hash}_{title}.mp3'
    }