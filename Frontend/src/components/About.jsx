import React from 'react';

const About = ({ isDarkMode }) => {
  const modeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-800';
  const accentColor = isDarkMode ? 'indigo-400' : 'indigo-600';

  return (
    <div className={`min-h-screen ${modeClass} p-8 space-y-16`}>
      <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl animate-fade-in`}>
        <h1 className={`text-4xl md:text-5xl font-extrabold text-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-6`}>
          About ArogyaMind
        </h1>
        <div className="space-y-6 text-lg">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            ArogyaMind is a revolutionary platform designed to support the mental well-being of GenZ and young adults
            through the power of artificial intelligence. Our mission is to provide personalized, accessible, and
            effective mental health solutions to empower individuals on their wellness journey.
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            With our intelligent AI assistant, Manas, users can engage in 24/7 conversations, track their progress, and
            access a wealth of educational resources. We collaborate with licensed mental health professionals to
            ensure a holistic approach to care, making ArogyaMind a trusted companion for mental health.
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Founded in 2024, ArogyaMind is backed by Neural Nexus, a leader in AI-driven healthcare innovations. Our
            goal is to transform the mental health landscape by leveraging cutting-edge technology and compassionate
            support.
          </p>
        </div>
      </div>
      <div className="text-center">
        <button
          className={`bg-${accentColor} text-white px-6 py-3 rounded-full hover:bg-${isDarkMode ? 'indigo-500' : 'indigo-700'} transition-all duration-200 shadow-md`}
          onClick={() => window.history.back()}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default About;