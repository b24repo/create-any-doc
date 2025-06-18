interface SmartQuestion {
    id: string;
    text: string;
    category: string;
    followUpLogic?: (answer: string) => string[];
}
export declare class UniversalDocumentService {
    generateSmartQuestions(documentType: string, framework: string, industry: string): Promise<SmartQuestion[]>;
    enhanceWithIndustryContext(content: string, industry: string, framework: string): Promise<string>;
    generateImplementationGuide(framework: string, documentType: string, industry: string): {
        immediateActions: string[];
        thirtyDayGoals: string[];
        ongoingRequirements: string[];
        successMetrics: string[];
    };
    getAvailableFrameworks(): {
        id: string;
        name: string;
        category: string;
    }[];
    getDocumentTypes(): {
        id: string;
        name: string;
    }[];
    private generateContextQuestion;
    private generateRequirementsQuestion;
    private generateGovernanceQuestion;
    private getFrameworkDomain;
    private getIndustryEnhancements;
}
export {};
