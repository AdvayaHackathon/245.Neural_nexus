import React from 'react';

const Assist = ({ isDarkMode }) => {
  const doctors = [
    {
      name: "Dr. Anisha Sharma",
      title: "Clinical Psychologist",
      bio: "Dr. Sharma specializes in cognitive behavioral therapy and has extensive experience working with young adults dealing with anxiety and depression.",
      email: "dr.sharma@example.com",
      phone: "+91-9876543210",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Dr. Rajiv Patel",
      title: "Psychiatrist",
      bio: "With over 15 years of experience, Dr. Patel focuses on mood disorders and stress management for college students and young professionals.",
      email: "dr.patel@example.com",
      phone: "+91-9876543211",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Dr. Meera Gupta",
      title: "Child & Adolescent Psychologist",
      bio: "Dr. Gupta specializes in helping teenagers and young adults navigate academic pressure, social anxiety, and family relationships.",
      email: "dr.gupta@example.com",
      phone: "+91-9876543212",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-[#f0f7ff]'} p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            Blog Articles
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Expert Psychiatrists
          </p>
          <div className={`h-1 w-24 mx-auto mt-4 ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'}`}></div>
        </div>

        {/* Doctors List - Column Layout */}
        <div className="space-y-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Doctor Image - Left Column */}
                <div className="md:w-1/4 flex justify-center">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                  />
                </div>
                
                {/* Doctor Details - Right Column */}
                <div className="md:w-3/4">
                  <div className="border-b pb-4 mb-4">
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                      {doctor.name}
                    </h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {doctor.title}
                    </p>
                  </div>
                  
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {doctor.bio}
                  </p>
                  
                  <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="font-medium">Email:</span> {doctor.email}
                    </p>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="font-medium">Phone:</span> {doctor.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assist;