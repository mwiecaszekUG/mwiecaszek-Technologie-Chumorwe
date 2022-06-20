# bardzo prosta baza dla reżyserów i filmów + komponent todos (działający bardziej jako powiadomienia czy chat)
# rezyserzy i filmy przechowywani sa w mongo, a todos w redisie (po 60s automatycznie sie usuwaja)
# ingress wystawia aplikacje na port localhost:80
# użyte zostały 3 repliki na wypadek awarii lub zmiany wersji

# tworzenie images

docker build -t localhost:6000/backend backend/
docker build -t localhost:6000/client react/client/



# konfiguracja ingressa

# jeżeli nie utworzymy lokalnego registry to kubernetes nie będzie wiedział skąd ma brać nasze image i nie będzie działać

docker run -d -p 6000:5000 --restart=always --name registry registry:2
docker push localhost:6000/client
docker push localhost:6000/backend

# pobranie ingressa

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml

# uruchomienie aplikacji

kubectl apply -f .\K8S\namespaces\
kubectl apply -f ./K8S --namespace developement
kubectl apply -f ./K8S --namespace production