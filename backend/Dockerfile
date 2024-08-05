FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Instalar netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

EXPOSE 3000

CMD ["bash", "-c", "until nc -z -v -w30 db 5432; do echo 'Waiting for database connection...'; sleep 5; done && node src/index.js"]
