import { Model, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Direccion extends Model {
  @property({
    type: 'string',
    required: true,
  })
  tipoVia: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreVia: string;

  @property({
    type: 'string',
    default: 's/n',
  })
  numeroVia?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoPostal: string;

  @property({
    type: 'string',
    required: true,
  })
  localidad: string;

  @property({
    type: 'string',
    required: true,
  })
  provincia: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;


  constructor(data?: Partial<Direccion>) {
    super(data);
  }
}

export interface DireccionRelations {
  // describe navigational properties here
}

export type DireccionWithRelations = Direccion & DireccionRelations;
