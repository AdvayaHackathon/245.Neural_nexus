import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Docs = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const resources = [
    {
      id: 1,
      title: "5 Effective Techniques to Manage Anxiety for GenZ Students",
      description: "Learn practical strategies to cope with anxiety during exams, social situations, and daily life. These evidence-based techniques can help you regain control.",
      category: "Anxiety",
      time: "5 min read",
      minutes: "5 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Recognizing Depression: Signs You Shouldn't Ignore",
      description: "Depression often goes unnoticed, especially in young adults. Discover the early warning signs and learn when it's time to seek professional help.",
      category: "Depression",
      time: "7 min read",
      minutes: "7 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Quick Stress-Reduction Techniques for Busy Students",
      description: "Finding time for self-care can be challenging during busy academic periods. These quick techniques can help you manage stress in just minutes.",
      category: "Stress",
      time: "4 min read",
      minutes: "9 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Improving Sleep Quality: A Guide for Night Owls",
      description: "Late-night scrolling and irregular sleep patterns can affect your mental health. Learn how to develop better sleep habits without disrupting your lifestyle.",
      category: "Sleep",
      time: "6 min read",
      minutes: "10 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "The Impact of Social Media on Mental Health",
      description: "Social media has transformed how we connect, but it can also affect our well-being. Discover healthy ways to use social platforms without negative impacts.",
      category: "Depression",
      time: "8 min read",
      minutes: "11 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Mindfulness for Beginners: Simple Daily Practices",
      description: "Mindfulness doesn't require hours of meditation. Learn how to incorporate simple mindful moments into your busy schedule for better mental health.",
      category: "Stress",
      time: "5 min read",
      minutes: "12 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    // Additional resources
    {
      id: 7,
      title: "Coping with Panic Attacks: A Step-by-Step Guide",
      description: "Learn what to do when panic strikes with these immediate coping strategies and long-term prevention techniques.",
      category: "Anxiety",
      time: "6 min read",
      minutes: "6 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      title: "Building Resilience: Strategies for Tough Times",
      description: "Develop mental toughness and emotional resilience to better handle life's challenges and setbacks.",
      category: "Stress",
      time: "7 min read",
      minutes: "13 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 9,
      title: "The Science of Sleep: Optimizing Your Rest",
      description: "Understand the sleep cycles and how to maximize your rest for better mental and physical health.",
      category: "Sleep",
      time: "8 min read",
      minutes: "14 minutes",
      link: "#",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || resource.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id}
              className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} group`}
            >
              {/* Image with gradient overlay */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}>
                    {resource.category}
                  </span>
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
                
                <h3 className={`text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {resource.title}
                </h3>
                
                <p className={`mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {resource.description}
                </p>
                
                <Link 
                  to={resource.link}
                  className={`inline-flex items-center font-medium ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'} transition-colors group-hover:underline`}
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

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className={`p-12 text-center rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              No resources found
            </h3>
            <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Docs;