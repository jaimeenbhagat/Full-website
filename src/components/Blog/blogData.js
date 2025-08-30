import BlogPost1 from './BlogPosts/BlogPost1';
import BlogPost2 from './BlogPosts/BlogPost2';
import BlogPost3 from './BlogPosts/BlogPost3';
import BlogPost4 from './BlogPosts/BlogPost4';
// ... import all 28

export const blogs = [
  {
    id: 1,
    title: '20 Virtual Team Building Activities...',
    description: 'In today\'s evolving workplace...',
    image: '../../assets/about.webp', // or import
    author: 'Team OneThrive',
    component: BlogPost1,
  },
  {
    id: 2,
    title: 'Combating Burnout...',
    description: 'Employee burnout is a pervasive...',
    image: '../../assets/about.webp',
    author: 'Team OneThrive',
    component: BlogPost2,
  },
  {
    id: 3,
    title: 'Unleashing Innovation: How Creative Workshops Spark Employee Engagement',
    description: 'Explore the transformative power of creative workshops in enhancing employee engagement and fostering innovation.',
    image: '../../assets/about.webp',
    author: 'Team OneThrive',
    component: BlogPost3,
  },
  {
    id: 4,
    title: 'Planning the Perfect Company Offsite: Maximizing Team Potential and Engagement',
    description: 'Discover the key elements of successful company offsites and how they can enhance team collaboration and engagement.',
    image: '../../assets/about.webp',
    author: 'Team OneThrive',
    component: BlogPost4,
  },
  // ... up to 28
];