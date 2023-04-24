FROM node:14.15.4-slim

# usuário do container vem como o root (padrão)
# trás brechas de segurança
# echo $UID mostra o usuário 1000
USER node

# mesmo diretório do volume no compose
WORKDIR /home/node/app

# para o container não morrer
CMD ["tail", "-f", "/dev/null"]