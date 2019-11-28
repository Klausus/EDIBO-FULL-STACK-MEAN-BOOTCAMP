import {DefaultCrudRepository} from '@loopback/repository';
import {Todolist, TodolistRelations} from '../models';
import {TodolistDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodolistRepository extends DefaultCrudRepository<
  Todolist,
  typeof Todolist.prototype.id,
  TodolistRelations
> {
  constructor(
    @inject('datasources.todolist') dataSource: TodolistDataSource,
  ) {
    super(Todolist, dataSource);
  }
}
