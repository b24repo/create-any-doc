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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("./document.service");
const document_dto_1 = require("./dto/document.dto");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async generateDocument(createDocumentDto) {
        return this.documentService.generateDocument(createDocumentDto);
    }
    async getQuestions(generateQuestionsDto) {
        return this.documentService.generateQuestions(generateQuestionsDto);
    }
    async validateQuality(validateQualityDto) {
        return this.documentService.validateQuality(validateQualityDto);
    }
    async getAvailableFrameworks() {
        return this.documentService.getAvailableFrameworks();
    }
    async getDocumentTypes() {
        return this.documentService.getDocumentTypes();
    }
    async healthCheck() {
        return { status: 'ok', timestamp: new Date().toISOString() };
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [document_dto_1.CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "generateDocument", null);
__decorate([
    (0, common_1.Get)('questions'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [document_dto_1.GenerateQuestionsDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Post)('validate-quality'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [document_dto_1.ValidateQualityDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "validateQuality", null);
__decorate([
    (0, common_1.Get)('frameworks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getAvailableFrameworks", null);
__decorate([
    (0, common_1.Get)('document-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocumentTypes", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "healthCheck", null);
exports.DocumentController = DocumentController = __decorate([
    (0, common_1.Controller)('api/documents'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map