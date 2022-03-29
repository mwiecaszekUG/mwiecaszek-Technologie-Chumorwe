FROM node:14

WORKDIR /usr/src/react-app

COPY ./ ./

RUN npm install

EXPOSE 3100
#nie działa poprawnie trzeba uruchomić z flagą -p portlokalny:3100
CMD npm start
