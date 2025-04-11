import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaExclamationTriangle } from 'react-icons/fa';
import { SignInButton } from '@clerk/clerk-react';

const Chat = ({ isDarkMode, isSignedIn }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const modeClass = isDarkMode
    ? 'bg-gray-900 text-white'
    : 'bg-gradient-to-b from-[#e6f0fa] to-white text-gray-800';
  const inputBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const inputText = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const buttonBg = isDarkMode ? 'bg-indigo-600' : 'bg-indigo-700';
  const buttonHoverBg = isDarkMode ? 'hover:bg-indigo-500' : 'hover:bg-indigo-800';
  const messageUserBg = isDarkMode ? 'bg-indigo-700' : 'bg-indigo-100';
  const messageBotBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const accentColor = isDarkMode ? 'text-indigo-300' : 'text-indigo-600';

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: query, sender: 'user' }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/predict', { query });
      const { response: botResponse, warning } = response.data;

      // Add bot message
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
      setWarning(warning);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' },
      ]);
      setWarning(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${modeClass} flex flex-col items-center justify-center p-6`}>
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Chat with <span className={accentColor}>Manas</span>
        </h2>
        {isSignedIn ? (
          <>
            <div
              className={`h-[60vh] overflow-y-auto mb-4 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${borderColor}`}
            >
              {messages.length === 0 && (
                <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Start the conversation with Manas! Share how you're feeling.
                </p>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === 'user' ? messageUserBg : messageBotBg
                    } ${msg.sender === 'user' ? 'text-gray-800' : isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {warning && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  It seems you mentioned something serious. Please consider reaching out to a professional or trusted person for support.
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How are you feeling today?"
                className={`flex-1 p-3 rounded-l-lg ${inputBg} ${inputText} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
              />
              <button
                type="submit"
                className={`p-3 ${buttonBg} ${buttonHoverBg} text-white rounded-r-lg transition-colors duration-200 disabled:opacity-50`}
                disabled={loading}
              >
                {loading ? '...' : <FaPaperPlane />}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Please sign in to chat with Manas and access personalized mental health support.
            </p>
            <SignInButton mode="modal">
              <button className={`px-6 py-3 rounded-lg text-white ${buttonBg} ${buttonHoverBg} transition-colors duration-200`}>
                Sign In to Chat
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;