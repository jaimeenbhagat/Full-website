import React from 'react';

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

const BenchmarkInfo = () => {
  return (
    <section className="max-w-4xl mx-auto mt-28 bg-black border-gray-800 rounded-3xl p-10 shadow-xl">
      <Card className="bg-black border-gray-800">
        <CardContent>
          <h3 className="text-2xl font-bold text-[#00FFAB] mb-5">Our Approach & Key Benchmarks</h3>
          <div className="text-gray-300 space-y-3 text-base">
            <li className="flex items-start">
              <span className="mr-3 text-xl text-gray-400">⚡</span>
              <span>Uses your company's data for accurate cost estimates.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-xl text-gray-400">📊</span>
              <span>
                Calculates costs for <strong className="font-bold">employee disengagement</strong> and <strong className="font-bold">turnover</strong>.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-xl text-gray-400">💰</span>
              <span><strong className="font-bold">Find clear savings</strong> by boosting team engagement.</span>
            </li>
            <li className="mt-4">
              <div className="mb-2">
                <span className="text-gray-400 font-bold">How We Calculate Your ROI:</span>
              </div>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm">
                <li>
                  <strong className="font-bold">Disengagement Cost:</strong> Estimated from lost productivity and extra absenteeism days.
                </li>
                <li>
                  <strong className="font-bold">Turnover Cost:</strong> Calculated by multiplying employees who left by replacement cost.
                </li>
                <li>
                  <strong className="font-bold">Potential Revenue Increase:</strong> Projected based on improved engagement impact.
                </li>
              </ul>
            </li>
            <li className="mt-4">
              <div className="mb-2">
                <span className="text-gray-400 font-bold">Industry Benchmarks Used:</span>
              </div>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm">
                <li>Productivity loss from disengaged employees: <strong className="font-bold">34% of annual salary.</strong></li>
                <li>Average cost to replace an employee: <strong className="font-bold">125% of annual salary.</strong></li>
                <li>Highly engaged companies see <strong className="font-bold">2-5% higher annual revenue growth</strong>.</li>
              </ul>
            </li>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default BenchmarkInfo;