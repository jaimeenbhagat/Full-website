import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ServicePage = ({ service, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Generate image paths based on category and title
  const generateImagePaths = () => {
    if (!service.category || !service.title) {
      // Fallback to placeholder if category or title is missing
      console.log('Missing category or title:', { category: service.category, title: service.title });
      return [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600", 
        "/api/placeholder/800/600"
      ];
    }
    
    // Category should be lowercase with hyphens (as per your folder structure)
    const normalizedCategory = service.category.toLowerCase().replace(/\s+/g, '-');
    
    // Title should keep original capitalization and spaces (as per your folder structure)
    const titleForPath = service.title;
    
    const basePath = `/assets/activities/${normalizedCategory}/${titleForPath}`;
    
    const imagePaths = [
      `${basePath}/1.webp`,
      `${basePath}/2.webp`,
      `${basePath}/3.webp`
    ];
    
    // Debug: Log the generated paths
    console.log('Generated image paths:', {
      category: service.category,
      title: service.title,
      normalizedCategory,
      titleForPath,
      basePath,
      imagePaths
    });
    
    return imagePaths;
  };

  const images = service.images || generateImagePaths();

  // Add image error handling
  const handleImageError = (e, imagePath) => {
    console.error('Image failed to load:', imagePath);
    console.log('Trying to load:', e.target.src);
    e.target.src = '/api/placeholder/800/600'; // Fallback to placeholder
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-black bg-opacity-20 border-green-400 border-opacity-30';
      case 'medium': return 'text-yellow-400 bg-black bg-opacity-20 border-yellow-400 border-opacity-30';
      case 'hard': return 'text-red-400 bg-black bg-opacity-20 border-red-400 border-opacity-30';
      default: return 'text-gray-400 bg-black bg-opacity-20 border-gray-400 border-opacity-30';
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center p-2 sm:p-4 z-50 overflow-y-auto backdrop-blur-sm">
        <div className="bg-black text-white rounded-xl sm:rounded-2xl max-w-4xl w-full my-2 sm:my-8 relative border border-gray-700 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 bg-black border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-900 hover:border-[#00FFAB] transition-all duration-200 z-10"
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
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-[#00FFAB]">
                Gallery
              </h3>
              
              {/* 3 Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`${service.title} - Image ${index + 1}`}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-xl border border-gray-700 cursor-pointer hover:border-[#00FFAB] transition-all duration-300 transform hover:scale-105"
                      onClick={() => openImageModal(index)}
                      onError={(e) => handleImageError(e, image)}
                      onLoad={() => console.log('Image loaded successfully:', image)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-black border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
                <div className="text-xs sm:text-sm text-white mb-1">Participants</div>
                <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.participants}</div>
              </div>
              <div className="bg-black border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
                <div className="text-xs sm:text-sm text-white mb-1">Duration</div>
                <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.duration}</div>
              </div>
              <div className="bg-black border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
                <div className="text-xs sm:text-sm text-white mb-1">Location</div>
                <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.location}</div>
              </div>
              <div className="bg-black border border-gray-700 p-3 sm:p-4 rounded-xl text-center hover:border-[#00FFAB] hover:border-opacity-50 transition-all duration-200">
                <div className="text-xs sm:text-sm text-white mb-1">Pricing</div>
                <div className="font-semibold text-[#00FFAB] text-sm sm:text-base truncate">{service.pricing}</div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#00FFAB]">
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
              <div className="bg-black border border-gray-700 p-4 sm:p-6 rounded-xl">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#00FFAB]">
                  What's Included
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {service.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-[#00FFAB] rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-xs sm:text-sm text-white leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black border border-gray-700 p-4 sm:p-6 rounded-xl">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#00FFAB]">
                  Requirements
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {service.requirements.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-[#00FFAB] rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-xs sm:text-sm text-white leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#00FFAB]">
                How It Works
              </h3>
              <div className="bg-black border border-gray-700 p-4 sm:p-6 rounded-xl">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {service.description} 
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
                className="bg-black border border-gray-600 text-gray-300 font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-900 hover:border-[#00FFAB] hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                onClick={onClose}
              >
                Browse More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-60" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center transition-all duration-200 z-10"
            >
              <X size={20} />
            </button>
            
            <img
              src={images[currentImageIndex]}
              alt={`${service.title} - Full Size`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicePage;