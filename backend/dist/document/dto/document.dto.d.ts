export declare enum DocumentType {
    POLICY = "policy",
    PROCEDURE = "procedure",
    FRAMEWORK = "framework",
    PLAN = "plan",
    STANDARD = "standard",
    GUIDE = "guide"
}
export declare enum Industry {
    TECHNOLOGY = "technology",
    HEALTHCARE = "healthcare",
    FINANCE = "finance",
    MANUFACTURING = "manufacturing",
    EDUCATION = "education",
    RETAIL = "retail",
    ENERGY = "energy",
    GOVERNMENT = "government"
}
export declare class CreateDocumentDto {
    documentType: string;
    framework: string;
    industry: string;
    language?: string;
    customRequirements?: string;
    userResponses?: any[];
    complianceLevel?: 'standard' | 'enhanced' | 'audit-ready' | 'regulatory-submission';
}
export declare class GenerateQuestionsDto {
    framework: string;
    documentType: string;
    industry?: string;
}
export declare class ValidateQualityDto {
    content: string;
    context?: any;
}
