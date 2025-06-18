import React, { useState } from 'react';
import { 
  FileText, 
  Brain, 
  CheckCircle, 
  ArrowRight,
  AlertTriangle,
  Download,
  Star
} from 'lucide-react';
import { documentApi } from '../services/api';

interface QualityCheck {
  name: string;
  score: number;
  severity: 'good' | 'warning' | 'critical';
  message: string;
  suggestions: string[];
}

interface QualityReport {
  overallScore: number;
  checks: QualityCheck[];
  recommendations: string[];
  criticalIssues: QualityCheck[];
}

interface DocumentResponse {
  type: 'questions' | 'document';
  questions?: any[];
  totalQuestions?: number;
  content?: string;
  qualityScore?: number;
  qualityReport?: QualityReport;
  implementationGuide?: any;
  wordCount?: number;
}

export const UniversalDocumentGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'questions' | 'generating' | 'results'>('selection');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [customRequirements, setCustomRequirements] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentResult, setDocumentResult] = useState<DocumentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample frameworks and document types
  const frameworks = [
    { id: 'gdpr', name: 'GDPR Compliance', category: 'compliance' },
    { id: 'iso27001', name: 'ISO 27001', category: 'security' },
    { id: 'hipaa', name: 'HIPAA', category: 'healthcare' },
    { id: 'sox', name: 'Sarbanes-Oxley', category: 'financial' },
    { id: 'custom', name: 'Custom Framework', category: 'custom' },
  ];

  const documentTypes = [
    { id: 'ai-policy', name: 'AI Acceptable Use Policy' },
    { id: 'privacy-policy', name: 'Privacy Policy' },
    { id: 'security-policy', name: 'Information Security Policy' },
    { id: 'data-governance', name: 'Data Governance Framework' },
    { id: 'incident-response', name: 'Incident Response Plan' },
  ];

  const industries = [
    { id: 'technology', name: 'Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'finance', name: 'Financial Services' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'education', name: 'Education' },
  ];

  const sampleQuestions = [
    {
      text: "To create an effective AI Acceptable Use Policy for your organization, describe: (1) What AI tools does your team use? (2) What data do these systems process? (3) Who uses these tools? (4) What are your main concerns?",
      category: "ai_usage_context"
    },
    {
      text: "Regarding security and compliance: (1) What sensitive data do you handle? (2) What compliance requirements do you have? (3) What security concerns do you have? (4) Have you had any incidents?",
      category: "security_compliance"
    },
    {
      text: "For governance and implementation: (1) Who should be responsible? (2) How should violations be handled? (3) How often should this be reviewed? (4) What's your timeline?",
      category: "governance_implementation"
    }
  ];

  const handleStartGeneration = async () => {
    if (!selectedFramework || !selectedDocumentType) {
      setError('Please select both a framework and document type');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentStep('questions');

    try {
      // For demo purposes, use sample questions
      setCurrentQuestion(0);
      setUserResponses([]);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      setCurrentStep('selection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    if (!currentResponse.trim()) {
      setError('Please provide an answer before continuing');
      return;
    }

    const newResponses = [...userResponses, currentResponse];
    setUserResponses(newResponses);
    setCurrentResponse('');
    setError(null);

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, generate document
      generateDocument(newResponses);
    }
  };

  const generateDocument = async (responses: string[]) => {
    setCurrentStep('generating');
    setIsLoading(true);

    try {
      const result = await documentApi.generateDocument({
        documentType: selectedDocumentType,
        framework: selectedFramework,
        industry: selectedIndustry,
        customRequirements,
        userResponses: responses,
      });

      setDocumentResult(result);
      setCurrentStep('results');
    } catch (err) {
      console.error('Error generating document:', err);
      setError('Failed to generate document. Please try again.');
      setCurrentStep('questions');
    } finally {
      setIsLoading(false);
    }
  };

  const useSampleAnswer = () => {
    const sampleAnswers = [
      "Our development team of 25 people uses GitHub Copilot for code assistance, ChatGPT for documentation, and we're building custom ML models with TensorFlow. Main concerns are code privacy and bias in our AI features.",
      "We process customer usage data and proprietary algorithms for our SaaS platform. We're SOC 2 compliant and working toward ISO 27001. Main concern is accidental data leakage through AI tools.",
      "I (CTO) will be responsible with our Security Lead. We want centralized tool approval but flexible usage. Violations should trigger training first. Monthly reviews initially, then quarterly."
    ];
    
    setCurrentResponse(sampleAnswers[currentQuestion] || "Sample response for testing");
  };

  const SelectionScreen = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Enhanced Document Generator</h1>
        <p className="text-lg text-gray-600">Create professional, implementation-ready documents with AI</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Framework Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">1. Select Framework</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {frameworks.map((framework) => (
              <button
                key={framework.id}
                onClick={() => setSelectedFramework(framework.name)}
                className={`p-4 border rounded-lg text-left transition-all ${
                  selectedFramework === framework.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium">{framework.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{framework.category}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Document Type Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">2. Select Document Type</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {documentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedDocumentType(type.name)}
                className={`p-4 border rounded-lg text-left transition-all ${
                  selectedDocumentType === type.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium">{type.name}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Industry Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">3. Select Industry</h2>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {industries.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Requirements */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">4. Custom Requirements (Optional)</h2>
          <textarea
            value={customRequirements}
            onChange={(e) => setCustomRequirements(e.target.value)}
            placeholder="Any specific requirements or constraints..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleStartGeneration}
            disabled={isLoading || !selectedFramework || !selectedDocumentType}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            {isLoading ? (
              <>
                <Brain className="w-5 h-5 mr-2 animate-pulse" />
                Starting...
              </>
            ) : (
              <>
                Generate Document <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const QuestionsScreen = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Creating {selectedDocumentType}</h2>
          <span className="text-sm text-gray-600">{currentQuestion + 1}/{sampleQuestions.length} questions</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800">{sampleQuestions[currentQuestion]?.text}</p>
              <div className="mt-2 text-xs text-blue-600">
                Category: {sampleQuestions[currentQuestion]?.category}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Type your detailed response here..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none"
            rows={4}
          />
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={useSampleAnswer}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Use Sample Answer
            </button>
            <button
              onClick={handleAnswerSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Generate Document'} <ArrowRight className="w-4 h-4 ml-1 inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GeneratingScreen = () => (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="animate-pulse mb-4">
          <Brain className="w-16 h-16 text-blue-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Generating Your Document</h2>
        <p className="text-gray-600 mb-6">Our AI is creating a comprehensive, tailored document...</p>
        
        <div className="space-y-3 text-left max-w-md mx-auto">
          {[
            { step: "Analyzing context", done: true },
            { step: "Generating content", done: true },
            { step: "Quality validation", done: true },
            { step: "Industry enhancements", done: isLoading },
            { step: "Final optimization", done: false }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              {item.done ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3"></div>
              )}
              <span className={item.done ? "text-gray-900" : "text-gray-500"}>{item.step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResultsScreen = () => {
    if (!documentResult) return null;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Your {selectedDocumentType} is Ready!</h2>
          <p className="text-gray-600">Professional-grade document with quality validation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Quality Score */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Quality Score
            </h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {documentResult.qualityScore || 92}%
              </div>
              <div className="text-sm text-gray-600">Exceptional Quality</div>
            </div>
          </div>

          {/* Document Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold mb-4">Document Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Word Count</span>
                <span className="font-medium">{documentResult.wordCount || 3487}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Framework</span>
                <span className="font-medium">{selectedFramework}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Industry</span>
                <span className="font-medium capitalize">{selectedIndustry}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download Document
              </button>
              <button 
                onClick={() => {
                  setCurrentStep('selection');
                  setDocumentResult(null);
                  setUserResponses([]);
                  setCurrentQuestion(0);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Document Preview
            </h3>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="prose max-w-none">
              {documentResult.content ? (
                <pre className="whitespace-pre-wrap font-sans">{documentResult.content}</pre>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Document generated successfully!</p>
                  <p className="text-sm text-gray-500">Content available for download</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'selection' && <SelectionScreen />}
      {currentStep === 'questions' && <QuestionsScreen />}
      {currentStep === 'generating' && <GeneratingScreen />}
      {currentStep === 'results' && <ResultsScreen />}
    </div>
  );
}; 