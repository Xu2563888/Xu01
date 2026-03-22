import React from 'react';
import { GoogleGenAI } from "@google/genai";
import { Header, BottomNav, View } from './components/Layout';
import { Calendar, RecordCard } from './components/HomeComponents';
import { Plus, Share2, Sparkles, Mic, ImageIcon, Quote, TrendingUp, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DiaryEntry } from './types';

const INITIAL_ENTRIES: DiaryEntry[] = [
  {
    id: '1',
    date: '3月21日',
    dayOfWeek: '周六',
    title: '落日余晖中的宁静',
    content: '今天的空气里有种焦糖的味道，看着窗外的颜色从金黄慢慢过渡到深紫...',
    intensity: 8,
    tendency: 3,
    colors: ['#76534c', '#f0c1b8', '#e4d7fd'],
    image: 'https://picsum.photos/seed/sunset/400/600',
    score: '8/10',
    timestamp: new Date('2026-03-21').getTime(),
  },
  {
    id: '2',
    date: '3月20日',
    dayOfWeek: '周五',
    title: '清晨的冷调呼吸',
    content: '雨后的街道是深灰色的，但路边的绿叶却显现出一种极其饱满的翠...',
    intensity: 9,
    tendency: 4,
    colors: ['#46624a', '#caebcc', '#605676'],
    image: 'https://picsum.photos/seed/forest/400/600',
    score: '9/10',
    timestamp: new Date('2026-03-20').getTime(),
  }
];

const HomeView: React.FC<{ entries: DiaryEntry[]; setView: (v: View) => void; setSelectedEntry: (e: DiaryEntry) => void }> = ({ entries, setView, setSelectedEntry }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pb-32"
    >
      <Header />
      <main className="space-y-12">
        <Calendar entries={entries} />
        
        <section className="px-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold tracking-tight text-on-surface">近期记录</h3>
            <button className="text-sm font-semibold text-primary underline underline-offset-8 decoration-primary/30">查看全部</button>
          </div>
          
          <div className="space-y-8">
            {entries.map((entry, index) => (
              <RecordCard 
                key={entry.id}
                entry={entry}
                rotation={index % 2 === 0 ? -2 : 3}
                onClick={() => {
                  setSelectedEntry(entry);
                  setView('detail');
                }}
              />
            ))}
            
            <div className="bg-surface-container-low/50 rounded-2xl p-8 border border-outline-variant/10 border-dashed text-center flex flex-col items-center justify-center gap-4">
              <button 
                onClick={() => setView('new')}
                className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
              >
                <Plus size={24} />
              </button>
              <p className="text-sm font-medium text-outline-variant">还没有记录今天的心情颜色吗？</p>
            </div>
          </div>
        </section>
      </main>
      
      <div className="fixed bottom-32 right-6 z-50">
        <button 
          onClick={() => setView('new')}
          className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_10px_40px_rgba(118,83,76,0.3)] flex items-center justify-center active:scale-90 transition-transform duration-300"
        >
          <Plus size={24} />
        </button>
      </div>
    </motion.div>
  );
};

const Edit3Icon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

