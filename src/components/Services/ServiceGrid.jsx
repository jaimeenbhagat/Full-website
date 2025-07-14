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

  const getServiceImage = (service) => {
    const normalizedCategory = service.category.toLowerCase().replace(/\s+/g, '-');
    const titleForPath = service.title;
    const basePath = `/assets/activities/${normalizedCategory}/${titleForPath}`;
    return `${basePath}/1.webp`;
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
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
              <div className="bg-gradient-to-r from-[#00FFAB] to-green-400 p-3 rounded-xl">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#00FFAB] rounded-sm"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white truncate">{categoryData.name}</h2>
                <p className="text-gray-400 text-sm sm:text-base">{categoryData.description}</p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-[#00FFAB] to-transparent"></div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {categoryServices.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="bg-black rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative border border-gray-800 hover:border-[#00FFAB]/50 h-[400px] w-full flex flex-col"
                    onClick={() => onServiceClick(service)}
                  >
                    {/* Service Image - Fixed Height */}
                    <div className="relative h-48 bg-gray-900 overflow-hidden flex-shrink-0">
                      <img 
                        src={getServiceImage(service)} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback when image fails to load */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 hidden items-center justify-center">
                        <div className="w-16 h-16 bg-[#00FFAB] bg-opacity-20 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-[#00FFAB] rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* Tags Overlay - Only Hybrid if applicable */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {service.location.includes('Hybrid') && (
                          <span className="px-2 py-1 bg-black bg-opacity-70 text-[#00FFAB] text-xs font-medium rounded-full border border-[#00FFAB] border-opacity-30">
                            Hybrid
                          </span>
                        )}
                      </div>

                      {/* Difficulty Indicator (replacing heart icon) */}
                      <div className="absolute top-2 right-2">
                        <div className="bg-black bg-opacity-80 rounded-full px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
                          <div className={`w-2 h-2 rounded-full ${getDifficultyDot(service.difficulty)}`}></div>
                          <span className={`text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
                            {service.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3 space-y-2">
                      {/* Title (replacing pricing) */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-[#00FFAB] transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description - Fixed Height */}
                      <div className="h-10 mb-4">
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Service Details - Fixed Height */}
                      <div className="h-12 mb-4 flex flex-col justify-center space-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#00FFAB] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="truncate">{service.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#00FFAB] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          <span className="truncate">{service.participants} people</span>
                        </div>
                      </div>

                      {/* Skills Tags - Fixed Height and Flex-End */}
                      <div className="flex-1 flex items-end">
                        <div className="w-full h-8 flex flex-wrap gap-1 content-start">
                          {service.skills.slice(0, 2).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-xs px-2 py-1 bg-gray-800 bg-opacity-60 text-[#00FFAB] border border-[#00FFAB] border-opacity-30 rounded-full hover:bg-opacity-80 transition-all duration-200 truncate max-w-20"
                            >
                              {skill}
                            </span>
                          ))}
                          {service.skills.length > 2 && (
                            <span className="text-xs px-2 py-1 bg-gray-800 bg-opacity-60 text-[#00FFAB] border border-[#00FFAB] border-opacity-30 rounded-full hover:bg-opacity-80 transition-all duration-200 flex-shrink-0">
                              +{service.skills.length - 2}
                            </span>
                          )}
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