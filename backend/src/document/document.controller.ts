import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto, GenerateQuestionsDto, ValidateQualityDto } from './dto/document.dto';
import { QualityReport } from '../services/content-quality/content-quality.service';
import { SmartQuestion } from '../services/universal/universal-document.service';

@Controller('api/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('generate')
  async generateDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.generateDocument(createDocumentDto);
  }

  @Get('questions')
  async getQuestions(@Query() generateQuestionsDto: GenerateQuestionsDto): Promise<{ questions: SmartQuestion[]; totalQuestions: number; framework: string; documentType: string }> {
    return this.documentService.generateQuestions(generateQuestionsDto);
  }

  @Post('validate-quality')
  async validateQuality(@Body() validateQualityDto: ValidateQualityDto): Promise<QualityReport> {
    return this.documentService.validateQuality(validateQualityDto);
  }

  @Get('frameworks')
  async getAvailableFrameworks() {
    return this.documentService.getAvailableFrameworks();
  }

  @Get('document-types')
  async getDocumentTypes() {
    return this.documentService.getDocumentTypes();
  }

  @Get('health')
  async healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
} 