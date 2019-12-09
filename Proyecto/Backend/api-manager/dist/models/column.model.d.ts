import { Entity } from '@loopback/repository';
export declare class Column extends Entity {
    _id?: string;
    title: string;
    boardId: string;
    order: number;
    constructor(data?: Partial<Column>);
}
export interface ColumnRelations {
}
export declare type ColumnWithRelations = Column & ColumnRelations;
