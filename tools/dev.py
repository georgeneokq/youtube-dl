from typing import Iterable, Tuple
from sys import exit
from pathlib import Path
from subprocess import Popen, DEVNULL
from socket import socket, timeout as LegacySocketTimeout
from time import sleep
from config import COMPONENTS, Component
from utils import ensure_root

def start_components(components: Iterable[Component]):
    running = []
    for component in components:
        if component.command is None:
            continue
        process = Popen(
            component.command,
            shell=True,
            cwd=component.working_dir,
            stdin=DEVNULL,
            stdout=None,
            stderr=None,
        )
        running.append((component.name(), process))
    return running


def wait_components(running: Iterable[Tuple[str, Popen]]):
    still_running = True
    while still_running:
        sleep(5)
        for name, process in running:
            poll = process.poll()
            if poll is not None:
                print(f"{name} exited with code {poll}")
                still_running = False


def stop_components(running: Iterable[Tuple[str, Popen]]):
    for name, process in running:
        print(f"Terminating {name}")
        process.terminate()
    for name, process in running:
        print(f"Waiting for {name} to exit")
        process.wait()
    print("All components have exited")


def ensure_dotenv():
    if not Path(".env").is_file():
        print(
            ".env does not exist. You might need to create a .env file by "
            "copying .env.sample to .env"
        )
        exit(1)

if __name__ == "__main__":
    ensure_root()
    ensure_dotenv()

    running = start_components(COMPONENTS)
    try:
        wait_components(running)
    except KeyboardInterrupt:
        print("Received signal to terminate")
        pass
    stop_components(running)


# vim: set et ts=4 sw=4:
