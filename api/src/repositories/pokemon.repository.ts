import {DefaultCrudRepository} from '@loopback/repository';
import {Pokemon, PokemonRelations} from '../models';
import {PokemonDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PokemonRepository extends DefaultCrudRepository<
  Pokemon,
  typeof Pokemon.prototype.id,
  PokemonRelations
> {
  constructor(
    @inject('datasources.pokemon') dataSource: PokemonDataSource,
  ) {
    super(Pokemon, dataSource);
  }
}
