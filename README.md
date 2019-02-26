# Puzzle Of My Life Web App

This is the Puzzle Of My Life web application. The web UI for users.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project.

### Tech stack

* Angular 6.1.10
* Salesforce Lightning Design

### Prerequisites

* Angular CLI
* NPM
* A text editor or code editor of your choice. (Built in VS Code)

### Installing

Aftering installing NPM and the Angular CLI, simply run the following to restore the packages

```
npm install
```

And then to run the project

```
ng serve
```

The terminal should display a localhost URL where the app is running. The environment.ts file has a "baseAPIURL" setting which points to the API - you can change this to point to your local machine if need be.

## Deployment

Currently hosted on IBM Cloud. Use the following command to do a production build and deploy to IBM Cloud

```
npm run deploy-staging OR npm run deploy-prod
```

## Authors

* **Dane Williams** - *Initial work* - [IBM](https://www.ibm.com)

