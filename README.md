# Udagram Microservice Instagram Clone

Udagram allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](/ug-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. 
2. [The RestAPI Feed Backend](/ug-api-feed), a Node-Express feed microservice.
3. [The RestAPI User Backend](/ug-api-user), a Node-Express user microservice.

## URLs
[DockerHub Profile](https://hub.docker.com/u/nlaarm2)

## Screenshots
- 00-dockerhub-profile.png
- 01-gh-travis-integration.png
- 02-travis-ci-success-deployment.png
- 03-get-pods.png
- 04-describe-services.png
- 05-describe-hpa.png
- 06-get-deployments.png
- 07-get-logs.png


## Setup in a Kubernetes Cluster with minikube
### Building and uploading the docker images
```bash
cd deploy/docker 
docker-compose -f docker-compose-build.yaml build --parallel

# upload the images
docker push nlaarm2/ug-api-user
docker push nlaarm2/ug-api-feed
docker push nlaarm2/ug-api-feed
docker push nlaarm2/revproxy
```
### Setup the config maps and secrets
The following env variables should be present in the terminal session
```bash
export POSTGRESS_USERNAME=__INSERT__USERNAME__
export POSTGRESS_PASSWORD=__INSERT__PASSWORD__
export POSTGRESS_DB=__INSERT__DB__
export POSTGRESS_HOST=__INSERT__HOST__
export AWS_REGION=__INSERT_AWS_REGION__
export AWS_PROFILE=__INSERT_AWS_PROFILE__
export AWS_BUCKET=__INSERT_AWS_BUCKET__
export URL=__INSERT_FRONTEND_URL_HERE_FOR_CORS
export JWT_SECRET=__INSERT__ANY_SEED_HERE__
```

Once those variables are defined

```bash
cd ug-deployment/k8s
# Load the secrets and env variables into k8s
# This script expect a .aws folder to exist
./k8s-confmaps.sh

#this script tries to configure all the pods and services
./k8s-conf-svc.sh
```


## Setup for Local Development

> _tip_: this frontend is designed to work with the RestAPI backends). It is recommended you stand up the backend first, test using Postman, and then the frontend should integrate.

### Installing Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

### Installing Ionic Cli
The Ionic Command Line Interface is required to serve and build the frontend. Instructions for installing the CLI can be found in the [Ionic Framework Docs](https://ionicframework.com/docs/installation/cli).

### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
```bash
npm install
```

### Setup Backend Node Environment
You'll need to create a new node server. Open a new terminal within the project directory and run:
1. Initialize a new project: `npm init`
2. Install express: `npm i express --save`
3. Install typescript dependencies: `npm i ts-node-dev tslint typescript  @types/bluebird @types/express @types/node --save-dev`
4. Look at the `package.json` file from the RestAPI repo and copy the `scripts` block into the auto-generated `package.json` in this project. This will allow you to use shorthand commands like `npm run dev`


### Configure The Backend Endpoint
Ionic uses enviornment files located in `./src/enviornments/enviornment.*.ts` to load configuration variables at runtime. By default `environment.ts` is used for development and `enviornment.prod.ts` is used for produciton. The `apiHost` variable should be set to your server url either locally or in the cloud.

***
### Running the Development Server
Ionic CLI provides an easy to use development server to run and autoreload the frontend. This allows you to make quick changes and see them in real time in your browser. To run the development server, open terminal and run:

```bash
ionic serve
```

### Building the Static Frontend Files
Ionic CLI can build the frontend into static HTML/CSS/JavaScript files. These files can be uploaded to a host to be consumed by users on the web. Build artifacts are located in `./www`. To build from source, open terminal and run:
```bash
ionic build
```
***