import React from "react";

const ServiceGrid = ({ services, serviceCategories, onServiceClick }) => {
  const getCategoryData = (categoryId) => {
    return serviceCategories.find(cat => cat.id === categoryId) || {
      name: "Other",
      icon: "📋"
    };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyDot = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-400';
      case 'medium': return 'bg-yellow-400';
      case 'hard': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold mb-2 text-gray-400">No experiences found</h3>
        <p className="text-gray-500">Try adjusting your filters to see more results</p>
      </div>
    );
  }

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    const categoryId = service.category;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(service);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(servicesByCategory).map(([categoryId, categoryServices]) => {
        const categoryData = getCategoryData(categoryId);
        
        return (
          <div key={categoryId} className="space-y-6">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-gradient-to-r from-[#00FFAB] to-green-400 p-2 sm:p-3 rounded-xl">
                <span className="text-xl sm:text-2xl">{categoryData.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white truncate">{categoryData.name}</h2>
                <p className="text-gray-400 text-sm sm:text-base">{categoryData.description}</p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-[#00FFAB] to-transparent"></div>
            </div>

            {/* Services Grid - Uniform Dark Theme Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {categoryServices.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden border border-gray-700 hover:border-[#00FFAB]/50 h-full flex flex-col"
                    onClick={() => onServiceClick(service)}
                  >
                    {/* Consistent Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#00FFAB] rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#00FFAB] rounded-full translate-y-8 -translate-x-8"></div>
                    </div>

                    {/* Consistent Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00FFAB]/5 via-transparent to-[#00FFAB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content - Consistent Layout */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header - Fixed Height */}
                      <div className="flex items-start justify-between mb-3 sm:mb-4 h-12">
                        <div className="text-2xl sm:text-3xl lg:text-4xl flex items-center justify-center w-12 h-12">
                          {categoryData.icon}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getDifficultyDot(service.difficulty)}`}></div>
                          <span className={`text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
                            {service.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Title & Subtitle - Fixed Height */}
                      <div className="mb-3 sm:mb-4 h-20 flex flex-col justify-start">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-[#00FFAB] transition-colors duration-300 line-clamp-2 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-300 line-clamp-2 leading-tight">
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Service Details - Fixed Height */}
                      <div className="space-y-2 mb-4 h-16">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#00FFAB] w-3">⏱️</span>
                          <span className="text-xs text-gray-400 truncate">
                            {service.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#00FFAB] w-3">👥</span>
                          <span className="text-xs text-gray-400 truncate">
                            {service.participants} people
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#00FFAB] w-3">📍</span>
                          <span className="text-xs text-gray-400 truncate">
                            {service.location}
                          </span>
                        </div>
                      </div>

                      {/* Skills Tags - Fixed Height */}
                      <div className="flex flex-wrap gap-1 mb-3 sm:mb-4 h-8 overflow-hidden">
                        {service.skills.slice(0, 2).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs px-2 py-1 bg-gray-800 bg-opacity-60 text-[#00FFAB] border border-[#00FFAB] border-opacity-30 rounded-full hover:bg-opacity-80 transition-all duration-200 truncate max-w-[120px] h-6 flex items-center"
                          >
                            {skill}
                          </span>
                        ))}
                        {service.skills.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-gray-800 bg-opacity-60 text-[#00FFAB] border border-[#00FFAB] border-opacity-30 rounded-full hover:bg-opacity-80 transition-all duration-200 h-6 flex items-center">
                            +{service.skills.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Bottom - Fixed at Bottom */}
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-200 truncate max-w-[60%]">
                          {service.pricing}
                        </span>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00FFAB] bg-opacity-20 border border-[#00FFAB] border-opacity-30 rounded-full flex items-center justify-center group-hover:bg-opacity-30 group-hover:border-opacity-50 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          <span className="text-black text-sm font-bold">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceGrid;