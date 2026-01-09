import image_c8b9e2b8cd3be31b9d358351017cb1adc5931370 from '../assets/c8b9e2b8cd3be31b9d358351017cb1adc5931370.png';
import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Share2, 
  ChevronRight, 
  Star, 
  Headphones, 
  BookOpen, 
  Mic, 
  Play,
  RotateCcw
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { cn } from "../components/ui/utils";

interface LearningReportProps {
  onBack: () => void;
  onNext: () => void;
  onNavigate?: (page: string) => void;
}

const radarData = [
  { subject: '流利度', A: 85, fullMark: 100 },
  { subject: '发音', A: 92, fullMark: 100 },
  { subject: '词汇', A: 88, fullMark: 100 },
  { subject: '语法', A: 95, fullMark: 100 },
  { subject: '完成度', A: 100, fullMark: 100 },
];

export const LearningReport = ({ onBack, onNext, onNavigate }: LearningReportProps) => {
  return (
    <div className="min-h-full bg-gray-50 pb-24 font-sans">
      {/* Hero Celebration */}
      <div className="relative bg-gradient-to-b from-purple-400 to-purple-300 pb-12 rounded-b-[3rem] shadow-xl overflow-hidden">
        {/* Confetti Particles (CSS simulated) */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 2.5px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Nav */}
        <div className="flex justify-between items-center p-4 pt-8 text-white relative z-10">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-white/20 text-white rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onNavigate?.('calendar')} className="hover:bg-white/20 text-white rounded-full">
            <Calendar className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center px-4 relative z-10">
          <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", damping: 12 }}
             className="w-32 h-32 bg-yellow-400 rounded-full border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden mb-4"
          >
             <img src={image_c8b9e2b8cd3be31b9d358351017cb1adc5931370} alt="Buzz" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-white mb-1"
          >
            Great Job, Alex!
          </motion.h1>
          <p className="text-white/90 font-medium mb-6">You completed Lesson 1!</p>
          
          <div className="flex flex-col items-center">
            <div className="flex items-baseline text-white drop-shadow-md">
              <span className="text-6xl font-black">92</span>
              <span className="text-2xl font-bold opacity-80">/100</span>
            </div>
            <div className="flex gap-1 mt-2">
              {[1,2,3,4].map(i => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
              <Star className="w-6 h-6 text-yellow-400/50 fill-yellow-400/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 space-y-6 relative z-20">
        
        {/* Dimension Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '听力', icon: Headphones, score: '85%', color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '阅读', icon: BookOpen, score: '90%', color: 'text-green-500', bg: 'bg-green-50' },
            { label: '词汇', icon: TypeIcon, score: '88%', color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: '口语', icon: Mic, score: '92%', color: 'text-pink-500', bg: 'bg-pink-50' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2"
            >
              <div className={cn("p-2 rounded-full", item.bg, item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400">{item.label}</span>
              <span className={cn("text-2xl font-black", item.color)}>{item.score}</span>
            </motion.div>
          ))}
        </div>

        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">
           <h3 className="font-bold text-gray-800 mb-4">Speaking Analysis</h3>
           <div className="w-full" style={{ height: '200px' }}>
             <ResponsiveContainer width="100%" height={200}>
               <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                 <PolarGrid stroke="#e5e7eb" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                 <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                 <Radar
                   name="Alex"
                   dataKey="A"
                   stroke="#8b5cf6"
                   strokeWidth={2}
                   fill="#8b5cf6"
                   fillOpacity={0.3}
                 />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Highlights */}
        <div className="space-y-4">
           <div className="flex items-center gap-2">
             <Star className="w-5 h-5 text-yellow-500 fill-current" />
             <h3 className="font-bold text-lg text-gray-800">Highlights</h3>
           </div>
           
           <div className="bg-white p-4 rounded-2xl border-l-4 border-l-purple-500 shadow-sm">
             <p className="text-xs font-bold text-purple-500 mb-2 uppercase">Your Best Sentence</p>
             <div className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl">
               <Button size="icon" className="h-10 w-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white shrink-0">
                 <Play className="w-4 h-4 ml-0.5 fill-current" />
               </Button>
               <div className="flex-1">
                 <p className="font-bold text-gray-800 text-sm">"I like to play with my little cat."</p>
                 <div className="h-4 mt-1 flex items-center gap-0.5 opacity-50">
                    {/* Fake waveform */}
                    {[...Array(10)].map((_,i) => (
                      <div key={i} className="w-1 bg-purple-500 rounded-full" style={{ height: Math.random() * 12 + 4 + 'px' }} />
                    ))}
                 </div>
               </div>
             </div>
           </div>
           
           {/* Vocab List */}
           <div className="bg-white p-4 rounded-2xl shadow-sm">
             <p className="text-xs font-bold text-gray-400 mb-3 uppercase">Words Mastered</p>
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {['Elephant', 'Lion', 'Monkey', 'Zoo', 'Tree'].map((word) => (
                 <span key={word} className="px-3 py-1.5 bg-green-50 text-green-700 font-bold text-sm rounded-lg whitespace-nowrap border border-green-100 flex items-center gap-1">
                   <span className="text-xs">✓</span> {word}
                 </span>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3 z-30">
        <Button variant="outline" className="flex-1 h-12 font-bold text-gray-600 border-gray-200">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 h-12 font-bold bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg shadow-purple-200"
        >
          Next Lesson <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

// Helper for icon
const TypeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
)