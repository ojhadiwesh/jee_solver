import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[#2563EB] min-h-[600px] px-6 py-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Hero content */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-white mb-4">
            Master IIT JEE Through{' '}
            <span className="text-yellow-300">Problem Solving</span>
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Focus on what matters most: solving problems and building confidence for your JEE success
          </p>
          <div className="flex gap-4">
            <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-yellow-300 transition-colors">
              Start Solving Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
              View Problem Library
            </button>
          </div>
        </div>

        {/* Right side - Challenge card */}
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
          <h2 className="text-xl font-semibold mb-4">Today's Challenge Problem</h2>
          <p className="text-gray-600 mb-4">
            A particle is projected with velocity 20 m/s at an angle of 60° to the horizontal. Find the maximum height reached by the particle. (g = 10 m/s²)
          </p>
          <div className="flex gap-2 mb-4">
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