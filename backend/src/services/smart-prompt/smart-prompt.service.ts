import { Injectable } from '@nestjs/common';

@Injectable()
export class SmartPromptService {
  async generateEnhancedPrompt(
    documentType: string,
    framework: string,
    industry: string,
    userResponses: any[] = [],
    customRequirements?: string
  ): Promise<string> {
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const userContext = this.extractUserContext(userResponses);

    return `
You are an expert consultant specializing in ${framework} implementation and ${industry} industry documentation.

DOCUMENT TO CREATE: ${documentType}
FRAMEWORK: ${framework}
INDUSTRY: ${industry}
CREATION DATE: ${currentDate}

USER CONTEXT:
${this.formatUserContext(userContext)}

CUSTOM REQUIREMENTS:
${customRequirements || 'Standard industry best practices'}

QUALITY STANDARDS:
1. Make it SPECIFIC to the organization - use actual company details, not generic placeholders
2. Include current ${this.getJurisdiction(framework)} regulations as of ${currentDate}
3. Provide actionable implementation steps with clear timelines
4. Use professional language appropriate for ${industry} industry professionals
5. Include specific examples relevant to ${industry} industry
6. Add compliance verification checklists and success metrics

DOCUMENT STRUCTURE:
- Document metadata table (title, owner, dates, version, etc.)
- Executive summary (2-3 paragraphs)
- Purpose and scope
- Framework-specific requirements and procedures
- Implementation timeline with specific milestones
- Roles and responsibilities matrix
- Compliance monitoring and review procedures
- Risk assessment and mitigation strategies
- Appendices with templates and checklists

OUTPUT REQUIREMENTS:
- Word count: 3,000-6,000 words for comprehensive coverage
- Professional formatting with clear headers and subheadings
- Implementation timeline with specific dates and milestones
- Role-based responsibilities and accountability measures
- Measurable success criteria and key performance indicators
- Regular review and update procedures

Generate a comprehensive, audit-ready document that provides practical value and can be immediately implemented by the organization.
    `;
  }

  private extractUserContext(responses: any[]): any {
    // Extract context from user responses
    const context = {
      companyName: 'Your Organization',
      industry: 'technology',
      employeeCount: '50',
      mainConcerns: 'compliance and security',
      existingSystems: 'standard business applications',
    };

    // Parse responses to extract actual context
    responses.forEach((response, index) => {
      if (typeof response === 'string') {
        // Extract company name
        const companyMatch = response.match(/(?:company|organization)\s+(?:is\s+)?([A-Z][a-zA-Z\s]+)/i);
        if (companyMatch) context.companyName = companyMatch[1].trim();

        // Extract employee count
        const employeeMatch = response.match(/(\d+)\s*(?:employees|staff|people)/i);
        if (employeeMatch) context.employeeCount = employeeMatch[1];

        // Extract concerns
        const concernMatch = response.match(/(?:concern|worry|challenge)[s]?\s+(?:about\s+|with\s+)?([^.]+)/i);
        if (concernMatch) context.mainConcerns = concernMatch[1].trim();
      }
    });

    return context;
  }

  private formatUserContext(context: any): string {
    return Object.entries(context)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }

  private getJurisdiction(framework: string): string {
    const jurisdictions = {
      'GDPR': 'EU',
      'HIPAA': 'US',
      'CCPA': 'California',
      'SOX': 'US',
      'ISO 27001': 'International',
    };
    return jurisdictions[framework] || 'applicable';
  }
} 