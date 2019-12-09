import { DefaultCrudRepository } from '@loopback/repository';
import { Card, CardRelations } from '../models';
import { MongoGtmDataSource } from '../datasources';
export declare class CardRepository extends DefaultCrudRepository<Card, typeof Card.prototype._id, CardRelations> {
    constructor(dataSource: MongoGtmDataSource);
}
