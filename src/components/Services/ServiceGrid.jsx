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
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-[#00FFAB] to-green-400 p-3 rounded-xl">
                <span className="text-2xl">{categoryData.icon}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{categoryData.name}</h2>
                <p className="text-gray-400">{categoryData.description}</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#00FFAB] to-transparent"></div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#00FFAB] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden border border-gray-700 hover:border-[#00FFAB]"
                  onClick={() => onServiceClick(service)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gray-800 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gray-800 rounded-full translate-y-8 -translate-x-8"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{categoryData.icon}</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getDifficultyDot(service.difficulty)}`}></div>
                        <span className={`text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
                          {service.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm mb-4 text-white line-clamp-2">
                      {service.subtitle}
                    </p>

                    {/* Service Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">⏱️</span>
                        <span className="text-xs text-gray-400">
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">👥</span>
                        <span className="text-xs text-gray-400">
                          {service.participants} people
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">📍</span>
                        <span className="text-xs text-gray-400">
                          {service.location}
                        </span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.skills.slice(0, 2).map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-800 bg-opacity-20 rounded-full text-[#00FFAB] border border-[#00FFAB] border-opacity-30"
                        >
                          {skill}
                        </span>
                      ))}
                      {service.skills.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-gray-800 bg-opacity-20 rounded-full text-[#00FFAB] border border-[#00FFAB] border-opacity-30">
                          +{service.skills.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Bottom */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-400">
                        {service.pricing}
                      </span>
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-sm group-hover:opacity-80 transition-all duration-300 group-hover:scale-110">
                        <span className="text-[#00FFAB] text-sm font-bold">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceGrid;