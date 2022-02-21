"""
Check if venv folder is created
"""

from tempfile import gettempdir
from os.path import exists
from os import makedirs, path
from subprocess import run
from pathlib import Path

from utils import ensure_root

# Folder to place files download from youtube
downloads_folder = path.join(gettempdir(), 'kanade')

def create_directories():
    # Create directories to hold created files
    try:
        makedirs(f'{downloads_folder}/audio')
        makedirs(f'{downloads_folder}/video')
    except FileExistsError:
        pass


def ensure_virtualenv():
    # Ensure virtual env
    if not exists('venv'):
        print('Creating virtual environment.')
        run('python -m venv venv')


def main():
    create_directories()
    ensure_virtualenv()


if __name__ == '__main__':
    ensure_root()
    main()