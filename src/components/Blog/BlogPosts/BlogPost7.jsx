/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import about from "../../../assets/about.webp";

// External/Internal links for this blog
const links = {
  EL1: "https://matterapp.com/blog/employee-engagement-challenges",
  EL2: "https://www.rippling.com/blog/remote-team-building-activities",
  EL3: "https://teambuilding.com/blog/wellness-topics-for-employees",
  EL4: "https://bonusly.com/post/improve-company-culture",
  EL5: "https://www.contactmonkey.com/blog/employee-engagement-trends",
  IL1: "/blog/workplace-strategies",
  IL2: "/services/consulting",
  IL3: "/contact"
};

const BlogPost7 = () => (
  <div className="fixed inset-0 z-[9999] min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-y-auto">
    {/* Hero Image Section */}
    <motion.div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden mt-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <img src={about} alt="The Science of Workplace Happiness: Creating Positive Organizational Culture" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFAB]/10 via-transparent to-[#00CC88]/10"></div>
      <motion.div className="absolute bottom-8 left-8 right-20 md:left-12 md:right-24"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
          The Science of Workplace Happiness: Creating Positive Organizational Culture
        </h1>
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-[#00FFAB] rounded-full animate-pulse"></div>
          <p className="text-[#00FFAB] text-lg md:text-xl lg:text-2xl font-bold drop-shadow-lg">By Team OneThrive</p>
        </div>
      </motion.div>
    </motion.div>
    {/* Content */}
    <div className="relative z-[9997] bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-12">
        <motion.div className="flex items-center space-x-6 mb-12"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00FFAB] to-transparent flex-1"></div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#00FFAB] rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-[#00CC88] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#00FFAB] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00FFAB] to-transparent flex-1"></div>
        </motion.div>

        <motion.article className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}>
          
          <p className="text-[#E0E0E0] text-xl leading-relaxed mb-8">
            Discover evidence-based approaches to building a positive workplace culture that enhances employee satisfaction and productivity. This comprehensive guide provides actionable insights and proven strategies to help you excel in this critical area of professional development.
            <a href={links.EL1} target="_blank" rel="noopener noreferrer">(EL1)</a>
          </p>

          <h2 className="text-[#00FFAB] text-3xl font-bold mb-6 mt-12">Understanding the Fundamentals</h2>
          <p className="text-[#E0E0E0] leading-relaxed mb-6">
            Success in this area requires a deep understanding of core principles and best practices. Our approach combines theoretical knowledge with practical application to deliver measurable results.
            <a href={links.EL2} target="_blank" rel="noopener noreferrer">(EL2)</a>
          </p>

          <h2 className="text-[#00FFAB] text-3xl font-bold mb-6 mt-12">Key Implementation Strategies</h2>
          <ol className="text-[#E0E0E0] space-y-4 mb-8">
            <li>
              <strong>Strategic Planning:</strong> Develop comprehensive plans that align with your organizational goals and objectives.
              <a href={links.EL3} target="_blank" rel="noopener noreferrer">(EL3)</a>
            </li>
            <li>
              <strong>Team Engagement:</strong> Foster meaningful participation and commitment from all team members throughout the process.
              <a href={links.EL4} target="_blank" rel="noopener noreferrer">(EL4)</a>
            </li>
            <li>
              <strong>Continuous Improvement:</strong> Implement feedback loops and measurement systems to ensure ongoing optimization and growth.
              <a href={links.EL5} target="_blank" rel="noopener noreferrer">(EL5)</a>
            </li>
          </ol>

          <p className="text-[#E0E0E0] leading-relaxed mb-8">
            For organizations seeking to implement these strategies effectively, explore our 
            <a href={links.IL1} className="text-[#00FFAB] hover:text-[#00CC88]"> specialized workplace strategies</a> and 
            <a href={links.IL2} className="text-[#00FFAB] hover:text-[#00CC88]"> consulting services</a>.
          </p>

          <div className="bg-gradient-to-r from-[#00FFAB]/10 via-[#00CC88]/5 to-[#00FFAB]/10 rounded-lg p-8 mt-12 border border-[#00FFAB]/20">
            <h3 className="text-[#00FFAB] text-2xl font-bold mb-4">Transform Your Organization Today</h3>
            <p className="text-[#E0E0E0] mb-6">
              Ready to implement these strategies in your organization? OneThrive's expert team can guide you through every step of the process.
            </p>
            <a href={links.IL3} className="inline-block bg-gradient-to-r from-[#00FFAB] to-[#00CC88] text-black font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-[#00FFAB]/25 transition-all duration-300">
              Schedule a Consultation
            </a>
          </div>
        </motion.article>
      </div>
    </div>
    
    {/* Floating Background Elements */}
    <div className="fixed inset-0 pointer-events-none z-[9996]">
      <motion.div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#00FFAB]/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#00CC88]/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
    </div>
    <style jsx global>{`
      .prose ol { list-style-type: decimal !important; margin-left: 1.5rem; }
      .prose ol > li { margin-bottom: 0.75rem; font-size: inherit; }
      .prose a { color: #00FFAB; text-decoration: none; transition: color 0.3s ease; }
      .prose a:hover { color: #00CC88; text-decoration: underline; }
      html { scroll-behavior: smooth; }
    `}</style>
  </div>
);

export default BlogPost7;
