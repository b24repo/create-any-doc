import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto, GenerateQuestionsDto, ValidateQualityDto } from './dto/document.dto';

@Controller('api/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('generate')
  async generateDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.generateDocument(createDocumentDto);
  }

  @Get('questions')
  async getQuestions(@Query() generateQuestionsDto: GenerateQuestionsDto) {
    return this.documentService.generateQuestions(generateQuestionsDto);
  }

  @Post('validate-quality')
  async validateQuality(@Body() validateQualityDto: ValidateQualityDto) {
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