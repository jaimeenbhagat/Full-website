import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

  // Handler for contact form submission
  const handleContactSubmit = () => {
    let valid = true;
    setEmailError("");
    setPhoneError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Please enter a valid phone number (10-15 digits).");
      valid = false;
    }

    if (valid) {
      console.log("Contact Info Submitted:", { email, phoneNumber });
      setShowContactModal(false);
      setShowResults(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {!showResults ? (
        // Centered Input Form
        <div className="flex justify-center">
          <Card className="bg-black border-gray-800 rounded-3xl p-10 shadow-xl text-center max-w-2xl w-full">
            <CardContent className="space-y-8">
              <h2 className="text-3xl font-bold text-[#00FFAB] mb-6">Input Your Details</h2>
              
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
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 bg-black bg-opacity-40 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#00FFAB] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              
              <div>
                <label className="block text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-3 bg-black bg-opacity-40 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#00FFAB] outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                className="flex-1 bg-[#00FFAB] text-black py-3 rounded-lg font-bold hover:bg-[#00E69B] transition-colors"
                onClick={handleContactSubmit}
              >
                Get Results
              </button>
              <button
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OneThrive CTA Section */}
      {showResults && (
        <section className="max-w-4xl mx-auto mt-28">
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed max-w-3xl mx-auto">
              The numbers speak for themselves. Now, let's turn insights into action.
              <strong className="font-bold"> OneThrive is here to help you bridge the gap between potential savings and real-world results.</strong>
            </p>
          </div>
          
          <div className="bg-black border-gray-800 rounded-3xl p-10 shadow-xl text-center">
            <h3 className="text-3xl font-bold text-[#00FFAB] mb-6">
              Partner with OneThrive: Elevate Your Workforce & Culture
            </h3>
            <p className="text-lg text-white font-medium mb-8 leading-relaxed">
              OneThrive offers comprehensive solutions designed to significantly boost employee engagement, reduce turnover, and foster a thriving team culture. Let us help you achieve measurable improvements in productivity, revenue, and overall organizational health.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-gradient-to-r from-[#00FFAB] to-[#00E69B] text-black py-5 px-10 rounded-xl font-bold text-2xl tracking-wide uppercase transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => window.open("https://www.onethrive.com", "_blank")}
              >
                Explore Our Solutions
              </button>
              <button
                className="bg-gradient-to-r from-[#00E69B] to-[#00FFAB] text-black py-5 px-10 rounded-xl font-bold text-2xl tracking-wide uppercase transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => window.open("https://www.onethrive.com/contact", "_blank")}
              >
                Partner with OneThrive
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}