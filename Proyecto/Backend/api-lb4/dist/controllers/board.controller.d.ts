import { Count, Filter, Where } from '@loopback/repository';
import { Board } from '../models';
import { BoardRepository } from '../repositories';
import { ColumnRepository } from '../repositories';
import { CardRepository } from '../repositories';
export declare class BoardController {
    boardRepository: BoardRepository;
    columnRepository: ColumnRepository;
    cardRepository: CardRepository;
    constructor(boardRepository: BoardRepository, columnRepository: ColumnRepository, cardRepository: CardRepository);
    create(board: Omit<Board, '_id'>): Promise<Board>;
    count(where?: Where<Board>): Promise<Count>;
    find(filter?: Filter<Board>): Promise<Board[]>;
    updateAll(board: Board, where?: Where<Board>): Promise<Count>;
    findById(id: string): Promise<Board>;
    updateById(id: string, board: Board): Promise<void>;
    replaceById(id: string, board: Board): Promise<void>;
    deleteById(id: string): Promise<void>;
}
