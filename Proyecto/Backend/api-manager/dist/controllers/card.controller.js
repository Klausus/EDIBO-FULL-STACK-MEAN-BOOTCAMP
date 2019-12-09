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
let CardController = class CardController {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async create(card) {
        return this.cardRepository.create(card);
    }
    async count(where) {
        return this.cardRepository.count(where);
    }
    async find(filter) {
        return this.cardRepository.find(filter);
    }
    async updateAll(card, where) {
        return this.cardRepository.updateAll(card, where);
    }
    async findById(id) {
        return this.cardRepository.findById(id);
    }
    async updateById(id, card) {
        await this.cardRepository.updateById(id, card);
    }
    async replaceById(id, card) {
        await this.cardRepository.replaceById(id, card);
    }
    async deleteById(id) {
        await this.cardRepository.deleteById(id);
    }
    async findColumnByCardId(boardId) {
        const filter = {};
        filter.where = { boardId: { "like": boardId } };
        filter.limit = 1;
        console.log(filter);
        return this.cardRepository.find(filter);
    }
};
__decorate([
    rest_1.post('/card', {
        responses: {
            '200': {
                description: 'Card model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Card) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Card, {
                    title: 'NewCard',
                    exclude: ['_id'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "create", null);
__decorate([
    rest_1.get('/card/count', {
        responses: {
            '200': {
                description: 'Card model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Card))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "count", null);
__decorate([
    rest_1.get('/card', {
        responses: {
            '200': {
                description: 'Array of Card model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Card) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Card))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "find", null);
__decorate([
    rest_1.patch('/card', {
        responses: {
            '200': {
                description: 'Card PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Card, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Card))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Card, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/card/{id}', {
        responses: {
            '200': {
                description: 'Card model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Card) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "findById", null);
__decorate([
    rest_1.patch('/card/{id}', {
        responses: {
            '204': {
                description: 'Card PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Card, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Card]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "updateById", null);
__decorate([
    rest_1.put('/card/{id}', {
        responses: {
            '204': {
                description: 'Card PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Card]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/card/{id}', {
        responses: {
            '204': {
                description: 'Card DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "deleteById", null);
__decorate([
    rest_1.get('/board/{boardId}/cards', {
        responses: {
            '200': {
                description: 'Column model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Card) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "findColumnByCardId", null);
CardController = __decorate([
    __param(0, repository_1.repository(repositories_1.CardRepository)),
    __metadata("design:paramtypes", [repositories_1.CardRepository])
], CardController);
exports.CardController = CardController;
//# sourceMappingURL=card.controller.js.map