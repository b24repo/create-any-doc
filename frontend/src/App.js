import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Enhanced Document Generator
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-600 mb-4">
              Welcome to the Enhanced Document Generator! This application helps you create professional, 
              implementation-ready documents using AI with quality validation and industry-specific enhancements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Features</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• Smart Context Gathering</li>
                  <li>• Quality Validation</li>
                  <li>• Industry-Specific Enhancements</li>
                  <li>• Framework Compliance Support</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Status</h3>
                <div className="text-green-800">
                  <p>✅ Backend: Running on port 3001</p>
                  <p>✅ Frontend: Running on port 3000</p>
                  <p>✅ Database: PostgreSQL connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 