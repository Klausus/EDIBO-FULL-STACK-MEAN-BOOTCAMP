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
const repositories_2 = require("../repositories");
const repositories_3 = require("../repositories");
let BoardController = class BoardController {
    constructor(boardRepository, columnRepository, cardRepository) {
        this.boardRepository = boardRepository;
        this.columnRepository = columnRepository;
        this.cardRepository = cardRepository;
    }
    async create(board) {
        return this.boardRepository.create(board);
    }
    async count(where) {
        return this.boardRepository.count(where);
    }
    async find(filter) {
        console.log(filter);
        return this.boardRepository.find(filter);
    }
    async updateAll(board, where) {
        return this.boardRepository.updateAll(board, where);
    }
    async findById(id) {
        return this.boardRepository.findById(id);
    }
    async updateById(id, board) {
        await this.boardRepository.updateById(id, board);
    }
    async replaceById(id, board) {
        await this.boardRepository.replaceById(id, board);
    }
    async deleteById(id) {
        await this.boardRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/board', {
        responses: {
            '200': {
                description: 'Board model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Board) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Board, {
                    title: 'NewBoard',
                    exclude: ['_id'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "create", null);
__decorate([
    rest_1.get('/board/count', {
        responses: {
            '200': {
                description: 'Board model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Board))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "count", null);
__decorate([
    rest_1.get('/board', {
        responses: {
            '200': {
                description: 'Array of Board model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Board) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Board))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "find", null);
__decorate([
    rest_1.patch('/board', {
        responses: {
            '200': {
                description: 'Board PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Board, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Board))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Board, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/board/{id}', {
        responses: {
            '200': {
                description: 'Board model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Board) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findById", null);
__decorate([
    rest_1.patch('/board/{id}', {
        responses: {
            '204': {
                description: 'Board PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Board, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Board]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateById", null);
__decorate([
    rest_1.put('/board/{id}', {
        responses: {
            '204': {
                description: 'Board PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Board]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/board/{id}', {
        responses: {
            '204': {
                description: 'Board DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "deleteById", null);
BoardController = __decorate([
    __param(0, repository_1.repository(repositories_1.BoardRepository)),
    __param(1, repository_1.repository(repositories_2.ColumnRepository)),
    __param(2, repository_1.repository(repositories_3.CardRepository)),
    __metadata("design:paramtypes", [repositories_1.BoardRepository,
        repositories_2.ColumnRepository,
        repositories_3.CardRepository])
], BoardController);
exports.BoardController = BoardController;
//# sourceMappingURL=board.controller.js.map