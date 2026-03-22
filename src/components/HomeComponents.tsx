import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export const Calendar: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const prevMonthDays = [25, 26, 27, 28, 29, 30];
  const currentMonthDays = [
    { day: 1, color: 'bg-secondary-container' },
    { day: 2, color: 'bg-tertiary-container' },
    { day: 3, color: 'bg-primary-container' },
    { day: 4, color: 'bg-secondary' },
    { day: 5, color: 'bg-tertiary' },
    { day: 6, color: 'bg-primary', active: true },
    { day: 7, color: 'bg-surface-container-highest' },
    { day: 8, color: 'bg-[#f0c1b8]' },
    { day: 9, color: 'bg-[#caebcc]' },
    { day: 10, color: 'bg-[#e4d7fd]' },
  ];

  return (
    <section className="mt-4 px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-on-surface-variant font-medium text-sm tracking-widest uppercase">October 2023</span>
          <h2 className="text-4xl font-extrabold text-primary leading-tight mt-1">光影流转</h2>
        </div>
        <div className="flex gap-2 pb-1">
          <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary/60 hover:bg-surface-container transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary/60 hover:bg-surface-container transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-8 gap-x-2 text-center">
        {days.map(d => (
          <div key={d} className="text-[10px] font-bold text-outline-variant uppercase tracking-tighter">{d}</div>
        ))}
        
        {prevMonthDays.map(d => (
          <div key={`prev-${d}`} className="flex flex-col items-center gap-2 opacity-20 text-sm">{d}</div>
        ))}
        
        {currentMonthDays.map(item => (
          <div key={`curr-${item.day}`} className="flex flex-col items-center gap-2 relative text-sm">
            <span className={item.active ? 'font-bold text-primary' : ''}>{item.day}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
            {item.active && (
              <div className="absolute -top-1 w-8 h-8 rounded-full border border-primary/20 -z-10"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export const RecordCard: React.FC<{
  date: string;
  title: string;
  score: string;
  desc: string;
  colors: string[];
  image: string;
  rotation: number;
  onClick: () => void;
}> = ({ date, title, score, desc, colors, image, rotation, onClick }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-surface-container-lowest rounded-2xl p-5 shadow-[0_10px_40px_rgba(46,47,45,0.03)] flex gap-6 items-start overflow-hidden cursor-pointer"
    >
      <div 
        className="relative w-24 h-32 rounded-xl overflow-hidden shadow-sm shrink-0 -ml-8 -mt-8 transition-transform group-hover:rotate-0"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <img 
          src={image} 
          alt={title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover blur-[2px] scale-110" 
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
      </div>
      
      <div className="flex-1 space-y-3 pt-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-outline-variant tracking-widest uppercase">{date}</p>
            <h4 className="text-lg font-bold text-on-surface">{title}</h4>
          </div>
          <div className="bg-secondary-container px-2 py-1 rounded-full">
            <span className="text-[10px] font-bold text-on-secondary-container">{score}</span>
          </div>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2 italic">
          {desc}
        </p>
        <div className="flex gap-2 pt-2">
          {colors.map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: c }}></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
