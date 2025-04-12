import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaExclamationTriangle, FaRobot, FaUser, FaMicrophone, FaVolumeUp } from 'react-icons/fa';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { format } from 'date-fns';

// Placeholder image for Manas (replace with your own if desired)
const MANAS_AVATAR = 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW55fGVufDB8fDB8fHww';

const Chat = ({ isDarkMode, isSignedIn }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef(null);
  const { user } = useUser();
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(null);

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
  const timestampColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    speechSynthesisRef.current = window.speechSynthesis;
    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if (speechSynthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newMessage = {
      text: query,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, newMessage]);
    setQuery('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/predict', { query });
      const { response: botResponse, warning } = response.data;

      setMessages((prev) => [...prev, {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setWarning(warning);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, something went wrong. Please try again.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      setWarning(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 ${modeClass} flex flex-col pt-20`}>
      {/* Chat Container */}
      <div className="flex-1 flex flex-col w-full h-full">
        {/* Header */}
        <div className={`p-4 border-b ${borderColor} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center`}>
              <FaRobot className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Chat with <span className={accentColor}>Manas</span>
              </h2>
              <p className={`text-sm ${timestampColor}`}>AI Mental Health Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-full ${isListening ? 'bg-red-500' : buttonBg} text-white transition-colors duration-200`}
              title={isListening ? 'Stop Listening' : 'Start Voice Input'}
            >
              <FaMicrophone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        {isSignedIn ? (
          <>
            <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center`}>
                    <FaRobot className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
                  </div>
                  <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                    Start the conversation with Manas! Share how you're feeling.
                  </p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[80%]`}>
                    {msg.sender === 'bot' && (
                      <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center flex-shrink-0`}>
                        <FaRobot className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
                      </div>
                    )}
                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={user.profileImageUrl || 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydmJGTjFSV2tNWlRKQ3dzRjFpSFZ3V2xQcXoifQ?width=96'}
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydmJGTjFSV2tNWlRKQ3dzRjFpSFZ3V2xQcXoifQ?width=96';
                          }}
                        />
                      </div>
                    )}
                    <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? `${messageUserBg} text-white rounded-tr-none`
                            : `${messageBotBg} ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} rounded-tl-none`
                        } shadow-sm`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs ${timestampColor}`}>
                          {format(msg.timestamp, 'h:mm a')}
                        </span>
                        {msg.sender === 'bot' && (
                          <button
                            onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.text)}
                            className={`p-1 rounded-full ${isSpeaking ? 'bg-red-500' : buttonBg} text-white transition-colors duration-200`}
                            title={isSpeaking ? 'Stop Speaking' : 'Read Message'}
                          >
                            <FaVolumeUp className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
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
            <form onSubmit={handleSubmit} className={`p-4 border-t ${borderColor} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="How are you feeling today?"
                  className={`flex-1 p-3 rounded-full ${inputBg} ${inputText} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className={`p-3 ${buttonBg} text-white rounded-full ${buttonHoverBg} transition-colors duration-200 disabled:opacity-50`}
                  disabled={loading}
                >
                  {loading ? '...' : <FaPaperPlane />}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center mx-auto mb-4`}>
                <FaRobot className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
              </div>
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