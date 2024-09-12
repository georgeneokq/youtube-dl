## General
So far only tested for Windows.

Main language is currently Japanese.

## Development setup
System requirements:
- Python 3.9
- npm package manager
- ffmpeg installed and added to path

Run the commands below from the project root.

### Configuration
Create `.env` file by copying contents over from `.env.sample` file.

```
cp .env.sample .env
```

### Install dependencies

This project uses npm workspaces.

To install an npm dependency, use the following syntax:

`npm i --workspace <WORKSPACE> <PACKAGE> --save`

#### Windows
```
python tools/setup.py

venv/Scripts/activate

pip install -r requirements.txt
```

#### Ubuntu
```
sudo apt install nodejs

sudo apt install npm

sudo npm install pm2 -g

sudo apt install python3.9

sudo apt install python3.9-venv

python tools/setup.py

source venv/bin/activate

pip install -r requirements.txt
```

## Run the application

### Development (Windows)
```
npm run dev
```

### Deployment (Ubuntu)
```
npm run deploy
```

#### Kill deployment process
```
npm run kill
```