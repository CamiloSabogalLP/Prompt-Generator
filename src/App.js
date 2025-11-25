import React, { useState } from 'react';
import StoryForm from './components/StoryForm';
import PromptDisplay from './components/PromptDisplay';

const App = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleClearPrompt = () => {
    setGeneratedPrompt('');
  };

  const hasPrompt = generatedPrompt !== '';

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">

      <div className={`
        mx-auto 
        transition-all duration-500 
        ${hasPrompt ? 'max-w-6xl' : 'max-w-md'}
      `}>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Prompt Generator</h1>
          <p className="mt-2 text-sm text-gray-600">
            Generador de prompts para creación de casos de prueba
          </p>
        </div>

        <div className={`
          transition-all duration-500 
          ${hasPrompt ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'flex justify-center'}
        `}>
          
          {/* Formulario (siempre visible) */}
          <div className={`${hasPrompt ? '' : 'w-full max-w-md'}`}>
            <StoryForm onGenerate={setGeneratedPrompt} />
          </div>

          {/* Panel del Prompt generado */}
          {hasPrompt && (
            <div>
              <PromptDisplay
                prompt={generatedPrompt}
                onClear={handleClearPrompt}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;
