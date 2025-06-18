import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { SmartPromptService } from '../services/smart-prompt/smart-prompt.service';
import { ContentQualityService } from '../services/content-quality/content-quality.service';
import { UniversalDocumentService } from '../services/universal/universal-document.service';

@Module({
  controllers: [DocumentController],
  providers: [
    DocumentService,
    SmartPromptService,
    ContentQualityService,
    UniversalDocumentService,
  ],
})
export class DocumentModule {} 