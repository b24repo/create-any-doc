import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SmartPromptService } from '../services/smart-prompt/smart-prompt.service';
import { ContentQualityService, QualityReport } from '../services/content-quality/content-quality.service';
import { UniversalDocumentService, SmartQuestion } from '../services/universal/universal-document.service';
import { IndustryEnhancerService } from '../services/industry-enhancer/industry-enhancer.service';
import { CreateDocumentDto, GenerateQuestionsDto, ValidateQualityDto } from './dto/document.dto';
export declare class DocumentService {
    private readonly prisma;
    private readonly config;
    private readonly smartPrompt;
    private readonly contentQuality;
    private readonly universal;
    private readonly industryEnhancer;
    constructor(prisma: PrismaService, config: ConfigService, smartPrompt: SmartPromptService, contentQuality: ContentQualityService, universal: UniversalDocumentService, industryEnhancer: IndustryEnhancerService);
    generateDocument(dto: CreateDocumentDto): Promise<any>;
    generateQuestions(dto: GenerateQuestionsDto): Promise<{
        questions: SmartQuestion[];
        totalQuestions: number;
        framework: string;
        documentType: string;
    }>;
    validateQuality(dto: ValidateQualityDto): Promise<QualityReport>;
    getAvailableFrameworks(): Promise<{
        id: string;
        name: string;
        category: string;
    }[]>;
    getDocumentTypes(): Promise<{
        id: string;
        name: string;
    }[]>;
    private callOpenAI;
    private saveDocument;
}
