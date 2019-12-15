import { DefaultCrudRepository } from '@loopback/repository';
import { Board, BoardRelations } from '../models';
import { MongoGtmDataSource } from '../datasources';
export declare class BoardRepository extends DefaultCrudRepository<Board, typeof Board.prototype._id, BoardRelations> {
    constructor(dataSource: MongoGtmDataSource);
}
