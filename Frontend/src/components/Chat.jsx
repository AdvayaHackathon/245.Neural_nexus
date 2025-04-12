import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaExclamationTriangle, FaRobot, FaUser, FaMicrophone, FaVolumeUp } from 'react-icons/fa';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

// Base64 encoded ArogyaMind logo
const MANAS_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMjUwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0yNTAgMTAwQzE2Ny4xNTcgMTAwIDEwMCAxNjcuMTU3IDEwMCAyNTBDMTAwIDMzMi44NDMgMTY3LjE1NyA0MDAgMjUwIDQwMEMzMzIuODQzIDQwMCA0MDAgMzMyLjg0MyA0MDAgMjUwQzQwMCAxNjcuMTU3IDMzMi44NDMgMTAwIDI1MCAxMDBaTTI1MCAzNzVDMTgwLjk2NCAzNzUgMTI1IDMxOS4wMzYgMTI1IDI1MEMxMjUgMTgwLjk2NCAxODAuOTY0IDEyNSAyNTAgMTI1QzMxOS4wMzYgMTI1IDM3NSAxODAuOTY0IDM3NSAyNTBDMzc1IDMxOS4wMzYgMzE5LjAzNiAzNzUgMjUwIDM3NVoiIGZpbGw9IiMzQjgyRjYiLz4KPHBhdGggZD0iTTI1MCAxNTBDMTk0Ljc3MiAxNTAgMTUwIDE5NC43NzIgMTUwIDI1MEMxNTAgMzA1LjIyOCAxOTQuNzcyIDM1MCAyNTAgMzUwQzMwNS4yMjggMzUwIDM1MCAzMDUuMjI4IDM1MCAyNTBDMzUwIDE5NC43NzIgMzA1LjIyOCAxNTAgMjUwIDE1MFpNMjUwIDMyNUMyMDguNTc5IDMyNSAxNzUgMjkxLjQyMSAxNzUgMjUwQzE3NSAyMDguNTc5IDIwOC41NzkgMTc1IDI1MCAxNzVDMjkxLjQyMSAxNzUgMzI1IDIwOC41NzkgMzI1IDI1MEMzMjUgMjkxLjQyMSAyOTEuNDIxIDMyNSAyNTAgMzI1WiIgZmlsbD0iIzYwQTVGQSIvPgo8cGF0aCBkPSJNMjUwIDIwMEMyMjIuMzg2IDIwMCAyMDAgMjIyLjM4NiAyMDAgMjUwQzIwMCAyNzcuNjE0IDIyMi4zODYgMzAwIDI1MCAzMDBDMjc3LjYxNCAzMDAgMzAwIDI3Ny42MTQgMzAwIDI1MEMzMDAgMjIyLjM4NiAyNzcuNjE0IDIwMCAyNTAgMjAwWk0yNTAgMjc1QzIzNi4xOTMgMjc1IDIyNSAyNjMuODA3IDIyNSAyNTBDMjI1IDIzNi4xOTMgMjM2LjE5MyAyMjUgMjUwIDIyNUMyNjMuODA3IDIyNSAyNzUgMjM2LjE5MyAyNzUgMjUwQzI3NSAyNjMuODA3IDI2My44MDcgMjc1IDI1MCAyNzVaIiBmaWxsPSIjOTNDNUZEIi8+Cjwvc3ZnPg==';

const Chat = ({ isDarkMode, isSignedIn }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef(null);
  const { user } = useUser();
  const location = useLocation();
  const [recognition, setRecognition] = useState(null);
  const synth = window.speechSynthesis;

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

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSpeak = (text) => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    synth.speak(utterance);
  };

  // Handle voice input from Navbar
  useEffect(() => {
    if (location.state?.voiceInput) {
      setQuery(location.state.voiceInput);
      handleSendMessage(location.state.voiceInput);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, sender: 'user' }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/predict', { query: text });
      const { response: botResponse, warning } = response.data;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(query);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`fixed inset-0 ${modeClass} flex flex-col pt-20`}>
      {/* Chat Container */}
      <div className="flex-1 flex flex-col w-full h-full">
        {/* Header */}
        <div className={`p-4 border-b ${borderColor}`}>
          <h2 className="text-2xl font-bold text-center">
            Chat with <span className={accentColor}>Manas</span>
          </h2>
        </div>

        {/* Chat Area */}
        {isSignedIn ? (
          <>
            <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              {messages.length === 0 && (
                <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-10`}>
                  Start the conversation with Manas! Share how you're feeling.
                </p>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center border-2 ${isDarkMode ? 'border-indigo-500' : 'border-indigo-200'}`}>
                        <img 
                          src={MANAS_AVATAR}
                          alt="Manas"
                          className="w-8 h-8 md:w-10 md:h-10 object-contain"
                        />
                      </div>
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className={`voice-btn ${isSpeaking ? 'active' : ''}`}
                        title={isSpeaking ? 'Stop speaking' : 'Read message'}
                      >
                        <FaVolumeUp className={`w-5 h-5 ${isSpeaking ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                      </button>
                    </div>
                  )}
                  <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                    msg.sender === 'user' ? messageUserBg : messageBotBg
                  } ${msg.sender === 'user' ? 'text-gray-800' : isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && user && (
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center border-2 ${isDarkMode ? 'border-indigo-500' : 'border-indigo-200'}`}>
                      <img 
                        src={user.imageUrl}
                        alt={user.fullName || 'User'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
              {warning && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center mx-auto max-w-md">
                  <FaExclamationTriangle className="mr-2" />
                  It seems you mentioned something serious. Please consider reaching out to a professional or trusted person for support.
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className={`flex items-center p-4 border-t ${borderColor}`}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How are you feeling today?"
                className={`flex-1 p-3 rounded-l-lg ${inputBg} ${inputText} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading || isListening}
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-3 ${buttonBg} ${buttonHoverBg} text-white transition-colors duration-200 disabled:opacity-50 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
                disabled={loading}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <FaMicrophone className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
              </button>
              <button
                type="submit"
                className={`p-3 ${buttonBg} ${buttonHoverBg} text-white rounded-r-lg transition-colors duration-200 disabled:opacity-50`}
                disabled={loading || isListening}
              >
                {loading ? '...' : <FaPaperPlane />}
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;