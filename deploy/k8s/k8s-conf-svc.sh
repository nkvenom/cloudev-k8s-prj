kubectl apply -f backend-feed-deployment.yaml
kubectl apply -f backend-feed-service.yaml
kubectl apply -f backend-user-deployment.yaml
kubectl apply -f backend-user-service.yaml
kubectl apply -f apiproxy-deployment.yaml
kubectl apply -f apiproxy-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml