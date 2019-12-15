import { Entity } from '@loopback/repository';
export declare class Board extends Entity {
    _id?: string;
    title: string;
    constructor(data?: Partial<Board>);
}
export interface BoardRelations {
}
export declare type BoardWithRelations = Board & BoardRelations;
