import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaBook, FaUserMd, FaUser, FaMoon, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useUser, SignInButton, SignOutButton } from '@clerk/clerk-react';
import About from './components/About';
import Docs from './components/Docs';
import Chat from './components/Chat';
import TypingAnimation from './components/TypingAnimations';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openChat = () => {
    navigate('/chat');
  };

  const goHome = () => {
    navigate('/');
  };

  const modeClass = isDarkMode
    ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white'
    : 'bg-gradient-to-b from-[#e6f0fa] to-white text-gray-800';
  const accentColor = isDarkMode ? 'indigo-300' : 'indigo-600';
  const buttonBg = isDarkMode ? 'gray-800' : 'indigo-600';
  const buttonHoverBg = isDarkMode ? 'gray-700' : 'indigo-700';
  const borderColor = isDarkMode ? 'indigo-500' : 'indigo-600';
  const cardBg = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const cardText = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const cardSubText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const featureCardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const featureCardText = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const featureCardSubText = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const hoverBg = isDarkMode ? 'bg-gray-700' : 'bg-indigo-50';

  return (
    <div className={`min-h-screen font-sans ${modeClass} overflow-x-hidden transition-colors duration-200`}>
      <header className={`fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 ${isDarkMode ? 'bg-gray-900 bg-opacity-95' : 'bg-white bg-opacity-90'} backdrop-blur-md shadow-lg hover:shadow-xl`}>
        <div className="flex items-center space-x-3 cursor-pointer" onClick={goHome}>
          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${isDarkMode ? 'bg-indigo-500' : 'bg-gradient-to-br from-indigo-400 to-cyan-400'} text-white text-2xl font-bold shadow-md hover:shadow-lg transition-shadow duration-200`}>
            A
          </span>
          <h1 className={`text-xl font-semibold text-${accentColor} hover:text-${accentColor} transition-colors duration-200`}>ArogyaMind</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/" className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} hover:text-${accentColor} transition-colors duration-200 flex items-center`}>
            <FaHome className="mr-1" /> Home
          </Link>
          <Link to="/about" className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} hover:text-${accentColor} transition-colors duration-200 flex items-center`}>
            <FaInfoCircle className="mr-1" /> About
          </Link>
          <Link to="/docs" className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} hover:text-${accentColor} transition-colors duration-200 flex items-center`}>
            <FaBook className="mr-1" /> Documentation
          </Link>
          <Link to="/assist" className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} hover:text-${accentColor} transition-colors duration-200 flex items-center`}>
            <FaUserMd className="mr-1" /> Assist Doctor
          </Link>
          {isSignedIn ? (
            <div className="flex items-center">
              <SignOutButton>
                <button className={`flex items-center bg-${buttonBg} text-white px-4 py-2 rounded-full hover:bg-${buttonHoverBg} transition-colors duration-200 hover:scale-105`}>
                  <FaUser className="mr-1" /> Sign Out
                </button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className={`flex items-center bg-${buttonBg} text-white px-4 py-2 rounded-full hover:bg-${buttonHoverBg} transition-colors duration-200 hover:scale-105`}>
                <FaUser className="mr-1" /> Sign In
              </button>
            </SignInButton>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMode}
            className={`flex items-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200'} px-3 py-1 rounded-full hover:bg-${buttonHoverBg} transition-colors duration-200 hover:scale-105`}
          >
            <FaMoon className="mr-1" />
          </button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} hover:text-${accentColor} transition-colors duration-200 hover:scale-105`}>
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} hover:text-${accentColor} transition-colors duration-200 hover:scale-105`}>
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} hover:text-${accentColor} transition-colors duration-200 hover:scale-105`}>
            <FaTwitter className="w-5 h-5" />
          </a>
        </div>
      </header>

      <main className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left space-y-6">
                    <h1 className={`text-4xl md:text-5xl font-bold ${cardText} leading-tight`}>
                      Discover Mental Wellness with{' '}
                      <span className={isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'}>
                        ArogyaMind
                      </span>
                      <br />
                      <TypingAnimation isDarkMode={isDarkMode} />
                    </h1>
                    <p className={`${cardSubText} text-lg`}>
                      Experience personalized AI mental health support designed for GenZ and young adults. Talk with Manas, our intelligent AI assistant, access resources, and track your well-being journey.
                    </p>
                    <div className="space-x-4">
                      <button
                        onClick={openChat}
                        className={`px-6 py-3 rounded-lg text-white transition-colors duration-200 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-700 hover:bg-indigo-800'}`}
                      >
                        Start Chatting
                      </button>
                      <button className={`bg-transparent text-${accentColor} px-6 py-3 rounded-lg border border-${borderColor} hover:bg-${hoverBg} transition-colors duration-200`}>
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3">
                    <div className={`${cardBg} p-6 rounded-lg shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h3 className={`${cardText} text-lg font-semibold mb-2`}>Mental Health Improvement</h3>
                      <p className={`${cardSubText} text-sm mb-4`}>30-day wellness trend analysis</p>
                      <div className={`w-full h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
                    </div>
                  </div>
                </section>

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
                    <div className={`${featureCardBg} p-6 rounded-lg shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
                      <div className={`text-4xl mb-4 text-${accentColor}`}>💬</div>
                      <h3 className={`${featureCardText} font-semibold`}>AI-Powered Conversations</h3>
                      <p className={`${featureCardSubText} mt-2`}>Chat with Manas AI, your personal mental health assistant, available 24/7 for support and guidance.</p>
                    </div>
                    <div className={`${featureCardBg} p-6 rounded-lg shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
                      <div className={`text-4xl mb-4 text-${accentColor}`}>📊</div>
                      <h3 className={`${featureCardText} font-semibold`}>Progress Tracking</h3>
                      <p className={`${featureCardSubText} mt-2`}>Monitor your mental wellness journey with interactive charts and personalized insights.</p>
                    </div>
                    <div className={`${featureCardBg} p-6 rounded-lg shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
                      <div className={`text-4xl mb-4 text-${accentColor}`}>🎙️</div>
                      <h3 className={`${featureCardText} font-semibold`}>Voice Assistant</h3>
                      <p className={`${featureCardSubText} mt-2`}>Speak naturally with our voice assistant for a more comfortable and accessible experience.</p>
                    </div>
                  </div>
                </section>

                <section className={`max-w-7xl mx-auto px-6 py-16 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-indigo-50'} rounded-lg`}>
                  <h2 className={`text-3xl font-bold ${cardText} mb-6`}>Start Your Mental Wellness Journey Today</h2>
                  <p className={`${cardSubText} text-lg mb-8`}>
                    Join thousands of GenZ individuals who have transformed their mental health with ArogyaMind's AI-powered support system.
                  </p>
                  <div className="space-x-4">
                    <button
                      onClick={openChat}
                      className={`bg-${buttonBg} text-white px-6 py-3 rounded-lg hover:bg-${buttonHoverBg} transition-colors duration-200`}
                    >
                      Start Chatting Now
                    </button>
                    <button className={`bg-transparent text-${accentColor} px-6 py-3 rounded-lg border border-${borderColor} hover:bg-${hoverBg} transition-colors duration-200`}>
                      Explore Resources
                    </button>
                  </div>
                </section>

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
                    <a href="#privacy" className={`text-${accentColor}`}>Privacy Policy</a> |{' '}
                    <a href="#terms" className={`text-${accentColor}`}>Terms of Service</a> |{' '}
                    <a href="#cookies" className={`text-${accentColor}`}>Cookie Policy</a>
                  </p>
                </footer>
              </>
            }
          />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/docs" element={<Docs isDarkMode={isDarkMode} />} />
          <Route path="/chat" element={<Chat isDarkMode={isDarkMode} isSignedIn={isSignedIn} />} />
          <Route path="/assist" element={<div className={`min-h-screen ${modeClass} p-6`}><h2 className={cardText}>Assist Doctor</h2><p className={cardSubText}>Feature coming soon!</p></div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;