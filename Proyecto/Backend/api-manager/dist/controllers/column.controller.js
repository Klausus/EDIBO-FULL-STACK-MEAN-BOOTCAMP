"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ColumnController = class ColumnController {
    constructor(columnRepository) {
        this.columnRepository = columnRepository;
    }
    async create(column) {
        return this.columnRepository.create(column);
    }
    async count(where) {
        return this.columnRepository.count(where);
    }
    async find(filter) {
        console.log(filter);
        return this.columnRepository.find(filter);
    }
    async updateAll(column, where) {
        return this.columnRepository.updateAll(column, where);
    }
    async findById(id) {
        return this.columnRepository.findById(id);
    }
    async updateById(id, column) {
        await this.columnRepository.updateById(id, column);
    }
    async replaceById(id, column) {
        await this.columnRepository.replaceById(id, column);
    }
    async deleteById(id) {
        await this.columnRepository.deleteById(id);
    }
    async findColumnByBoardId(boardId) {
        const filter = {};
        filter.where = { boardId: { "like": boardId } };
        filter.limit = 1;
        console.log(filter);
        return this.columnRepository.find(filter);
    }
};
__decorate([
    rest_1.post('/column', {
        responses: {
            '200': {
                description: 'Column model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Column) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Column, {
                    title: 'NewColumn',
                    exclude: ['_id'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "create", null);
__decorate([
    rest_1.get('/column/count', {
        responses: {
            '200': {
                description: 'Column model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Column))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "count", null);
__decorate([
    rest_1.get('/column', {
        responses: {
            '200': {
                description: 'Array of Column model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Column) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Column))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "find", null);
__decorate([
    rest_1.patch('/column', {
        responses: {
            '200': {
                description: 'Column PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Column, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Column))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Column, Object]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/column/{id}', {
        responses: {
            '200': {
                description: 'Column model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Column) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "findById", null);
__decorate([
    rest_1.patch('/column/{id}', {
        responses: {
            '204': {
                description: 'Column PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Column, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Column]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "updateById", null);
__decorate([
    rest_1.put('/column/{id}', {
        responses: {
            '204': {
                description: 'Column PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Column]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/column/{id}', {
        responses: {
            '204': {
                description: 'Column DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "deleteById", null);
__decorate([
    rest_1.get('/board/{boardId}/columns', {
        responses: {
            '200': {
                description: 'Column model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Column) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColumnController.prototype, "findColumnByBoardId", null);
ColumnController = __decorate([
    __param(0, repository_1.repository(repositories_1.ColumnRepository)),
    __metadata("design:paramtypes", [repositories_1.ColumnRepository])
], ColumnController);
exports.ColumnController = ColumnController;
//# sourceMappingURL=column.controller.js.map