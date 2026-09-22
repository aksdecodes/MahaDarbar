import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AnnouncementBar = ({ announcements = [] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements]);

  if (!isVisible || !announcements || announcements.length === 0) return null;

  return (
    <div className="announcement-bar bg-gradient-to-r from-[#FF6B00] to-orange-500 text-white px-4 py-2 relative flex items-center justify-center z-40">
      <div className="text-sm font-medium text-center truncate max-w-[90%] transition-opacity duration-500">
        {announcements[currentIndex].message}
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
