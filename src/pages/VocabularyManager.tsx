import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, RotateCw, Check, X, Volume2, Star } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { cn } from "../components/ui/utils";

const words = [
  { id: 1, word: 'Galaxy', definition: 'A huge collection of gas, dust, and stars.', type: 'Noun', status: 'reviewing' },
  { id: 2, word: 'Astronaut', definition: 'A person trained to travel in a spacecraft.', type: 'Noun', status: 'mastered' },
  { id: 3, word: 'Planet', definition: 'A celestial body moving in an elliptical orbit around a star.', type: 'Noun', status: 'new' },
];

export const VocabularyManager = ({ onBack }: { onBack: () => void }) => {
  const [mode, setMode] = useState<'list' | 'flashcard'>('list');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleMode = () => {
    setMode(mode === 'list' ? 'flashcard' : 'list');
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % words.length);
    }, 200);
  };

  return (
    <div className="min-h-full bg-gray-50 pb-24 font-sans flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-4 pt-8 shadow-sm border-b sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
             <h1 className="text-xl font-bold text-gray-800">My Word Garden 🌱</h1>
             <p className="text-xs text-gray-500 font-bold tracking-wider">LEVEL 3 • SPROUT</p>
          </div>
          <Button size="sm" variant="outline" onClick={toggleMode} className="gap-2">
            <RotateCw className="w-4 h-4" />
            {mode === 'list' ? 'Practice' : 'List View'}
          </Button>
        </div>
        
        {mode === 'list' && (
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <Input placeholder="Find specific words..." className="pl-9 bg-gray-50 border-none" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        {mode === 'list' ? (
          <div className="space-y-4 overflow-y-auto pb-20">
            {words.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 relative overflow-hidden group">
                <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", 
                  item.status === 'mastered' ? 'bg-green-400' : 
                  item.status === 'new' ? 'bg-yellow-400' : 'bg-purple-400'
                )} />
                
                <div className="flex-1 pl-2">
                   <div className="flex justify-between items-start mb-1">
                     <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                        item.status === 'mastered' ? 'bg-green-50 text-green-700' : 
                        item.status === 'new' ? 'bg-yellow-50 text-yellow-700' : 'bg-purple-50 text-purple-700'
                     )}>
                       {item.status}
                     </span>
                     <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-300 hover:text-yellow-400">
                       <Star className="w-4 h-4" />
                     </Button>
                   </div>
                   <h3 className="text-xl font-bold text-gray-800">{item.word}</h3>
                   <p className="text-sm text-gray-500 italic mt-1">{item.definition}</p>
                </div>
                
                <div className="flex items-center">
                   <Button size="icon" className="rounded-full bg-gray-50 hover:bg-purple-100 text-purple-600">
                     <Volume2 className="w-5 h-5" />
                   </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <div className="w-full max-w-xs aspect-[3/4] perspective-1000 relative">
              <motion.div 
                className="w-full h-full relative preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border-2 border-purple-50 flex flex-col items-center justify-center p-8 text-center">
                   <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Word</span>
                   <h2 className="text-4xl font-extrabold text-gray-800 mb-6">{words[currentCardIndex].word}</h2>
                   <div className="bg-purple-50 rounded-full p-4">
                     <Volume2 className="w-8 h-8 text-purple-500" />
                   </div>
                   <p className="absolute bottom-8 text-xs text-gray-400 font-bold">TAP TO FLIP</p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-purple-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center rotate-y-180 text-white">
                   <span className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Definition</span>
                   <p className="text-xl font-medium leading-relaxed mb-6">"{words[currentCardIndex].definition}"</p>
                   <div className="flex gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                     <span className="font-bold">{words[currentCardIndex].type}</span>
                   </div>
                </div>
              </motion.div>
            </div>

            <div className="flex gap-4 mt-8 w-full max-w-xs">
              <Button onClick={handleNextCard} className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-bold border-none h-14 rounded-2xl">
                <X className="w-6 h-6 mr-2" /> Needs Practice
              </Button>
              <Button onClick={handleNextCard} className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-bold border-none h-14 rounded-2xl">
                <Check className="w-6 h-6 mr-2" /> Got it!
              </Button>
            </div>
            <p className="mt-4 text-xs font-bold text-gray-400">{currentCardIndex + 1} / {words.length}</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 right-6">
        <Button size="icon" className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-white text-2xl" onClick={onBack}>
          ←
        </Button>
      </div>
    </div>
  );
};
