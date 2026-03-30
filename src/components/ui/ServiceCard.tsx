'use client';

import React from 'react';
import { Cloud, Shield, BarChart3, Cpu, Code, Compass } from 'lucide-react';

interface Service {
  title: string;
  desc: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  cloud: <Cloud className="w-8 h-8" />,
  shield: <Shield className="w-8 h-8" />,
  chart: <BarChart3 className="w-8 h-8" />,
  cpu: <Cpu className="w-8 h-8" />,
  code: <Code className="w-8 h-8" />,
  compass: <Compass className="w-8 h-8" />,
};

export default function ServiceCard({ title, desc, icon }: Service) {
  return (
    <div className="group perspective-1000 h-[280px]">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 bg-[#112240] rounded-2xl p-8 backface-hidden border border-[#1d3a6a] hover:border-[#00D4FF]/50 transition-all duration-300">
          <div className="text-[#00D4FF] mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {iconMap[icon]}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 font-sora">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{desc}</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#0a192f] rounded-2xl p-8 backface-hidden rotate-y-180 border border-[#00D4FF]/30 flex flex-col justify-center items-center text-center">
          <div className="text-[#00D4FF] mb-4">
            {iconMap[icon]}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 font-sora">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Konsultasi gratis untuk solusi {title.toLowerCase()} yang tepat untuk bisnis Industri Anda.
          </p>
          <button className="mt-6 px-6 py-2 bg-[#00D4FF] text-[#0a192f] font-semibold rounded-full hover:bg-white transition-colors duration-300">
            Pelajari
          </button>
        </div>
      </div>
    </div>
  );
}
