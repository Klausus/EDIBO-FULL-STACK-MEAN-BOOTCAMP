// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   post,
//   param,
//   get,
//   getFilterSchemaFor,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   patch,
//   put,
//   del,
//   requestBody,
// } from '@loopback/rest';
// import {Todo} from '../models';
// import {TodoRepository} from '../repositories';

// export class TodoListController {
//   constructor(
//     @repository(TodoRepository)
//     public todoRepository : TodoRepository,
//   ) {}

//   @post('/todo', {
//     responses: {
//       '200': {
//         description: 'Todo model instance',
//         content: {'application/json': {schema: getModelSchemaRef(Todo)}},
//       },
//     },
//   })
//   async create(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Todo, {
//             title: 'NewTodo',
//             exclude: ['id'],
//           }),
//         },
//       },
//     })
//     todo: Omit<Todo, 'id'>,
//   ): Promise<Todo> {
//     return this.todoRepository.create(todo);
//   }

//   @get('/todo/count', {
//     responses: {
//       '200': {
//         description: 'Todo model count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async count(
//     @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
//   ): Promise<Count> {
//     return this.todoRepository.count(where);
//   }

//   @get('/todo', {
//     responses: {
//       '200': {
//         description: 'Array of Todo model instances',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(Todo)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.query.object('filter', getFilterSchemaFor(Todo)) filter?: Filter<Todo>,
//   ): Promise<Todo[]> {
//     return this.todoRepository.find(filter);
//   }

//   @patch('/todo', {
//     responses: {
//       '200': {
//         description: 'Todo PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async updateAll(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Todo, {partial: true}),
//         },
//       },
//     })
//     todo: Todo,
//     @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
//   ): Promise<Count> {
//     return this.todoRepository.updateAll(todo, where);
//   }

//   @get('/todo/{id}', {
//     responses: {
//       '200': {
//         description: 'Todo model instance',
//         content: {'application/json': {schema: getModelSchemaRef(Todo)}},
//       },
//     },
//   })
//   async findById(@param.path.string('id') id: string): Promise<Todo> {
//     return this.todoRepository.findById(id);
//   }

//   @patch('/todo/{id}', {
//     responses: {
//       '204': {
//         description: 'Todo PATCH success',
//       },
//     },
//   })
//   async updateById(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Todo, {partial: true}),
//         },
//       },
//     })
//     todo: Todo,
//   ): Promise<void> {
//     await this.todoRepository.updateById(id, todo);
//   }

//   @put('/todo/{id}', {
//     responses: {
//       '204': {
//         description: 'Todo PUT success',
//       },
//     },
//   })
//   async replaceById(
//     @param.path.string('id') id: string,
//     @requestBody() todo: Todo,
//   ): Promise<void> {
//     await this.todoRepository.replaceById(id, todo);
//   }

//   @del('/todo/{id}', {
//     responses: {
//       '204': {
//         description: 'Todo DELETE success',
//       },
//     },
//   })
//   async deleteById(@param.path.string('id') id: string): Promise<void> {
//     await this.todoRepository.deleteById(id);
//   }
// }
