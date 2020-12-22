# Finance-Manager

![](https://github.com/benfl3713/Finance-Manager/workflows/Pipeline/badge.svg?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6851da60-c445-4cc1-beb3-7f0ff4d69943/deploy-status)](https://app.netlify.com/sites/demo-finance-manager-benfl3713/deploys)

Personal Finance Manager Web App

![](https://github.com/benfl3713/Finance-Manager/blob/master/src/src/assets/preview.png?raw=true)

# Purpose

This is a webapp that allows multiple users to add accounts and transactions etc and manage there finances.

# Use

- This webapp integrates with the https://github.com/benfl3713/finance-api to manage all data.
- It is required that both this and the finance-api are running and connected together in order to load any data. To do so add the api url to the config.json file in the assets folder. (You will need to create it for the first time, there is a demo one in the same folder)
- You can easily run this in docker using the image: benfl3713/finance-manager and also run the api image which is detailed in the api repo

# Technology

- angular front end with a angular material theme

# Demo

To view the demo site just visit https://demo-finance-manager-benfl3713.netlify.app

# Need Help?

- If you have any questions feel free to raise an issue or email me at **benfl3713@gmail.com**
- I can also give you a demo of a demo site I have running if you're intrested

# Docker

If you want to run the finance manager and finance api and database all together then you can use the following docker-compose configuration.
(This assumes you are running on windows. Just modify the volume mappings if you're using linux or mac os to a different host directory)

```yaml
version: "3"

services:
  finance-manager:
    image: benfl3713/finance-manager:latest
    depends_on:
      - finance-api
    ports:
      - "5005:80"
    environment:
      FinanceApiUrl: "http://localhost:5001/api"
  finance-api:
    image: benfl3713/finance-api:latest
    depends_on:
      - mongo-db
    ports:
      - "5001:80"
    volumes:
      - c:/finance-api:/app/config
    environment:
      MongoDB_ConnectionString: "mongodb://mongo-db"
  mongo-db:
    image: mongo
    ports:
      - "27017-27019:27017-27019"
    volumes:
      - c:/mongodb/finance:/data/db
```
