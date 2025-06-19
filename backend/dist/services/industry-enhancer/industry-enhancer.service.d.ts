export interface SpecializedKnowledge {
    framework: string;
    domain: string;
    requirements: string[];
    bestPractices: string[];
    complianceStandards: string[];
    implementationGuidance: string;
    riskConsiderations: string[];
    successMetrics: string[];
}
export declare class IndustryEnhancerService {
    getSpecializedKnowledge(framework: string, industry: string): SpecializedKnowledge | null;
    enhanceDocumentWithSpecializedKnowledge(content: string, framework: string, industry: string): string;
    getFrameworkSpecificQuestions(framework: string): string[];
}
