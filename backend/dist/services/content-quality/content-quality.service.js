"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentQualityService = void 0;
const common_1 = require("@nestjs/common");
let ContentQualityService = class ContentQualityService {
    async validateContent(content, context) {
        const checks = await Promise.all([
            this.checkSpecificity(content, context),
            this.checkImplementability(content),
            this.checkCompleteness(content),
            this.checkStructure(content),
            this.checkFrameworkCompliance(content, context),
        ]);
        const overallScore = checks.reduce((sum, check) => sum + check.score, 0) / checks.length;
        return {
            overallScore: Math.round(overallScore),
            checks,
            recommendations: checks.flatMap(check => check.suggestions),
            criticalIssues: checks.filter(check => check.severity === 'critical'),
        };
    }
    async improveContent(content, qualityReport, context) {
        return `${content}\n\n<!-- Content improved based on quality recommendations -->`;
    }
    async checkSpecificity(content, context) {
        const genericTerms = ['your company', 'the organization', 'the business'];
        const genericCount = genericTerms.reduce((count, term) => {
            return count + (content.toLowerCase().match(new RegExp(term, 'g')) || []).length;
        }, 0);
        const totalWords = content.split(' ').length;
        const specificityScore = Math.max(0, 100 - (genericCount / totalWords) * 1000);
        return {
            name: 'Specificity',
            score: specificityScore,
            severity: specificityScore < 60 ? 'critical' : specificityScore < 80 ? 'warning' : 'good',
            message: `Content is ${Math.round(specificityScore)}% specific`,
            suggestions: specificityScore < 80 ? [
                'Replace generic terms with company-specific details',
                'Add specific examples and use cases',
                'Include actual names and contact information'
            ] : []
        };
    }
    async checkImplementability(content) {
        const actionWords = ['must', 'shall', 'will', 'implement', 'establish', 'maintain'];
        const actionCount = actionWords.reduce((count, word) => {
            return count + (content.toLowerCase().match(new RegExp(word, 'g')) || []).length;
        }, 0);
        const sentences = content.split('.').length;
        const implementabilityScore = Math.min(100, (actionCount / sentences) * 200);
        return {
            name: 'Implementability',
            score: implementabilityScore,
            severity: implementabilityScore < 50 ? 'warning' : 'good',
            message: `${actionCount} actionable items found`,
            suggestions: implementabilityScore < 70 ? [
                'Add more specific action items',
                'Include clear timelines and deadlines',
                'Specify responsible parties for each requirement'
            ] : []
        };
    }
    async checkCompleteness(content) {
        const requiredSections = [
            'purpose', 'scope', 'responsibilities', 'procedures',
            'timeline', 'review', 'compliance'
        ];
        const foundSections = requiredSections.filter(section => content.toLowerCase().includes(section));
        const completeness = (foundSections.length / requiredSections.length) * 100;
        return {
            name: 'Completeness',
            score: completeness,
            severity: completeness < 70 ? 'critical' : completeness < 90 ? 'warning' : 'good',
            message: `${foundSections.length}/${requiredSections.length} required sections`,
            suggestions: completeness < 100 ? [
                `Add missing sections: ${requiredSections.filter(s => !foundSections.includes(s)).join(', ')}`
            ] : []
        };
    }
    async checkStructure(content) {
        const hasHeaders = /^#+\s+/m.test(content);
        const hasTables = /\|.*\|/.test(content);
        const hasLists = /^[\*\-\+]\s+/m.test(content);
        const hasMetadata = /Document (Title|Owner|Version)/i.test(content);
        const structureElements = [hasHeaders, hasTables, hasLists, hasMetadata];
        const structureScore = (structureElements.filter(Boolean).length / structureElements.length) * 100;
        return {
            name: 'Structure',
            score: structureScore,
            severity: structureScore < 50 ? 'warning' : 'good',
            message: `${structureElements.filter(Boolean).length}/4 structural elements`,
            suggestions: structureScore < 100 ? [
                !hasHeaders ? 'Add clear section headers' : '',
                !hasTables ? 'Include tables for complex information' : '',
                !hasLists ? 'Use bullet points for procedures' : '',
                !hasMetadata ? 'Add document metadata table' : ''
            ].filter(Boolean) : []
        };
    }
    async checkFrameworkCompliance(content, context) {
        const framework = context?.framework || '';
        const frameworkKeywords = this.getFrameworkKeywords(framework);
        const foundKeywords = frameworkKeywords.filter(keyword => content.toLowerCase().includes(keyword.toLowerCase()));
        const complianceScore = frameworkKeywords.length > 0
            ? (foundKeywords.length / frameworkKeywords.length) * 100
            : 80;
        return {
            name: 'Framework Compliance',
            score: complianceScore,
            severity: complianceScore < 60 ? 'critical' : complianceScore < 80 ? 'warning' : 'good',
            message: `${foundKeywords.length}/${frameworkKeywords.length} framework elements`,
            suggestions: complianceScore < 80 ? [
                'Add framework-specific terminology and requirements',
                'Include relevant compliance citations',
                'Reference framework standards and guidelines'
            ] : []
        };
    }
    getFrameworkKeywords(framework) {
        const frameworkKeywords = {
            'GDPR': ['consent', 'lawful basis', 'data protection officer', 'breach notification'],
            'HIPAA': ['covered entity', 'business associate', 'PHI', 'privacy rule'],
            'ISO 27001': ['ISMS', 'risk assessment', 'controls', 'management review'],
            'SOX': ['internal controls', 'financial reporting', 'audit', 'compliance'],
        };
        return frameworkKeywords[framework] || ['compliance', 'requirements', 'standards'];
    }
};
exports.ContentQualityService = ContentQualityService;
exports.ContentQualityService = ContentQualityService = __decorate([
    (0, common_1.Injectable)()
], ContentQualityService);
//# sourceMappingURL=content-quality.service.js.map