#!/bin/sh

# Start up the Database
cd mongo
docker-compose up -d

# Build the API
cd ../api
npm install

# Start the frontend
cd ../frontend
npm install

echo "All systems are go."
