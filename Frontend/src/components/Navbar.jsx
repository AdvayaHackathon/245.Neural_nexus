import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FaUser, FaMicrophone } from 'react-icons/fa';

const Navbar = ({ isDarkMode }) => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        navigate('/chat', { state: { voiceInput: transcript } });
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [navigate]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className={`text-xl font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                ArogyaMind
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/chat"
              className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Chat
            </Link>
            <Link
              to="/docs"
              className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Resources
            </Link>
            <Link
              to="/assist"
              className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Experts
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              About
            </Link>
          </div>

          {/* User Profile and Voice Chat */}
          <div className="flex items-center space-x-4">
            {/* Voice Chat Button */}
            {isSignedIn && (
              <button
                onClick={startListening}
                disabled={isListening}
                className={`voice-btn ${isListening ? 'active mic-pulse' : ''}`}
                title={isListening ? 'Listening...' : 'Start voice chat'}
              >
                <FaMicrophone className={`w-5 h-5 ${isListening ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
            )}

            {/* Existing User Profile Section */}
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center border-2 ${isDarkMode ? 'border-indigo-500' : 'border-indigo-200'}`}>
                  {user ? (
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <FaUser className={`w-4 h-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                    </div>
                  )}
                </div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user?.fullName || user?.firstName || 'User'}
                </span>
              </div>
            ) : (
              <Link
                to="/sign-in"
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  isDarkMode
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 