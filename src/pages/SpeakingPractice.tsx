import image_292bce46f43e5be502522071459ccfe4130d4dbb from '../assets/292bce46f43e5be502522071459ccfe4130d4dbb.png';
import image_b2cef4392ab76d4e171b44f8edc919330a3a147f from '../assets/b2cef4392ab76d4e171b44f8edc919330a3a147f.png';
import image_c8b9e2b8cd3be31b9d358351017cb1adc5931370 from '../assets/c8b9e2b8cd3be31b9d358351017cb1adc5931370.png';
import image_ef572b260f42f4c5e836f1b4100eb2752d1c3569 from '../assets/ef572b260f42f4c5e836f1b4100eb2752d1c3569.png';
import avatarBuzz from '../assets/ef572b260f42f4c5e836f1b4100eb2752d1c3569.png';
import avatarStudent from '../assets/c8b9e2b8cd3be31b9d358351017cb1adc5931370.png';
import sceneImage from '../assets/dc58c984085ea2247276f20646bcd0713ef03e04.png';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mic, ChevronRight, X, Lightbulb, Play, RotateCcw, Menu } from 'lucide-react';
import { Button } from "../components/ui/button";
import { cn } from "../components/ui/utils";

interface SpeakingPracticeProps {
  onBack: () => void;
  onFinish: () => void;
  onNavigateToPlayer: () => void;
}

const steps = [
  { 
    speaker: 'teacher', 
    text: "Hello! What would you like to eat today?",
    translation: "你好！今天你想吃什么？"
  },
  {
    speaker: 'buddy',
    text: "I would like a hamburger, please!",
    translation: "我想要一个汉堡包，谢谢！"
  },
  {
    speaker: 'student',
    text: "Your turn! Try saying: 'I would like...'",
    prompt: "I would like..."
  }
];

