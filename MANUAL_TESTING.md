# Manual Testing Guide - Create Any Doc

## 🎯 **Your System is Ready! Here's How to Test It**

### **✅ Current Status**
- ✅ **29 Frameworks** available (including Quantum Computing, AI Ethics, Carbon Management)
- ✅ **19 Document Types** available (Policy, Framework, Playbook, etc.)
- ✅ **10 Industries** supported (Technology, Healthcare, Finance, etc.)
- ✅ **Backend & Frontend** running successfully
- ✅ **Question Generation** working

### **🚀 Quick Test Steps**

#### **1. Access the Application**
```
Frontend: http://localhost:3000
Backend API: http://localhost:3001
```

#### **2. Test the Frontend Interface**

1. **Open http://localhost:3000** in your browser
2. **Select a Framework** from the expanded list:
   - Try **"Quantum Computing Security"** (emerging technology)
   - Try **"AI Ethics Framework"** (emerging technology)
   - Try **"Carbon Management Framework"** (environmental)
   - Try **"DevSecOps Framework"** (technical)

3. **Select a Document Type**:
   - Policy Document
   - Implementation Framework
   - Operational Playbook
   - Technical Standard

4. **Select an Industry**:
   - Technology
   - Healthcare
   - Finance
   - Manufacturing

5. **Add Custom Requirements** (optional):
   - "Focus on post-quantum cryptography migration"
   - "AI bias detection and mitigation protocols"
   - "Carbon neutrality roadmap"

6. **Answer the Smart Questions**:
   - Provide context about your organization
   - Describe current practices and challenges
   - Specify implementation preferences

7. **Generate the Document**:
   - Review the comprehensive output
   - Check the quality score
   - Examine the implementation guide

#### **3. Test Advanced Frameworks**

##### **Quantum Computing Security Test**
```
Framework: Quantum Computing Security
Document Type: Framework
Industry: Technology
Custom Requirements: "Post-quantum cryptography migration for financial systems"
Sample Response: "We are a fintech company using RSA-2048 encryption and need to migrate to quantum-resistant algorithms within 2 years."
```

##### **AI Ethics Framework Test**
```
Framework: AI Ethics Framework
Document Type: Policy
Industry: Healthcare
Custom Requirements: "AI ethics framework for medical diagnosis systems"
Sample Response: "We develop AI-powered medical diagnosis tools used by 500+ hospitals globally."
```

##### **Carbon Management Test**
```
Framework: Carbon Management Framework
Document Type: Plan
Industry: Manufacturing
Custom Requirements: "Carbon neutrality roadmap for manufacturing operations"
Sample Response: "We operate 10 manufacturing facilities with 50,000 tons CO2e annually, aiming for carbon neutrality by 2030."
```

#### **4. API Testing (Advanced Users)**

##### **Test Frameworks Endpoint**
```bash
curl http://localhost:3001/api/documents/frameworks | jq .
```

##### **Test Document Types Endpoint**
```bash
curl http://localhost:3001/api/documents/document-types | jq .
```

##### **Test Question Generation**
```bash
curl "http://localhost:3001/api/documents/questions?framework=quantum-computing&documentType=framework"
```

##### **Test Document Generation**
```bash
curl -X POST http://localhost:3001/api/documents/generate \
  -H "Content-Type: application/json" \
  -d '{
    "documentType": "policy",
    "framework": "ai-ethics",
    "industry": "technology",
    "userResponses": ["Our AI team develops machine learning models for customer recommendations"]
  }'
```

### **🎯 What to Look For**

#### **✅ Successful Test Indicators**

1. **Framework Selection**:
   - 29 frameworks available including emerging technologies
   - Categories: compliance, security, technical, emerging, environmental, business, healthcare, finance, manufacturing, education, custom

2. **Document Generation**:
   - 3,000-6,000 word comprehensive documents
   - Framework-specific requirements and procedures
   - Industry-specific enhancements
   - Implementation timeline with milestones
   - Quality score and validation

3. **Specialized Knowledge Integration**:
   - **Quantum Computing**: Post-quantum cryptography, quantum-safe migration
   - **AI Ethics**: Bias detection, transparency, accountability
   - **Carbon Management**: GHG accounting, science-based targets
   - **DevSecOps**: CI/CD security, container security

4. **Implementation Readiness**:
   - Step-by-step implementation guides
   - Role-based responsibilities
   - Success metrics and KPIs
   - Risk assessment and mitigation

### **🔧 Troubleshooting**

#### **If Document Generation Fails**
1. **Check OpenAI API Key**: Ensure you have a valid API key in `backend/.env`
2. **Check API Credits**: Ensure sufficient OpenAI credits
3. **Check Network**: Ensure stable internet connection
4. **Check Logs**: Review backend console for error details

#### **If Frontend Doesn't Load**
1. **Check Ports**: Ensure ports 3000 and 3001 are available
2. **Restart Services**: Kill processes and restart
3. **Check Dependencies**: Ensure all npm packages are installed

### **📊 Expected Results**

#### **Framework Coverage**
- ✅ **Compliance**: GDPR, HIPAA, SOX, CCPA, ISO standards
- ✅ **Security**: NIST, OWASP, API Security, Cloud Security
- ✅ **Technical**: DevSecOps, API Security, Cloud Security
- ✅ **Emerging**: Quantum Computing, AI Ethics, Blockchain, IoT
- ✅ **Environmental**: Carbon Management, ESG, Sustainability
- ✅ **Business**: Risk Management, Business Continuity, Change Management
- ✅ **Industry-Specific**: Healthcare, Finance, Manufacturing, Education

#### **Document Quality**
- ✅ **Comprehensive**: 3,000-6,000 words
- ✅ **Professional**: Industry-standard language and formatting
- ✅ **Actionable**: Specific implementation steps and timelines
- ✅ **Compliant**: Framework-specific requirements and regulations
- ✅ **Validated**: AI-powered quality assessment and improvement

### **🎉 Success Criteria**

Your system is successfully tested when you can:

1. ✅ **Generate documents** for all major framework categories
2. ✅ **Access specialized knowledge** for emerging technologies
3. ✅ **Receive quality validation** with scores > 70%
4. ✅ **Get implementation guides** with timelines and metrics
5. ✅ **See industry-specific** enhancements and best practices

### **🚀 Ready to Generate Literally Any Document!**

Your enhanced system now supports:
- **29 Frameworks** across all domains
- **19 Document Types** for comprehensive coverage
- **10 Industries** with specialized knowledge
- **Advanced Technologies** like Quantum Computing and AI Ethics
- **Quality Validation** and implementation readiness

**Access your application at http://localhost:3000 and start generating professional, implementation-ready documents!** 🎯 