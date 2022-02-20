from utils import ensure_root
from subprocess import run

def main():
    run('python main.py')

if __name__ == '__main__':
    ensure_root()
    main()