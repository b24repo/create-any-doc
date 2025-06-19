import { Injectable } from '@nestjs/common';

export interface SmartQuestion {
  id: string;
  text: string;
  category: string;
  followUpLogic?: (answer: string) => string[];
}

@Injectable()
export class UniversalDocumentService {
  async generateSmartQuestions(
    documentType: string,
    framework: string,
    industry: string
  ): Promise<SmartQuestion[]> {
    
    const questions: SmartQuestion[] = [
      {
        id: 'organizational_context',
        text: this.generateContextQuestion(documentType, framework, industry),
        category: 'organizational_context'
      },
      {
        id: 'requirements_scope',
        text: this.generateRequirementsQuestion(framework, industry),
        category: 'requirements_scope'
      },
      {
        id: 'implementation_governance',
        text: this.generateGovernanceQuestion(framework, industry),
        category: 'implementation_governance'
      }
    ];

    return questions;
  }

  async enhanceWithIndustryContext(
    content: string,
    industry: string,
    framework: string
  ): Promise<string> {
    const industryEnhancements = this.getIndustryEnhancements(industry);
    
    if (!industryEnhancements) return content;

    const enhancementSection = `
## Industry-Specific Requirements for ${industry.charAt(0).toUpperCase() + industry.slice(1)}

${industryEnhancements.requirements.map(req => `- ${req}`).join('\n')}

### Compliance Considerations
${industryEnhancements.compliance.map(comp => `- ${comp}`).join('\n')}

### Implementation Timeline
- **Phase 1 (0-30 days)**: ${industryEnhancements.timeline.phase1}
- **Phase 2 (30-60 days)**: ${industryEnhancements.timeline.phase2}
- **Phase 3 (60-90 days)**: ${industryEnhancements.timeline.phase3}
    `;

    return content + '\n\n' + enhancementSection;
  }

  generateImplementationGuide(
    framework: string,
    documentType: string,
    industry: string
  ) {
    return {
      immediateActions: [
        'Review document with leadership team',
        'Assign responsible parties for each section',
        'Set up implementation tracking system',
        'Schedule stakeholder communication sessions'
      ],
      thirtyDayGoals: [
        'Complete initial training and awareness programs',
        'Implement core requirements and procedures',
        'Establish monitoring and reporting systems',
        'Conduct initial compliance assessment'
      ],
      ongoingRequirements: [
        'Monthly compliance monitoring and reporting',
        'Quarterly policy effectiveness review',
        'Annual comprehensive audit and update',
        'Continuous training for new employees'
      ],
      successMetrics: [
        'Implementation completion rate > 95%',
        'Compliance score > 90%',
        'Stakeholder satisfaction > 4.5/5',
        'Zero critical compliance issues'
      ]
    };
  }

  getAvailableFrameworks() {
    return [
      // Compliance & Regulatory
      { id: 'gdpr', name: 'GDPR', category: 'compliance' },
      { id: 'hipaa', name: 'HIPAA', category: 'compliance' },
      { id: 'ccpa', name: 'CCPA', category: 'compliance' },
      { id: 'sox', name: 'Sarbanes-Oxley', category: 'financial' },
      { id: 'pci-dss', name: 'PCI DSS', category: 'security' },
      { id: 'iso27001', name: 'ISO 27001', category: 'security' },
      { id: 'iso14001', name: 'ISO 14001', category: 'environmental' },
      { id: 'iso9001', name: 'ISO 9001', category: 'quality' },
      
      // Technical & Security
      { id: 'nist-cybersecurity', name: 'NIST Cybersecurity Framework', category: 'security' },
      { id: 'owasp', name: 'OWASP Application Security', category: 'security' },
      { id: 'devsecops', name: 'DevSecOps Framework', category: 'technical' },
      { id: 'api-security', name: 'API Security Standards', category: 'technical' },
      { id: 'cloud-security', name: 'Cloud Security Framework', category: 'technical' },
      
      // Emerging Technologies
      { id: 'quantum-computing', name: 'Quantum Computing Security', category: 'emerging' },
      { id: 'ai-ethics', name: 'AI Ethics Framework', category: 'emerging' },
      { id: 'blockchain-security', name: 'Blockchain Security', category: 'emerging' },
      { id: 'iot-security', name: 'IoT Security Framework', category: 'emerging' },
      
      // Environmental & Sustainability
      { id: 'carbon-management', name: 'Carbon Management Framework', category: 'environmental' },
      { id: 'esg-framework', name: 'ESG (Environmental, Social, Governance)', category: 'environmental' },
      { id: 'sustainability-reporting', name: 'Sustainability Reporting', category: 'environmental' },
      
      // Business & Operations
      { id: 'risk-management', name: 'Enterprise Risk Management', category: 'business' },
      { id: 'business-continuity', name: 'Business Continuity Planning', category: 'business' },
      { id: 'disaster-recovery', name: 'Disaster Recovery Framework', category: 'business' },
      { id: 'change-management', name: 'Change Management Framework', category: 'business' },
      
      // Industry-Specific
      { id: 'healthcare-compliance', name: 'Healthcare Compliance Framework', category: 'healthcare' },
      { id: 'financial-services', name: 'Financial Services Framework', category: 'finance' },
      { id: 'manufacturing-safety', name: 'Manufacturing Safety Standards', category: 'manufacturing' },
      { id: 'education-privacy', name: 'Education Privacy Framework', category: 'education' },
      
      // Custom Framework
      { id: 'custom', name: 'Custom Framework', category: 'custom' },
    ];
  }

