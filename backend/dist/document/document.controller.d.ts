import { DocumentService } from './document.service';
import { CreateDocumentDto, GenerateQuestionsDto, ValidateQualityDto } from './dto/document.dto';
import { QualityReport } from '../services/content-quality/content-quality.service';
import { SmartQuestion } from '../services/universal/universal-document.service';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    generateDocument(createDocumentDto: CreateDocumentDto): Promise<any>;
    getQuestions(generateQuestionsDto: GenerateQuestionsDto): Promise<{
        questions: SmartQuestion[];
        totalQuestions: number;
        framework: string;
        documentType: string;
    }>;
    validateQuality(validateQualityDto: ValidateQualityDto): Promise<QualityReport>;
    getAvailableFrameworks(): Promise<{
        id: string;
        name: string;
        category: string;
    }[]>;
    getDocumentTypes(): Promise<{
        id: string;
        name: string;
    }[]>;
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
    }>;
}
