import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock, Scissors } from 'lucide-react';
import { BENEFITS } from '../data/fashionData';

export const BenefitsStrip: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck':
        return <Truck className="w-6 h-6 text-[#171717]" />;
      case 'refresh':
        return <RotateCcw className="w-6 h-6 text-[#171717]" />;
      case 'award':
        return <ShieldCheck className="w-6 h-6 text-[#171717]" />;
      case 'scissors':
        return <Scissors className="w-6 h-6 text-[#171717]" />;
      case 'lock':
      default:
        return <Lock className="w-6 h-6 text-[#171717]" />;
    }
  };

  return (
    <section aria-label="Customer Benefits & Guarantees" className="border-y border-[#EAE7E1] bg-white py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#EAE7E1]">
          {BENEFITS.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3.5 px-3 lg:px-6 group"
            >
              <div className="flex items-center justify-center flex-shrink-0 text-[#171717]">
                {getIcon(item.iconName)}
              </div>
              <div>
                <h4 className="text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-[#171717]">
                  {item.title}
                </h4>
                <p className="text-[11.5px] text-[#666666] mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
