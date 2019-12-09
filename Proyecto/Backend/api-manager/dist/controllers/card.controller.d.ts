import { Count, Filter, Where } from '@loopback/repository';
import { Card } from '../models';
import { CardRepository } from '../repositories';
export declare class CardController {
    cardRepository: CardRepository;
    constructor(cardRepository: CardRepository);
    create(card: Omit<Card, '_id'>): Promise<Card>;
    count(where?: Where<Card>): Promise<Count>;
    find(filter?: Filter<Card>): Promise<Card[]>;
    updateAll(card: Card, where?: Where<Card>): Promise<Count>;
    findById(id: string): Promise<Card>;
    updateById(id: string, card: Card): Promise<void>;
    replaceById(id: string, card: Card): Promise<void>;
    deleteById(id: string): Promise<void>;
    findColumnByCardId(boardId: string): Promise<Card[]>;
}
