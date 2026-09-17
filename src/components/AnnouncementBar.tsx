import React, { useState, useEffect } from 'react';
import { Truck, RotateCcw, Award, Crosshair } from 'lucide-react';
import { BRAND_INFO } from '../data/fashionData';

interface AnnouncementBarProps {
  onOpenTrackModal?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenTrackModal }) => {
  const announcements = [
    {
      icon: <Truck className="w-3.5 h-3.5 text-[#B78343]" />,
      text: `COMPLIMENTARY EXPRESS DELIVERY ON ORDERS ABOVE ₹${BRAND_INFO.freeShippingThreshold.toLocaleString('en-IN')}`
    },
    {
      icon: <RotateCcw className="w-3.5 h-3.5 text-[#B78343]" />,
      text: '30-DAY EFFORTLESS DOORSTEP RETURNS'
    },
    {
      icon: <Award className="w-3.5 h-3.5 text-[#B78343]" />,
      text: '100% GOTS CERTIFIED ORGANIC TEXTILES'
    },
    {
      icon: <Crosshair className="w-3.5 h-3.5 text-[#B78343]" />,
      text: 'TRACK ATELIER DISPATCH'
    }
  ];

  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <aside aria-label="Announcement" className="bg-[#111111] text-[#F5F5F5] border-b border-[#262626] py-2 px-4 sm:px-6 select-none text-[10.5px] sm:text-[11.5px] tracking-wider">
      {/* Desktop Multi-item View */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto font-medium text-white/90">
        <div className="flex items-center gap-2">
          {announcements[0].icon}
          <span>{announcements[0].text}</span>
        </div>

        <span className="text-[#444444]">|</span>

        <div className="flex items-center gap-2">
          {announcements[1].icon}
          <span>{announcements[1].text}</span>
        </div>

        <span className="text-[#444444]">|</span>

        <div className="flex items-center gap-2">
          {announcements[2].icon}
          <span>{announcements[2].text}</span>
        </div>

        <span className="text-[#444444]">|</span>

        <div className="flex items-center gap-2">
          {announcements[3].icon}
          <button
            onClick={onOpenTrackModal}
            className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
          >
            {announcements[3].text}
          </button>
        </div>
      </div>

      {/* Mobile Animated Single Item Carousel */}
      <div className="lg:hidden flex items-center justify-center text-center overflow-hidden h-5">
        <div
          key={currentMobileIndex}
          className="flex items-center justify-center gap-2 transition-all duration-500 ease-out animate-fadeIn text-white/90"
        >
          {announcements[currentMobileIndex].icon}
          <span className="font-medium tracking-wide">
            {announcements[currentMobileIndex].text}
          </span>
        </div>
      </div>
    </aside>
  );
};
