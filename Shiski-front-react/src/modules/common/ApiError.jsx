import React from 'react';

const ApiError = ({ error }) => {
  if (!error) return null;

  let errorMessage = 'Ha ocurrido un error inesperado';
  let statusCode = null;

  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    statusCode = error.response.status;
    errorMessage = error.response.data.message || error.response.data.error || errorMessage;
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
  } else {
    // Algo ocurrió al configurar la petición
    errorMessage = error.message || errorMessage;
  }

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      {statusCode && <strong className="font-bold">Error {statusCode}: </strong>}
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export default ApiError;