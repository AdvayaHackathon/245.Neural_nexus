import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaExclamationTriangle, FaMicrophone, FaVolumeUp, FaHistory, FaTimes } from 'react-icons/fa';
import { SignInButton, useUser } from '@clerk/clerk-react';

// Base64 encoded ArogyaMind logo
const MANAS_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMjUwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0yNTAgMTAwQzE2Ny4xNTcgMTAwIDEwMCAxNjcuMTU3IDEwMCAyNTBDMTAwIDMzMi44NDMgMTY3LjE1NyA0MDAgMjUwIDQwMEMzMzIuODQzIDQwMCA0MDAgMzMyLjg0MyA0MDAgMjUwQzQwMCAxNjcuMTU3IDMzMi44NDMgMTAwIDI1MCAxMDBaTTI1MCAzNzVDMTgwLjk2NCAzNzUgMTI1IDMxOS4wMzYgMTI1IDI1MEMxMjUgMTgwLjk2NCAxODAuOTY0IDEyNSAyNTAgMTI1QzMxOS4wMzYgMTI1IDM3NSAxODAuOTY0IDM3NSAyNTBDMzc1IDMxOS4wMzYgMzE5LjAzNiAzNzUgMjUwIDM3NVoiIGZpbGw9IiMzQjgyRjYiLz4KPHBhdGggZD0iTTI1MCAxNTBDMTk0Ljc3MiAxNTAgMTUwIDE5NC43NzIgMTUwIDI1MEMxNTAgMzA1LjIyOCAxOTQuNzcyIDM1MCAyNTAgMzUwQzMwNS4yMjggMzUwIDM1MCAzMDUuMjI4IDM1MCAyNTBDMzUwIDE5NC43NzIgMzA1LjIyOCAxNTAgMjUwIDE1MFpNMjUwIDMyNUMyMDguNTc5IDMyNSAxNzUgMjkxLjQyMSAxNzUgMjUwQzE3NSAyMDguNTc5IDIwOC41NzkgMTc1IDI1MCAxNzVDMjkxLjQyMSAxNzUgMzI1IDIwOC41NzkgMzI1IDI1MEMzMjUgMjkxLjQyMSAyOTEuNDIxIDMyNSAyNTAgMzI1WiIgZmlsbD0iIzYwQTVGQSIvPgo8cGF0aCBkPSJNMjUwIDIwMEMyMjIuMzg2IDIwMCAyMDAgMjIyLjM4NiAyMDAgMjUwQzIwMCAyNzcuNjE0IDIyMi4zODYgMzAwIDI1MCAzMDBDMjc3LjYxNCAzMDAgMzAwIDI3Ny42MTQgMzAwIDI1MEMzMDAgMjIyLjM4NiAyNzcuNjE0IDIwMCAyNTAgMjAwWk0yNTAgMjc1QzIzNi4xOTMgMjc1IDIyNSAyNjMuODA3IDIyNSAyNTBDMjI1IDIzNi4xOTMgMjM2LjE5MyAyMjUgMjUwIDIyNUMyNjMuODA3IDIyNSAyNzUgMjM2LjE5MyAyNzUgMjUwQzI3NSAyNjMuODA3IDI2My44MDcgMjc1IDI1MCAyNzVaIiBmaWxsPSIjOTNDNUZEIi8+Cjwvc3ZnPg==';

