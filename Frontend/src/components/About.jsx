import React from 'react';

const About = ({ isDarkMode }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-[#f0f7ff]'} p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            About ArogyaMind
          </h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Our mission is to make mental healthcare accessible, personalized, and effective for GenZ and young adults through innovative AI technology.
          </p>
        </div>

        {/* Vision Section */}
        <div className={`p-6 rounded-xl mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
            Our Vision
          </h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            ArogyaMind was created with a unique yet powerful vision to revolutionize mental healthcare through innovation, personalized, and around-the-clock support powered by artificial intelligence.
          </p>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            We believe that everyone deserves access to mental health resources that understand their unique needs, speak their language, and are available whenever they're needed most.
          </p>
          <div className="flex gap-4 mt-6">
            <span className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
              GenZ Strategy
            </span>
            <span className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
              Explore Resources
            </span>
          </div>
        </div>

        {/* How ArogyaMind Helps You */}
        <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
          How ArogyaMind Helps You
        </h2>

        {/* AI-Powered Conversations */}
        <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex flex-col md:flex-row gap-6`}>
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
              alt="AI Conversation"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
              AI-Powered Conversations
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our AI assistant makes supportive, judgment-free conversations to help you process emotions and develop healthy coping strategies.
            </p>
          </div>
        </div>

        {/* Personalized Support */}
        <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex flex-col md:flex-row gap-6`}>
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
              alt="Personalized Support"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
              Personalized Support
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We adapt to your unique needs, providing personalized resources, exercises, and strategies based on your mental health journey.
            </p>
          </div>
        </div>

        {/* Comprehensive Resources */}
        <div className={`p-6 rounded-xl mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex flex-col md:flex-row gap-6`}>
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
              alt="Comprehensive Resources"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
              Comprehensive Resources
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Access our library of therapeutic articles, guided exercises, and materials designed to support your mental wellbeing and personal growth.
            </p>
          </div>
        </div>

        {/* Our Approach */}
        <div className={`p-6 rounded-xl mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
            Our Approach
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
                Evidence-Based
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Our AI is trained on established psychological approaches and evidence-based techniques for mental wellness.
              </p>
            </div>
            
            <div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
                Privacy-Centered
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Your conversations and data are private. We prioritize security and confidentiality in all of our services.
              </p>
            </div>
            
            <div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
                Continuous Improvement
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Our AI gets smarter with every conversation, helping us deliver more effective support over time.
              </p>
            </div>

            <div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>
                Team Collaboration
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                We work with mental health professionals to ensure our solutions meet clinical standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;