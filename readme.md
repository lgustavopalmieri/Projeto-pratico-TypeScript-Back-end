### UML

plugin vscode => plant uml

sudo dnf install default-jre --fix-missing
sudo dnf install graphviz

Para ver o preview -> Show Opened Editors

### Ambiente produtivo

https://github.com/argentinaluiz/ambiente-dev-produtivo

zsh -> dnf install zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

code ~/.zshrc

### useful
docker-compose exec app bash

### iniciando app
- a partir de agora rodar comandos sempre dentro do container

npm init -y

npm install typescript @types/node --save-dev

npm install ts-node --save-dev

npm run ts-node

## configurando typescript

npx tsc --init