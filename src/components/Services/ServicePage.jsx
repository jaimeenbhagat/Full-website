import React from "react";
import { X } from "lucide-react";

const ServicePage = ({ service, onClose }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-900 bg-opacity-20 border-green-400 border-opacity-30';
      case 'medium': return 'text-yellow-400 bg-yellow-900 bg-opacity-20 border-yellow-400 border-opacity-30';
      case 'hard': return 'text-red-400 bg-red-900 bg-opacity-20 border-red-400 border-opacity-30';
      default: return 'text-gray-400 bg-gray-900 bg-opacity-20 border-gray-400 border-opacity-30';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center p-2 sm:p-4 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="bg-gray-900 text-white rounded-xl sm:rounded-2xl max-w-4xl w-full my-2 sm:my-8 relative border border-gray-700 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 hover:border-[#00FFAB] transition-all duration-200 z-10"
        >
          <X size={16} className="text-gray-300 hover:text-[#00FFAB]" />
        </button>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6 pr-8 sm:pr-0">
            <div className="bg-gradient-to-br from-[#00FFAB] to-green-400 p-2 sm:p-3 rounded-xl flex-shrink-0">
              <span className="text-xl sm:text-2xl">🎯</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h2>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getDifficultyColor(service.difficulty)} self-start`}>
                  {getDifficultyIcon(service.difficulty)} {service.difficulty}
                </span>
              </div>
              <p className="text-gray-300 mb-3 text-sm sm:text-base">{service.subtitle}</p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{service.description}</p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-800 border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">👥</div>
              <div className="text-xs sm:text-sm text-gray-400">Participants</div>
              <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.participants}</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">⏱️</div>
              <div className="text-xs sm:text-sm text-gray-400">Duration</div>
              <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.duration}</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📍</div>
              <div className="text-xs sm:text-sm text-gray-400">Location</div>
              <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.location}</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💰</div>
              <div className="text-xs sm:text-sm text-gray-400">Pricing</div>
              <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.pricing}</div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#00FFAB] flex items-center gap-2">
              <span>🎯</span>
              Skills You'll Develop
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-[#00FFAB] to-green-400 text-black rounded-full text-xs sm:text-sm font-medium hover:from-green-400 hover:to-[#00FFAB] transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* What's Included & Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div className="bg-gray-800 border border-gray-700 p-4 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#00FFAB] flex items-center gap-2">
                <span>✅</span>
                What's Included
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {service.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#00FFAB] bg-opacity-20 border border-[#00FFAB] border-opacity-30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#00FFAB] text-xs">✓</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-4 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-300 flex items-center gap-2">
                <span>📋</span>
                Requirements
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {service.requirements.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gray-400 text-xs">!</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white flex items-center gap-2">
              <span>🔄</span>
              How It Works
            </h3>
            <div className="bg-gray-800 border border-gray-700 p-4 sm:p-6 rounded-xl">
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {service.description} This experience is designed to be engaging, educational, and memorable for all participants. Our professional facilitators will guide your team through each step, ensuring everyone feels included and challenged appropriately.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-[#00FFAB] to-green-400 text-black font-semibold px-6 sm:px-8 py-3 rounded-lg hover:from-green-400 hover:to-[#00FFAB] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              onClick={() => (window.location.href = "/contact")}
            >
              Book This Experience
            </button>
            <button
              className="bg-gray-800 border border-gray-600 text-gray-300 font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-700 hover:border-[#00FFAB] hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              onClick={onClose}
            >
              Browse More
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ServicePage;