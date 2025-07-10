import React from "react";
import { X } from "lucide-react";

const ServicePage = ({ service, onClose }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white text-black rounded-2xl max-w-4xl w-full my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="p-8 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#00FFAB] to-green-400 p-3 rounded-xl">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{service.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(service.difficulty)}`}>
                  {getDifficultyIcon(service.difficulty)} {service.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{service.subtitle}</p>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm text-gray-500">Participants</div>
              <div className="font-semibold">{service.participants}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-semibold">{service.duration}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">📍</div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-semibold">{service.location}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm text-gray-500">Pricing</div>
              <div className="font-semibold">{service.pricing}</div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-[#00FFAB]">Skills You'll Develop</h3>
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-[#00FFAB] to-green-400 text-black rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* What's Included & Requirements */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#00FFAB]">What's Included</h3>
              <div className="space-y-3">
                {service.includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#00FFAB] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00FFAB] text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Requirements</h3>
              <div className="space-y-3">
                {service.requirements.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">!</span>
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed">
                {service.description} This experience is designed to be engaging, educational, and memorable for all participants. Our professional facilitators will guide your team through each step, ensuring everyone feels included and challenged appropriately.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-[#00FFAB] to-green-400 text-black font-semibold px-8 py-3 rounded-lg hover:from-green-400 hover:to-[#00FFAB] transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => (window.location.href = "/contact")}
            >
              Book This Experience
            </button>
            <button
              className="bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
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