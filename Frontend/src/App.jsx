import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import About from './components/About';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode to match sample image

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const modeClass = isDarkMode
    ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white'
    : 'bg-gradient-to-b from-[#f0f7ff] to-white text-gray-800';
  const accentColor = isDarkMode ? 'indigo-300' : 'indigo-600';
  const buttonBg = isDarkMode ? 'indigo-700' : 'indigo-600';
  const buttonHoverBg = isDarkMode ? 'indigo-600' : 'indigo-700';
  const borderColor = isDarkMode ? 'indigo-500' : 'indigo-600';
  const cardBg = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const cardText = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const cardSubText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const featureCardBg = isDarkMode ? 'bg-gray-800' : 'bg-white'; // Darker cards in dark mode
  const featureCardText = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const featureCardSubText = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const hoverBg = isDarkMode ? 'bg-gray-700' : 'bg-indigo-50';

  return (
    <div className={`min-h-screen font-sans ${modeClass} overflow-x-hidden`}>
      {/* Header */}
      <header className="sticky top-0 flex justify-between items-center p-4 max-w-7xl mx-auto z-10 bg-opacity-90 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${accentColor}`}>A</span>
          <h1 className={`text-xl font-semibold ${cardText}`}>ArogyaMind</h1>
        </div>
        <nav className="space-x-6">
          <Link to="/" className={`hover:underline ${accentColor}`}>Home</Link>
          <Link to="/about" className={`hover:underline ${accentColor}`}>About</Link>
          <a href="#documentation" className={`hover:underline ${accentColor}`}>Documentation</a>
          <a href="#assist" className={`hover:underline ${accentColor}`}>Assist Doctor</a>
          <a href="#login" className={`hover:underline ${accentColor}`}>Sign In</a>
        </nav>
        <div className="space-x-4 flex items-center">
          <button className={`text-${isDarkMode ? 'gray-300' : 'gray-500'} hover:text-${isDarkMode ? 'gray-200' : 'gray-700'}`}>
            🇬🇧
          </button>
          <button className={`text-${isDarkMode ? 'gray-300' : 'gray-500'} hover:text-${isDarkMode ? 'gray-200' : 'gray-700'}`}>
            🇮🇳
          </button>
          <button className={`text-${isDarkMode ? 'gray-300' : 'gray-500'} hover:text-${isDarkMode ? 'gray-200' : 'gray-700'}`}>
            🔍
          </button>
          <button
            onClick={toggleMode}
            className={`ml-4 px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-${isDarkMode ? 'gray-600' : 'gray-300'}`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Hero Section */}
              <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-6">
                  <h1 className={`text-4xl md:text-5xl font-bold ${cardText} leading-tight`}>
                    Discover Mental Wellness with{' '}
                    <span className={isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'}>
                      ArogyaMind
                    </span>
                    <br />
                    <span className={accentColor} style={{ fontSize: '0.75em' }}>AI-Pow</span>
                  </h1>
                  <p className={`${cardSubText} text-lg`}>
                    Experience personalized AI mental health support designed for GenZ and young adults. Talk with Manas, our intelligent AI assistant, access resources, and track your well-being journey.
                  </p>
                  <div className="space-x-4">
                  <button 
                  className={`px-6 py-3 rounded-lg text-white transition-colors duration-200 ${
                    isDarkMode 
                    ? 'bg-indigo-600 hover:bg-indigo-500' 
                    : 'bg-indigo-700 hover:bg-indigo-800'
                  }`}
                  >
                      Start Chatting
                  </button>
                    <button className={`bg-transparent ${accentColor} px-6 py-3 rounded-lg border border-${borderColor} hover:bg-${hoverBg} transition-colors duration-200`}>
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className={`${cardBg} p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700`}>
                    <h3 className={`${cardText} text-lg font-semibold mb-2`}>Mental Health Improvement</h3>
                    <p className={`${cardSubText} text-sm mb-4`}>30-day wellness trend analysis</p>
                    <div className={`w-full h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div> {/* Placeholder for graph */}
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center space-y-4">
                  <h2 className={`text-3xl font-bold ${cardText}`}>
                    Features That Empower Your Mental Health
                  </h2>
                  <p className={`${cardSubText} text-lg`}>
                    Discover the tools and resources that make ArogyaMind your personal mental health companion.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className={`${featureCardBg} p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-center`}>
                    <div className={`text-4xl mb-4 ${accentColor}`}>💬</div>
                    <h3 className={`${featureCardText} font-semibold`}>AI-Powered Conversations</h3>
                    <p className={`${featureCardSubText} mt-2`}>Chat with Manas AI, your personal mental health assistant, available 24/7 for support and guidance.</p>
                  </div>
                  <div className={`${featureCardBg} p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-center`}>
                    <div className={`text-4xl mb-4 ${accentColor}`}>📊</div>
                    <h3 className={`${featureCardText} font-semibold`}>Progress Tracking</h3>
                    <p className={`${featureCardSubText} mt-2`}>Monitor your mental wellness journey with interactive charts and personalized insights.</p>
                  </div>
                  <div className={`${featureCardBg} p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-center`}>
                    <div className={`text-4xl mb-4 ${accentColor}`}>🎙️</div>
                    <h3 className={`${featureCardText} font-semibold`}>Voice Assistant</h3>
                    <p className={`${featureCardSubText} mt-2`}>Speak naturally with our voice assistant for a more comfortable and accessible experience.</p>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className={`max-w-7xl mx-auto px-6 py-16 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-indigo-50'} rounded-lg`}>
                <h2 className={`text-3xl font-bold ${cardText} mb-6`}>Start Your Mental Wellness Journey Today</h2>
                <p className={`${cardSubText} text-lg mb-8`}>
                  Join thousands of GenZ individuals who have transformed their mental health with ArogyaMind's AI-powered support system.
                </p>
                <div className="space-x-4">
                  <button className={`bg-${buttonBg} text-white px-6 py-3 rounded-lg hover:bg-${buttonHoverBg} transition-colors duration-200`}>
                    Start Chatting Now
                  </button>
                  <button className={`bg-transparent ${accentColor} px-6 py-3 rounded-lg border border-${borderColor} hover:bg-${hoverBg} transition-colors duration-200`}>
                    Explore Resources
                  </button>
                </div>
              </section>

              {/* Footer */}
              <footer className={`max-w-7xl mx-auto px-6 py-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="flex justify-center space-x-12 mb-6">
                  <div className="space-y-2">
                    <h3 className={`${cardText} font-semibold`}>ArogyaMind</h3>
                    <p>Empower your mental well-being with AI-powered healthcare solutions.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className={`${cardText} font-semibold`}>Navigation</h3>
                    <p>Home</p>
                    <p>About</p>
                    <p>Chat</p>
                    <p>Documentation</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className={`${cardText} font-semibold`}>Resources</h3>
                    <p>Blog</p>
                    <p>Doctors</p>
                    <p>Support</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className={`${cardText} font-semibold`}>Connect</h3>
                    <p>GitHub</p>
                    <p>Twitter</p>
                    <p>LinkedIn</p>
                  </div>
                </div>
                <p className="text-sm">
                  © 2025 Neural Nexus. All rights reserved. |{' '}
                  <a href="#privacy" className={accentColor}>Privacy Policy</a> |{' '}
                  <a href="#terms" className={accentColor}>Terms of Service</a> |{' '}
                  <a href="#cookies" className={accentColor}>Cookie Policy</a>
                </p>
              </footer>
            </>
          }
        />
        <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
      </Routes>
    </div>
  );
};

export default App;