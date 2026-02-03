import React, { useState, useRef, useEffect } from 'react';

const StoryForm = ({ onGenerate }) => {
  const [epicId, setEpicId] = useState('');
  const [cardId, setCardId] = useState('');
  const [cardName, setCardName] = useState('');
  const [description, setDescription] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [isGherkin, setIsGherkin] = useState(false);
  const [sprint, setSprint] = useState('');

  // Tipos de prueba + siglas
  const testTypesMap = {
    "Virtual Account": "VA",
    "PayIn": "PI",
    "PayOut": "PO",
    "Mejoras V3": "V3",
    "WireIn": "WI",
    "WireOut": "WO",
    "Internal Transfer": "IT",
    "Currency Exchange": "CE",
    "Credit and Debit": "CR/DB",
    "Triage": "TRG",
    "Fraud prevention": "FP",
    "AML": "AML"
  };

  const [testTypes, setTestTypes] = useState([]);
  const [typeError, setTypeError] = useState('');
  const [openTypes, setOpenTypes] = useState(false);

  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenTypes(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calcular Fix Version
  const getFixVersion = (sprintNumber) => {
    const baseSprint = 91;
    const basePatch = 4;

    const sprintInt = parseInt(sprintNumber, 10);

    if (isNaN(sprintInt) || sprintInt < baseSprint) {
      return '';
    }

    const patch = basePatch + (sprintInt - baseSprint);
    return `v3.1.${patch} - (s${sprintInt})`;
  };

  const handleReset = () => {
    setEpicId('');
    setCardId('');
    setCardName('');
    setDescription('');
    setAcceptanceCriteria('');
    setIsGherkin(false);
    setTestTypes([]);
    setTypeError('');
    setOpenTypes(false);
    setSprint('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (testTypes.length === 0) {
      setTypeError('Debes seleccionar al menos un tipo de prueba.');
      return;
    }

    setTypeError('');

    let formattedCriteria = acceptanceCriteria;
    if (isGherkin) {
      const lines = acceptanceCriteria
        .split('\n')
        .filter(line => line.trim() !== '')
        .map((line, index) => {
          const prefix =
            index % 3 === 0 ? 'Dado que ' :
            index % 3 === 1 ? 'Cuando ' :
            'Entonces ';
          return prefix + line.trim();
        });
      formattedCriteria = lines.join('\n');
    }

    const selectedSiglas = testTypes
      .map(type => `[${testTypesMap[type]}]`)
      .join('');

    const fixVersion = getFixVersion(sprint);

    const prompt = `Escribir casos de prueba de la siguiente historia de usuario. Por favor generar los casos con nombre de caso, precondición y formato dado que, cuando y entonces. organiza los casos en una tabla de la siguiente manera: 

columna Epic Id: ${epicId}
columna Story Linkages: ${cardId}
columna Caso: nombre del caso de prueba
columna Summary: ${selectedSiglas} - nombre del caso de prueba
columna Precondition: la precondicion
columna Priority: MEDIUM
columna Status: TO DO
columna Step Summary: el DADO QUE (la columna SOLO debe llamar Step Summary)
columna Test Data: el CUANDO (la columna SOLO debe llamar Test Data)
columna Expected Result: el ENTONCES (la columna SOLO debe llamar Expected Result)
columna Automatizable: True / False (baja las dos opciones y que el usuario final elija)
columna Test-Type: UI / API (baja las dos opciones y que el usuario final elija)
columna Fix Versions: ${fixVersion}

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

      {/* ÉPICA + CARD + SPRINT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">
            ID de la épica
          </label>
          <input
            type="text"
            value={epicId}
            onChange={(e) => setEpicId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            ID de la card
          </label>
          <input
            type="text"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sprint
          </label>
          <input
            type="number"
            value={sprint}
            onChange={(e) => setSprint(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
      </div>

      {/* TIPO DE PRUEBA */}
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Prueba *
        </label>

        <button
          type="button"
          onClick={() => setOpenTypes(!openTypes)}
          className={`mt-1 w-full flex justify-between items-center px-3 py-2 border 
          ${typeError ? 'border-red-500' : 'border-gray-300'} 
          rounded-md shadow-sm bg-white`}
        >
          <span className="text-gray-700">
            {testTypes.length > 0
              ? testTypes.join(', ')
              : 'Selecciona tipo(s) de prueba'}
          </span>
          <span className="text-gray-500">▼</span>
        </button>

        {openTypes && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {Object.keys(testTypesMap).map(type => (
              <label
                key={type}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={testTypes.includes(type)}
                  onChange={() => {
                    if (testTypes.includes(type)) {
                      setTestTypes(testTypes.filter(t => t !== type));
                    } else {
                      setTestTypes([...testTypes, type]);
                    }
                  }}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        )}

        {typeError && (
          <p className="text-red-600 text-sm mt-1">{typeError}</p>
        )}
      </div>

      {/* NOMBRE CARD */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre de la card
        </label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      {/* DESCRIPCIÓN */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      {/* CRITERIOS */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Criterios de Aceptación
        </label>
        <textarea
          value={acceptanceCriteria}
          onChange={(e) => setAcceptanceCriteria(e.target.value)}
          rows={5}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      {/* GHERKIN */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="gherkin"
          checked={isGherkin}
          onChange={(e) => setIsGherkin(e.target.checked)}
          className="h-4 w-4 text-indigo-600 rounded"
        />
        <label htmlFor="gherkin" className="ml-2 text-sm text-gray-700">
          Formato Gherkin (Dado que / Cuando / Entonces)
        </label>
      </div>

      {/* BOTONES */}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Generar Prompt
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600"
      >
        Limpiar Formulario
      </button>
    </form>
  );
};

export default StoryForm;
