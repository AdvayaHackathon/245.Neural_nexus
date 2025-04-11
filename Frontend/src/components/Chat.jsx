import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = ({ isDarkMode }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Manas, your mental health assistant. How are you feeling today?", time: "08:50 PM", sender: 'bot' },
    { id: 2, text: "That's completely normal to feel that way. Many people go through similar experiences.", time: "08:51 PM", sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), sender: 'user' }]);
      setInputMessage('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, text: "Thanks for sharing! How can I assist you further?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), sender: 'bot' }]);
      }, 1000);
    }
  };

  const accentColor = isDarkMode ? 'indigo-300' : 'indigo-600';
  const cardBg = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const cardText = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const cardSubText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const buttonBg = isDarkMode ? 'indigo-700' : 'indigo-600';
  const buttonHoverBg = isDarkMode ? 'indigo-600' : 'indigo-700';
  const borderColor = isDarkMode ? 'indigo-500' : 'indigo-600';

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${cardBg} flex flex-col`}>
      {/* Header with Back Button */}
      

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto" id="chat-container">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'bot' ? `bg-${buttonBg} text-white` : `${isDarkMode ? 'bg-gray-700' : 'bg-indigo-100'} text-${cardText}`}`}>
              {message.text}
            </div>
            <div className={`text-xs ${cardSubText} mt-1`}>{message.time}</div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-${borderColor} flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="How can I help you?"
          className={`flex-1 p-2 rounded-l-lg ${cardBg} border border-${borderColor} text-${cardText} focus:outline-none`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-r-lg ${buttonBg} text-white hover:bg-${buttonHoverBg} transition-colors duration-200`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
        <button
          type="button"
          className={`ml-2 px-4 py-2 rounded ${buttonBg} text-white hover:bg-${buttonHoverBg} transition-colors duration-200`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;