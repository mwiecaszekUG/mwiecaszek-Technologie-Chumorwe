FROM node:14
#wybieramy obraz, którego będziemy używać w tym przypadku node w wersji 14
WORKDIR /usr/src/my_node_app 
#ustawawiamy katalog, w którym będziemy pracować (komendy będą wykonywane z jego wnętrza)
COPY ./package.json ./
#kopiujemy plik package.json
RUN npm install
#instalujemy zależności zawarte w package.json (pobrane zostanie node_modules)
COPY ./server.js ./
#kopiujemy plik z serwerem
EXPOSE 8080
#w teorii powinno zastąpić ręczne ustawienie portu przez flagę -p ale nie chce działać poprawnie
CMD [ "node", "server.js" ]
#uruchamiamy serwer