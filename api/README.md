# api

This API provides a way to surface and work with data from the co-located MongoDB.

## Building

Building with npm and starting up the api service should work.
To allow for component scaffolding of any new controls, you may want to install the loopback CLI:

```bash
npm i -g @loopback/cli
```

To build and run, from within the [api](https://github.com/naasse/ibm-quantum-challenge/tree/master/api) directory, run the following:

```bash
npm install
npm start
```

The home page will be visible at [http://localhost:3210/](http://localhost:3210/).
Adjust the port and host information as needed for your environment.

You may now visit any of the endpoints to begin consuming the API.

```
GET     http://127.0.0.1:3210/pokemon/
GET     http://127.0.0.1:3210/pokemon/count
GET     http://127.0.0.1:3210/pokemon/{id}
DELETE  http://127.0.0.1:3210/pokemon/{id}
PUT     http://127.0.0.1:3210/pokemon/{id}/favorite
```

## Postman

You may want to take advantage of the ready-made Postman dump.

The [Postman](https://www.postman.com/) environment and collection is exported
[here](https://github.com/naasse/ibm-quantum-challenge/blob/master/api/pokedex.postman.json.md) -
import this to start working with the API via the wonderful Postman UI.

##

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
