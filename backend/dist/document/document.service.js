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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const smart_prompt_service_1 = require("../services/smart-prompt/smart-prompt.service");
const content_quality_service_1 = require("../services/content-quality/content-quality.service");
const universal_document_service_1 = require("../services/universal/universal-document.service");
const industry_enhancer_service_1 = require("../services/industry-enhancer/industry-enhancer.service");
let DocumentService = class DocumentService {
    constructor(prisma, config, smartPrompt, contentQuality, universal, industryEnhancer) {
        this.prisma = prisma;
        this.config = config;
        this.smartPrompt = smartPrompt;
        this.contentQuality = contentQuality;
        this.universal = universal;
        this.industryEnhancer = industryEnhancer;
    }
    async generateDocument(dto) {
        try {
            let questions = [];
            if (!dto.userResponses || dto.userResponses.length === 0) {
                questions = await this.universal.generateSmartQuestions(dto.documentType, dto.framework, dto.industry);
                return {
                    type: 'questions',
                    questions: questions.slice(0, 1),
                    totalQuestions: questions.length,
                };
            }
            const prompt = await this.smartPrompt.generateEnhancedPrompt(dto.documentType, dto.framework, dto.industry, dto.userResponses, dto.customRequirements);
            const content = await this.callOpenAI(prompt);
            const qualityReport = await this.contentQuality.validateContent(content, {
                framework: dto.framework,
                industry: dto.industry,
                documentType: dto.documentType,
                userContext: dto.userResponses
            });
            let finalContent = content;
            if (qualityReport.overallScore < 70) {
                finalContent = await this.contentQuality.improveContent(content, qualityReport, dto);
            }
            finalContent = await this.universal.enhanceWithIndustryContext(finalContent, dto.industry, dto.framework);
            finalContent = this.industryEnhancer.enhanceDocumentWithSpecializedKnowledge(finalContent, dto.framework, dto.industry);
            const implementationGuide = this.universal.generateImplementationGuide(dto.framework, dto.documentType, dto.industry);
            const savedDocument = await this.saveDocument({
                title: `${dto.documentType} - ${dto.framework}`,
                content: finalContent,
                framework: dto.framework,
                industry: dto.industry,
                documentType: dto.documentType,
                qualityScore: qualityReport.overallScore,
                wordCount: finalContent.split(' ').length,
            });
            return {
                type: 'document',
                id: savedDocument.id,
                content: finalContent,
                qualityScore: qualityReport.overallScore,
                qualityReport,
                implementationGuide,
                wordCount: finalContent.split(' ').length,
                estimatedReadTime: Math.ceil(finalContent.split(' ').length / 200),
            };
        }
        catch (error) {
            console.error('Error generating document:', error);
            throw new Error(`Failed to generate document: ${error.message}`);
        }
    }
    async generateQuestions(dto) {
        const questions = await this.universal.generateSmartQuestions(dto.documentType, dto.framework, dto.industry);
        return {
            questions,
            totalQuestions: questions.length,
            framework: dto.framework,
            documentType: dto.documentType,
        };
    }
    async validateQuality(dto) {
        return this.contentQuality.validateContent(dto.content, dto.context);
    }
    async getAvailableFrameworks() {
        return this.universal.getAvailableFrameworks();
    }
    async getDocumentTypes() {
        return this.universal.getDocumentTypes();
    }
    async callOpenAI(prompt) {
        const OpenAI = require('openai').default;
        const openai = new OpenAI({
            apiKey: this.config.get('app.openai.apiKey'),
        });
        const response = await openai.chat.completions.create({
            model: this.config.get('app.openai.defaultModel'),
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert document generation assistant that creates professional, implementation-ready documents.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 4000,
            temperature: 0.3,
        });
        return response.choices[0]?.message?.content || '';
    }
    async saveDocument(data) {
        try {
            let userId = data.userId;
            if (!userId) {
                const defaultUser = await this.prisma.user.upsert({
                    where: { email: 'default@example.com' },
                    update: {},
                    create: {
                        email: 'default@example.com',
                        name: 'Default User'
                    }
                });
                userId = defaultUser.id;
            }
            return this.prisma.aIDocument.create({
                data: {
                    ...data,
                    userId: userId
                },
            });
        }
        catch (error) {
            console.error('Error saving document:', error);
            const fallbackUserId = data.userId || 1;
            return {
                id: Date.now(),
                ...data,
                userId: fallbackUserId
            };
        }
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        smart_prompt_service_1.SmartPromptService,
        content_quality_service_1.ContentQualityService,
        universal_document_service_1.UniversalDocumentService,
        industry_enhancer_service_1.IndustryEnhancerService])
], DocumentService);
//# sourceMappingURL=document.service.js.map