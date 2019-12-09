import { Entity, model, property } from '@loopback/repository';

@model()
export class Column extends Entity {
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
  boardId: string;

  @property({
    type: 'number',
    required: true,
  })
  order: number;


  constructor(data?: Partial<Column>) {
    super(data);
  }
}

export interface ColumnRelations {
  // describe navigational properties here
}

export type ColumnWithRelations = Column & ColumnRelations;
