import React, { useRef } from 'react';
import InfiniteMenu from './components/InfiniteMenu';

const portfolioItems = [
  { image: '/link.png', link: 'https://www.linkedin.com/in/rachit-singh-079052380?utm_source=share_via&utm_content=profile&utm_medium=member_android', title: 'LinkedIn', description: 'Professional Networking' },
  { image: '/Github.png', link: 'https://github.com/rs7594801-star', title: 'GitHub', description: 'Code & Projects' },
  { image: '/Leetcode.png', link: 'https://leetcode.com/u/Rachit6804/', title: 'LeetCode', description: 'Problem Solving' },
  { image: '/Projects.jpg', link: 'https://YOUR_PROJECT_URL', title: 'Projects', description: 'Work Showcase' },
  { image: '/instagram.png', link: 'https://www.instagram.com/rachit6804/', title: 'Instagram', description: 'Photography & Life' },
  { image: '/ab1.jpg', link: '#', title: 'About Me', description: 'Student at VIT Bhopal' }
];

export default function App() {
  const revealImgRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    }
  };

  return (
    <div 
      style={{ 
        height: '100vh', 
        width: '100vw', 
        position: 'fixed', // Changed from relative to fixed to prevent scroll bumping
        top: 0,
        left: 0,
        overflow: 'hidden', 
        backgroundColor: '#120F17' 
      }}
      onMouseMove={handleMouseMove}
    >
      {/* 1. The 3D Menu Layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        zIndex: 20, 
        overflow: 'hidden',
        pointerEvents: 'auto' 
      }}>
        <InfiniteMenu items={portfolioItems} scale={1} />
      </div>

      {/* 2. The Reveal Image Layer */}
      {/* 2. The Reveal Image Layer in App.jsx */}
<img
  ref={revealImgRef}
  src="/Bg6.jpg" 
  alt="Reveal effect"
  style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    // CHANGE: 'contain' ensures the whole image is visible without zooming.
    // Use '100% 100%' if you want it to stretch exactly to the corners.
    objectFit: 'contain', 
    zIndex: 5, 
    mixBlendMode: 'lighten',
    opacity: 0.9, 
    pointerEvents: 'none', 
    '--mx': '-9999px',
    '--my': '-9999px',
    // ADJUST: Reduced the gradient size to 250px so it feels less "zoomed"
    WebkitMaskImage: 'radial-gradient(250px circle at var(--mx) var(--my), rgba(255,255,255,1) 0%, transparent 100%)',
    maskImage: 'radial-gradient(250px circle at var(--mx) var(--my), rgba(255,255,255,1) 0%, transparent 100%)',
  }}
/>
    </div>
  );
}