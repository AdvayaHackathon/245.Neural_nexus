import React from 'react';
import { Link } from 'react-router-dom';
// import NavBar from "@/components/layout/NavBar"; // Uncommented and assumed to exist
// import Footer from "@/components/layout/Footer"; // Uncommented and assumed to exist

const Docs = ({ isDarkMode }) => {
  const resources = [
    {
      title: "5 Effective Techniques to Manage Anxiety for GenZ Students",
      image: "https://via.placeholder.com/300x200?text=Anxiety+Techniques",
      category: "Anxiety",
      time: "6 min read",
      link: "#",
    },
    {
      title: "Recognizing Depression: Signs You Shouldn’t Ignore",
      image: "https://via.placeholder.com/300x200?text=Depression+Signs",
      category: "Depression",
      time: "7 min read",
      link: "#",
    },
    {
      title: "Quick Stress-Reduction Techniques for Busy Students",
      image: "https://via.placeholder.com/300x200?text=Stress+Reduction",
      category: "Stress",
      time: "4 min read",
      link: "#",
    },
    {
      title: "Improving Sleep Quality: A Guide for Night Owls",
      image: "https://via.placeholder.com/300x200?text=Sleep+Guide",
      category: "Sleep",
      time: "6 min read",
      link: "#",
    },
    {
      title: "The Impact of Social Media on Mental Health",
      image: "https://via.placeholder.com/300x200?text=Social+Media",
      category: "Social Health",
      time: "8 min read",
      link: "#",
    },
    {
      title: "Mindfulness for Beginners: Simple Daily Practices",
      image: "https://via.placeholder.com/300x200?text=Mindfulness",
      category: "Mindfulness",
      time: "5 min read",
      link: "#",
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#f0f7ff] text-gray-800'} flex flex-col`}>
      {/* <NavBar /> */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center">
          <div className="container mx-auto">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Documentation & Resources</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto mb-6`}>
              Explore our curated collection of mental health resources, articles, and expert advice.
            </p>
            <div className="flex justify-center mb-8">
              <select className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-2 rounded-l-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} focus:outline-none`}>
                <option>Blog Articles</option>
                <option>Expert Psychiatrists</option>
              </select>
              <input
                type="text"
                placeholder="Search articles..."
                className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-2 rounded-r-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} focus:outline-none w-1/2 md:w-1/3`}
              />
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <span className={isDarkMode ? 'text-gray-500 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}>Anxiety</span>
              <span className={isDarkMode ? 'text-gray-500 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}>Depression</span>
              <span className={isDarkMode ? 'text-gray-500 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}>Stress</span>
              <span className={isDarkMode ? 'text-gray-500 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}>Sleep</span>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-2`}>{resource.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'} text-sm mb-2`}>{resource.category}</p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>{resource.time}</p>
                  <Link to={resource.link} className={`${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'} mt-2 inline-block`}>
                    Read More <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Docs;