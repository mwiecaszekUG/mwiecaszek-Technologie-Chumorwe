FROM node:alpine

WORKDIR /opt/backend

COPY ./package.json ./

RUN npm install

COPY . .

CMD node index.js