  getDocumentTypes() {
    return [
      // Core Document Types
      { id: 'policy', name: 'Policy Document' },
      { id: 'procedure', name: 'Standard Operating Procedure' },
      { id: 'framework', name: 'Implementation Framework' },
      { id: 'plan', name: 'Strategic Plan' },
      { id: 'standard', name: 'Technical Standard' },
      { id: 'guide', name: 'Implementation Guide' },
      
      // Advanced Document Types
      { id: 'playbook', name: 'Operational Playbook' },
      { id: 'handbook', name: 'Employee Handbook' },
      { id: 'manual', name: 'Technical Manual' },
      { id: 'protocol', name: 'Security Protocol' },
      { id: 'checklist', name: 'Compliance Checklist' },
      { id: 'template', name: 'Document Template' },
      { id: 'workflow', name: 'Process Workflow' },
      { id: 'assessment', name: 'Risk Assessment' },
      { id: 'audit-plan', name: 'Audit Plan' },
      { id: 'training-material', name: 'Training Material' },
      { id: 'incident-response', name: 'Incident Response Plan' },
      { id: 'business-case', name: 'Business Case Document' },
      { id: 'white-paper', name: 'Technical White Paper' },
    ];
  }

  private generateContextQuestion(documentType: string, framework: string, industry: string): string {
    return `To create an effective ${documentType} based on ${framework} for your ${industry} organization, I need comprehensive context. Please describe: (1) What is your organization's name, size, and primary business activities? (2) What existing practices or systems do you currently have related to ${this.getFrameworkDomain(framework)}? (3) What specific requirements are you trying to address with this ${documentType}? (4) What are your main challenges or concerns? Please provide specific examples and details.`;
  }

  private generateRequirementsQuestion(framework: string, industry: string): string {
    return `Based on your context, I need to understand your specific requirements: (1) What regulatory or compliance standards must you meet beyond ${framework}? (2) What are your organization's biggest risks in this area? (3) What existing capabilities do you have, and what gaps need addressing? (4) How will you measure success? (5) Who are the key stakeholders involved? Please be specific about your ${industry} industry context.`;
  }

  private generateGovernanceQuestion(framework: string, industry: string): string {
    return `For successful implementation and governance: (1) Who should be responsible for overall governance and day-to-day management? (2) Do you prefer phased implementation or comprehensive rollout? (3) What resources can you dedicate? (4) How do you typically handle organizational change? (5) How often should policies be reviewed? (6) How should violations be handled? Include details about your organizational culture and decision-making processes.`;
  }

  private getFrameworkDomain(framework: string): string {
    const domains = {
      'GDPR': 'data protection',
      'HIPAA': 'healthcare privacy',
      'ISO 27001': 'information security',
      'SOX': 'financial reporting',
    };
    return domains[framework] || 'compliance';
  }

