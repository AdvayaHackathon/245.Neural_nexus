import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import About from './components/About';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode based on new images

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const modeClass = isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-b from-[#f0f7ff] to-white text-gray-800';

  return (
    <div className={`min-h-screen font-sans ${modeClass}`}>
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>A</span>
          <h1 className="text-xl font-semibold">ArogyaMind</h1>
        </div>
        <nav className="space-x-4">
          <Link to="/" className={`hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Home</Link>
          <Link to="/about" className={`hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>About</Link>
          <a href="#documentation" className={`hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Documentation</a>
          <a href="#assist" className={`hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Assist Doctor</a>
          <a href="#login" className={`hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Sign In</a>
        </nav>
        <div className="space-x-2">
          <button className={`text-${isDarkMode ? 'gray-300' : 'gray-500'} hover:text-${isDarkMode ? 'gray-200' : 'gray-700'}`}>🇬🇧</button>
          <button className={`text-${isDarkMode ? 'gray-300' : 'gray-500'} hover:text-${isDarkMode ? 'gray-200' : 'gray-700'}`}>🇮🇳</button>
          <button className={`text-${isDarkMode ? 'gray-300' : 'gray-500'} hover:text-${isDarkMode ? 'gray-200' : 'gray-700'}`}>🔍</button>
          <button onClick={toggleMode} className={`ml-4 px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left">
                <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Discover Mental Wellness with <br /><span className={isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'}>ArogyaMind</span>
                </h1>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6>
                  Experience personalized AI mental health support designed for GenZ and young adults. Talk with Manas, our intelligent AI assistant, access resources, and track your well-being journey.
                </p>
                <div className="space-x-4">
                  <button className={`bg-${isDarkMode ? 'indigo-600' : 'indigo-600'} text-white px-6 py-2 rounded-lg hover:bg-${isDarkMode ? 'indigo-700' : 'indigo-700'}`}>Start Chatting</button>
                  <button className={`bg-transparent ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} px-6 py-2 rounded-lg border ${isDarkMode ? 'border-indigo-400' : 'border-indigo-600'} hover:bg-${isDarkMode ? 'gray-800' : 'indigo-50'}`}>Learn More</button>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-4 rounded-lg shadow-lg`}>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Mental Health Improvement</h3>
                  <div className={`w-64 h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}> {/* Placeholder for graph */}
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto p-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center mb-8`}>
                Features That Empower Your Mental Health
              </h2>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center mb-10>
                Discover the tools and resources that make ArogyaMind your personal mental health companion
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg text-center`}>
                  <div className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4>💬</div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>AI-Powered Conversations</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Chat with Manas, our AI personal mental health assistant, available 24/7 for support and guidance.</p>
                </div>
                <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg text-center`}>
                  <div className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4>📊</div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Progress Tracking</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Monitor your wellness journey with interactive charts and personalized insights.</p>
                </div>
                <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg text-center`}>
                  <div className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4>🎙️</div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Voice Assistant</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Speak naturally with our voice assistant for a more comfortable and accessible experience.</p>
                </div>
                <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg text-center`}>
                  <div className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4>👩‍⚕️</div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Professional Connection</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Get connected with mental health professionals when you need additional support.</p>
                </div>
                <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg text-center`}>
                  <div className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4>📚</div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Educational Resources</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Access articles, guides, and materials to enhance your mental health knowledge.</p>
                </div>
                <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg text-center`}>
                  <div className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4>🎯</div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Personalized Recommendations</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Receive tailored advice and resources based on your unique mental health needs.</p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className={`max-w-7xl mx-auto p-6 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-indigo-50'} rounded-lg my-10`}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Start Your Mental Wellness Journey Today</h2>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6>
                Join thousands of GenZ individuals who have transformed their mental health with ArogyaMind's AI-powered support system.
              </p>
              <div className="space-x-4">
                <button className={`bg-${isDarkMode ? 'indigo-600' : 'indigo-600'} text-white px-6 py-2 rounded-lg hover:bg-${isDarkMode ? 'indigo-700' : 'indigo-700'}`}>Start Chatting Now</button>
                <button className={`bg-transparent ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} px-6 py-2 rounded-lg border ${isDarkMode ? 'border-indigo-400' : 'border-indigo-600'} hover:bg-${isDarkMode ? 'gray-800' : 'indigo-50'}`}>Explore Resources</button>
              </div>
            </section>

            {/* Footer */}
            <footer className={`max-w-7xl mx-auto p-6 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex justify-center space-x-8 mb-4">
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>ArogyaMind</h3>
                  <p>Empower your mental well-being with AI-powered healthcare solutions.</p>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Navigation</h3>
                  <p>Home</p>
                  <p>About</p>
                  <p>Chat</p>
                  <p>Documentation</p>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Resources</h3>
                  <p>Blog</p>
                  <p>Doctors</p>
                  <p>Support</p>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Connect</h3>
                  <p>GitHub</p>
                  <p>Twitter</p>
                  <p>LinkedIn</p>
                </div>
              </div>
              <p className="text-xs">© 2025 Neural Nexus. All rights reserved. | <a href="#privacy" className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}>Privacy Policy</a> | <a href="#terms" className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}>Terms of Service</a> | <a href="#cookies" className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}>Cookie Policy</a></p>
            </footer>
          </>
        } />
        <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
      </Routes>
    </div>
  );
};

export default App;