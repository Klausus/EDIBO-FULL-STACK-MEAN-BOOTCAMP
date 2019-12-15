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
import { Card } from '../models';
import { CardRepository } from '../repositories';

export class CardController {
  constructor(
    @repository(CardRepository)
    public cardRepository: CardRepository,
  ) { }

  @post('/card', {
    responses: {
      '200': {
        description: 'Card model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Card) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Card, {
            title: 'NewCard',
            exclude: ['_id'],
          }),
        },
      },
    })
    card: Omit<Card, '_id'>,
  ): Promise<Card> {
    return this.cardRepository.create(card);
  }

  @get('/card/count', {
    responses: {
      '200': {
        description: 'Card model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Card)) where?: Where<Card>,
  ): Promise<Count> {
    return this.cardRepository.count(where);
  }

  @get('/card', {
    responses: {
      '200': {
        description: 'Array of Card model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Card) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Card)) filter?: Filter<Card>,
  ): Promise<Card[]> {
    return this.cardRepository.find(filter);
  }

  @patch('/card', {
    responses: {
      '200': {
        description: 'Card PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Card, { partial: true }),
        },
      },
    })
    card: Card,
    @param.query.object('where', getWhereSchemaFor(Card)) where?: Where<Card>,
  ): Promise<Count> {
    return this.cardRepository.updateAll(card, where);
  }

  @get('/card/{id}', {
    responses: {
      '200': {
        description: 'Card model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Card) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Card> {
    return this.cardRepository.findById(id);
  }

  @patch('/card/{id}', {
    responses: {
      '204': {
        description: 'Card PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Card, { partial: true }),
        },
      },
    })
    card: Card,
  ): Promise<void> {
    await this.cardRepository.updateById(id, card);
  }

  @put('/card/{id}', {
    responses: {
      '204': {
        description: 'Card PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() card: Card,
  ): Promise<void> {
    await this.cardRepository.replaceById(id, card);
  }

  @del('/card/{id}', {
    responses: {
      '204': {
        description: 'Card DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cardRepository.deleteById(id);
  }





  @get('/board/{boardId}/cards', {
    responses: {
      '200': {
        description: 'Column model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Card) } },
      },
    },
  })
  async findColumnByCardId(
    @param.path.string('boardId') boardId: string
  ): Promise<Card[]> {

    const filter: Filter<Card> = {};
    filter.where = { boardId: { "like": boardId } };
    console.log(filter);

    return this.cardRepository.find(filter);
  }
}
