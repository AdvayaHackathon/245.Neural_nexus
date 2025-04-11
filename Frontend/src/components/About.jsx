import React from 'react';

const About = ({ isDarkMode }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#f0f7ff] text-gray-800'} p-6`}>
      <h1 className={`text-4xl font-bold text-center mb-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>About ArogyaMind</h1>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4>
        ArogyaMind is a revolut
        ionary platform designed to support the mental well-being of GenZ and young adults through the power of artificial intelligence. Our mission is to provide personalized, accessible, and effective mental health solutions to empower individuals on their wellness journey.
      </p>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4>
        With our intelligent AI assistant, Manas, users can engage in 24/7 conversations, track their progress, and access a wealth of educational resources. We collaborate with licensed mental health professionals to ensure a holistic approach to care, making ArogyaMind a trusted companion for mental health.
      </p>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4>
        Founded in 2024, ArogyaMind is backed by Neural Nexus, a leader in AI-driven healthcare innovations. Our goal is to transform the mental health landscape by leveraging cutting-edge technology and compassionate support.
      </p>
      <div className="text-center mt-6">
        <button
          className={`px-6 py-2 rounded-lg ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          onClick={() => window.history.back()}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default About;