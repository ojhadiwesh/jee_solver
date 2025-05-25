import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[#2563EB] min-h-[400px] md:min-h-[600px] px-4 md:px-6 py-8 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left side - Hero content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Master IIT JEE Through{' '}
            <span className="text-yellow-300">Problem Solving</span>
          </h1>
          <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8">
            Focus on what matters most: solving problems and building confidence for your JEE success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-yellow-400 text-blue-900 px-6 md:px-8 py-3 rounded-md font-semibold hover:bg-yellow-300 transition-colors w-full sm:w-auto">
              Start Solving Now
            </button>
            <button className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto">
              View Problem Library
            </button>
          </div>
        </div>

        {/* Right side - Challenge card */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-auto max-w-md">
          <h2 className="text-xl font-semibold mb-4">Today's Challenge Problem</h2>
          <p className="text-gray-600 mb-4">
            A particle is projected with velocity 20 m/s at an angle of 60° to the horizontal. Find the maximum height reached by the particle. (g = 10 m/s²)
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Physics
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Medium
            </span>
          </div>
          <button className="w-full bg-[#2563EB] text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
            Solve This Problem
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 