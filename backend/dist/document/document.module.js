"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModule = void 0;
const common_1 = require("@nestjs/common");
const document_controller_1 = require("./document.controller");
const document_service_1 = require("./document.service");
const smart_prompt_service_1 = require("../services/smart-prompt/smart-prompt.service");
const content_quality_service_1 = require("../services/content-quality/content-quality.service");
const universal_document_service_1 = require("../services/universal/universal-document.service");
const industry_enhancer_service_1 = require("../services/industry-enhancer/industry-enhancer.service");
let DocumentModule = class DocumentModule {
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        controllers: [document_controller_1.DocumentController],
        providers: [
            document_service_1.DocumentService,
            smart_prompt_service_1.SmartPromptService,
            content_quality_service_1.ContentQualityService,
            universal_document_service_1.UniversalDocumentService,
            industry_enhancer_service_1.IndustryEnhancerService,
        ],
    })
], DocumentModule);
//# sourceMappingURL=document.module.js.map