"""
Check if venv folder is created
"""

from tempfile import gettempdir
from os.path import exists
from os import getenv, path
from pathlib import Path
from subprocess import run
from utils import ensure_root
from dotenv import load_dotenv

load_dotenv()

# Folder to place files download from youtube
storage_dir = getenv('STORAGE_DIR') or path.join(gettempdir(), 'kanade')
log_folder = getenv('LOG_DIR') or 'logs'

def create_directories():
    # Create directories to hold created files
    Path(f'{storage_dir}/audio').mkdir(exist_ok=True, parents=True)
    Path(f'{storage_dir}/video').mkdir(exist_ok=True, parents=True)
    Path(f'{log_folder}').mkdir(exist_ok=True, parents=True)


def ensure_virtualenv():
    # Ensure virtual env
    if not exists('venv'):
        print('Creating virtual environment.')
        Path('venv').mkdir()
        run('python -m venv venv')


def main():
    create_directories()
    ensure_virtualenv()


if __name__ == '__main__':
    ensure_root()
    main()