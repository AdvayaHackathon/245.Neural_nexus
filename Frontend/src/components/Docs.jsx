import React from 'react';

const Docs = ({ isDarkMode }) => {
  const modeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';
  const cardText = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const cardSubText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${modeClass} p-6`}>
      <h2 className={`text-3xl font-bold text-center ${cardText}`}>Documentation</h2>
      <p className={`max-w-2xl mx-auto mt-4 ${cardSubText}`}>
        Learn how to use ArogyaMind’s features and APIs.
      </p>
    </div>
  );
};

export default Docs;