"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartPromptService = void 0;
const common_1 = require("@nestjs/common");
let SmartPromptService = class SmartPromptService {
    async generateEnhancedPrompt(documentType, framework, industry, userResponses = [], customRequirements) {
        const currentDate = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        const userContext = this.extractUserContext(userResponses);
        const frameworkSpecialization = this.getFrameworkSpecialization(framework);
        return `
You are an expert consultant specializing in ${framework} implementation and ${industry} industry documentation.

DOCUMENT TO CREATE: ${documentType}
FRAMEWORK: ${framework}
INDUSTRY: ${industry}
CREATION DATE: ${currentDate}

${frameworkSpecialization}

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
7. ${this.getFrameworkSpecificQualityStandards(framework)}

DOCUMENT STRUCTURE:
${this.getDocumentStructure(documentType, framework)}

OUTPUT REQUIREMENTS:
- Word count: 3,000-6,000 words for comprehensive coverage
- Professional formatting with clear headers and subheadings
- Implementation timeline with specific dates and milestones
- Role-based responsibilities and accountability measures
- Measurable success criteria and key performance indicators
- Regular review and update procedures
- ${this.getFrameworkSpecificOutputRequirements(framework)}

Generate a comprehensive, audit-ready document that provides practical value and can be immediately implemented by the organization.
    `;
    }
    extractUserContext(responses) {
        const context = {
            companyName: 'Your Organization',
            industry: 'technology',
            employeeCount: '50',
            mainConcerns: 'compliance and security',
            existingSystems: 'standard business applications',
        };
        responses.forEach((response, index) => {
            if (typeof response === 'string') {
                const companyMatch = response.match(/(?:company|organization)\s+(?:is\s+)?([A-Z][a-zA-Z\s]+)/i);
                if (companyMatch)
                    context.companyName = companyMatch[1].trim();
                const employeeMatch = response.match(/(\d+)\s*(?:employees|staff|people)/i);
                if (employeeMatch)
                    context.employeeCount = employeeMatch[1];
                const concernMatch = response.match(/(?:concern|worry|challenge)[s]?\s+(?:about\s+|with\s+)?([^.]+)/i);
                if (concernMatch)
                    context.mainConcerns = concernMatch[1].trim();
            }
        });
        return context;
    }
    formatUserContext(context) {
        return Object.entries(context)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }
    getJurisdiction(framework) {
        const jurisdictions = {
            'GDPR': 'EU',
            'HIPAA': 'US',
            'CCPA': 'California',
            'SOX': 'US',
            'ISO 27001': 'International',
        };
        return jurisdictions[framework] || 'applicable';
    }
    getFrameworkSpecialization(framework) {
        const specializations = {
            'quantum-computing': `
SPECIALIZATION: Quantum Computing Security Expert
You are a leading expert in quantum computing security, cryptography, and post-quantum algorithms. You understand the imminent threat of quantum computers to current cryptographic systems and the urgent need for quantum-safe migration strategies.

KEY EXPERTISE AREAS:
- Post-quantum cryptography (PQC) algorithms and standards
- Quantum key distribution (QKD) protocols
- Hybrid classical-quantum security architectures
- Quantum computing threat modeling and risk assessment
- NIST Post-Quantum Cryptography standardization process
- Quantum-safe migration planning and implementation
      `,
            'ai-ethics': `
SPECIALIZATION: AI Ethics and Governance Expert
You are a leading expert in artificial intelligence ethics, responsible AI development, and AI governance frameworks. You understand the critical importance of AI bias mitigation, transparency, and accountability in AI systems.

KEY EXPERTISE AREAS:
- AI bias detection and mitigation strategies
- AI transparency and explainability (XAI) techniques
- AI ethics by design principles and methodologies
- AI governance frameworks and review processes
- EU AI Act and global AI regulations
- AI impact assessment and risk management
      `,
            'carbon-management': `
SPECIALIZATION: Carbon Management and Sustainability Expert
You are a leading expert in carbon management, greenhouse gas accounting, and sustainability frameworks. You understand the critical importance of accurate carbon measurement, reduction strategies, and climate action planning.

KEY EXPERTISE AREAS:
- Greenhouse gas accounting and carbon footprint measurement
- Science-based carbon reduction targets and strategies
- Carbon offset and removal technologies and verification
- Sustainability reporting and disclosure frameworks
- Climate risk assessment and adaptation planning
- Carbon neutrality and net-zero emissions pathways
      `,
            'blockchain-security': `
SPECIALIZATION: Blockchain Security and Distributed Ledger Technology Expert
You are a leading expert in blockchain security, smart contract auditing, and distributed ledger technology governance. You understand the unique security challenges and opportunities of blockchain systems.

KEY EXPERTISE AREAS:
- Blockchain consensus mechanisms and security implications
- Smart contract security and formal verification
- Cryptographic key management for blockchain applications
- Blockchain governance and access control models
- Blockchain incident response and recovery procedures
- Regulatory compliance for blockchain applications
      `,
            'devsecops': `
SPECIALIZATION: DevSecOps and Application Security Expert
You are a leading expert in DevSecOps practices, application security, and secure software development lifecycle (SDLC). You understand how to integrate security seamlessly into development and operations processes.

KEY EXPERTISE AREAS:
- Secure software development lifecycle (SDLC) integration
- Application security testing and vulnerability management
- Infrastructure as Code (IaC) security and compliance
- Container and Kubernetes security best practices
- CI/CD pipeline security and automation
- Cloud-native security and compliance frameworks
      `,
            'api-security': `
SPECIALIZATION: API Security and Integration Expert
You are a leading expert in API security, authentication, authorization, and secure integration patterns. You understand the critical importance of protecting APIs in modern application architectures.

KEY EXPERTISE AREAS:
- API authentication and authorization frameworks (OAuth 2.0, OIDC)
- API security testing and vulnerability assessment
- API rate limiting and abuse prevention
- API governance and lifecycle management
- Microservices security and service mesh protection
- API compliance and regulatory requirements
      `
        };
        return specializations[framework] || '';
    }
    getFrameworkSpecificQualityStandards(framework) {
        const qualityStandards = {
            'quantum-computing': 'Include quantum computing threat modeling and post-quantum cryptography migration planning',
            'ai-ethics': 'Include AI bias assessment methodologies and transparency requirements',
            'carbon-management': 'Include carbon accounting methodologies and science-based target validation',
            'blockchain-security': 'Include smart contract security audit requirements and consensus mechanism analysis',
            'devsecops': 'Include secure SDLC integration and automated security testing requirements',
            'api-security': 'Include API security testing protocols and authentication framework requirements'
        };
        return qualityStandards[framework] || 'Follow industry best practices and regulatory requirements';
    }
    getDocumentStructure(documentType, framework) {
        const baseStructure = `
- Document metadata table (title, owner, dates, version, etc.)
- Executive summary (2-3 paragraphs)
- Purpose and scope
- Framework-specific requirements and procedures
- Implementation timeline with specific milestones
- Roles and responsibilities matrix
- Compliance monitoring and review procedures
- Risk assessment and mitigation strategies
- Appendices with templates and checklists
    `;
        const frameworkSpecificStructures = {
            'quantum-computing': `
- Quantum computing threat assessment and risk analysis
- Current cryptographic inventory and vulnerability assessment
- Post-quantum cryptography migration roadmap
- Quantum-safe implementation guidelines
- Quantum computing incident response procedures
- Quantum computing governance and oversight framework
      `,
            'ai-ethics': `
- AI ethics governance structure and review processes
- AI bias detection and mitigation procedures
- AI transparency and explainability requirements
- AI impact assessment methodologies
- AI ethics training and awareness programs
- AI ethics monitoring and reporting procedures
      `,
            'carbon-management': `
- Carbon footprint baseline assessment and measurement methodology
- Carbon reduction target setting and validation
- Carbon offset and removal strategy implementation
- Carbon reporting and disclosure procedures
- Carbon management governance and oversight
- Climate risk assessment and adaptation planning
      `,
            'blockchain-security': `
- Blockchain network security architecture and design
- Smart contract security review and audit procedures
- Cryptographic key management and recovery procedures
- Blockchain incident response and recovery protocols
- Blockchain governance and access control framework
- Blockchain compliance and regulatory requirements
      `
        };
        return baseStructure + (frameworkSpecificStructures[framework] || '');
    }
    getFrameworkSpecificOutputRequirements(framework) {
        const outputRequirements = {
            'quantum-computing': 'Include quantum computing risk assessment matrix and post-quantum migration timeline',
            'ai-ethics': 'Include AI ethics review checklist and bias assessment tools',
            'carbon-management': 'Include carbon accounting templates and reduction tracking tools',
            'blockchain-security': 'Include smart contract security checklist and blockchain governance framework',
            'devsecops': 'Include secure SDLC checklist and automated security testing procedures',
            'api-security': 'Include API security testing checklist and authentication framework guidelines'
        };
        return outputRequirements[framework] || 'Include relevant templates, checklists, and implementation tools';
    }
};
exports.SmartPromptService = SmartPromptService;
exports.SmartPromptService = SmartPromptService = __decorate([
    (0, common_1.Injectable)()
], SmartPromptService);
//# sourceMappingURL=smart-prompt.service.js.map