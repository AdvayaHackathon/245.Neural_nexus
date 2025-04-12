import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { format } from 'date-fns';

const ChatHistory = ({ isDarkMode }) => {
  const [chatHistories, setChatHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadChatHistories();
    }
  }, [user]);

  const loadChatHistories = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/chat/history/${user.id}`);
      setChatHistories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading chat histories:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-full ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Loading chat history...
      </div>
    );
  }

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
        Chat History
      </h2>
      <div className="space-y-4">
        {chatHistories.map((history) => (
          <div
            key={history.id}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            } shadow-sm`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {format(new Date(history.createdAt), 'MMM d, yyyy h:mm a')}
              </span>
            </div>
            <div className="space-y-2">
              {JSON.parse(history.messages).map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    message.sender === 'user'
                      ? isDarkMode
                        ? 'bg-indigo-900 text-white'
                        : 'bg-indigo-100 text-indigo-900'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-white text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory; 