  private getIndustryEnhancements(industry: string) {
    const enhancements = {
      'technology': {
        requirements: [
          'API security and data encryption standards',
          'Software development lifecycle integration',
          'Cloud security and third-party vendor management',
          'Incident response for technical systems'
        ],
        compliance: [
          'SOC 2 Type II compliance alignment',
          'Data protection for SaaS applications',
          'Technical safeguards for customer data'
        ],
        timeline: {
          phase1: 'Technical assessment and system inventory',
          phase2: 'Implementation of core security controls',
          phase3: 'Integration testing and compliance validation'
        }
      },
      'healthcare': {
        requirements: [
          'HIPAA Privacy and Security Rule compliance',
          'Patient data protection and access controls',
          'Medical device security requirements',
          'Clinical workflow integration'
        ],
        compliance: [
          'FDA regulations for medical devices',
          'State healthcare privacy laws',
          'Joint Commission standards'
        ],
        timeline: {
          phase1: 'Clinical workflow analysis and risk assessment',
          phase2: 'Implementation of patient data safeguards',
          phase3: 'Staff training and compliance monitoring'
        }
      },
      'finance': {
        requirements: [
          'PCI DSS compliance for payment processing',
          'Anti-money laundering (AML) procedures',
          'Customer due diligence and KYC requirements',
          'Operational risk management'
        ],
        compliance: [
          'Basel III capital requirements',
          'Dodd-Frank Act compliance',
          'Consumer protection regulations'
        ],
        timeline: {
          phase1: 'Financial risk assessment and control evaluation',
          phase2: 'Implementation of financial controls and monitoring',
          phase3: 'Regulatory reporting and audit preparation'
        }
      },
      'manufacturing': {
        requirements: [
          'Industrial control system security',
          'Supply chain security and vendor management',
          'Product safety and quality standards',
          'Environmental compliance and sustainability'
        ],
        compliance: [
          'ISO 9001 quality management',
          'ISO 14001 environmental management',
          'OSHA safety regulations'
        ],
        timeline: {
          phase1: 'Process mapping and risk assessment',
          phase2: 'Implementation of quality and safety controls',
          phase3: 'Continuous improvement and monitoring'
        }
      },
      'education': {
        requirements: [
          'Student data privacy protection',
          'FERPA compliance for educational records',
          'Digital learning platform security',
          'Research data protection'
        ],
        compliance: [
          'FERPA (Family Educational Rights and Privacy Act)',
          'COPPA (Children\'s Online Privacy Protection Act)',
          'State education privacy laws'
        ],
        timeline: {
          phase1: 'Educational data inventory and risk assessment',
          phase2: 'Implementation of privacy controls and training',
          phase3: 'Ongoing compliance monitoring and updates'
        }
      },
      'government': {
        requirements: [
          'Federal information security requirements',
          'Public records management and transparency',
          'Cybersecurity incident response',
          'Inter-agency data sharing protocols'
        ],
        compliance: [
          'FISMA (Federal Information Security Management Act)',
          'NIST Cybersecurity Framework',
          'FOIA (Freedom of Information Act) compliance'
        ],
        timeline: {
          phase1: 'Security assessment and gap analysis',
          phase2: 'Implementation of security controls and monitoring',
          phase3: 'Continuous monitoring and improvement'
        }
      },
      'energy': {
        requirements: [
          'Critical infrastructure protection',
          'Grid security and reliability standards',
          'Environmental compliance and sustainability',
          'Emergency response and business continuity'
        ],
        compliance: [
          'NERC CIP (North American Electric Reliability Corporation)',
          'EPA environmental regulations',
          'State energy regulations'
        ],
        timeline: {
          phase1: 'Infrastructure assessment and risk analysis',
          phase2: 'Implementation of security and compliance controls',
          phase3: 'Continuous monitoring and regulatory reporting'
        }
      },
      'retail': {
        requirements: [
          'Customer data protection and privacy',
          'Payment card security (PCI DSS)',
          'Supply chain security and vendor management',
          'E-commerce platform security'
        ],
        compliance: [
          'PCI DSS for payment processing',
          'CCPA and state privacy laws',
          'Consumer protection regulations'
        ],
        timeline: {
          phase1: 'Data inventory and security assessment',
          phase2: 'Implementation of security controls and training',
          phase3: 'Ongoing monitoring and compliance validation'
        }
      },
      'telecommunications': {
        requirements: [
          'Network security and infrastructure protection',
          'Customer privacy and data protection',
          'Regulatory compliance and reporting',
          'Service continuity and disaster recovery'
        ],
        compliance: [
          'FCC regulations and requirements',
          'CALEA (Communications Assistance for Law Enforcement Act)',
          'State telecommunications regulations'
        ],
        timeline: {
          phase1: 'Network security assessment and planning',
          phase2: 'Implementation of security controls and monitoring',
          phase3: 'Continuous compliance monitoring and reporting'
        }
      },
      'consulting': {
        requirements: [
          'Client data protection and confidentiality',
          'Professional services security standards',
          'Intellectual property protection',
          'Client engagement security protocols'
        ],
        compliance: [
          'Professional services regulations',
          'Client confidentiality requirements',
          'Industry-specific compliance standards'
        ],
        timeline: {
          phase1: 'Client data assessment and security planning',
          phase2: 'Implementation of security controls and training',
          phase3: 'Ongoing monitoring and client assurance'
        }
      }
    };

    return enhancements[industry];
  }
} 