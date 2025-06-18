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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateQualityDto = exports.GenerateQuestionsDto = exports.CreateDocumentDto = exports.Industry = exports.DocumentType = void 0;
const class_validator_1 = require("class-validator");
var DocumentType;
(function (DocumentType) {
    DocumentType["POLICY"] = "policy";
    DocumentType["PROCEDURE"] = "procedure";
    DocumentType["FRAMEWORK"] = "framework";
    DocumentType["PLAN"] = "plan";
    DocumentType["STANDARD"] = "standard";
    DocumentType["GUIDE"] = "guide";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var Industry;
(function (Industry) {
    Industry["TECHNOLOGY"] = "technology";
    Industry["HEALTHCARE"] = "healthcare";
    Industry["FINANCE"] = "finance";
    Industry["MANUFACTURING"] = "manufacturing";
    Industry["EDUCATION"] = "education";
    Industry["RETAIL"] = "retail";
    Industry["ENERGY"] = "energy";
    Industry["GOVERNMENT"] = "government";
})(Industry || (exports.Industry = Industry = {}));
class CreateDocumentDto {
    constructor() {
        this.language = 'English';
        this.complianceLevel = 'standard';
    }
}
exports.CreateDocumentDto = CreateDocumentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "framework", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "industry", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "customRequirements", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateDocumentDto.prototype, "userResponses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "complianceLevel", void 0);
class GenerateQuestionsDto {
    constructor() {
        this.industry = 'technology';
    }
}
exports.GenerateQuestionsDto = GenerateQuestionsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateQuestionsDto.prototype, "framework", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateQuestionsDto.prototype, "documentType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateQuestionsDto.prototype, "industry", void 0);
class ValidateQualityDto {
}
exports.ValidateQualityDto = ValidateQualityDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidateQualityDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ValidateQualityDto.prototype, "context", void 0);
//# sourceMappingURL=document.dto.js.map