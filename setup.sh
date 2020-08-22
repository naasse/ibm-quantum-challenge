#!/bin/sh

# Start up the Database
cd mongo
docker-compose up -d

# Start the API
cd ../api
npm install
npm start &

# Start the frontend
cd ../frontend
npm install
npm start &

