import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { DiaryEntry } from '../types';

export const Calendar: React.FC<{ entries: DiaryEntry[] }> = ({ entries }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const prevMonthDays = [23, 24, 25, 26, 27, 28]; // March 2026 starts on Sunday (1st)
  
  // Mock current month days for March 2026
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const entry = entries.find(e => {
      const d = new Date(e.timestamp);
      return d.getDate() === day && d.getMonth() === 2 && d.getFullYear() === 2026;
    });
    return {
      day,
      colors: entry ? entry.colors : [],
      active: day === 22 // Keep 22 as "today" (March 22, 2026)
    };
  });

  return (
    <section className="mt-4 px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-on-surface-variant font-medium text-sm tracking-widest uppercase">March 2026</span>
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
          <div key={`curr-${item.day}`} className="flex flex-col items-center gap-1 relative text-sm">
            <span className={item.active ? 'font-bold text-primary' : ''}>{item.day}</span>
            <div className="flex gap-0.5 flex-wrap justify-center max-w-[24px]">
              {item.colors.map((c, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }}></div>
              ))}
            </div>
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
  entry: DiaryEntry;
  rotation: number;
  onClick: () => void;
}> = ({ entry, rotation, onClick }) => {
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
          src={entry.image} 
          alt={entry.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover blur-[2px] scale-110" 
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
      </div>
      
      <div className="flex-1 space-y-3 pt-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-outline-variant tracking-widest uppercase">{entry.date} · {entry.dayOfWeek}</p>
            <h4 className="text-lg font-bold text-on-surface">{entry.title}</h4>
          </div>
          <div className="bg-secondary-container px-2 py-1 rounded-full">
            <span className="text-[10px] font-bold text-on-secondary-container">{entry.score}</span>
          </div>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2 italic">
          {entry.content}
        </p>
        <div className="flex gap-2 pt-2">
          {entry.colors.map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: c }}></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