export const SpeakingPractice = ({ onBack, onFinish, onNavigateToPlayer }: SpeakingPracticeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'correction'>('success');

  // Auto advance teacher
  useEffect(() => {
    if (steps[currentStep].speaker !== 'student') {
      const timer = setTimeout(() => {
        setCurrentStep(s => s + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleMicPress = () => {
    setIsRecording(true);
    // Simulate recording duration
    setTimeout(() => {
      setIsRecording(false);
      setShowFeedback(true);
    }, 2000);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="h-full bg-cover bg-center flex flex-col font-sans overflow-hidden relative" className="bg-gradient-to-br from-purple-100 to-blue-100">
      {/* Dim Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Decorative Scene Image - Full Page */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-0">
        <img src={sceneImage} alt="Scene" className="w-full h-full object-cover opacity-40" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10">
        {/* Header with Title */}
        <div className="px-5 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNavigateToPlayer}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="font-bold text-lg text-white">口语练习</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 pb-2 flex justify-center">
          <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
            <div className="h-2 w-24 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-400 transition-all duration-300" 
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-white text-xs font-bold">Turn {currentStep + 1}/{steps.length}</span>
          </div>
        </div>
      </div>

      {/* Main Scene Area */}
      <div className="flex-1 relative z-10 flex flex-col justify-end pb-48 px-4">
        
        {/* Characters */}
        <div className="flex justify-between items-end mb-8 relative z-10">
          
          {/* Teacher */}
          <div className={cn("flex flex-col items-center transition-all duration-500", steps[currentStep].speaker === 'teacher' ? "scale-110 z-20" : "scale-90 opacity-80")}>
            {steps[currentStep].speaker === 'teacher' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl rounded-bl-none p-4 mb-2 shadow-lg max-w-[200px]"
              >
                <p className="font-bold text-gray-800 text-lg leading-snug">{steps[currentStep].text}</p>
                <p className="text-sm text-gray-500 mt-1">{steps[currentStep].translation}</p>
              </motion.div>
            )}
            <div className="w-24 h-24 bg-blue-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-4xl overflow-hidden">
              <img src={image_292bce46f43e5be502522071459ccfe4130d4dbb} alt="Teacher" className="w-24 h-24" />
            </div>
            <span className="bg-black/40 backdrop-blur px-2 py-0.5 rounded-full text-white text-xs mt-2">Teacher</span>
          </div>

          {/* Buzz */}
          <div className={cn("flex flex-col items-center transition-all duration-500", steps[currentStep].speaker === 'buzz' ? "scale-110 z-20" : "scale-90 opacity-80")}>
            {steps[currentStep].speaker === 'buzz' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl rounded-b-none p-4 mb-2 shadow-lg max-w-[200px]"
              >
                 <p className="font-bold text-gray-800 text-lg leading-snug">{steps[currentStep].text}</p>
              </motion.div>
            )}
            <div className="w-28 h-28 bg-yellow-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-5xl relative">
              <img src={avatarBuzz} alt="Buzz" className="w-28 h-28" />
              {steps[currentStep].speaker === 'buzz' && (
                <div className="absolute -right-2 -top-2 bg-green-500 rounded-full p-1 border-2 border-white">
                  <Play className="w-3 h-3 text-white fill-current" />
                </div>
              )}
            </div>
            <span className="bg-black/40 backdrop-blur px-2 py-0.5 rounded-full text-white text-xs mt-2">Buzz</span>
          </div>

          {/* Student (You) */}
          <div className={cn("flex flex-col items-center transition-all duration-500", steps[currentStep].speaker === 'student' ? "scale-110 z-20" : "scale-90 opacity-80")}>
             {/* Feedback Bubble */}
             <AnimatePresence>
               {showFeedback && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8, x: -20 }}
                   animate={{ opacity: 1, scale: 1, x: 0 }}
                   exit={{ opacity: 0 }}
                   className="absolute bottom-50 right-1/3 bg-purple-50/90 border-1 border-purple-200 p-3 rounded-2xl rounded-br-none shadow-xl mb-2 w-48 z-30"
                 >
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-xl">🎉</span>
                     <span className="font-bold text-[rgb(198,130,255)]">Excellent!</span>
                   </div>
                   <p className="text-xs text-[rgb(150,160,255)] font-medium">Your pronunciation was perfect.</p>
                   <div className="mt-2 flex justify-end">
                     <Button size="sm" className="h-7 text-xs bg-[rgb(150,159,255)] hover:bg-green-600" onClick={handleNext}>Next Turn</Button>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>

             <div className={cn(
               "w-24 h-24 bg-gray-200 rounded-full border-4 shadow-lg flex items-center justify-center text-4xl overflow-hidden",
               steps[currentStep].speaker === 'student' ? "border-purple-500 shadow-purple-500/50" : "border-white"
             )}>
               <img src={avatarStudent} alt="Student" className="w-24 h-24" />
             </div>
             <span className="bg-black/40 backdrop-blur px-2 py-0.5 rounded-full text-white text-xs mt-2">You</span>
          </div>
        </div>
        
        {/* Student Prompt */}
        <AnimatePresence>
          {steps[currentStep].speaker === 'student' && !showFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/60 backdrop-blur-md p-4 rounded-xl text-center text-white mb-4 border border-white/10"
            >
              <p className="text-sm text-gray-300 mb-1">Your Turn</p>
              <p className="text-xl font-bold">{steps[currentStep].prompt}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl rounded-t-[2rem] p-6 pb-8 shadow-2xl z-20">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          
          <div className="flex flex-col items-center gap-1">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-gray-300 text-gray-500">
              <Lightbulb className="w-5 h-5" />
            </Button>
            <span className="text-[10px] font-bold text-gray-400">HINT (3)</span>
          </div>

          <div className="relative">
             {/* Mic Button */}
             <motion.button
               whileTap={{ scale: 0.95 }}
               onClick={handleMicPress}
               disabled={steps[currentStep].speaker !== 'student'}
               className={cn(
                 "h-20 w-20 rounded-full flex items-center justify-center shadow-xl transition-all relative z-10",
                 isRecording ? "bg-red-500 shadow-red-500/30" : 
                 steps[currentStep].speaker === 'student' ? "bg-gradient-to-r from-purple-300 to-pink-400 shadow-purple-500/30" :
                 "bg-gray-200 cursor-not-allowed"
               )}
             >
               {isRecording ? (
                 <div className="w-8 h-8 bg-white rounded-sm animate-pulse" /> // Stop icon look
               ) : (
                 <Mic className={cn("w-8 h-8", steps[currentStep].speaker === 'student' ? "text-white" : "text-gray-400")} />
               )}
             </motion.button>
             
             {/* Pulse Ring */}
             {steps[currentStep].speaker === 'student' && !isRecording && (
               <div className="absolute inset-0 rounded-full border-2 border-purple-300 animate-ping opacity-20" />
             )}
          </div>

          <div className="flex flex-col items-center gap-1">
             <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-gray-300 text-gray-500" onClick={onFinish}>
               <RotateCcw className="w-5 h-5" />
             </Button>
             <span className="text-[10px] font-bold text-gray-400">SKIP</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};