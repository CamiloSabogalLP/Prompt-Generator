import React, { useState } from 'react';

const StoryForm = ({ onGenerate }) => {
  const [cardId, setCardId] = useState('');
  const [cardName, setCardName] = useState('');
  const [description, setDescription] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [isGherkin, setIsGherkin] = useState(false);
  const handleReset = () => {
  setCardId('');
  setCardName('');
  setDescription('');
  setAcceptanceCriteria('');
  setIsGherkin(false);
};


  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formattedCriteria = acceptanceCriteria;
    if (isGherkin) {
      const lines = acceptanceCriteria.split('\n')
        .filter(line => line.trim() !== '')
        .map((line, index) => {
          const prefix = index % 3 === 0 ? 'Dado que ' : 
                        index % 3 === 1 ? 'Cuando ' : 'Entonces ';
          return prefix + line.trim();
        });
      formattedCriteria = lines.join('\n');
    }

    const prompt = `Escribir casos de prueba de la siguiente historia de usuario. Por favor generar los casos con nombre de caso, precondición y formato dado que, cuando y entonces. organiza los casos en una tabla de la siguiente manera: 

columna ID Card: ${cardId}
columna Caso de prueba: nombre del caso de prueba
columna Precondición: la precondicion
columna Resultado esperado: el ENTONCES
columna Estado: Dejar en blanco para redactar manualmente
columna Evidencia: Dejar en blanco para redactar manualmente
columna Comentarios: Dejar en blanco para redactar manualmente

Nombre de la card:
${cardName}

Descripcion:
${description}

Criterios de aceptacion:
${formattedCriteria}`;


    onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">ID de la card</label>
        <input
          type="text"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre de la card</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Criterios de Aceptación</label>
        <textarea
          value={acceptanceCriteria}
          onChange={(e) => setAcceptanceCriteria(e.target.value)}
          rows={5}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="gherkin"
          checked={isGherkin}
          onChange={(e) => setIsGherkin(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="gherkin" className="ml-2 block text-sm text-gray-700">
          Formato Gherkin (Dado que/Cuando/Entonces)
        </label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generar Prompt
      </button>
      <button
    type="button"
    onClick={handleReset}
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Limpiar Formulario
  </button>
    </form>
  );
};

export default StoryForm;
