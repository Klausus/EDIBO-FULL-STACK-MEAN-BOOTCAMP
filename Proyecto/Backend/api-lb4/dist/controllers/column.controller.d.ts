import { Count, Filter, Where } from '@loopback/repository';
import { Column } from '../models';
import { ColumnRepository } from '../repositories';
export declare class ColumnController {
    columnRepository: ColumnRepository;
    constructor(columnRepository: ColumnRepository);
    create(column: Omit<Column, '_id'>): Promise<Column>;
    count(where?: Where<Column>): Promise<Count>;
    find(filter?: Filter<Column>): Promise<Column[]>;
    updateAll(column: Column, where?: Where<Column>): Promise<Count>;
    findById(id: string): Promise<Column>;
    updateById(id: string, column: Column): Promise<void>;
    replaceById(id: string, column: Column): Promise<void>;
    deleteById(id: string): Promise<void>;
    findColumnByBoardId(boardId: string): Promise<Column[]>;
}
