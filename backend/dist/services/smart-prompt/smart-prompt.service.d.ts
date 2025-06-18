export declare class SmartPromptService {
    generateEnhancedPrompt(documentType: string, framework: string, industry: string, userResponses?: any[], customRequirements?: string): Promise<string>;
    private extractUserContext;
    private formatUserContext;
    private getJurisdiction;
}
