from subprocess import run
from utils import ensure_root

def install_pip_packages():
    run('pip install -r requirements.txt')

def install_packages():
    install_pip_packages()

def main():
    install_packages()


if __name__ == '__main__':
    ensure_root()
    main()