import { Entity, model, property } from '@loopback/repository';

@model()
export class Board extends Entity {
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


  constructor(data?: Partial<Board>) {
    super(data);
  }
}

export interface BoardRelations {
  // describe navigational properties here
}

export type BoardWithRelations = Board & BoardRelations;