const Chat = ({ isDarkMode, isSignedIn }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  const { user } = useUser();

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

  // Sync user with MongoDB
  useEffect(() => {
    if (user) {
      const syncUser = async () => {
        try {
          await axios.post('http://localhost:5000/api/users/sync', {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            fullName: user.fullName,
            imageUrl: user.imageUrl
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      };
      syncUser();
    }
  }, [user]);

  // Load chat history from MongoDB
  useEffect(() => {
    if (user) {
      const loadHistory = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${user.id}/history`);
          setChatHistory(response.data);
        } catch (error) {
          console.error('Error loading chat history:', error);
        }
      };
      loadHistory();
    }
  }, [user]);

  // Modified save chat history logic
  useEffect(() => {
    if (user && messages.length > 0) {
      const lastSavedChat = chatHistory[0];
      const currentMessages = JSON.stringify(messages);
      
      if (!lastSavedChat || JSON.stringify(lastSavedChat.messages) !== currentMessages) {
        const conversation = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          messages: messages,
          viewed: false
        };

        const saveHistory = async () => {
          try {
            const response = await axios.post(`http://localhost:5000/api/users/${user.id}/history`, {
              conversation
            });
            setChatHistory(response.data);
          } catch (error) {
            console.error('Error saving chat history:', error);
          }
        };
        saveHistory();
      }
    }
  }, [messages, user?.id]);

  const loadConversation = async (conversation) => {
    setMessages(conversation.messages);
    setShowHistory(false);
    
    try {
      await axios.patch(`http://localhost:5000/api/users/${user.id}/history/${conversation.id}`, {
        viewed: true
      });
      
      const response = await axios.get(`http://localhost:5000/api/users/${user.id}/history`);
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error updating conversation status:', error);
    }
  };

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
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      window.recognition = recognition;
    }
  }, []);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      window.recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser. Please use Chrome.');
    }
  };

  const stopListening = () => {
    if ('webkitSpeechRecognition' in window) {
      window.recognition.stop();
      setIsListening(false);
    }
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

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

  // Function to start a new chat
  const startNewChat = () => {
    setMessages([]);
    setQuery('');
    setWarning(false);
  };

  return (
    <div className={`fixed inset-0 ${modeClass} flex flex-col pt-20`}>
      <div className="flex-1 flex flex-col w-full h-full relative">
        {/* Header */}
        <div className={`p-4 border-b ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">
                Chat with <span className={accentColor}>Manas</span>
              </h2>
              <button
                onClick={startNewChat}
                className={`px-3 py-1 text-sm rounded-full border ${borderColor} hover:bg-gray-700/10 transition-colors`}
                title="Start a new chat"
              >
                New Chat
              </button>
            </div>
            <div className="flex items-center gap-4">
              {isListening && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm text-red-500">Listening...</span>
                </div>
              )}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-full hover:bg-gray-700/10 transition-colors ${showHistory ? 'text-indigo-500' : ''}`}
                title="Chat History"
              >
                <FaHistory className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat History Sidebar */}
        {showHistory && (
          <div className={`absolute right-0 top-0 h-full w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-l ${borderColor} transform transition-transform z-10 overflow-y-auto`}>
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat History</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={startNewChat}
                  className={`px-3 py-1 text-sm rounded-full border ${borderColor} hover:bg-gray-700/10 transition-colors`}
                >
                  New Chat
                </button>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 rounded-full hover:bg-gray-700/10"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {chatHistory.length === 0 ? (
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No chat history yet
                </p>
              ) : (
                chatHistory.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => loadConversation(conv)}
                    className={`w-full p-3 rounded-lg text-left ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                    } transition-colors ${
                      !conv.viewed 
                        ? (isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50') 
                        : ''
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {new Date(conv.date).toLocaleDateString()} - {new Date(conv.date).toLocaleTimeString()}
                      {!conv.viewed && (
                        <span className="ml-2 text-xs px-2 py-1 rounded-full bg-indigo-500 text-white">
                          New
                        </span>
                      )}
                    </div>
                    <div className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {conv.messages[0]?.text.substring(0, 50)}...
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

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
                  className={`flex items-start mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mx-4`}
                >
                  {msg.sender === 'bot' && (
                    <div className="flex items-start space-x-2">
                      <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center border-2 ${isDarkMode ? 'border-indigo-500' : 'border-indigo-200'}`}>
                        <img 
                          src={MANAS_AVATAR}
                          alt="Manas"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className={`voice-btn flex-shrink-0 ${isSpeaking ? 'active' : ''}`}
                        title={isSpeaking ? 'Stop speaking' : 'Read message'}
                      >
                        <FaVolumeUp className={`w-5 h-5 ${isSpeaking ? 'text-white' : ''}`} />
                      </button>
                    </div>
                  )}
                  <div className={`${
                    msg.sender === 'user' 
                      ? 'ml-4 ' + messageUserBg 
                      : 'mr-4 ' + messageBotBg
                  } p-6 rounded-lg shadow-sm ${
                    msg.sender === 'user' ? 'text-white' : isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  } ${
                    msg.sender === 'bot' 
                      ? 'min-w-[400px] w-[85%] whitespace-pre-wrap' 
                      : 'max-w-lg'
                  } text-base leading-relaxed`}>
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && user && (
                    <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center border-2 ${isDarkMode ? 'border-indigo-500' : 'border-indigo-200'}`}>
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
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="How are you feeling today?"
                  className={`flex-1 p-3 rounded-lg ${inputBg} ${inputText} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  disabled={loading || isListening}
                />
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`voice-btn ${isListening ? 'active mic-pulse' : ''}`}
                  disabled={loading}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  <FaMicrophone className={`w-5 h-5 ${isListening ? 'text-white' : ''}`} />
                </button>
                <button
                  type="submit"
                  className={`p-3 rounded-lg ${buttonBg} ${buttonHoverBg} text-white transition-colors duration-200 disabled:opacity-50`}
                  disabled={loading || isListening || !query.trim()}
                >
                  {loading ? '...' : <FaPaperPlane />}
                </button>
              </div>
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