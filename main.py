from subprocess import run
from os import chdir, path
from pathlib import Path

run('python tools/setup.py')

# Change directory to src folder, then run flask app
chdir(path.join(Path(__file__).parent, 'src'))

run('flask run')