const DetailView: React.FC<{ entry: DiaryEntry; onBack: () => void }> = ({ entry, onBack }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }} 
      animate={{ x: 0 }} 
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-surface z-50 overflow-y-auto pb-32"
    >
      <Header showBack onBack={onBack} />
      <main>
        <section className="relative w-full h-[486px] overflow-hidden px-4 pt-2">
          <div className="w-full h-full rounded-2xl overflow-hidden relative group">
            <img 
              src={entry.generatedLandscape || entry.image} 
              alt={entry.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent"></div>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
          </div>
        </section>

        <section className="px-8 -mt-12 relative z-10">
          <div className="bg-surface-container-lowest/70 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_40px_rgba(46,47,45,0.06)] border border-white/20">
            <div className="flex flex-col gap-1 mb-8">
              <span className="text-primary font-light tracking-[0.3em] text-xs uppercase">二零二四年 · {entry.date.split('月')[0]}月</span>
              <h2 className="text-5xl font-extralight text-on-surface tracking-tighter">{entry.date.split('月')[1].replace('日', '')}</h2>
              <div className="h-px w-8 bg-primary/20 mt-4"></div>
            </div>

            <article className="relative">
              <p className="text-on-surface leading-[1.8] text-lg font-light italic">
                “{entry.content}”
              </p>
            </article>

            <div className="mt-12 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-outline-variant uppercase tracking-widest font-bold mb-1">当前心情强度</span>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-semibold text-primary">{entry.intensity}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.round(entry.intensity / 2) ? 'bg-primary' : 'bg-primary/20'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-outline-variant uppercase tracking-widest font-bold mb-2">色彩标签</span>
                  <div className="flex gap-2">
                    {entry.colors.map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: c }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button className="w-full bg-primary text-on-primary py-4 rounded-full flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                <Share2 size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">分享这份宁静</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

const NewEntryView: React.FC<{ onPublish: (entry: DiaryEntry) => void; onCancel: () => void }> = ({ onPublish, onCancel }) => {
  const [content, setContent] = React.useState('');
  const [intensity, setIntensity] = React.useState(7);
  const [tendency, setTendency] = React.useState(0);
  const [selectedColors, setSelectedColors] = React.useState<string[]>(['#E5D1D0']);
  const [image, setImage] = React.useState<string | null>(null);
  const [landscape, setLandscape] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const colorOptions = [
    '#E5D1D0', '#D1E5D0', '#D0D9E5', '#E5D0E0', '#F2E5D0', '#D0E5E2',
    '#76534c', '#46624a', '#605676', '#f0c1b8', '#caebcc', '#e4d7fd'
  ];

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else if (selectedColors.length < 4) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateLandscape = async () => {
    if (selectedColors.length === 0) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `An impressionist landscape painting. The style should be reminiscent of Claude Monet, with visible brushstrokes and a focus on light and atmosphere. The dominant colors in the painting should be: ${selectedColors.join(', ')}. The category is: Landscape.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4",
          }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            setLandscape(`data:image/png;base64,${base64Data}`);
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error generating landscape:', error);
      // Fallback to picsum if API fails
      const seed = selectedColors.join('').replace(/#/g, '');
      setLandscape(`https://picsum.photos/seed/${seed}/800/1200`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    const now = new Date();
    const entry: DiaryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: `${now.getMonth() + 1}月${now.getDate()}日`,
      dayOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()],
      title: content.slice(0, 10) || '无题',
      content,
      intensity,
      tendency,
      colors: selectedColors,
      image: image || landscape || 'https://picsum.photos/seed/default/400/600',
      generatedLandscape: landscape || undefined,
      score: `${intensity}/10`,
      timestamp: now.getTime(),
    };
    onPublish(entry);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }}
      className="px-6 pt-4 max-w-md mx-auto space-y-12 pb-48"
    >
      <section className="flex justify-between items-start">
        <div className="flex flex-col items-start gap-1">
          <span className="text-[3.5rem] font-extrabold leading-none tracking-tighter opacity-10">
            {new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}.{new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}
          </span>
          <span className="text-on-surface-variant font-medium tracking-[0.2em] ml-2 text-sm uppercase">
            {['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][new Date().getDay()]}
          </span>
        </div>
        <button onClick={onCancel} className="p-2 text-outline-variant hover:text-primary transition-colors">
          <X size={24} />
        </button>
      </section>

      <section className="relative space-y-6">
        <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(118,83,76,0.04)] min-h-[320px] flex flex-col">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-grow bg-transparent border-none focus:ring-0 text-lg leading-relaxed placeholder:text-outline-variant/40 resize-none font-medium" 
            placeholder="此刻你的心情是什么颜色的..."
          ></textarea>
          <div className="flex justify-center mt-6">
            <button className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:scale-105 active:scale-95 transition-transform group">
              <Mic size={32} />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <h3 className="text-sm font-bold tracking-widest text-primary/60 uppercase">上传图片</h3>
        <div className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-outline-variant/30 rounded-2xl bg-surface-container-low hover:bg-surface-container hover:border-primary/40 transition-all cursor-pointer overflow-hidden">
          {image ? (
            <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
          ) : (
            <>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="text-primary/40 group-hover:text-primary transition-colors" size={32} />
                <span className="text-xs font-bold text-outline-variant tracking-widest uppercase">点击或拖拽上传</span>
              </div>
            </>
          )}
          {image && (
            <button 
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-20"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-primary/60 uppercase">情感强度</h3>
          <div className="relative px-2 pt-4">
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={intensity} 
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gradient-to-r from-secondary-container via-primary-container to-primary rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-4 text-[10px] font-bold text-outline-variant tracking-tighter">
              <span>QUIET</span>
              <span>NEUTRAL</span>
              <span>INTENSE ({intensity})</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-primary/60 uppercase">情感倾向</h3>
          <div className="relative px-2 pt-4">
            <input 
              type="range" 
              min="-5" 
              max="5" 
              value={tendency} 
              onChange={(e) => setTendency(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gradient-to-r from-error via-surface-container-high to-secondary rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-4 text-[10px] font-bold text-outline-variant tracking-tighter">
              <span>NEGATIVE (-5)</span>
              <span>NEUTRAL (0)</span>
              <span>POSITIVE (+5) | 当前: {tendency}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold tracking-widest text-primary/60 uppercase">今日色彩 (1-4种)</h3>
          <span className="text-[10px] font-bold text-outline-variant">{selectedColors.length}/4</span>
        </div>
        <div className="grid grid-cols-6 gap-4 py-2">
          {colorOptions.map((c, i) => (
            <button 
              key={i} 
              onClick={() => handleColorToggle(c)}
              className={`w-10 h-10 rounded-full cursor-pointer transition-all hover:scale-110 shadow-sm ${selectedColors.includes(c) ? 'ring-4 ring-offset-4 ring-primary' : ''}`}
              style={{ backgroundColor: c }}
            ></button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <button 
          onClick={generateLandscape}
          disabled={isGenerating || selectedColors.length === 0}
          className="w-full py-4 bg-surface-container-high text-primary rounded-full font-bold tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-surface-container transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Sparkles size={16} />
          )}
          生成我的色彩风景
        </button>

        <AnimatePresence>
          {landscape && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={landscape} alt="Generated Landscape" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <button 
                onClick={() => setLandscape(null)}
                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="fixed bottom-32 left-0 w-full px-6 z-40">
        <button 
          onClick={handlePublish}
          disabled={!content && !image && !landscape}
          className="w-full py-5 bg-primary text-on-primary rounded-full font-bold tracking-widest text-sm shadow-[0_15px_30px_rgba(118,83,76,0.2)] hover:scale-[1.02] active:scale-95 transition-all uppercase flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send size={18} />
          发布日记
        </button>
      </div>
    </motion.div>
  );
};

const StatsView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="px-6 space-y-12 pb-32"
    >
      <section className="mt-4">
        <p className="text-on-surface-variant font-medium text-sm tracking-widest uppercase mb-1">2024年3月回顾</p>
        <h2 className="text-4xl font-extrabold text-primary tracking-tight">情绪脉络</h2>
      </section>

      <section className="relative">
        <div className="bg-surface-container-low rounded-[2rem] p-8 overflow-hidden relative shadow-sm">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-lg font-bold text-primary">情绪波动</h3>
              <p className="text-xs text-on-surface-variant">本月平均：平静向暖</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-light text-primary">82%</span>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">极佳</p>
            </div>
          </div>
          
          <div className="relative h-48 w-full">
            <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="curveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#caebcc" />
                  <stop offset="30%" stopColor="#e4d7fd" />
                  <stop offset="60%" stopColor="#ffcfc6" />
                  <stop offset="100%" stopColor="#caebcc" />
                </linearGradient>
              </defs>
              <path 
                d="M0,80 Q50,20 100,100 T200,60 T300,120 T400,40" 
                fill="none" 
                stroke="url(#curveGradient)" 
                strokeLinecap="round" 
                strokeWidth="8" 
              />
              <circle className="animate-pulse" cx="400" cy="40" fill="#76534c" r="6" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-on-surface-variant/40 font-bold">
              <span>01</span>
              <span>10</span>
              <span>20</span>
              <span>31</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-lg font-bold text-primary">每周对比</h3>
          <span className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase">WEEK 11 vs WEEK 12</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low/50 rounded-3xl p-5 border border-surface-container-highest/20">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase opacity-60">上周</span>
            </div>
            <div className="mb-2">
              <span className="text-2xl font-light text-on-surface-variant">76%</span>
            </div>
          </div>
          <div className="bg-primary/5 rounded-3xl p-5 border border-primary/10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">本周</span>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">85%</span>
              <span className="text-[10px] text-secondary font-bold flex items-center gap-0.5">
                <TrendingUp size={12} />
                9%
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="bg-primary p-8 rounded-[2.5rem] text-on-primary relative overflow-hidden shadow-lg">
          <Quote className="absolute -right-4 -top-4 text-white/10" size={120} />
          <p className="text-sm font-medium opacity-80 mb-4 tracking-widest uppercase">本月寄语</p>
          <p className="text-xl font-light leading-relaxed">
            “色彩是内心无声的呐喊，也是灵魂最柔和的慰藉。”
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">已记录 28 天</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = React.useState<View>('home');
  const [entries, setEntries] = React.useState<DiaryEntry[]>(INITIAL_ENTRIES);
  const [selectedEntry, setSelectedEntry] = React.useState<DiaryEntry | null>(null);

  const handlePublish = (entry: DiaryEntry) => {
    setEntries([entry, ...entries]);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-surface">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <HomeView 
            key="home" 
            entries={entries} 
            setView={setView} 
            setSelectedEntry={setSelectedEntry} 
          />
        )}
        {view === 'new' && (
          <NewEntryView 
            key="new" 
            onPublish={handlePublish} 
            onCancel={() => setView('home')} 
          />
        )}
        {view === 'stats' && <StatsView key="stats" />}
        {view === 'detail' && selectedEntry && (
          <DetailView 
            key="detail" 
            entry={selectedEntry} 
            onBack={() => setView('home')} 
          />
        )}
      </AnimatePresence>
      
      <BottomNav currentView={view} setView={setView} />
      
      {/* Background blobs */}
      <div className="fixed top-[20%] -right-20 w-64 h-64 bg-primary-container/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[10%] -left-20 w-80 h-80 bg-secondary-container/30 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  );
}
