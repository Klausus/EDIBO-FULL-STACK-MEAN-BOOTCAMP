import { DefaultCrudRepository } from '@loopback/repository';
import { Board, BoardRelations } from '../models';
import { MongoGtmDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class BoardRepository extends DefaultCrudRepository<
  Board,
  typeof Board.prototype._id,
  BoardRelations
  > {
  constructor(
    @inject('datasources.mongo_gtm') dataSource: MongoGtmDataSource,
  ) {
    super(Board, dataSource);
  }
}
