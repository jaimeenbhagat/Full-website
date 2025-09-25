import React, { useState, useEffect, useRef } from 'react';
import Blogimage3 from '../../../assets/Blogs/Blog3.webp';

// Content extracted and structured from the provided PDF
const blogData = {
  id: 3,
  title: 'Measuring What Matters: Quantifying the ROI of Employee Engagement & Experience',
  category: 'Leadership',
  author: 'OneThrive',
  date: 'October 15, 2025',
  readTime: '9 min read',
  heroImage: Blogimage3,
  relatedPosts: [
    {
      id: 8,
      title: 'The CEO\'s Playbook: How to Build a High-Performing Culture That Drives Growth & Profit',
      thumbnail: 'https://placehold.co/600x400/000000/00FFAB?text=Illustration',
    },
    {
      id: 4,
      title: 'Cultivating a Thriving Workplace: Leadership Strategies for Unlocking Employee Engagement',
      thumbnail: 'https://placehold.co/600x400/000000/00FFAB?text=Illustration',
    },
    {
      id: 5,
      title: 'Beyond the Bonus: How Strategic Employee Recognition Drives Engagement and Retention',
      thumbnail: 'https://placehold.co/600x400/000000/00FFAB?text=Illustration',
    },
  ],
  content: [
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'In today\'s competitive business landscape, every investment must demonstrate tangible value. For HR leaders, founders, and managers, this means moving beyond anecdotal evidence to clearly articulate the financial and operational benefits of investing in people. Quantifying the ',
        },
        { type: 'bold', content: 'ROI of employee engagement and experience' },
        {
          type: 'text',
          content: ' is no longer a "nice-to-have" but a strategic imperative, directly impacting budget allocation and business growth.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'This guide delves into why measuring the return on investment (ROI) for employee engagement and experience is crucial, outlines the key metrics to track, and provides actionable steps to calculate and communicate your impact. By understanding and demonstrating this ROI, you can transform your people initiatives from expenses into powerful drivers of profitability, productivity, and sustained organizational success.',
        },
      ],
    },
    {
      type: 'subheading',
      text: 'Why Quantifying ROI is HR\'s Strategic Imperative',
      id: 'why-quantifying-roi',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'The modern workforce is characterized by persistent disengagement, high turnover, and evolving expectations. These challenges carry significant financial and operational costs that directly impact the bottom line:',
        },
      ],
    },
    {
      type: 'list',
      items: [
        {
          parts: [
            { type: 'bold', content: 'Staggering Costs of Disengagement:' },
            {
              type: 'text',
              content: ' Low employee engagement costs the global economy nearly $9 trillion annually in lost productivity and innovation. Disengaged employees are less productive, more prone to leaving, and often do the bare minimum.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'High Turnover Expenses:' },
            {
              type: 'text',
              content: ' Replacing a single employee can cost anywhere from $30,000 to $45,000 for a mid-level manager, factoring in recruitment, onboarding, and lost productivity. High turnover rates can also damage team morale and company culture.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Burnout Impact:' },
            {
              type: 'text',
              content: ' A staggering 82% of white-collar workers report burnout, leading to increased absenteeism and higher healthcare costs, directly impacting organizational performance.',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'Conversely, organizations that strategically invest in employee engagement and experience see remarkable returns: up to ',
        },
        { type: 'bold', content: '23% higher profitability, 18% greater productivity' },
        {
          type: 'text',
          content: ', and significantly lower turnover rates (up to 43% less). Clearly demonstrating these gains is essential for securing leadership buy-in and continued investment.',
        },
      ],
    },
    {
      type: 'subheading',
      text: 'Key Metrics: What to Track to Measure Engagement ROI',
      id: 'key-metrics',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'To effectively quantify the ROI of employee engagement, HR leaders must identify and consistently track key performance indicators (KPIs) that directly link people initiatives to business outcomes.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '1. Employee Turnover Rate',
      id: 'employee-turnover-rate',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What to track:' },
        {
          type: 'text',
          content: ' The percentage of employees who leave the organization over a specific period. Focus on voluntary turnover, especially among high-performers.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why it matters for ROI:' },
        {
          type: 'text',
          content: ' Lower turnover directly translates to significant cost savings in recruitment, onboarding, and training. It also preserves institutional knowledge and team cohesion.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'OneThrive\'s Connection:' },
        { type: 'text', content: ' Our ' },
        { type: 'link', content: 'Team-Building Experiences', href: '/services' },
        {
          type: 'text',
          content: ' and Corporate Entertainment foster stronger connections and morale, directly impacting retention by creating a more positive and supportive workplace.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '2. Employee Productivity',
      id: 'employee-productivity',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What to track:' },
        {
          type: 'text',
          content: ' Metrics like revenue per employee, sales per employee, project completion rates, or output per hour.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why it matters for ROI:' },
        {
          type: 'text',
          content: ' Engaged employees are more focused, efficient, and motivated, leading to higher quality work and increased output. This directly impacts revenue and profitability.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'OneThrive\'s Connection:' },
        { type: 'text', content: ' Our ' },
        { type: 'link', content: 'Wellness Programs', href: '/services' },
        { type: 'text', content: ' reduce burnout and improve focus, while ' },
        { type: 'link', content: 'Creative Workshops', href: '/services' },
        { type: 'text', content: ' enhance problem-solving and innovation, all contributing to higher productivity.' },
      ],
    },
    {
      type: 'subheading',
      text: '3. Absenteeism Rate',
      id: 'absenteeism-rate',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What to track:' },
        {
          type: 'text',
          content: ' The frequency and duration of employee absences, particularly unplanned ones.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why it matters for ROI:' },
        {
          type: 'text',
          content: ' High absenteeism leads to lost productivity, increased workload for remaining staff, and potential project delays. Engaged employees are more likely to be present and committed.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'OneThrive\'s Connection:' },
        { type: 'text', content: ' Our Wellness Programs promote physical and mental health, directly reducing stress and illness-related absences. Our ' },
        { type: 'link', content: 'Corporate Sports Events', href: '/services' },
        { type: 'text', content: ' encourage physical activity, further boosting overall health and attendance.' },
      ],
    },
    {
      type: 'subheading',
      text: '4. Customer Satisfaction (CSAT) & Loyalty',
      id: 'customer-satisfaction',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What to track:' },
        {
          type: 'text',
          content: ' Customer satisfaction scores, Net Promoter Score (NPS), and customer retention rates.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why it matters for ROI:' },
        {
          type: 'text',
          content: ' Engaged employees provide better customer service, leading to higher customer satisfaction, loyalty, and ultimately, increased revenue. There\'s a direct link between EX and CX.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'OneThrive\'s Connection:' },
        { type: 'text', content: ' Our services, by boosting internal morale and connection, indirectly empower employees to deliver exceptional customer experiences. For example, a unified, engaged team from an ' },
        { type: 'link', content: 'Offsite & Retreat', href: '/services' },
        { type: 'text', content: ' is better equipped to serve clients.' },
      ],
    },
    {
      type: 'subheading',
      text: '5. Innovation & Idea Generation',
      id: 'innovation-and-idea-generation',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What to track:' },
        {
          type: 'text',
          content: ' Number of new ideas submitted, successful implementation of new processes, or patents filed.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why it matters for ROI:' },
        {
          type: 'text',
          content: ' Engaged employees feel psychologically safe to take risks and contribute creative solutions, driving organizational agility and competitive advantage.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'OneThrive\'s Connection:' },
        { type: 'text', content: ' Our Creative Workshops are specifically designed to unleash innovation and foster a culture of experimentation, directly contributing to new ideas and problem-solving.' },
      ],
    },
    {
      type: 'subheading',
      text: 'Calculating the ROI of Employee Engagement: A Simplified Approach',
      id: 'calculating-roi',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'Calculating the ROI of your employee engagement initiatives involves a clear, step-by-step process:',
        },
      ],
    },
    {
      type: 'list',
      items: [
        {
          parts: [
            {
              type: 'text',
              content: 'Establish Baseline Data: Before implementing any new program, collect current data for your chosen metrics (e.g., current turnover rate, average productivity, absenteeism). This is your starting point.',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Calculate Costs: Determine the total investment in your engagement initiatives. This includes program development, vendor fees, internal resources, and any associated expenses.',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Measure Benefits (Post-Implementation): After a defined period (e.g., 6-12 months), collect new data for your metrics. Quantify the improvements (e.g., X% reduction in turnover, Y% increase in productivity).',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Monetize Benefits: Convert these improvements into financial terms.',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Reduced Turnover Savings: Multiply the reduction in turnover by the average cost of replacing an employee.',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Increased Productivity Revenue: Estimate the additional revenue generated from improved productivity (e.g., if productivity increased by 5% and your annual revenue is $1M, that\'s $50K in additional revenue).',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Reduced Absenteeism Savings: Calculate the cost savings from fewer unplanned absences.',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Calculate ROI: Use the following formula: ROI = (Net Benefits - Costs) / Costs x 100.',
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              content: 'Example: If your engagement initiatives cost $50,000 and resulted in $150,000 in monetized benefits, your ROI would be: ($150,000 - $50,000) / $50,000 x 100 = 200% ROI. This means for every $1 invested, you gained $2 back.',
            },
          ],
        },
      ],
    },
    {
      type: 'subheading',
      text: 'Best Practices for HR Leaders in Measuring ROI',
      id: 'best-practices',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'To ensure your efforts to quantify the ROI of employee engagement are truly impactful and sustainable, consider these overarching best practices:',
        },
      ],
    },
    {
      type: 'list',
      items: [
        {
          parts: [
            { type: 'bold', content: 'Lead with Data:' },
            { type: 'text', content: ' HR leaders must leverage analytics to gain insights into employee sentiment, identify trends, and measure the ROI of engagement initiatives. This moves HR beyond a cost center to a strategic driver. A recent report from ' },
            { type: 'link', content: 'Deloitte', href: 'https://www2.deloitte.com/us/en/insights/human-capital-trends-2025.html' },
            { type: 'text', content: ' highlights how data-driven HR is becoming a strategic priority for businesses.' },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Continuous Feedback Loops:' },
            {
              type: 'text',
              content: ' Implement real-time feedback mechanisms (e.g., pulse surveys) to proactively address concerns and gather data on employee sentiment, which directly impacts engagement metrics.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Personalize the Experience:' },
            {
              type: 'text',
              content: ' Recognize that every employee is unique. Tailor communications, learning paths, and benefits to individual preferences, as personalization drives greater relevance and engagement, which can be tracked.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Align with Business Objectives:' },
            {
              type: 'text',
              content: ' Ensure your engagement metrics are directly tied to broader organizational goals (e.g., sales targets, customer retention, innovation goals). This makes the ROI clear to leadership.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Communicate Impact:' },
            { type: 'text', content: ' Regularly share the results of your engagement initiatives with leadership and employees. Highlight the positive impact on both the bottom line and the employee experience. A recent ' },
            { type: 'link', content: 'Forbes', href: 'https://www.forbes.com/councils/forbescoachescouncil/2024/05/02/measuring-the-roi-of-customer-experience/' },
            { type: 'text', content: ' article emphasizes the importance of communication in building a positive workplace and improving customer experience.' },
          ],
        },
      ],
    },
    {
      type: 'pullquote',
      text: 'Quantifying the ROI of employee engagement is not just an analytical exercise; it\'s a powerful demonstration of HR\'s strategic value and a critical step towards building a thriving, future-ready organization. By meticulously tracking metrics, calculating financial impact, and continuously refining your approach, you can transform your people investments into undeniable drivers of business success.',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'This is precisely where OneThrive excels. We are the architects of curated, meaningful interactions that are meticulously crafted to inspire your team, boost morale, and build a workplace culture where engagement and loyalty thrive. Our comprehensive suite of services—from dynamic team-building and holistic wellness programs to inspiring creative workshops, invigorating sports events, strategic offsites, and memorable entertainment—are all designed to seamlessly integrate into your overarching employee engagement strategy. We help you empower your employees, connect your teams, and ensure every individual feels valued, respected, and engaged, creating moments that truly matter throughout their entire journey with your organization, delivering measurable impact that you can proudly present to your leadership. To read more about how a high-performing culture can drive growth and profit, check out our blog on ',
        },
        { type: 'link', content: 'The CEO\'s Playbook', href: '/blog/ceos-playbook' },
        { type: 'text', content: '.' },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'Ready to elevate your employee engagement strategy with proven, quantifiable results? Partner with OneThrive today ',
        },
        { type: 'link', content: 'here', href: '/contact' },
        {
          type: 'text',
          content: ' to explore our customized solutions and discover how we can help your organization create moments that truly matter.',
        },
      ],
    },
  ],
};

