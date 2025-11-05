import React, { useState } from 'react';

const StoryForm = ({ onGenerate }) => {
  const [epicId, setEpicId] = useState('');
  const [cardId, setCardId] = useState('');
  const [cardName, setCardName] = useState('');
  const [description, setDescription] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [isGherkin, setIsGherkin] = useState(false);

  const handleReset = () => {
    setEpicId('');
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

columna Epic Id: ${epicId}
columna Story Linkages: ${cardId}
columna Caso: nombre del caso de prueba
columna Summary: nombre del caso de prueba
columna Precondition: la precondicion
columna Priority: MEDIUM
columna Status: TO DO
columna Step Summary: el DADO QUE
columna Test Data: el CUANDO
columna Expected Result: el ENTONCES
columna Labels: dejar vacio
columna Automatizable: True/False

Nombre de la card:
${cardName}

Descripción:
${description}

Criterios de aceptación:
${formattedCriteria}`;

    onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      {/* ID ÉPICA */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ID de la épica</label>
        <input
          type="text"
          value={epicId}
          onChange={(e) => setEpicId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      {/* ID CARD */}
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

    

      {/* NOMBRE CARD */}
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

      {/* DESCRIPCIÓN */}
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

      {/* CRITERIOS DE ACEPTACIÓN */}
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

      {/* CHECKBOX GHERKIN */}
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

      {/* BOTONES */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generar Prompt
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Limpiar Formulario
      </button>
    </form>
  );
};

export default StoryForm;
