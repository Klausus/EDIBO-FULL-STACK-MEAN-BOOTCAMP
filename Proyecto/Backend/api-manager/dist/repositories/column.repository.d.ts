import { DefaultCrudRepository } from '@loopback/repository';
import { Column, ColumnRelations } from '../models';
import { MongoGtmDataSource } from '../datasources';
export declare class ColumnRepository extends DefaultCrudRepository<Column, typeof Column.prototype._id, ColumnRelations> {
    constructor(dataSource: MongoGtmDataSource);
}
