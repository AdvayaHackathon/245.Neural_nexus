import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Docs = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Using NewsAPI to fetch mental health articles
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'mental health OR mental wellness OR mental wellbeing',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 10,
            apiKey: import.meta.env.VITE_NEWS_API_KEY
          }
        });

        setResources(response.data.articles.map(article => ({
          id: article.url,
          title: article.title,
          description: article.description || 'Read more about this mental health topic...',
          category: 'Mental Health',
          time: '5 min read',
          minutes: '5 minutes',
          link: article.url,
          image: article.urlToImage || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        })));
      } catch (err) {
        setError('Failed to fetch articles. Please try again later.');
        // Fallback to some default articles if API fails
        setResources([
          {
            id: 1,
            title: "Understanding Anxiety: A Comprehensive Guide",
            description: "Learn about the different types of anxiety, their symptoms, and effective coping strategies.",
            category: "Anxiety",
            time: "5 min read",
            minutes: "5 minutes",
            link: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/anxiety",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          },
          {
            id: 2,
            title: "Depression: Signs, Symptoms, and Treatment Options",
            description: "A detailed look at depression, its impact on daily life, and available treatment methods.",
            category: "Depression",
            time: "7 min read",
            minutes: "7 minutes",
            link: "https://www.nimh.nih.gov/health/topics/depression",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryFilter]);

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-[#f0f7ff]'} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            Documentation & Resources
          </h1>
          
          {/* Enhanced Search Bar */}
          <div className={`max-w-2xl mx-auto p-1 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search mental health resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-4 pl-12 rounded-full border-0 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              <svg 
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex justify-center space-x-4">
            {['All', 'Anxiety', 'Depression', 'Stress', 'Mindfulness', 'Self-Care'].map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  categoryFilter === category
                    ? isDarkMode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-100 text-indigo-700'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDarkMode ? 'border-indigo-500' : 'border-indigo-600'}`}></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'} text-center mb-8`}>
            {error}
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="relative h-48">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${
                  isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {resource.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {resource.minutes}
                  </span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {resource.time}
                  </span>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {resource.title}
                </h3>
                
                <p className={`mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {resource.description}
                </p>
                
                <Link 
                  to={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center font-medium ${
                    isDarkMode
                      ? 'text-indigo-400 hover:text-indigo-300'
                      : 'text-indigo-600 hover:text-indigo-500'
                  } transition-colors group-hover:underline`}
                >
                  Read More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;