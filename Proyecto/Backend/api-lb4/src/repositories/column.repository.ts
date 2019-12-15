import { DefaultCrudRepository } from '@loopback/repository';
import { Column, ColumnRelations } from '../models';
import { MongoGtmDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ColumnRepository extends DefaultCrudRepository<
  Column,
  typeof Column.prototype._id,
  ColumnRelations
  > {
  constructor(
    @inject('datasources.mongo_gtm') dataSource: MongoGtmDataSource,
  ) {
    super(Column, dataSource);
  }
}
