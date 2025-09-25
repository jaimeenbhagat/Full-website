import React, { useState, useEffect, useRef } from 'react';

// Content extracted and structured from the provided PDF
const blogData = {
  id: 3,
  title: 'Fostering a Culture of Well-being: How to Combat Burnout and Boost Morale',
  category: 'Wellness',
  author: 'OneThrive',
  date: 'October 25, 2025',
  readTime: '8 min read',
  heroImage: 'https://placehold.co/1200x600/000000/00FFAB?text=Illustration',
  relatedPosts: [
    {
      id: 1,
      title: 'The CEO\'s Playbook: How to Build a High-Performing Culture That Drives Growth & Profit',
      thumbnail: 'https://placehold.co/600x400/000000/00FFAB?text=Illustration',
    },
    {
      id: 2,
      title: 'Measuring What Matters: Quantifying the ROI of Employee Engagement & Experience',
      thumbnail: 'https://placehold.co/600x400/000000/00FFAB?text=Illustration',
    },
    {
      id: 18,
      title: 'Combating Burnout: 7 Corporate Wellness Programs Employees Won\'t Hate',
      thumbnail: 'https://placehold.co/600x400/000000/00FFAB?text=Illustration',
    },
  ],
  content: [
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'In today\'s fast-paced work environment, employee burnout is a pervasive and growing challenge. Characterized by chronic stress, exhaustion, cynicism, and reduced efficacy, burnout significantly impacts individual well-being and organizational productivity. The "always-on" culture, coupled with high workloads and tight deadlines, blur the line between work and personal life, leading to increased anxiety and disengagement.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'The good news? Organizations are increasingly recognizing the critical importance of employee well-being. Investing in effective ',
        },
        { type: 'bold', content: 'corporate wellness programs' },
        { type: 'text', content: ' is no longer a perk but a ' },
        { type: 'bold', content: 'strategic imperative' },
        {
          type: 'text',
          content: '. These programs are designed to address the root causes of burnout, promote holistic health, and foster a more engaged, resilient, and productive workforce. The goal is to create initiatives that genuinely resonate with employees, moving beyond generic offerings to solutions they will actively embrace and benefit from.',
        },
      ],
    },
    {
      type: 'subheading',
      text: 'The Silent Crisis: Why Employee Burnout Demands Attention',
      id: 'the-silent-crisis',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'The consequences of burnout are far-reaching, impacting not only individual health but also organizational performance. Disengaged employees, often suffering from burnout, exhibit reduced quality of work, higher absenteeism, decreased customer satisfaction, and a negative influence on overall team morale and workplace culture. Financial stress can exacerbate these issues, contributing to anxiety and negatively affecting overall well-being. A lack of physical activity, poor posture from prolonged screen time, and inadequate mental health support systems further compound the problem. Addressing these challenges proactively through supportive corporate wellness programs helps create a healthier, more engaged, and resilient workforce, directly combating the hidden costs of disengagement. For more on the costs of disengagement, you can read our blog on ',
        },
        {
          type: 'link',
          content: 'The CEO\'s Playbook: How to Build a High-Performing Culture That Drives Growth & Profit',
          href: '/blog/ceos-playbook',
        },
        { type: 'text', content: '.' },
      ],
    },
    {
      type: 'subheading',
      text: 'Beyond the Basics: Benefits of Strategic Corporate Wellness Programs',
      id: 'beyond-the-basics',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'Well-designed corporate wellness programs offer a multitude of benefits that extend far beyond individual health, positively impacting the entire organization:',
        },
      ],
    },
    {
      type: 'list',
      items: [
        {
          parts: [
            { type: 'bold', content: 'Reduces Burnout and Stress:' },
            {
              type: 'text',
              content: ' By providing tools and resources for stress management, mindfulness, and work-life balance, these programs directly combat the drivers of burnout.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Boosts Productivity and Performance:' },
            {
              type: 'text',
              content: ' Healthy and engaged employees are more focused, energetic, and productive, leading to higher quality work and reduced error rates.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Improves Employee Morale and Engagement:' },
            {
              type: 'text',
              content: ' When organizations invest in their employees\' well-being, it signals care and appreciation, fostering a more positive workplace atmosphere and increasing overall engagement.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Enhances Retention and Attracts Talent:' },
            {
              type: 'text',
              content: ' Companies known for prioritizing employee well-being are more attractive to top talent and experience lower turnover rates, as employees feel valued and supported.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Fosters a Positive Company Culture:' },
            {
              type: 'text',
              content: ' Wellness initiatives can create a culture of health, support, and shared purpose, aligning with OneThrive\'s focus on creativity, connection, and well-being.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Addresses Holistic Well-being:' },
            {
              type: 'text',
              content: ' Comprehensive programs consider physical, mental, emotional, and even financial health, providing a well-rounded approach to employee support.',
            },
          ],
        },
      ],
    },
    {
      type: 'subheading',
      text: '7 Corporate Wellness Programs Employees Will Actually Love',
      id: '7-corporate-wellness-programs',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'Here are seven types of corporate wellness programs that go beyond traditional offerings, designed to genuinely engage your team and combat burnout.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '1. Mindfulness and Stress Reduction Workshops',
      id: 'mindfulness-and-stress-reduction',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What it is:' },
        {
          type: 'text',
          content: ' Guided meditation sessions, mindfulness exercises, and workshops on stress management techniques. These can be short, regular virtual sessions or more in-depth workshops.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why employees love it:' },
        {
          type: 'text',
          content: ' Provides practical tools to manage daily stress, improve focus, and enhance mental clarity, directly addressing high workloads and tight deadlines.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '2. Financial Wellness Programs',
      id: 'financial-wellness-programs',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What it is:' },
        {
          type: 'text',
          content: ' Webinars and resources on debt management, emergency savings, investment planning, and retirement planning. Can include access to financial advisors.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why employees love it:' },
        {
          type: 'text',
          content: ' Alleviates a significant source of anxiety for many employees, leading to reduced stress and improved focus at work.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '3. Flexible Work Schedules & Boundaries',
      id: 'flexible-work-schedules',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What it is:' },
        {
          type: 'text',
          content: ' Implementing policies that allow employees to plan their work hours, telecommute, or have clear "off" hours. This includes encouraging regular breaks.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why employees love it:' },
        {
          type: 'text',
          content: ' Empowers employees to achieve better work-life balance, reducing fatigue and the "always-on" pressure.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '4. Engaging Physical Fitness Challenges',
      id: 'engaging-physical-fitness',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What it is:' },
        {
          type: 'text',
          content: ' Gamified group fitness competitions like step tracking, cycling goals, or "walk to a destination" challenges. Can include virtual exercise classes (yoga, stretching) or ergonomic workstation support.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why employees love it:' },
        {
          type: 'text',
          content: ' Promotes physical activity in a fun, competitive, and social way, boosting energy levels and reducing sedentary work risks. A study from the ',
        },
        {
          type: 'link',
          content: 'World Health Organization',
          href: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work',
        },
        {
          type: 'text',
          content: ' shows that meaningful work is protective for mental health, but poor working conditions can worsen it, underscoring the need for a healthy work environment.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '5. Healthy Eating & Nutrition Initiatives',
      id: 'healthy-eating',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What it is:' },
        {
          type: 'text',
          content: ' Nutrition webinars, healthy snack options in the office, and challenges focused on balanced diets or energy-boosting foods.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why employees love it:' },
        {
          type: 'text',
          content: ' Educates employees on healthy habits, directly impacting physical health and sustained energy throughout the workday.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '6. Sleep Hygiene & Mental Decompression',
      id: 'sleep-hygiene',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What it is:' },
        {
          type: 'text',
          content: ' Workshops on improving sleep quality, identifying "sleep stealers," and creating wind-down routines. Focuses on mental decompression techniques before bed.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why employees love it:' },
        {
          type: 'text',
          content: ' Addresses a fundamental aspect of well-being often overlooked, leading to improved rest, focus, and overall productivity.',
        },
      ],
    },
    {
      type: 'subheading',
      text: '7. Employee Support Groups & Open Communication',
      id: 'employee-support-groups',
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'What it is:' },
        {
          type: 'text',
          content: ' Creating safe spaces for employees to share experiences, discuss mental health, and promote open dialogue. Can include manager training in active listening and transparent communication.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        { type: 'bold', content: 'Why employees love it:' },
        {
          type: 'text',
          content: ' Reduces stigma around mental health, fosters a supportive environment, and ensures employees feel heard and understood.',
        },
      ],
    },
    {
      type: 'subheading',
      text: 'Implementing Successful Wellness Programs: Best Practices',
      id: 'implementing-successful-wellness-programs',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'To ensure your corporate wellness programs are effective and well-received, consider these best practices:',
        },
      ],
    },
    {
      type: 'list',
      items: [
        {
          parts: [
            { type: 'bold', content: 'Keep It Simple and Accessible:' },
            {
              type: 'text',
              content: ' Avoid overly complex programs. Ensure ease of use and leverage familiar tools to minimize barriers to participation.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Involve Leaders and Champions:' },
            {
              type: 'text',
              content: ' When leaders actively participate and support wellness initiatives, it signals their importance and encourages broader employee engagement. A study from ',
            },
            {
              type: 'link',
              content: 'Deloitte',
              href: 'https://www2.deloitte.com/us/en/insights/topics/talent/workplace-well-being-research.html',
            },
            {
              type: 'text',
              content: ' highlights a significant disconnect between how executives and employees view well-being, with only 56% of employees feeling their leaders care about their well-being, compared to 91% of C-suite executives who believe they do.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Provide Rewards & Incentives:' },
            {
              type: 'text',
              content: ' Offer meaningful rewards, whether it\'s charity donations, healthy snacks, fitness goods, or gift cards, to motivate participation and recognize effort.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Gather Feedback and Iterate:' },
            {
              type: 'text',
              content: ' Continuously solicit feedback from employees to understand what resonates and what can be improved, ensuring programs remain relevant and impactful. This aligns with the importance of data-driven decisions discussed in our blog ',
            },
            {
              type: 'link',
              content: 'Measuring What Matters: Quantifying the ROI of Employee Engagement & Experience',
              href: '/blog/measuring-roi',
            },
            { type: 'text', content: '.' },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Promote Friendly Competition:' },
            {
              type: 'text',
              content: ' Gamification features and team challenges can make participation fun and competitive, boosting team spirit and camaraderie.',
            },
          ],
        },
        {
          parts: [
            { type: 'bold', content: 'Personalize Experiences:' },
            {
              type: 'text',
              content: ' Recognize that different employees have different needs. Tailor solutions based on interests and specific wants to create personalized programs that resonate. A recent ',
            },
            {
              type: 'link',
              content: 'Harvard Business Review',
              href: 'https://www.harvardbusiness.org/insight/make-purpose-real-for-employees/',
            },
            {
              type: 'text',
              content: ' article emphasizes that to help employees thrive, companies must connect their individual values to the organizational purpose.',
            },
          ],
        },
      ],
    },
    {
      type: 'pullquote',
      text: 'Combating burnout and fostering a healthy, engaged workforce is a continuous journey. By strategically implementing comprehensive corporate wellness programs, organizations can address critical pain points like stress, disengagement, and work-life imbalance. These initiatives, when designed with genuine employee well-being in mind, go beyond mere perks to create a culture where employees feel supported, valued, and empowered to thrive.',
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'OneThrive specializes in curating meaningful experiences that prioritize creativity, connection, and well-being. Our tailored ',
        },
        {
          type: 'link',
          content: 'wellness solutions',
          href: '/services/corporate-wellness-solutions',
        },
        {
          type: 'text',
          content: ' are designed to integrate seamlessly into your organizational culture, helping you build a resilient, productive, and happy workforce that truly feels cared for.',
        },
      ],
    },
    {
      type: 'paragraph',
      parts: [
        {
          type: 'text',
          content: 'Ready to invest in your employees\' well-being and combat burnout effectively? Partner with OneThrive today ',
        },
        { type: 'link', content: 'here', href: '/contact' },
        { type: 'text', content: ' to explore our customized corporate wellness programs.' },
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

const BlogPost9 = () => {
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
                  Ready to invest in your employees' well-being and combat burnout effectively? Partner with OneThrive today to explore our customized corporate wellness programs.
                </p>
                <button className="group bg-gradient-to-r from-[#00FFAB] to-[#00cc88] text-black font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,171,0.4)] transform-gpu">
                  <span className="flex items-center justify-center">
                    Plan Your Corporate Wellness Program
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

export default BlogPost9;