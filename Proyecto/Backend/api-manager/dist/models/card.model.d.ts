import { Entity } from '@loopback/repository';
export declare class Card extends Entity {
    _id?: string;
    title: string;
    columnId: string;
    boardId: string;
    order: number;
    constructor(data?: Partial<Card>);
}
export interface CardRelations {
}
export declare type CardWithRelations = Card & CardRelations;
