import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

export enum DocumentType {
  POLICY = 'policy',
  PROCEDURE = 'procedure',
  FRAMEWORK = 'framework',
  PLAN = 'plan',
  STANDARD = 'standard',
  GUIDE = 'guide',
}

export enum Industry {
  TECHNOLOGY = 'technology',
  HEALTHCARE = 'healthcare',
  FINANCE = 'finance',
  MANUFACTURING = 'manufacturing',
  EDUCATION = 'education',
  RETAIL = 'retail',
  ENERGY = 'energy',
  GOVERNMENT = 'government',
}

export class CreateDocumentDto {
  @IsString()
  documentType: string;

  @IsString()
  framework: string;

  @IsString()
  industry: string;

  @IsOptional()
  @IsString()
  language?: string = 'English';

  @IsOptional()
  @IsString()
  customRequirements?: string;

  @IsOptional()
  @IsArray()
  userResponses?: any[];

  @IsOptional()
  @IsString()
  complianceLevel?: 'standard' | 'enhanced' | 'audit-ready' | 'regulatory-submission' = 'standard';
}

export class GenerateQuestionsDto {
  @IsString()
  framework: string;

  @IsString()
  documentType: string;

  @IsOptional()
  @IsString()
  industry?: string = 'technology';
}

export class ValidateQualityDto {
  @IsString()
  content: string;

  @IsOptional()
  context?: any;
} 