import { DefaultCrudRepository } from '@loopback/repository';
import { Alumno, AlumnoRelations } from '../models';
import { TodolistDbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class AlumnoRepository extends DefaultCrudRepository<
  Alumno,
  typeof Alumno.prototype.id,
  AlumnoRelations
  > {
  constructor(
    @inject('datasources.todolistDB') dataSource: TodolistDbDataSource,
  ) {
    super(Alumno, dataSource);
  }
}
