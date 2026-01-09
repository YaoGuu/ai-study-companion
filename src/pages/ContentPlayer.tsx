import image_c588b45a150c25a78cebd9a2f3a45aaa89916ab7 from '../assets/c588b45a150c25a78cebd9a2f3a45aaa89916ab7.png';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Pause, 
  Play, 
  RotateCcw, 
  RotateCw, 
  Settings, 
  MoreHorizontal,
  Maximize,
  Type,
  Video,
  Headphones,
  HelpCircle,
  Menu,
  Mic,
  Flame
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { QuizModal } from "../components/QuizModal";
import { cn } from "../components/ui/utils";

interface ContentPlayerProps {
  onBack: () => void;
  onComplete: () => void;
  onNavigateToSpeaking?: () => void;
  onNavigate?: (page: string) => void;
}

const subtitles = [
  { time: 0, text: "Welcome to the forest!", highlight: "forest" },
  { time: 2, text: "Look at that big tree over there!", highlight: "tree" },
  { time: 5, text: "Can you see the monkey?", highlight: "monkey" },
  { time: 8, text: "[Interactive Question]", highlight: "" }, // Trigger quiz
];

export const ContentPlayer = ({ onBack, onComplete, onNavigateToSpeaking, onNavigate }: ContentPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState(subtitles[0]);
  const [mode, setMode] = useState<'video' | 'audio' | 'text'>('video');

  // Simulate playback
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.5;
          if (next >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync subtitles and events
  useEffect(() => {
    const currentTime = (progress / 100) * 10; // Assume 10s video for demo
    const currentSub = subtitles.find(s => currentTime >= s.time && currentTime < s.time + 3) || subtitles[0];
    setActiveSubtitle(currentSub);

    if (Math.abs(currentTime - 8) < 0.1 && !showQuiz && isPlaying) {
      setIsPlaying(false);
      setShowQuiz(true);
    }
  }, [progress, isPlaying, showQuiz]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative h-full bg-black flex flex-col overflow-hidden font-sans">
      {/* Top Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start"
          >
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20 rounded-full">
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h3 className="text-white font-bold text-sm">LESSON 1</h3>
                <p className="text-white/80 text-xs">Forest Adventure</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="bg-orange-500/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-white text-xs font-bold">
                 <span className="text-xs">🔥</span> 120 XP
               </div>
               <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                 <Menu className="w-6 h-6" />
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Switcher */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
      {/* 第一个按钮：右侧加2px间距 */}
      <button 
        onClick={() => onNavigate?.('warmuptest')}
        className="p-2 rounded-full transition-colors text-white/60 hover:bg-purple-400 hover:text-white mr-2"
        title="Warm-Up"
      >
        <Flame className="w-4 h-4" />
      </button>
      {/* 第二个按钮：右侧加2px间距 */}
      <button 
        onClick={() => setMode('video')}
        className={cn("p-2 rounded-full transition-colors mr-2", mode === 'video' ? "bg-purple-400 text-white" : "text-white/60")}
      >
        <Video className="w-4 h-4" />
      </button>
      {/* 第四个按钮：无右侧间距（最后一个按钮无需加） */}
      <button 
        onClick={onNavigateToSpeaking}
        className="p-2 rounded-full transition-colors text-white/60 hover:bg-purple-400 hover:text-white"
      >
        <Mic className="w-4 h-4" />
      </button>
    </div>

      {/* Video Area */}
      <div 
        className="flex-1 relative flex items-center justify-center bg-gray-900"
        onClick={() => setShowControls(!showControls)}
      >
        <img 
          src={image_c588b45a150c25a78cebd9a2f3a45aaa89916ab7} 
          alt="Forest" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        {/* Character Overlay */}
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 animate-bounce-slow">
           {/* Placeholder 3D Bee */}
           
        </div>
        
        {/* Loading/Buffering State */}
        {!isPlaying && progress === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
             <Button 
               size="lg" 
               className="w-20 h-20 rounded-full bg-purple-400 hover:bg-[#9974F7] text-white pl-2"
               onClick={(e) => { e.stopPropagation(); togglePlay(); }}
             >
               <Play className="w-15 h-15 fill-current" />
             </Button>
          </div>
        )}
      </div>

      {/* Subtitles Panel */}
      <div className="h-[20vh] bg-gray-900 border-t border-gray-800 p-4 relative">
        <div className="absolute -top-20 left-0 right-0 p-4 flex justify-center pointer-events-none">
           <AnimatePresence mode="wait">
             <motion.div 
               key={activeSubtitle.text}
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -10, opacity: 0 }}
               className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-2xl text-white font-bold text-lg text-center shadow-lg pointer-events-auto"
             >
               {activeSubtitle.text.split(' ').map((word, i) => (
                 <span key={i} className={word.toLowerCase().includes(activeSubtitle.highlight) ? "text-yellow-400" : ""}>
                   {word}{' '}
                 </span>
               ))}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 w-10 text-right">0:{(progress/10).toFixed(0).padStart(2, '0')}</span>
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden relative group cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-purple-400 rounded-full transition-all duration-100" 
                style={{ width: `${progress}%` }}
              />
              {/* Question Marker */}
              <div className="absolute top-0 left-[80%] w-1.5 h-1.5 bg-yellow-500 rounded-full transform -translate-x-1/2" />
            </div>
            <span className="text-xs text-gray-400 w-10">0:10</span>
          </div>

          <div className="flex justify-between items-center px-4">
             <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
               <span className="text-xs font-bold">1.0x</span>
             </Button>
             
             <div className="flex items-center gap-6">
               <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setProgress(p => Math.max(0, p - 10))}>
                 <RotateCcw className="w-6 h-6" />
               </Button>
               
               <Button 
                 size="lg" 
                 className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-[#C3ACFF] hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/20"
                 onClick={togglePlay}
               >
                 {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
               </Button>
               
               <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setProgress(p => Math.min(100, p + 10))}>
                 <RotateCw className="w-6 h-6" />
               </Button>
             </div>

             <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
               <Maximize className="w-5 h-5" />
             </Button>
          </div>
        </div>
      </div>

      <QuizModal 
        isOpen={showQuiz} 
        onClose={() => { setShowQuiz(false); setIsPlaying(true); }}
        onComplete={(score) => { setShowQuiz(false); setIsPlaying(true); }}
        onFinishAndExit={() => { setShowQuiz(false); setProgress(0); setIsPlaying(false); }}
      />
    </div>
  );
};