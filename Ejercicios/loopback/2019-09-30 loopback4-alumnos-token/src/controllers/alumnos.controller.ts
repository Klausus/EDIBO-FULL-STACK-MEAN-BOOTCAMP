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

import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';

import {
  UserProfile,
  securityId,
  SecurityBindings
} from '@loopback/security';

import { inject } from '@loopback/core';

import { Alumno } from '../models';
import { AlumnoRepository } from '../repositories';

export class AlumnosController {
  constructor(
    @repository(AlumnoRepository)
    public alumnoRepository: AlumnoRepository,
  ) { }

  @get('/alumnos/count')
  async count(
    @param.query.object('where', getWhereSchemaFor(Alumno)) where?: Where<Alumno>,
  ): Promise<Count> {
    return this.alumnoRepository.count(where);
  }

  @post('/alumnos/create', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Alumno) } },
      },
    },
  })
  @authenticate('jwt')
  async create(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, {
            title: 'NewAlumno',
            exclude: ['id'],
          }),
        },
      },
    })
    alumno: Omit<Alumno, 'id'>,
  ): Promise<Alumno> {
    return this.alumnoRepository.create(alumno);
  }

  @get('/alumnos/getAll', {
    responses: {
      '200': {
        description: 'Array of Alumno model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Alumno) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Alumno)) filter?: Filter<Alumno>,
  ): Promise<Alumno[]> {
    return this.alumnoRepository.find(filter);
  }

  @patch('/alumnos/updateAll', {
    responses: {
      '200': {
        description: 'Alumno PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, { partial: true }),
        },
      },
    })
    alumno: Alumno,
    @param.query.object('where', getWhereSchemaFor(Alumno)) where?: Where<Alumno>,
  ): Promise<Count> {
    return this.alumnoRepository.updateAll(alumno, where);
  }

  @get('/alumnos/getById/{id}', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Alumno) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Alumno> {
    return this.alumnoRepository.findById(id);
  }

  @patch('/alumnos/updateById/{id}', {
    responses: {
      '204': {
        description: 'Alumno PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, { partial: true }),
        },
      },
    })
    alumno: Alumno,
  ): Promise<void> {
    await this.alumnoRepository.updateById(id, alumno);
  }

  // @put('/alumnos/putById/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Alumno PUT success',
  //     },
  //   },
  // })
  // @authenticate('jwt')
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() alumno: Alumno,
  // ): Promise<void> {
  //   await this.alumnoRepository.replaceById(id, alumno);
  // }

  @del('/alumnos/removeById/{id}', {
    responses: {
      '204': {
        description: 'Alumno DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.alumnoRepository.deleteById(id);
  }
}
