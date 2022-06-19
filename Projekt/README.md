# tworzenie images

docker build -t projekt-backend backend/
docker build -t projekt-client react/client/

# utworzenie rejestru dla Kubermetesa

docker run -d -p 4000:5000 --restart=always --name projektRejestr registry:2
<!-- docker push projekt-client
docker push projekt-backend -->


# konfiguracja ingressa

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f .\K8S\namespaces\
kubectl apply -f ./K8S --namespace developement
kubectl apply -f ./K8S --namespace production