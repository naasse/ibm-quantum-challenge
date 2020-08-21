import {DefaultCrudRepository} from "@loopback/repository";
import {Pokemon} from "../models";
import {PokemonDataSource} from "../datasources";
import {inject} from "@loopback/core";

export class PokemonRepository extends DefaultCrudRepository<
  Pokemon,
  typeof Pokemon.prototype.id
> {
  constructor(
    @inject("datasources.pokemon") dataSource: PokemonDataSource,
  ) {
    super(Pokemon, dataSource);
  }
}
