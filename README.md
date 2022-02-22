## General

So far only tested for Windows.

Main language is currently Japanese.

## Development setup

System requirements:
- Python 3.9
- ffmpeg installed and added to path

Run the commands below from the project root.

Create a virtual environment and install dependencies:

```
python tools/setup.py

venv/Scripts/activate

python tools/deps.py
```


Create `.env` file by copying contents over from `.env.sample` file.

```
cp .env.sample .env
```

# Future plans
- Restructure frontend to expand to other languages
- Integrate a frontend framework, most probably React