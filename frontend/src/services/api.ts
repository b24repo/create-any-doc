import axios from 'axios';

// Use relative URLs to work with the proxy configuration in package.json
const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface DocumentGenerationRequest {
  documentType: string;
  framework: string;
  industry: string;
  language?: string;
  customRequirements?: string;
  userResponses?: any[];
}

export interface DocumentGenerationResponse {
  type?: 'questions' | 'document';
  questions?: any[];
  totalQuestions?: number;
  content?: string;
  qualityScore?: number;
  implementationGuide?: any;
  recommendations?: string[];
}

export const documentApi = {
  async generateDocument(request: DocumentGenerationRequest): Promise<DocumentGenerationResponse> {
    const response = await api.post('/api/documents/generate', request);
    return response.data;
  },

  async getQuestions(framework: string, documentType: string) {
    const response = await api.get(`/api/documents/questions`, {
      params: { framework, documentType }
    });
    return response.data;
  },

  async validateQuality(content: string, context: any) {
    const response = await api.post('/api/documents/validate-quality', {
      content,
      context
    });
    return response.data;
  },

  async getFrameworks() {
    const response = await api.get('/api/documents/frameworks');
    return response.data;
  },

  async getDocumentTypes() {
    const response = await api.get('/api/documents/document-types');
    return response.data;
  }
};

export default api; 