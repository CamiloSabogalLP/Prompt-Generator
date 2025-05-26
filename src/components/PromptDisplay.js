import React, { useState } from 'react';

const PromptDisplay = ({ prompt, onClear }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Prompt Generado</h3>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar Prompt
          </button>
        </div>
      </div>
      <pre className="bg-white p-4 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
        {prompt}
      </pre>
    </div>
  );
};

export default PromptDisplay;
