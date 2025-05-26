import React, { useState } from 'react';
import StoryForm from './components/StoryForm';
import PromptDisplay from './components/PromptDisplay';

const App = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  // Esta es la función que borra el prompt
  const handleClearPrompt = () => {
    setGeneratedPrompt('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Prompt Generator</h1>
          <p className="mt-2 text-sm text-gray-600">Generador de prompts para creación de casos de prueba</p>
        </div>

        <div className="space-y-6">
          <StoryForm onGenerate={setGeneratedPrompt} />
          
     
          {generatedPrompt && (
            <PromptDisplay
              prompt={generatedPrompt}
              onClear={handleClearPrompt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
