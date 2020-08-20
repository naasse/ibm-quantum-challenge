# Setup/Installation

Given ADR-1, our first setup task is to create our database.

We don't have any requirements about high-availability at this time, so let's spin up a small Docker pod with
MongoDB running there.

My development environment is Windows, so I must use either:
 
* Docker Desktop
* Docker Toolbox
* Setup a Virtual Machine

I've used [Docker Desktop](https://www.docker.com/products/docker-desktop) before, and found it suitable, so will stick with that here.

If we were going to make this into a production application, 
we'd want a Linux host to either perform a native install of the Mongo server, or host pod(s) for us.

See [this link](https://docs.microsoft.com/en-us/windows/wsl/install-win10#update-to-wsl-2) for more information if you need to do the same.

We're going to use the latest Mongo image from [Docker Hub](https://hub.docker.com/_/mongo).
I've created the configuration file to do it for me with Docker-Compose.
With this, we can also initialize our database on start.

In WSL, PowerShell, or wherever you've configured Docker, 
change directory to the [Mongo](https://github.com/naasse/ibm-quantum-challenge/tree/master/mongo) 
subdirectory and start the database with: 

```bash
docker-compose up -d
```

Let's install our dependencies for connecting to the server:

```bash
sudo apt-get install mongodb-clients
```

After that, let's verify our collection has been created. 

```bash
naasse@NASA:~$ mongo -u ash -p ketchum --authenticationDatabase pokedex
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.4.0
WARNING: shell and server versions do not match
> use pokedex
switched to db pokedex
> show collections
pokemon
```
