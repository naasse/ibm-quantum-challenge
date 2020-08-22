/******************************************************************************\
 * Name: pokemon.datasource.ts
 *
 * Purpose: Define the connection to the Pokedex database where the
 *          Pokemon collection data source is located.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {inject, lifeCycleObserver, LifeCycleObserver} from "@loopback/core";
import {juggler} from "@loopback/repository";

const config = {
    "name": "pokemon",
    "connector": "mongodb",
    "url": "",
    "host": "localhost",
    "port": 27017,
    "user": "ash",
    "password": "ketchum",
    "database": "pokedex",
    "authSource": "pokedex"
};

// Observe application"s life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class PokemonDataSource extends juggler.DataSource
    implements LifeCycleObserver {
    static dataSourceName: string = "pokemon";
    static readonly defaultConfig: object = config;

    constructor(
        @inject("datasources.config.pokemon", {"optional": true}) dsConfig: object = config
    ) {
        super(dsConfig);
    }
}
