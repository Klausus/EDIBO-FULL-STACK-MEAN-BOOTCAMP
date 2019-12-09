import { DefaultCrudRepository } from '@loopback/repository';
import { Card, CardRelations } from '../models';
import { MongoGtmDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype._id,
  CardRelations
  > {
  constructor(
    @inject('datasources.mongo_gtm') dataSource: MongoGtmDataSource,
  ) {
    super(Card, dataSource);
  }
}
