import { Entity, model, property } from '@loopback/repository';
import { Direccion } from './direccion.model';

@model({ settings: {} })
export class Alumno extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,

  })
  dni: string;

  @property({
    type: 'string',
    required: true
  })
  letraDni: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoPaterno: string;

  @property({
    type: 'string',
  })
  apellidoMaterno?: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'object',
    required: true,
  })
  direccion: Direccion;

  @property({
    type: 'array',
    itemType: 'string',
  })
  email?: string[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  telefono?: object[];

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<Alumno>) {
    super(data);
  }
}

export interface AlumnoRelations {
  // describe navigational properties here
}

export type AlumnoWithRelations = Alumno & AlumnoRelations;
