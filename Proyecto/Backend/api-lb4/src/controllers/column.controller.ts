import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
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
import { Column } from '../models';
import { ColumnRepository } from '../repositories';

export class ColumnController {
  constructor(
    @repository(ColumnRepository)
    public columnRepository: ColumnRepository,
  ) { }

  @post('/column', {
    responses: {
      '200': {
        description: 'Column model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Column) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Column, {
            title: 'NewColumn',
            exclude: ['_id'],
          }),
        },
      },
    })
    column: Omit<Column, '_id'>,
  ): Promise<Column> {
    return this.columnRepository.create(column);
  }

  @get('/column/count', {
    responses: {
      '200': {
        description: 'Column model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Column)) where?: Where<Column>,
  ): Promise<Count> {
    return this.columnRepository.count(where);
  }

  @get('/column', {
    responses: {
      '200': {
        description: 'Array of Column model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Column) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Column)) filter?: Filter<Column>,
  ): Promise<Column[]> {
    console.log(filter);
    return this.columnRepository.find(filter);
  }

  @patch('/column', {
    responses: {
      '200': {
        description: 'Column PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Column, { partial: true }),
        },
      },
    })
    column: Column,
    @param.query.object('where', getWhereSchemaFor(Column)) where?: Where<Column>,
  ): Promise<Count> {
    return this.columnRepository.updateAll(column, where);
  }

  @get('/column/{id}', {
    responses: {
      '200': {
        description: 'Column model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Column) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Column> {
    return this.columnRepository.findById(id);
  }

  @patch('/column/{id}', {
    responses: {
      '204': {
        description: 'Column PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Column, { partial: true }),
        },
      },
    })
    column: Column,
  ): Promise<void> {
    await this.columnRepository.updateById(id, column);
  }

  @put('/column/{id}', {
    responses: {
      '204': {
        description: 'Column PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() column: Column,
  ): Promise<void> {
    await this.columnRepository.replaceById(id, column);
  }

  @del('/column/{id}', {
    responses: {
      '204': {
        description: 'Column DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.columnRepository.deleteById(id);
  }





  @get('/board/{boardId}/columns', {
    responses: {
      '200': {
        description: 'Column model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Column) } },
      },
    },
  })
  async findColumnByBoardId(
    @param.path.string('boardId') boardId: string
  ): Promise<Column[]> {

    const filter: Filter<Column> = {};
    filter.where = { boardId: { "like": boardId } };
    console.log(filter);

    return this.columnRepository.find(filter);
  }
}
