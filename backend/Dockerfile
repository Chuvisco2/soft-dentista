# Exemplo de Dockerfile
FROM node:20

# Instala dependências nativas necessárias
RUN apt-get update && apt-get install -y python-is-python3 make g++

# Configurações do ambiente
ENV NODE_ENV=production

# Cria e define o diretório de trabalho da aplicação
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia os arquivos da aplicação
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]
