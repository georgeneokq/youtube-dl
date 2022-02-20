from os import chdir
from pathlib import Path

def ensure_root():
    chdir(Path(__file__).parent.parent)