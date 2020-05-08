#!/bin/bash
set -euo pipefail

# secrets are encoded in base64
export AWS_CREDENTIALS_BASE64=$(cat ~/.aws/credentials | base64 -w 0)
kubectl apply -f <(envsubst < ./aws-secret.yaml)

source ~/.cloud-developer-env.sh
kubectl apply -f <(envsubst < env-configmap.yaml)

export POSTGRES_USERNAME_BASE64=$(echo -n $POSTGRES_USERNAME | base64 -w0)
export POSTGRES_PASSWORD_BASE64=$(echo -n $POSTGRES_PASSWORD | base64 -w0)
kubectl apply -f <(envsubst < env-secret.yaml)