const ContentBlock = ({ block }) => {
  const LinkRenderer = ({ parts }) => {
    if (!parts) return null;
    return (
      <>
        {parts.map((part, index) => {
          if (part.type === 'text') {
            return <span key={index}>{part.content}</span>;
          } else if (part.type === 'bold') {
            return <strong key={index} className="text-[#00FFAB] font-bold">{part.content}</strong>;
          } else if (part.type === 'link') {
            const isExternal = part.href.startsWith('http');
            const linkClasses =
              'text-[#00FFAB] hover:text-white transition-all duration-300 underline decoration-2 decoration-[#00FFAB] underline-offset-4 hover:decoration-white hover:shadow-[0_0_10px_rgba(0,255,171,0.4)]';
            return (
              <a
                key={index}
                href={part.href}
                className={linkClasses}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : ''}
              >
                {part.content}
              </a>
            );
          }
          return null;
        })}
      </>
    );
  };

  switch (block.type) {
    case 'paragraph':
      return (
        <p className="mb-8 text-lg text-gray-300 leading-relaxed">
          <LinkRenderer parts={block.parts} />
        </p>
      );
    case 'subheading':
      return (
        <h3 id={block.id} className="text-4xl font-bold mt-16 mb-6 text-[#00FFAB] relative">
          <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#00FFAB] to-transparent rounded-full"></span>
          {block.text}
        </h3>
      );
    case 'pullquote':
      return (
        <div className="my-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FFAB]/5 to-transparent rounded-2xl"></div>
          <blockquote className="relative p-8 md:p-12 bg-black/90 backdrop-blur-sm rounded-2xl border border-[#00FFAB]/30 text-xl md:text-2xl font-semibold italic text-white leading-snug shadow-[0_0_30px_rgba(0,255,171,0.1)]">
            <div className="absolute top-4 left-8 text-[#00FFAB] text-6xl opacity-30 font-serif">"</div>
            <div className="relative z-10">{block.text}</div>
            <div className="absolute bottom-4 right-8 text-[#00FFAB] text-6xl opacity-30 font-serif rotate-180">"</div>
          </blockquote>
        </div>
      );
    case 'image':
      return (
        <figure className="my-12">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-[#00FFAB]/20">
            <img
              src={block.url}
              alt={block.caption}
              className="w-full h-auto transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-center text-gray-400 text-sm italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'list':
      return (
        <ul className="mb-8 space-y-4 text-lg text-gray-300">
          {block.items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#00FFAB] rounded-full mt-3 mr-4 flex-shrink-0 shadow-[0_0_10px_rgba(0,255,171,0.5)]"></span>
              <div className="flex-1">
                <LinkRenderer parts={item.parts} />
              </div>
            </li>
          ))}
        </ul>
      );
    case 'linkGroup':
      return (
        <div className="bg-black/90 backdrop-blur-sm p-8 rounded-2xl border border-[#00FFAB]/30 my-12 shadow-[0_0_20px_rgba(0,255,171,0.1)]">
          <h4 className="text-xl font-bold mb-6 text-[#00FFAB]">{block.heading}</h4>
          <ul className="list-none space-y-3">
            {block.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#00FFAB] transition-all duration-300 hover:underline decoration-2 decoration-[#00FFAB] underline-offset-4"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'link':
      return (
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[#00FFAB] font-semibold text-lg hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,171,0.4)] my-8 underline decoration-2 decoration-[#00FFAB] underline-offset-4 hover:decoration-white"
        >
          {block.text}
        </a>
      );
    default:
      return null;
  }
};

const BlogPost3 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [showShareSection, setShowShareSection] = useState(false);
  const headingsRef = useRef([]);
  const relatedPostsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Check if we've reached the Related Posts section
      const relatedPostsElement = relatedPostsRef.current;
      if (relatedPostsElement) {
        const relatedPostsRect = relatedPostsElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Show share section when Related Posts section comes into view
        const shouldShowShare = relatedPostsRect.top <= viewportHeight * 0.8;
        setShowShareSection(shouldShowShare);
      }

      // Update active section
      const headings = headingsRef.current;
      const scrollPosition = window.scrollY + 100;
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(headings[i].id);
          break;
        }
      }
    };

    // Store headings
    headingsRef.current = blogData.content.filter(block => block.type === 'subheading');

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    const url = '[DYNAMIC_URL]';
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy link:', err);
    });
  };

  const RelatedPostsCard = ({ post }) => (
    <div className="group flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-black/90 backdrop-blur-sm border border-[#00FFAB]/30 transition-all duration-500 transform-gpu hover:shadow-[0_0_40px_rgba(0,255,171,0.2)] hover:scale-105 hover:border-[#00FFAB]/60">
      <div className="relative overflow-hidden">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex-1">
        <h4 className="text-xl font-bold leading-tight line-clamp-2 transition-all duration-300 group-hover:text-[#00FFAB] group-hover:drop-shadow-[0_0_5px_rgba(0,255,171,0.5)]">
          {post.title}
        </h4>
      </div>
    </div>
  );

  const SocialButton = ({ href, children, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-black/80 backdrop-blur-sm p-4 rounded-full border border-[#00FFAB]/30 hover:border-[#00FFAB] hover:bg-[#00FFAB]/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,171,0.3)] hover:scale-110"
      aria-label={label}
    >
      <div className="w-6 h-6 text-gray-300 group-hover:text-[#00FFAB] transition-colors duration-300">
        {children}
      </div>
    </a>
  );

  return (
    <div className="font-sans bg-black min-h-screen text-white relative">
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
        .text-onethrive-aqua {
          color: #00FFAB;
        }
        .prose-custom ul {
          list-style-type: none;
          padding-left: 0;
        }
        .prose-custom li {
          margin-bottom: 0.75rem;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #00FFAB;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00cc88;
        }
      `}</style>

      {/* Enhanced Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/50 backdrop-blur-sm z-50">
        <div
          className="h-full bg-gradient-to-r from-[#00FFAB] to-[#00cc88] transition-all duration-100 ease-out shadow-[0_0_10px_rgba(0,255,171,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #00FFAB 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Article Content */}
          <article className="lg:w-3/4 max-w-none mx-auto lg:mx-0">
            {/* Enhanced Breadcrumb Navigation */}
            <nav className="text-gray-400 text-sm mb-8 flex items-center space-x-2">
              <span onClick={() => window.location.href="/blogs"} className="hover:text-[#00FFAB] transition-colors duration-200 cursor-pointer">
                Blog
              </span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="hover:text-[#00FFAB] transition-colors duration-200 cursor-pointer">
                {blogData.category}
              </span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 font-medium">{blogData.title}</span>
            </nav>

            {/* Enhanced Article Header */}
            <header className="mb-16">
              <div className="relative">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8 bg-gradient-to-r from-white to-[#00FFAB] bg-clip-text text-transparent">
                  {blogData.title}
                </h1>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#00FFAB]/10 rounded-full blur-xl"></div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="bg-gradient-to-r from-[#00FFAB]/20 to-[#00FFAB]/10 backdrop-blur-sm text-[#00FFAB] text-sm font-bold px-4 py-2 rounded-full border border-[#00FFAB]/30 shadow-[0_0_15px_rgba(0,255,171,0.2)]">
                  {blogData.category}
                </div>
                <div className="flex items-center space-x-4 text-gray-400 text-sm">
                  <span className="font-semibold text-[#00FFAB]">{blogData.author}</span>
                  <span>•</span>
                  <span>{blogData.date}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {blogData.readTime}
                  </span>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-[#00FFAB]/20 group">
                <img
                  src={blogData.heroImage}
                  alt={blogData.title}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 ring-1 ring-[#00FFAB]/20 rounded-3xl"></div>
              </div>
            </header>

            {/* Enhanced Main Content Body */}
            <section className="prose-custom max-w-none">
              {blogData.content.map((block, index) => (
                <ContentBlock key={index} block={block} />
              ))}
            </section>

            {/* Enhanced Social Share Buttons (Mobile/Bottom) */}
            <div className="flex flex-wrap justify-center gap-4 my-16 lg:hidden">
              <SocialButton
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('[DYNAMIC_URL]')}`}
                label="Share on LinkedIn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.763s.784-1.762 1.75-1.762 1.75.79 1.75 1.762-.783 1.763-1.75 1.763zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </SocialButton>
              <SocialButton
                href={`https://x.com/intent/tweet?url=${encodeURIComponent('[DYNAMIC_URL]')}&text=${encodeURIComponent(blogData.title)}`}
                label="Share on Twitter"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.36 0-6.082 2.72-6.082 6.082 0 .476.056.938.164 1.378-5.056-.255-9.52-2.67-12.516-6.346-.525.908-.827 1.966-.827 3.101 0 2.105 1.071 3.965 2.693 5.064-.99.03-1.918-.304-2.727-.751v.079c0 2.967 2.114 5.448 4.912 6.012-.472.129-.971.196-1.485.196-.363 0-.71.035-1.05.099.78 2.427 3.031 4.195 5.764 4.248-2.083 1.631-4.723 2.585-7.589 2.585-.494 0-.978-.029-1.455-.084 2.684 1.742 5.867 2.76 9.284 2.76 11.13 0 17.221-9.227 17.221-17.221 0-.263-.008-.526-.017-.788.943-.679 1.765-1.533 2.417-2.529z" />
                </svg>
              </SocialButton>
              <SocialButton
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blogData.title + ' [DYNAMIC_URL]')}`}
                label="Share on WhatsApp"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2.05c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.34 4.88l-1.39 5.04 5.23-1.37c1.4-.76 2.92-1.16 4.47-1.16 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.06c-1.46 0-2.84-.4-4.06-1.16l-3.52.92.93-3.38c-.76-1.29-1.16-2.75-1.16-4.24 0-4.48 3.65-8.12 8.12-8.12s8.12 3.65 8.12 8.12-3.64 8.12-8.12 8.12zm4.38-5.91c-.24-.12-.86-.42-.99-.47-.14-.06-.24-.09-.34.09-.09.18-.34.47-.42.56-.09.09-.17.1-.31.06-.14-.04-.59-.22-1.12-.69-.42-.37-.7-.84-.79-.99-.09-.15-.01-.15.06-.15s.16-.01.24-.01c.08-.01.14-.02.22-.05s.21-.05.32-.12c.1-.06.18-.17.24-.26s.08-.18.04-.34c-.04-.14-.34-.82-.47-1.1s-.26-.22-.34-.23-.17-.02-.24-.02h-.34c-.11-.01-.29-.02-.59.22-.29.23-1.12 1.09-1.12 2.65 0 1.55 1.15 3.07 1.31 3.28 0 0 0 0 0 0.15.21.29.35.59.45.29.1.59.15.89.15.42 0 1.25-.39 1.43-.51.18-.12.42-.19 1.12-.59.7-.42 1.16-.95 1.34-1.22.18-.28.18-.28.1-.41z" />
                </svg>
              </SocialButton>
              <button
                onClick={handleCopyLink}
                className="group bg-black/80 backdrop-blur-sm p-4 rounded-full border border-[#00FFAB]/30 hover:border-[#00FFAB] hover:bg-[#00FFAB]/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,171,0.3)] hover:scale-110"
                aria-label="Copy link"
              >
                <svg className="w-6 h-6 text-gray-300 group-hover:text-[#00FFAB] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1h-12c-1.104 0-2 .896-2 2v14h2v-14c0-.551.448-1 1-1h12v-2zm-2 4h-10c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-14c0-1.104-.896-2-2-2zm0 16h-10v-14h10v14z" />
                </svg>
              </button>
            </div>

            {/* Enhanced Related Posts Section */}
            <section ref={relatedPostsRef} className="my-20">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-white to-[#00FFAB] bg-clip-text text-transparent">
                  Related Posts
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-[#00FFAB] to-transparent mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogData.relatedPosts.map((post) => (
                  <RelatedPostsCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="relative bg-gradient-to-br from-black via-black to-[#00FFAB]/5 p-12 md:p-16 rounded-3xl border border-[#00FFAB]/30 text-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFAB]/5 via-transparent to-[#00FFAB]/5 opacity-50"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00FFAB]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00FFAB]/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h4 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-white to-[#00FFAB] bg-clip-text text-transparent">
                  Book a Workshop with OneThrive
                </h4>
                <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  Ready to elevate your employee engagement strategy with proven, quantifiable results? Partner with OneThrive today to explore our customized solutions.
                </p>
                <button className="group bg-gradient-to-r from-[#00FFAB] to-[#00cc88] text-black font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,171,0.4)] transform-gpu">
                  <span className="flex items-center justify-center">
                    Measure Your ROI Impact
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </section>
          </article>

          {/* Sidebar with Sequential Display */}
          <div className="lg:w-1/4 lg:flex flex-col hidden">
            {/* Table of Contents - Shows until Related Posts */}
            <div 
              className={`sticky top-24 transition-all duration-500 ${
                showShareSection 
                  ? 'opacity-0 pointer-events-none transform -translate-y-4' 
                  : 'opacity-100 pointer-events-auto transform translate-y-0'
              }`}
            >
              <div className="bg-gradient-to-br from-black to-black/90 backdrop-blur-xl p-5 rounded-3xl border border-[#00FFAB]/30 shadow-2xl">
                <h4 className="text-2xl font-bold mb-2 text-[#00FFAB] flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                  Table of Contents
                </h4>
                <ul className="space-y-3">
                  {blogData.content
                    .filter((block) => block.type === 'subheading')
                    .map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className={`block text-[12px] px-4 py-2 rounded-lg transition-all duration-300 border-l-2 ${
                            activeSection === heading.id
                              ? 'text-[#00FFAB] border-[#00FFAB] bg-[#00FFAB]/10 font-semibold'
                              : 'text-white border-transparent hover:text-[#00FFAB] hover:border-[#00FFAB]/50 hover:bg-[#00FFAB]/5'
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Share Section - Shows when Related Posts appears */}
            <div 
              className={`sticky top-24 transition-all duration-500 ${
                showShareSection 
                  ? 'opacity-100 pointer-events-auto transform translate-y-0' 
                  : 'opacity-0 pointer-events-none transform translate-y-4'
              }`}
              style={{
                position: showShareSection ? 'sticky' : 'absolute',
              }}
            >
              <div className="bg-gradient-to-br from-black to-black/90 backdrop-blur-xl p-8 rounded-3xl border border-[#00FFAB]/30 shadow-2xl flex flex-col items-center">
                <h4 className="text-2xl font-bold mb-6 text-[#00FFAB] flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Share
                </h4>
                <div className="flex flex-col space-y-4">
                  <SocialButton
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('[DYNAMIC_URL]')}`}
                    label="Share on LinkedIn"
                  >
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.763s.784-1.762 1.75-1.762 1.75.79 1.75 1.762-.783 1.763-1.75 1.763zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </SocialButton>
                  <SocialButton
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('[DYNAMIC_URL]')}&text=${encodeURIComponent(blogData.title)}`}
                    label="Share on Twitter"
                  >
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.36 0-6.082 2.72-6.082 6.082 0 .476.056.938.164 1.378-5.056-.255-9.52-2.67-12.516-6.346-.525.908-.827 1.966-.827 3.101 0 2.105 1.071 3.965 2.693 5.064-.99.03-1.918-.304-2.727-.751v.079c0 2.967 2.114 5.448 4.912 6.012-.472.129-.971.196-1.485.196-.363 0-.71.035-1.05.099.78 2.427 3.031 4.195 5.764 4.248-2.083 1.631-4.723 2.585-7.589 2.585-.494 0-.978-.029-1.455-.084 2.684 1.742 5.867 2.76 9.284 2.76 11.13 0 17.221-9.227 17.221-17.221 0-.263-.008-.526-.017-.788.943-.679 1.765-1.533 2.417-2.529z" />
                    </svg>
                  </SocialButton>
                  <SocialButton
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blogData.title + ' [DYNAMIC_URL]')}`}
                    label="Share on WhatsApp"
                  >
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.04 2.05c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.34 4.88l-1.39 5.04 5.23-1.37c1.4-.76 2.92-1.16 4.47-1.16 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.06c-1.46 0-2.84-.4-4.06-1.16l-3.52.92.93-3.38c-.76-1.29-1.16-2.75-1.16-4.24 0-4.48 3.65-8.12 8.12-8.12s8.12 3.65 8.12 8.12-3.64 8.12-8.12 8.12zm4.38-5.91c-.24-.12-.86-.42-.99-.47-.14-.06-.24-.09-.34.09-.09.18-.34.47-.42.56-.09.09-.17.1-.31.06-.14-.04-.59-.22-1.12-.69-.42-.37-.7-.84-.79-.99-.09-.15-.01-.15.06-.15s.16-.01.24-.01c.08-.01.14-.02.22-.05s.21-.05.32-.12c.1-.06.18-.17.24-.26s.08-.18.04-.34c-.04-.14-.34-.82-.47-1.1s-.26-.22-.34-.23-.17-.02-.24-.02h-.34c-.11-.01-.29-.02-.59.22-.29.23-1.12 1.09-1.12 2.65 0 1.55 1.15 3.07 1.31 3.28 0 0 0 0 0 0.15.21.29.35.59.45.29.1.59.15.89.15.42 0 1.25-.39 1.43-.51.18-.12.42-.19 1.12-.59.7-.42 1.16-.95 1.34-1.22.18-.28.18-.28.1-.41z" />
                    </svg>
                  </SocialButton>
                  <button
                    onClick={handleCopyLink}
                    className="group bg-black/80 backdrop-blur-sm p-4 rounded-full border border-[#00FFAB]/30 hover:border-[#00FFAB] hover:bg-[#00FFAB]/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,171,0.3)] hover:scale-110"
                    aria-label="Copy link"
                  >
                    <svg className="w-6 h-6 text-gray-300 group-hover:text-[#00FFAB] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1h-12c-1.104 0-2 .896-2 2v14h2v-14c0-.551.448-1 1-1h12v-2zm-2 4h-10c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-14c0-1.104-.896-2-2-2zm0 16h-10v-14h10v14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost3;