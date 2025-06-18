export interface QualityCheck {
    name: string;
    score: number;
    severity: 'good' | 'warning' | 'critical';
    message: string;
    suggestions: string[];
}
export interface QualityReport {
    overallScore: number;
    checks: QualityCheck[];
    recommendations: string[];
    criticalIssues: QualityCheck[];
}
export declare class ContentQualityService {
    validateContent(content: string, context: any): Promise<QualityReport>;
    improveContent(content: string, qualityReport: QualityReport, context: any): Promise<string>;
    private checkSpecificity;
    private checkImplementability;
    private checkCompleteness;
    private checkStructure;
    private checkFrameworkCompliance;
    private getFrameworkKeywords;
}
