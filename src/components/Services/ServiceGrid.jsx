/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from "react";

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
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-400">No experiences found</h3>
        <p className="text-gray-500 text-sm md:text-base">Try adjusting your filters to see more results</p>
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

  // State: expanded/collapsed for each category and scroll refs
  const [expandedCategories, setExpandedCategories] = useState({});
  const [scrollPositions, setScrollPositions] = useState({});
  const [canScrollLeft, setCanScrollLeft] = useState({});
  const [canScrollRight, setCanScrollRight] = useState({});
  const scrollRefs = useRef({});
  const timerRef = useRef({});

  // Auto expand after 5s if not expanded
  useEffect(() => {
    Object.keys(servicesByCategory).forEach((categoryId) => {
      if (
        servicesByCategory[categoryId].length > 4 &&
        !expandedCategories[categoryId]
      ) {
        timerRef.current[categoryId] = setTimeout(() => {
          setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
        }, 5000);
      }
    });

    return () => {
      Object.values(timerRef.current).forEach(clearTimeout);
    };
    // eslint-disable-next-line
  }, [servicesByCategory, expandedCategories]);

  // Check scroll ability for arrows
  const checkScrollability = (categoryId) => {
    const container = scrollRefs.current[categoryId];
    if (!container) return;

    const canLeft = container.scrollLeft > 0;
    const canRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);

    setCanScrollLeft(prev => ({ ...prev, [categoryId]: canLeft }));
    setCanScrollRight(prev => ({ ...prev, [categoryId]: canRight }));
  };

  // Initialize scroll refs and check scrollability
  useEffect(() => {
    Object.keys(servicesByCategory).forEach((categoryId) => {
      checkScrollability(categoryId);
    });
  }, [servicesByCategory, expandedCategories]);

  const handleSeeMore = (categoryId) => {
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
    setTimeout(() => checkScrollability(categoryId), 100);
  };

  const handleSeeLess = (categoryId) => {
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: false }));
    setTimeout(() => checkScrollability(categoryId), 100);
  };

  const scrollLeft = (categoryId) => {
    const container = scrollRefs.current[categoryId];
    if (!container) return;
    
    const scrollAmount = window.innerWidth < 768 ? 250 : 300; // Mobile vs desktop scroll amount
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    
    setTimeout(() => checkScrollability(categoryId), 300);
  };

  const scrollRight = (categoryId) => {
    const container = scrollRefs.current[categoryId];
    if (!container) return;
    
    const scrollAmount = window.innerWidth < 768 ? 250 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    setTimeout(() => checkScrollability(categoryId), 300);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {Object.entries(servicesByCategory).map(([categoryId, categoryServices]) => {
        const categoryData = getCategoryData(categoryId);
        const hasMoreThanFour = categoryServices.length > 4;
        const isExpanded = !!expandedCategories[categoryId];

        let visibleServices = categoryServices;
        if (hasMoreThanFour && !isExpanded) {
          visibleServices = categoryServices.slice(0, 4);
        }

        return (
          <div key={categoryId} className="space-y-4 md:space-y-6">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 md:mb-6 px-4 sm:px-0">
              <div className="bg-gradient-to-r from-[#00FFAB] to-green-400 p-2 md:p-3 rounded-xl">
                <div className="w-5 h-8 md:w-6 md:h-6 bg-black rounded flex items-center justify-center">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#00FFAB] rounded-sm"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">{categoryData.name}</h2>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base">{categoryData.description}</p>
              </div>
              <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-[#00FFAB] to-transparent"></div>
            </div>

            {/* Services Container with Arrow Navigation */}
            <div className="relative">
              {/* Left Arrow - Full Left Side */}
              {canScrollLeft[categoryId] && (
                <button
                  onClick={() => scrollLeft(categoryId)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-90 hover:bg-opacity-100 text-[#00FFAB] rounded-r-full p-3 md:p-4 transition-all duration-300 hover:scale-110 shadow-xl border-r border-[#00FFAB] border-opacity-30"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Right Arrow - Full Right Side */}
              {canScrollRight[categoryId] && (
                <button
                  onClick={() => scrollRight(categoryId)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-90 hover:bg-opacity-100 text-[#00FFAB] rounded-l-full p-3 md:p-4 transition-all duration-300 hover:scale-110 shadow-xl border-l border-[#00FFAB] border-opacity-30"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Services Grid - Horizontal scroll */}
              <div
                ref={(el) => {
                  scrollRefs.current[categoryId] = el;
                  if (el) {
                    el.addEventListener('scroll', () => checkScrollability(categoryId));
                  }
                }}
                className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto overflow-y-visible scrollbar-hide pb-2 px-4 sm:px-0"
                style={{
                  minHeight: '380px', // Adjusted for mobile
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {visibleServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-black rounded-xl md:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative border border-gray-800 hover:border-[#00FFAB]/50 h-[360px] md:h-[400px] min-w-[240px] md:min-w-[280px] w-[240px] md:w-[280px] max-w-[240px] md:max-w-[280px] flex flex-col flex-shrink-0"
                    onClick={() => onServiceClick(service)}
                  >
                    {/* Service Image */}
                    <div className="relative h-36 md:h-48 bg-gray-900 overflow-hidden flex-shrink-0">
                      <img 
                        src={getServiceImage(service)} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 hidden items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00FFAB] bg-opacity-20 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-[#00FFAB] rounded-sm"></div>
                        </div>
                      </div>
                      <div className="absolute top-2 md:top-3 left-2 md:left-3 flex gap-2">
                        {service.location.includes('Hybrid') && (
                          <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-black bg-opacity-70 text-[#00FFAB] text-xs font-medium rounded-full border border-[#00FFAB] border-opacity-30">
                            Hybrid
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <div className="bg-black bg-opacity-80 rounded-full px-2 py-1 md:px-2.5 md:py-1.5 flex items-center gap-1.5 shadow-lg">
                          <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${getDifficultyDot(service.difficulty)}`}></div>
                          <span className={`text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
                            {service.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>
                    
                    <div className="p-2.5 md:p-3 space-y-2 flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-base md:text-lg leading-tight line-clamp-2 group-hover:text-[#00FFAB] transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                      
                      <div className="h-8 md:h-10 mb-2 md:mb-4">
                        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed">
                          {service.subtitle}
                        </p>
                      </div>
                      
                      <div className="h-10 md:h-12 mb-2 md:mb-4 flex flex-col justify-center space-y-1 text-xs md:text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-[#00FFAB] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="truncate">{service.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-[#00FFAB] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          <span className="truncate">{service.participants} people</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex items-end">
                        <div className="w-full h-6 md:h-8 flex flex-wrap gap-1 content-start">
                          {service.skills.slice(0, 2).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-xs px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-800 bg-opacity-60 text-[#00FFAB] border border-[#00FFAB] border-opacity-30 rounded-full hover:bg-opacity-80 transition-all duration-200 truncate max-w-16 md:max-w-20"
                            >
                              {skill}
                            </span>
                          ))}
                          {service.skills.length > 2 && (
                            <span className="text-xs px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-800 bg-opacity-60 text-[#00FFAB] border border-[#00FFAB] border-opacity-30 rounded-full hover:bg-opacity-80 transition-all duration-200 flex-shrink-0">
                              +{service.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* See More/See Less Card */}
                {hasMoreThanFour && !isExpanded && (
                  <div
                    key="see-more"
                    className="bg-gradient-to-br from-[#00FFAB] to-green-400 rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer h-[360px] md:h-[400px] min-w-[240px] md:min-w-[280px] w-[240px] md:w-[280px] max-w-[240px] md:max-w-[280px] border border-gray-800 hover:border-[#00FFAB]/50 transition-all duration-300 hover:scale-105 flex-shrink-0"
                    onClick={() => handleSeeMore(categoryId)}
                  >
                    <span className="text-black font-bold text-base md:text-lg">
                      See More...
                    </span>
                  </div>
                )}
                {hasMoreThanFour && isExpanded && (
                  <div
                    key="see-less"
                    className="bg-gradient-to-br from-[#00FFAB] to-green-400 rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer h-[360px] md:h-[400px] min-w-[240px] md:min-w-[280px] w-[240px] md:w-[280px] max-w-[240px] md:max-w-[280px] border border-gray-800 hover:border-[#00FFAB]/50 transition-all duration-300 hover:scale-105 flex-shrink-0"
                    onClick={() => handleSeeLess(categoryId)}
                  >
                    <span className="text-black font-bold text-base md:text-lg">
                      See Less...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Add custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ServiceGrid;