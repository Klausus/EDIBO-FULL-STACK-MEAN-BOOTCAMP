import { Entity, model, property } from '@loopback/repository';

@model()
export class Card extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  columnId: string;

  @property({
    type: 'string',
    required: true,
  })
  boardId: string;

  @property({
    type: 'number',
    required: true,
  })
  order: number;


  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;
