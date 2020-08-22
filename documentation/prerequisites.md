# Prerequisites

There is some software I'm going to assume is installed or available before beginning.
If not, follow links to set those up to follow along with my example.

## Docker

For a Windows development environment, the Docker setup is a bit more involved.
Otherwise, use your distributions dependency management tools to get either Docker or Podman.

We could install native, but I prefer to keep these services in Pods like this for my development environments.

* [Docker Desktop](https://www.docker.com/products/docker-desktop)

Verify your install:

```cmd
PS C:\WINDOWS\system32> docker --version
Docker version 19.03.12, build 48a66213fe
```

## Windows Subsystem for Linux (WSL)

This may not be needed, but I do a lot of my scripting in WSL.
You can use whichever environment you want, but WSL is a great alternative for developing on Windows.

[WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10#update-to-wsl-2)

## Mongo DB Client

Use your preferred client, but I'm going to use `mongodb-clients` within my WSL distro for CLI access.

```bash
sudo apt-get install mongodb-clients
```

## NodeJS

We'll need NodeJS for our API implementation.

[NodeJS](https://nodejs.org/en/download/)

Verify your install:

```cmd
PS C:\WINDOWS\system32> node --version
v12.18.3
PS C:\WINDOWS\system32> npm --version
6.14.6
```

## Node Modules

I made use of a few global dependencies to start up new instances of the application.

You only need these if the the intent is to rebuild from scratch.
Otherwise, `npm install` should get the necessary dependencies.

[LoopBack](https://loopback.io/):

```cmd
npm install -g @loopback/cli
```
