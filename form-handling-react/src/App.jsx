import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          React Form Handling Demo
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Comparing Controlled Components vs Formik
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Controlled Form */}
          <div>
            <RegistrationForm />
          </div>
          
          {/* Formik Form */}
          <div>
            <FormikForm />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Differences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Controlled Components</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Manual state management with useState</li>
                <li>Custom validation logic</li>
                <li>More code for form handling</li>
                <li>Full control over form behavior</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Formik</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Built-in state management</li>
                <li>Yup validation integration</li>
                <li>Less boilerplate code</li>
                <li>Built-in form helpers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;