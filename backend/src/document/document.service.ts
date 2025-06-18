import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SmartPromptService } from '../services/smart-prompt/smart-prompt.service';
import { ContentQualityService, QualityReport } from '../services/content-quality/content-quality.service';
import { UniversalDocumentService, SmartQuestion } from '../services/universal/universal-document.service';
import { CreateDocumentDto, GenerateQuestionsDto, ValidateQualityDto } from './dto/document.dto';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly smartPrompt: SmartPromptService,
    private readonly contentQuality: ContentQualityService,
    private readonly universal: UniversalDocumentService,
  ) {}

  async generateDocument(dto: CreateDocumentDto): Promise<any> {
    try {
      // Generate smart questions if not provided
      let questions = [];
      if (!dto.userResponses || dto.userResponses.length === 0) {
        questions = await this.universal.generateSmartQuestions(
          dto.documentType,
          dto.framework,
          dto.industry
        );
        
        return {
          type: 'questions',
          questions: questions.slice(0, 1), // Return first question
          totalQuestions: questions.length,
        };
      }

      // Generate document with user responses
      const prompt = await this.smartPrompt.generateEnhancedPrompt(
        dto.documentType,
        dto.framework,
        dto.industry,
        dto.userResponses,
        dto.customRequirements
      );

      // Call OpenAI to generate content
      const content = await this.callOpenAI(prompt);

      // Validate and improve quality
      const qualityReport = await this.contentQuality.validateContent(
        content,
        {
          framework: dto.framework,
          industry: dto.industry,
          documentType: dto.documentType,
          userContext: dto.userResponses
        }
      );

      let finalContent = content;
      if (qualityReport.overallScore < 70) {
        finalContent = await this.contentQuality.improveContent(
          content,
          qualityReport,
          dto
        );
      }

      // Add industry-specific enhancements
      finalContent = await this.universal.enhanceWithIndustryContext(
        finalContent,
        dto.industry,
        dto.framework
      );

      // Generate implementation guide
      const implementationGuide = this.universal.generateImplementationGuide(
        dto.framework,
        dto.documentType,
        dto.industry
      );

      // Save to database
      const savedDocument = await this.saveDocument({
        title: `${dto.documentType} - ${dto.framework}`,
        content: finalContent,
        framework: dto.framework,
        industry: dto.industry,
        documentType: dto.documentType,
        qualityScore: qualityReport.overallScore,
        wordCount: finalContent.split(' ').length,
        userId: 1, // Default user for now
      });

      return {
        type: 'document',
        id: savedDocument.id,
        content: finalContent,
        qualityScore: qualityReport.overallScore,
        qualityReport,
        implementationGuide,
        wordCount: finalContent.split(' ').length,
        estimatedReadTime: Math.ceil(finalContent.split(' ').length / 200),
      };

    } catch (error) {
      console.error('Error generating document:', error);
      throw new Error(`Failed to generate document: ${error.message}`);
    }
  }

  async generateQuestions(dto: GenerateQuestionsDto) {
    const questions = await this.universal.generateSmartQuestions(
      dto.documentType,
      dto.framework,
      dto.industry
    );

    return {
      questions,
      totalQuestions: questions.length,
      framework: dto.framework,
      documentType: dto.documentType,
    };
  }

  async validateQuality(dto: ValidateQualityDto) {
    return this.contentQuality.validateContent(dto.content, dto.context);
  }

  async getAvailableFrameworks() {
    return this.universal.getAvailableFrameworks();
  }

  async getDocumentTypes() {
    return this.universal.getDocumentTypes();
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const OpenAI = require('openai').default;
    const openai = new OpenAI({
      apiKey: this.config.get('app.openai.apiKey'),
    });

    const response = await openai.chat.completions.create({
      model: this.config.get('app.openai.defaultModel'),
      messages: [
        {
          role: 'system',
          content: 'You are an expert document generation assistant that creates professional, implementation-ready documents.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || '';
  }

  private async saveDocument(data: any) {
    return this.prisma.aIDocument.create({
      data,
    });
  }
} 