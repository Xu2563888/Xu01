import React from 'react';
import { Palette, Search, User, ChevronLeft, ChevronRight, Home, Edit3, BarChart2, Plus, Share2, Mic, Image as ImageIcon, PlusCircle, Quote, Sparkles, TrendingUp, MoreVertical, Calendar as CalendarIcon } from 'lucide-react';

export type View = 'home' | 'new' | 'stats' | 'detail';

interface NavItemProps {
  icon: React.ElementType;
  label?: string;
  active?: boolean;
  onClick: () => void;
}

export const BottomNav: React.FC<{ currentView: View; setView: (v: View) => void }> = ({ currentView, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-8 pt-4 bg-surface/70 backdrop-blur-xl shadow-[0_-10px_40px_rgba(118,83,76,0.06)] rounded-t-[2.5rem]">
      <button 
        onClick={() => setView('home')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'home' ? 'bg-primary text-on-primary rounded-full w-12 h-12 shadow-lg' : 'text-primary/40 hover:scale-110'}`}
      >
        <Home size={24} />
        {currentView !== 'home' && <span className="text-[10px] font-semibold uppercase tracking-tighter mt-1">首页</span>}
      </button>
      
      <button 
        onClick={() => setView('new')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'new' ? 'bg-primary text-on-primary rounded-full w-12 h-12 shadow-lg' : 'text-primary/40 hover:scale-110'}`}
      >
        <Edit3 size={24} />
        {currentView !== 'new' && <span className="text-[10px] font-semibold uppercase tracking-tighter mt-1">记录</span>}
      </button>
      
      <button 
        onClick={() => setView('stats')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'stats' ? 'bg-primary text-on-primary rounded-full w-12 h-12 shadow-lg' : 'text-primary/40 hover:scale-110'}`}
      >
        <BarChart2 size={24} />
        {currentView !== 'stats' && <span className="text-[10px] font-semibold uppercase tracking-tighter mt-1">统计</span>}
      </button>
    </nav>
  );
};

export const Header: React.FC<{ title?: string; showBack?: boolean; onBack?: () => void }> = ({ title = "色彩日记", showBack, onBack }) => {
  return (
    <header className="w-full top-0 sticky z-40 bg-gradient-to-b from-surface to-transparent">
      <div className="flex justify-between items-center px-6 py-4 w-full">
        <div className="flex items-center gap-2">
          {showBack ? (
            <button onClick={onBack} className="text-primary hover:opacity-80">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <Palette className="text-primary" size={24} />
          )}
          <h1 className="text-xl font-bold tracking-tight text-primary">{title}</h1>
        </div>
        <div className="flex gap-4">
          <Search className="text-primary/60 cursor-pointer hover:opacity-80 transition-opacity" size={24} />
          <MoreVertical className="text-primary/60 cursor-pointer hover:opacity-80 transition-opacity" size={24} />
        </div>
      </div>
    </header>
  );
};
