import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, AlertCircle } from "lucide-react";

// Custom Card components
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Custom Slider component
const Slider = ({ defaultValue, max, step, onValueChange, className = "", ...props }) => {
  const [value, setValue] = useState(defaultValue[0]);
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onValueChange([newValue]);
  };
  
  return (
    <div className={`relative ${className}`}>
      <input
        type="range"
        min="1"
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00FFAB 0%, #00FFAB ${(value / max) * 100}%, #374151 ${(value / max) * 100}%, #374151 100%)`
        }}
        {...props}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #00FFAB;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #00FFAB;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

// Helper function to format numbers to Indian Rupees
function formatINR(n) {
  if (typeof n !== "number" || isNaN(n)) {
    return "₹0";
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

// Configuration Constants for Industry Benchmarks
const DISENGAGEMENT_PRODUCTIVITY_LOSS_FACTOR = 0.34;
const AVG_REPLACEMENT_COST_FACTOR = 1.25;
const WORKING_DAYS_PER_YEAR = 250;
const REVENUE_INCREASE_FACTOR_MIN = 0.02;
const REVENUE_INCREASE_FACTOR_MAX = 0.05;

// Colors for the Pie Chart
const COLORS = ["#ef4444", "#dc2626", "#00FFAB"];

export default function EngagementCalculatorForm() {
  // Core State Variables for Inputs
  const [numEmployees, setNumEmployees] = useState(100);
  const [avgAnnualSalary, setAvgAnnualSalary] = useState(480000);
  const [employeesWhoLeft, setEmployeesWhoLeft] = useState(10);
  const [engagementScore, setEngagementScore] = useState([6]);
  const [annualRevenue, setAnnualRevenue] = useState(50000000);
  const [avgExtraAbsenteeismDaysPerEmployee, setAvgExtraAbsenteeismDaysPerEmployee] = useState(2);

  // Validation state for calculator inputs
  const [turnoverInputError, setTurnoverInputError] = useState("");

  // UI state for showing results and modal
  const [showResults, setShowResults] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // State for contact form
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Form submission states (copied from contact.jsx)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [validationErrors, setValidationErrors] = useState({});

  // Calculated ROI data state
  const [roiData, setRoiData] = useState({
    totalTurnoverCost: 0,
    totalDisengagementCost: 0,
    totalAbsenteeismCost: 0,
    totalHiddenLoss: 0,
    potentialSavingsMin: 0,
    potentialSavingsMax: 0,
    potentialRevenueIncreaseMin: 0,
    potentialRevenueIncreaseMax: 0,
  });

  // Data for the Pie Chart
  const [pieData, setPieData] = useState([]);

  // Clear status messages after 5 seconds (copied from contact.jsx)
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3001);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Core Calculation Logic Function
  const calculateRoiData = () => {
    const costPerReplacement = avgAnnualSalary * AVG_REPLACEMENT_COST_FACTOR;
    const totalTurnoverCost = employeesWhoLeft * costPerReplacement;
    const disengagementInfluenceFactor = (10 - engagementScore[0]) / 10;
    const avgDailySalary = avgAnnualSalary / WORKING_DAYS_PER_YEAR;
    const productivityLossCost = numEmployees * avgAnnualSalary * disengagementInfluenceFactor * DISENGAGEMENT_PRODUCTIVITY_LOSS_FACTOR;
    const absenteeismCost = numEmployees * avgExtraAbsenteeismDaysPerEmployee * avgDailySalary * disengagementInfluenceFactor;
    const totalDisengagementCost = productivityLossCost + absenteeismCost;
    const totalHiddenLoss = totalTurnoverCost + totalDisengagementCost;

    // Potential Savings (by improving engagement score by 1-2 points)
    const improvedEngagement1Pt = Math.min(10, engagementScore[0] + 1);
    const newDisengagementInfluenceFactor1Pt = (10 - improvedEngagement1Pt) / 10;
    const newProductivityLossCost1Pt = numEmployees * avgAnnualSalary * newDisengagementInfluenceFactor1Pt * DISENGAGEMENT_PRODUCTIVITY_LOSS_FACTOR;
    const newAbsenteeismCost1Pt = numEmployees * avgExtraAbsenteeismDaysPerEmployee * avgDailySalary * newDisengagementInfluenceFactor1Pt;
    const newTotalDisengagementCost1Pt = newProductivityLossCost1Pt + newAbsenteeismCost1Pt;
    const savings1Pt = totalDisengagementCost - newTotalDisengagementCost1Pt;

    const improvedEngagement2Pt = Math.min(10, engagementScore[0] + 2);
    const newDisengagementInfluenceFactor2Pt = (10 - improvedEngagement2Pt) / 10;
    const newProductivityLossCost2Pt = numEmployees * avgAnnualSalary * newDisengagementInfluenceFactor2Pt * DISENGAGEMENT_PRODUCTIVITY_LOSS_FACTOR;
    const newAbsenteeismCost2Pt = numEmployees * avgExtraAbsenteeismDaysPerEmployee * avgDailySalary * newDisengagementInfluenceFactor2Pt;
    const newTotalDisengagementCost2Pt = newProductivityLossCost2Pt + newAbsenteeismCost2Pt;
    const savings2Pt = totalDisengagementCost - newTotalDisengagementCost2Pt;

    // Potential Revenue Increase
    const potentialRevenueIncreaseMin = annualRevenue * REVENUE_INCREASE_FACTOR_MIN * ((engagementScore[0] + 1) / 10);
    const potentialRevenueIncreaseMax = annualRevenue * REVENUE_INCREASE_FACTOR_MAX * ((engagementScore[0] + 2) / 10);

    return {
      totalTurnoverCost,
      totalDisengagementCost,
      totalAbsenteeismCost: absenteeismCost,
      totalHiddenLoss,
      potentialSavingsMin: Math.max(0, savings1Pt),
      potentialSavingsMax: Math.max(0, savings2Pt),
      potentialRevenueIncreaseMin,
      potentialRevenueIncreaseMax,
    };
  };

  // Effect to update ROI data whenever input states change
  useEffect(() => {
    const calculatedData = calculateRoiData();
    setRoiData(calculatedData);
    setPieData([
      { name: "Turnover Cost", value: calculatedData.totalTurnoverCost },
      { name: "Disengagement Cost", value: calculatedData.totalDisengagementCost },
      { name: "Absenteeism Cost", value: calculatedData.totalAbsenteeismCost },
    ]);
  }, [numEmployees, avgAnnualSalary, employeesWhoLeft, engagementScore, avgExtraAbsenteeismDaysPerEmployee, annualRevenue]);

  // Handler for the main "Calculate" button click
  const handleCalculateButtonClick = () => {
    let isValid = true;
    if (employeesWhoLeft > numEmployees) {
      setTurnoverInputError("The number of employees who left cannot be more than your total employees.");
      isValid = false;
    } else {
      setTurnoverInputError("");
    }

    if (isValid) {
      setShowContactModal(true);
    }
  };

  // API URL function (copied from contact.jsx)
  const getApiUrl = () => {
    if (import.meta.env.MODE === 'production') {
      return import.meta.env.VITE_API_URL || 'https://onethrive-backend.onrender.com';
    } else {
      return import.meta.env.VITE_API_URL || 'http://localhost:3001';
    }
  };
  

  // Validation function for contact form
  const validateContactForm = () => {
    const errors = {};

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone number validation
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(phoneNumber.replace(/\s+/g, ''))) {
      errors.phoneNumber = "Please enter a valid phone number (10-15 digits)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handler for contact form submission (updated with backend integration)
  const handleContactSubmit = async () => {
    if (!validateContactForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare form data including all calculator inputs and calculated results
      const formData = {
        email,
        phoneNumber,
        numEmployees,
        avgAnnualSalary,
        employeesWhoLeft,
        engagementScore: engagementScore[0],
        annualRevenue,
        avgExtraAbsenteeismDaysPerEmployee,
        calculatedResults: roiData
      };

      console.log("Submitting ROI calculator data:", formData);

      // Get API URL based on environment
      const API_URL = getApiUrl();
      console.log("Using API URL:", API_URL);
      
      const response = await fetch(`${API_URL}/api/roi-calculator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);

        setSubmitStatus("success");
        setShowContactModal(false);
        setShowResults(true);
        setValidationErrors({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server returned error:", response.status, errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting ROI calculator form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear validation errors when user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validationErrors.email) {
      setValidationErrors(prev => ({
        ...prev,
        email: null
      }));
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    if (validationErrors.phoneNumber) {
      setValidationErrors(prev => ({
        ...prev,
        phoneNumber: null
      }));
    }
  };

  const inputClasses = (fieldName) => `
    w-full p-3 bg-black bg-opacity-40 text-white border rounded-lg focus:ring-2 focus:ring-[#00FFAB] outline-none
    ${validationErrors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-400' : 'border-gray-800'}
  `;

  return (
    <div className="max-w-7xl mx-auto">
      {!showResults ? (
        // Centered Input Form
        <div className="flex justify-center">
          <Card className="bg-black border-gray-800 rounded-3xl p-10 shadow-xl text-center max-w-2xl w-full">
            <CardContent className="space-y-8">
              <h2 className="text-3xl font-bold text-[#00FFAB] mb-6">Input Your Details</h2>
              
              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-green-900/20 border border-[#00FFAB] rounded-lg p-4 flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="text-[#00FFAB] w-5 h-5" />
                  <span className="text-[#00FFAB]">
                    ROI calculation submitted successfully! We'll get back to you soon.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-900/20 border border-red-400 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
                  <AlertCircle className="text-red-400 w-5 h-5" />
                  <span className="text-red-400">
                    Failed to submit ROI calculation. Please try again or contact us directly.
                  </span>
                </div>
              )}
              
              {/* Input Fields */}
              <div>
                <label htmlFor="numEmployees" className="block text-white text-lg font-bold mb-3">
                  Total Number of Employees
                </label>
                <input
                  type="number"
                  id="numEmployees"
                  className="w-full p-4 bg-black bg-opacity-40 text-white border border-gray-800 rounded-xl focus:ring-3 focus:ring-[#00FFAB] focus:border-transparent outline-none transition-all duration-300 text-xl font-medium placeholder-gray-600"
                  value={numEmployees}
                  onChange={(e) => setNumEmployees(Number(e.target.value))}
                  min="1"
                  placeholder="e.g., 100"
                />
              </div>

              <div>
                <label htmlFor="avgAnnualSalary" className="block text-white text-lg font-bold mb-3">
                  Average Annual Salary (in ₹)
                </label>
                <input
                  type="number"
                  id="avgAnnualSalary"
                  className="w-full p-4 bg-black bg-opacity-40 text-white border border-gray-800 rounded-xl focus:ring-3 focus:ring-[#00FFAB] focus:border-transparent outline-none transition-all duration-300 text-xl font-medium placeholder-gray-600"
                  value={avgAnnualSalary}
                  onChange={(e) => setAvgAnnualSalary(Number(e.target.value))}
                  min="0"
                  placeholder="e.g., 480000"
                />
              </div>

              <div>
                <label htmlFor="annualRevenue" className="block text-white text-lg font-bold mb-3">
                  Total Annual Revenue (in ₹)
                </label>
                <input
                  type="number"
                  id="annualRevenue"
                  className="w-full p-4 bg-black bg-opacity-40 text-white border border-gray-800 rounded-xl focus:ring-3 focus:ring-[#00FFAB] focus:border-transparent outline-none transition-all duration-300 text-xl font-medium placeholder-gray-600"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                  min="0"
                  placeholder="e.g., 50000000"
                />
              </div>

              <div>
                <label htmlFor="employeesWhoLeft" className="block text-white text-lg font-bold mb-3">
                  Number of Employees Who Left Last Year
                </label>
                <input
                  type="number"
                  id="employeesWhoLeft"
                  className={`w-full p-4 bg-black bg-opacity-40 text-white border rounded-xl focus:ring-3 focus:ring-[#00FFAB] focus:border-transparent outline-none transition-all duration-300 text-xl font-medium placeholder-gray-600 ${
                    turnoverInputError ? "border-red-500" : "border-gray-800"
                  }`}
                  value={employeesWhoLeft}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setEmployeesWhoLeft(value);
                    if (value > numEmployees) {
                      setTurnoverInputError("The number of employees who left cannot be more than your total employees.");
                    } else {
                      setTurnoverInputError("");
                    }
                  }}
                  min="0"
                  max={numEmployees}
                  placeholder="e.g., 10"
                />
                {turnoverInputError && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{turnoverInputError}</p>
                )}
              </div>

              <div>
                <label htmlFor="avgExtraAbsenteeismDaysPerEmployee" className="block text-white text-lg font-bold mb-3">
                  Average Absenteeism Per Year (in days)
                </label>
                <input
                  type="number"
                  id="avgExtraAbsenteeismDaysPerEmployee"
                  className="w-full p-4 bg-black bg-opacity-40 text-white border border-gray-800 rounded-xl focus:ring-3 focus:ring-[#00FFAB] focus:border-transparent outline-none transition-all duration-300 text-xl font-medium placeholder-gray-600"
                  value={avgExtraAbsenteeismDaysPerEmployee}
                  onChange={(e) => setAvgExtraAbsenteeismDaysPerEmployee(Number(e.target.value))}
                  min="0"
                  placeholder="e.g., 2"
                />
              </div>

              {/* Engagement Slider */}
              <div className="pt-6">
                <label htmlFor="engagementScoreSlider" className="block text-white text-lg font-bold mb-3">
                  Employee Engagement Score (on a scale of 1 to 10)
                  <span className="block text-sm text-gray-500 mt-1">
                    (1 = Not engaged at all, 10 = Fully engaged and motivated.)
                  </span>
                </label>
                <Slider
                  defaultValue={engagementScore}
                  max={10}
                  step={1}
                  onValueChange={setEngagementScore}
                  className="w-full mt-4"
                  id="engagementScoreSlider"
                />
                <p className="text-base text-white mt-4">
                  Current Engagement Level: <span className="text-[#00FFAB] font-bold">{engagementScore[0]}/10</span>
                </p>
              </div>

              <button
                className={`w-full bg-gradient-to-r from-[#00FFAB] to-[#00E69B] text-black py-3 rounded-xl font-bold text-2xl tracking-wide uppercase mt-10 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00FFAB] ${
                  turnoverInputError ? "opacity-40 cursor-not-allowed" : ""
                }`}
                onClick={handleCalculateButtonClick}
                disabled={!!turnoverInputError}
              >
                Calculate Your Engagement ROI
              </button>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Split Layout with Results
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Input Card */}
          <Card className="bg-black border-gray-800 rounded-3xl p-10 shadow-xl text-center">
            <CardContent className="space-y-8">
              <h2 className="text-3xl font-bold text-[#00FFAB] mb-6">Your Input Details</h2>
              
              <div className="space-y-4 text-center">
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-white font-bold">Total Employees:</span>
                  <span className="text-white font-medium">{numEmployees}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-white font-bold">Average Annual Salary:</span>
                  <span className="text-white font-medium">{formatINR(avgAnnualSalary)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-white font-bold">Annual Revenue:</span>
                  <span className="text-white font-medium">{formatINR(annualRevenue)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-white font-bold">Employees Who Left:</span>
                  <span className="text-white font-medium">{employeesWhoLeft}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-white font-bold">Average Absenteeism:</span>
                  <span className="text-white font-medium">{avgExtraAbsenteeismDaysPerEmployee} days</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white font-bold">Engagement Score:</span>
                  <span className="text-[#00FFAB] font-medium">{engagementScore[0]}/10</span>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setShowResults(false);
                  setEmail('');
                  setPhoneNumber('');
                  setSubmitStatus(null);
                  setValidationErrors({});
                }}
              >
                Recalculate
              </button>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-black border-gray-800 rounded-3xl p-10 shadow-xl">
            <CardContent className="space-y-8">
              <h2 className="text-3xl font-bold text-[#00FFAB] mb-6 text-center">Your Engagement Impact</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3">
                  <span className="text-white font-bold text-lg">Annual Cost of Disengagement:</span>
                  <span className="text-red-500 font-bold text-xl">{formatINR(roiData.totalDisengagementCost)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-white font-bold text-lg">Annual Cost of Turnover:</span>
                  <span className="text-red-600 font-bold text-xl">{formatINR(roiData.totalTurnoverCost)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-t border-gray-700 pt-6">
                  <span className="text-white font-bold text-xl">Total Hidden Cost:</span>
                  <span className="text-red-600 font-bold text-2xl">{formatINR(roiData.totalHiddenLoss)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-white font-bold text-lg">Potential Annual Revenue Boost:</span>
                  <span className="text-[#00FFAB] font-bold text-lg">
                    {formatINR(roiData.potentialRevenueIncreaseMin)}–{formatINR(roiData.potentialRevenueIncreaseMax)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">Potential Annual Savings:</span>
                    <span className="text-white font-medium text-sm">
                      by improving engagement by just 1-2 points
                    </span>
                  </div>
                  <span className="text-[#00FFAB] font-bold text-lg">
                    {formatINR(roiData.potentialSavingsMin)}–{formatINR(roiData.potentialSavingsMax)}
                  </span>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Cost Breakdown</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                      animationDuration={1000}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val) => formatINR(Math.round(val))}
                      contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #00FFAB",
                        color: "#00FFAB",
                        borderRadius: "15px",
                        padding: "15px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-black p-8 rounded-xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#00FFAB] mb-6">Contact Information</h3>
            
            {/* Status Messages in Modal */}
            {submitStatus === "success" && (
              <div className="bg-green-900/20 border border-[#00FFAB] rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-4">
                <CheckCircle className="text-[#00FFAB] w-5 h-5" />
                <span className="text-[#00FFAB]">
                  ROI calculation submitted successfully!
                </span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-900/20 border border-red-400 rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-4">
                <AlertCircle className="text-red-400 w-5 h-5" />
                <span className="text-red-400">
                  Failed to submit. Please try again.
                </span>
              </div>
            )}
            
            <div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-white font-bold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your@email.com"
                    required
                    className={inputClasses('email')}
                  />
                  {validationErrors.email && (
                    <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-white font-bold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="+91 98765 43210"
                    required
                    className={inputClasses('phoneNumber')}
                  />
                  {validationErrors.phoneNumber && (
                    <p className="text-red-400 text-sm mt-1">{validationErrors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowContactModal(false);
                    setEmail('');
                    setPhoneNumber('');
                    setValidationErrors({});
                    setSubmitStatus(null);
                  }}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleContactSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#00FFAB] to-[#00E69B] text-black py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Get Results"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out; 
        }
      `}</style>
    </div>
  );
}