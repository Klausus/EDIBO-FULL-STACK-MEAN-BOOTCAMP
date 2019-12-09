import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  FilterBuilder,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';

import { Board } from '../models';
import { Column } from '../models';
import { Card } from '../models';

import { BoardRepository } from '../repositories';
import { ColumnRepository } from '../repositories';
import { CardRepository } from '../repositories';

import { ColumnController } from './';

export class BoardController {
  constructor(
    @repository(BoardRepository)
    public boardRepository: BoardRepository,
    @repository(ColumnRepository)
    public columnRepository: ColumnRepository,
    @repository(CardRepository)
    public cardRepository: CardRepository
  ) { }

  @post('/board', {
    responses: {
      '200': {
        description: 'Board model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Board) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Board, {
            title: 'NewBoard',
            exclude: ['_id'],
          }),
        },
      },
    })
    board: Omit<Board, '_id'>,
  ): Promise<Board> {
    return this.boardRepository.create(board);
  }

  @get('/board/count', {
    responses: {
      '200': {
        description: 'Board model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where<Board>,
  ): Promise<Count> {
    return this.boardRepository.count(where);
  }

  @get('/board', {
    responses: {
      '200': {
        description: 'Array of Board model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Board) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Board)) filter?: Filter<Board>,
  ): Promise<Board[]> {
    console.log(filter);
    return this.boardRepository.find(filter);
  }

  @patch('/board', {
    responses: {
      '200': {
        description: 'Board PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Board, { partial: true }),
        },
      },
    })
    board: Board,
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where<Board>,
  ): Promise<Count> {
    return this.boardRepository.updateAll(board, where);
  }

  @get('/board/{id}', {
    responses: {
      '200': {
        description: 'Board model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Board) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Board> {
    return this.boardRepository.findById(id);
  }

  @patch('/board/{id}', {
    responses: {
      '204': {
        description: 'Board PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Board, { partial: true }),
        },
      },
    })
    board: Board,
  ): Promise<void> {
    await this.boardRepository.updateById(id, board);
  }

  @put('/board/{id}', {
    responses: {
      '204': {
        description: 'Board PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() board: Board,
  ): Promise<void> {
    await this.boardRepository.replaceById(id, board);
  }

  @del('/board/{id}', {
    responses: {
      '204': {
        description: 'Board DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.boardRepository.deleteById(id);
  }






  // @get('/board/{id}/column', {
  //   responses: {
  //     '200': {
  //       description: 'Array of Board model instances',
  //       content: {
  //         'application/json': {
  //           schema: { type: 'array', items: getModelSchemaRef(Column) },
  //         },
  //       },
  //     },
  //   },
  // })
  // async findColumnById(@param.path.string('id') id: string, ): Promise<Column[]> {
  //   const filter: Filter<Column> = { where: { boardId: id } };

  //   //filter.limit = 1;
  //   //filter.offset = 0;
  //   //filter.skip = 0;

  //   //filter.order = ["_id ASC"];
  //   //filter.where = { "boardId": id };
  //   /*
  //   filter.fields = {
  //     "_id": true,
  //     "title": true,
  //     "boardId": true,
  //     "order": true
  //   };
  //   */

  //   //console.log(filter);
  //   //filter = new Object({ 'filter': getFilterSchemaFor(Column) });
  //   //filter = new Object({ 'filter': { 'properties': filter } });
  //   console.log(filter);
  //   return new ColumnController(this.columnRepository).find(filter);
  //   //return this.columnRepository.find(filter);
  // }
}
