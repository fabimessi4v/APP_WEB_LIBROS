import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los libros desde la API
  const fetchLibros = async () => {
    try {
      const response = await fetch('http://localhost:3000/libros'); // Cambia esta URL por la de tu API
      const data = await response.json();
      setLibros(data); // Asume que data es un array de libros en el formato proporcionado
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    } finally {
      setLoading(false);
    }
  };

  // Llama a la API cuando el componente se monte
  useEffect(() => {
    fetchLibros();
  }, []);

  if (loading) {
    return <div className="h-screen bg-red-600 text-white">Cargando...</div>;
  }

  return (
    <div className="h-screen bg-red-600 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Vista Principal</h1>
      {libros.length === 0 ? (
        <p>No hay libros disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {libros.map((libro) => (
            <li key={libro._id} className="bg-white text-black p-4 rounded shadow flex items-center space-x-4">
              {/* Contenido del libro a la izquierda */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{libro.title}</h2>
                <p className="text-gray-700">Autor: {libro.author}</p>
                <p className="text-gray-700">Género: {libro.genre}</p>
                <p className="text-gray-700">Idioma: {libro.language}</p>
                <p className="text-gray-700">Publicado en: {libro.publication_date}</p>
                <p className="text-gray-700">Formato: {libro.format} ({libro.file_size})</p>
                <p className="text-gray-700">ISBN: {libro.isbn}</p>
                <p className="text-gray-700">Descripción: {libro.description}</p>
                <div className="mt-2">
                  <a
                    href={libro.download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Descargar
                  </a>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700 font-bold">Etiquetas:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {libro.tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Imagen del libro a la derecha */}
              <div className="flex-shrink-0 border-2 border-gray-300 p-2 rounded-lg bg-white">
                {libro.image_link && (
                  <img 
                    src={libro.image_link} 
                    alt={libro.title} 
                    className="w-32 h-48 object-cover rounded-md"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
