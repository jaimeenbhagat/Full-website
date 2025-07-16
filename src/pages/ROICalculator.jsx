import React from 'react';
import EngagementROICalculator from '../components/ROI_Calculator/EngagementROICalculator';
import BenchmarkInfo from '../components/ROI_Calculator/BenchmarkInfo';

const ROICalculator = () => {
  return (
    <div className="min-h-screen mt-10 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 pt-16">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-white mb-6">
            Employee Engagement ROI Calculator
          </h1>
          <div
            className="w-72 h-1 bg-gradient-to-r from-transparent via-[#00FFAB] to-transparent mx-auto mb-2 "
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
          <p className="text-white text-lg max-w-xl mx-auto mt-4">
            Discover the hidden costs of disengagement and unlock your organization's true potential
          </p>
        </div>

        {/* Main Calculator Component */}
        <EngagementROICalculator />

        {/* Benchmark Info Component */}
        <BenchmarkInfo />
      </div>
    </div>
  );
};

export default ROICalculator;