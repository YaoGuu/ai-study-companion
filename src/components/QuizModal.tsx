import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Lightbulb, Heart, RotateCcw } from 'lucide-react';
import { Button } from "../components/ui/button";
import { cn } from "../components/ui/utils";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  onFinishAndExit?: () => void; // Optional callback for "Finish & Exit" action
}

type QuestionType = 'mcq' | 'matching';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  hint: string;
  // MCQ
  image?: string;
  options?: { id: string, text: string, correct: boolean }[];
  // Matching
  pairs?: {
    id: string;
    leftImage: string;
    rightImage: string;
    matchId: string; // The id of the matching pair item
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    type: 'matching',
    question: "Match the animals!",
    hint: "Match the pictures that show the same animal.",
    pairs: [
      { 
        id: 'm1-1', 
        leftImage: "https://images.unsplash.com/photo-1743964451762-9fbd78f1a2c3?w=200&fit=crop", // Elephant
        rightImage: "https://images.unsplash.com/photo-1649750555596-e90e79106943?w=200&fit=crop", // Bear
        matchId: 'm1-2' 
      },
      { 
        id: 'm1-2', 
        leftImage: "https://images.unsplash.com/photo-1649750555596-e90e79106943?w=200&fit=crop", // Bear
        rightImage: "https://images.unsplash.com/photo-1743964451762-9fbd78f1a2c3?w=200&fit=crop", // Elephant
        matchId: 'm1-1'
      }
    ]
  },
  {
    id: 2,
    type: 'matching',
    question: "Who are friends?",
    hint: "Connect the bird and the fox.",
    pairs: [
      { 
        id: 'm2-1', 
        leftImage: "https://images.unsplash.com/photo-1743964451700-c10e1d6e647d?w=200&fit=crop", // Bird
        rightImage: "https://images.unsplash.com/photo-1743964451742-0eff385d5d0d?w=200&fit=crop", // Fox
        matchId: 'm2-2'
      },
      { 
        id: 'm2-2', 
        leftImage: "https://images.unsplash.com/photo-1743964451742-0eff385d5d0d?w=200&fit=crop", // Fox
        rightImage: "https://images.unsplash.com/photo-1743964451700-c10e1d6e647d?w=200&fit=crop", // Bird
        matchId: 'm2-1'
      }
    ]
  },
  {
    id: 3,
    type: 'mcq',
    question: "Which animal is this?",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop", // Cat
    options: [
      { id: 'a', text: 'Dog', correct: false },
      { id: 'b', text: 'Cat', correct: true },
      { id: 'c', text: 'Rabbit', correct: false },
    ],
    hint: "It says 'meow'!"
  }
];

export const QuizModal = ({ isOpen, onClose, onComplete, onFinishAndExit }: QuizModalProps) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // Shared State
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // MCQ State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Matching State
  const [connections, setConnections] = useState<{[key: string]: string}>({}); // leftId -> rightId
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);

  const currentQuestion = questions[currentQIndex];

  // Reset state on question change
  useEffect(() => {
    setSelectedOption(null);
    setIsChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setConnections({});
    setActiveLeftId(null);
  }, [currentQIndex]);

  const handleCheck = () => {
    if (currentQuestion.type === 'mcq') {
      if (!selectedOption) return;
      const correct = currentQuestion.options?.find(o => o.id === selectedOption)?.correct || false;
      setIsCorrect(correct);
      setIsChecked(true);
      if (correct) setScore(s => s + 10);
    } else if (currentQuestion.type === 'matching') {
      // Check if all pairs are correct
      // For each pair in questions, check if connection matches
      const allCorrect = currentQuestion.pairs?.every(pair => {
        // Find which right item corresponds to this left item in the UI
        // In our data structure, 'pairs' defines the row.
        // Left item is pairs[i].leftImage (id: pair.id + '_L')
        // Right item is pairs[i].rightImage (id: pair.id + '_R')
        // Wait, we need to map the visual items.
        
        // Let's simplify:
        // Left Column items: pairs.map(p => ({ id: p.id, img: p.leftImage }))
        // Right Column items: pairs.map(p => ({ id: p.matchId, img: p.rightImage })) - actually right column order might differ? 
        // For simplicity, let's assume right column order is fixed as per pairs for now, 
        // but the 'correct' connection is based on logic.
        // User description: "Cross connection". 
        // Left Top (Bird) -> Right Bottom (Bird)
        // Left Bottom (Fox) -> Right Top (Fox)
        
        // Let's rely on the `connections` map.
        // connections[leftId] === rightId.
        
        // To verify correctness, we need to know what constitutes a correct match.
        // Let's assume matching works by index for simplicity in this demo, 
        // OR define expected matches.
        // In the data above:
        // Pair 1: Elephant(L) - Bear(R). matchId points to the other pair?
        // Let's restructure data slightly for clarity or just hardcode the check logic.
        
        // Correct logic:
        // Top Left (Elephant) matches Bottom Right (Elephant).
        // Bottom Left (Bear) matches Top Right (Bear).
        
        // Let's assume:
        // Left Items IDs: L0, L1
        // Right Items IDs: R0, R1
        // Correct matches: L0->R1, L1->R0 (for cross match example)
        
        // In my data structure `pairs`:
        // Row 0: Left=Elephant, Right=Bear. 
        // Row 1: Left=Bear, Right=Elephant.
        // So Left 0 (Elephant) should match Right 1 (Elephant).
        // Left 1 (Bear) should match Right 0 (Bear).
        
        const leftId = `L-${pair.id}`;
        // We need to find the Right ID that has the SAME image.
        // In this data structure, Right Image for Row 0 is Bear. Right Image for Row 1 is Elephant.
        // So Left 0 should match Right 1.
        
        const connectedRightId = connections[leftId];
        if (!connectedRightId) return false;
        
        // Find the index of the connected right item
        const rightIndex = parseInt(connectedRightId.split('-')[1]);
        const rightImage = currentQuestion.pairs![rightIndex].rightImage;
        
        return pair.leftImage === rightImage;
      }) || false;

      setIsCorrect(allCorrect);
      setIsChecked(true);
      if (allCorrect) setScore(s => s + 10);
    }
  };

  const handlePrevious = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Exit the quiz and navigate to ContentPlayer page
      onClose();
      if (onFinishAndExit) onFinishAndExit();
    }
  };

  const handleLeftClick = (index: number) => {
    if (isChecked) return;
    const id = `L-${currentQuestion.pairs![index].id}`;
    setActiveLeftId(id);
    // Remove existing connection for this left item if any
    const newCx = { ...connections };
    delete newCx[id];
    setConnections(newCx);
  };

  const handleRightClick = (index: number) => {
    if (isChecked || !activeLeftId) return;
    const rightId = `R-${index}`; // Using index for right side ID
    
    // Check if this right item is already connected? Optionally allow override.
    // Let's allow override.
    // Remove any other left connection pointing to this right ID
    const newCx = { ...connections };
    Object.keys(newCx).forEach(key => {
        if (newCx[key] === rightId) delete newCx[key];
    });
    
    newCx[activeLeftId] = rightId;
    setConnections(newCx);
    setActiveLeftId(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-white rounded-[2rem] w-full max-w-[340px] shadow-2xl overflow-hidden relative z-10"
          >
            {/* Header */}
            <div className="pt-8 pb-2 px-6 text-center relative">
              <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                QUESTION {currentQIndex + 1}/{questions.length}
              </div>

              
              <h2 className="text-xl font-bold text-gray-800 leading-tight">
                {currentQuestion.question}
              </h2>

              <button 
                onClick={() => setShowHint(!showHint)}
                className="mt-2 text-sm text-yellow-600 font-bold flex items-center justify-center gap-1 mx-auto"
              >
                <Lightbulb className="w-4 h-4" /> Need a hint?
              </button>

              <AnimatePresence>
                {showHint && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="mt-2 bg-yellow-50 border border-yellow-200 p-2 rounded-lg text-sm text-yellow-800 italic overflow-hidden"
                   >
                     💡 {currentQuestion.hint}
                   </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Body */}
            <div className="px-6 py-4 min-h-[300px]">
              {currentQuestion.type === 'mcq' ? (
                // MCQ Layout
                <>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm mb-6">
                        <img src={currentQuestion.image} alt="Question" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-3">
                        {currentQuestion.options?.map((option) => {
                            const isSelected = selectedOption === option.id;
                            let borderClass = "border-gray-200";
                            let bgClass = "bg-white";
                            let textClass = "text-gray-700";
                            
                            if (isChecked) {
                                if (option.correct) {
                                    borderClass = "border-green-500 bg-green-50";
                                    textClass = "text-green-700 font-bold";
                                } else if (isSelected && !option.correct) {
                                    borderClass = "border-red-500 bg-red-50";
                                    textClass = "text-red-700";
                                }
                            } else if (isSelected) {
                                borderClass = "border-purple-500";
                                bgClass = "bg-purple-50";
                                textClass = "text-purple-700 font-bold";
                            }

                            return (
                                <motion.button
                                    key={option.id}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => !isChecked && setSelectedOption(option.id)}
                                    className={cn(
                                        "w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-colors text-left",
                                        borderClass, bgClass
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0",
                                        isChecked && option.correct ? "border-green-500 bg-green-500 text-white" :
                                        isSelected ? "border-purple-500 bg-purple-500 text-white" : 
                                        "border-gray-300 text-gray-400"
                                    )}>
                                        {isChecked && option.correct ? <Check className="w-3 h-3" /> : option.id.toUpperCase()}
                                    </div>
                                    <span className={cn("text-lg", textClass)}>{option.text}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </>
              ) : (
                // Matching Layout
                <MatchingGame 
                    pairs={currentQuestion.pairs || []} 
                    connections={connections}
                    activeLeftId={activeLeftId}
                    onLeftClick={handleLeftClick}
                    onRightClick={handleRightClick}
                    isChecked={isChecked}
                    isCorrect={isCorrect}
                />
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 flex gap-3">
              <Button 
                variant="ghost" 
                className={cn(
                  "flex-1 text-gray-500 font-bold text-[20px] mt-[5px] mr-[0px] mb-[0px] ml-[0px]",
                  currentQIndex === 0 && "opacity-50 cursor-not-allowed"
                )} 
                onClick={handlePrevious}
                disabled={currentQIndex === 0}
              >
                Previous
              </Button>
              <Button 
                className={cn(
                  "flex-[2] font-bold text-lg h-12 rounded-xl shadow-lg transition-all",
                  isChecked 
                    ? isCorrect ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gradient-to-r from-purple-400 to-purple-300 hover:from-purple-500 hover:to-purple-400 text-white"
                )}
                disabled={currentQuestion.type === 'mcq' ? !selectedOption && !isChecked : Object.keys(connections).length === 0 && !isChecked}
                onClick={isChecked ? (currentQIndex === questions.length - 1 ? handleNext : handleNext) : handleCheck}
              >
                {isChecked 
                  ? (currentQIndex === questions.length - 1 ? "Finish & Exit" : (isCorrect ? "Great Job! Next" : "Try Again / Next")) 
                  : "Check Answer"}
              </Button>
            </div>
            
            {/* Feedback Overlay */}
            <AnimatePresence>
              {isChecked && isCorrect && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
                >
                   <div className="text-8xl">🎉</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper Component for Matching Game Lines & Layout
const MatchingGame = ({ 
    pairs, 
    connections, 
    activeLeftId, 
    onLeftClick, 
    onRightClick,
    isChecked,
    isCorrect
}: {
    pairs: any[],
    connections: {[key: string]: string},
    activeLeftId: string | null,
    onLeftClick: (index: number) => void,
    onRightClick: (index: number) => void,
    isChecked: boolean,
    isCorrect: boolean
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lines, setLines] = useState<{x1: number, y1: number, x2: number, y2: number, id: string}[]>([]);

    // Calculate line positions
    useLayoutEffect(() => {
        const updateLines = () => {
            if (!containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const newLines: any[] = [];

            Object.entries(connections).forEach(([leftId, rightId]) => {
                const leftEl = document.getElementById(leftId);
                const rightEl = document.getElementById(rightId);

                if (leftEl && rightEl) {
                    const leftRect = leftEl.getBoundingClientRect();
                    const rightRect = rightEl.getBoundingClientRect();

                    // Calculate relative coordinates
                    // Start point: Right center of left dot
                    const x1 = leftRect.right - containerRect.left - leftRect.width/2;
                    const y1 = leftRect.top - containerRect.top + leftRect.height/2;
                    
                    // End point: Left center of right dot
                    const x2 = rightRect.left - containerRect.left + rightRect.width/2;
                    const y2 = rightRect.top - containerRect.top + rightRect.height/2;

                    newLines.push({ x1, y1, x2, y2, id: leftId });
                }
            });
            setLines(newLines);
        };

        updateLines();
        window.addEventListener('resize', updateLines);
        // Small delay to ensure layout is settled
        const timer = setTimeout(updateLines, 100);
        return () => {
            window.removeEventListener('resize', updateLines);
            clearTimeout(timer);
        };
    }, [connections, pairs]);

    return (
        <div className="relative flex justify-between gap-8 h-full" ref={containerRef}>
            {/* Lines SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {lines.map((line) => (
                    <line 
                        key={line.id}
                        x1={line.x1} 
                        y1={line.y1} 
                        x2={line.x2} 
                        y2={line.y2} 
                        stroke={isChecked ? (isCorrect ? "#22c55e" : "#ef4444") : "#2dd4bf"} 
                        strokeWidth="4" 
                        strokeLinecap="round"
                    />
                ))}
            </svg>

            {/* Left Column */}
            <div className="flex flex-col justify-around gap-4 flex-1">
                {pairs.map((pair, index) => {
                    const id = `L-${pair.id}`;
                    const isActive = activeLeftId === id;
                    const isConnected = !!connections[id];
                    
                    return (
                        <div key={pair.id} className="relative flex items-center">
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onLeftClick(index)}
                                className={cn(
                                    "w-24 h-24 bg-white rounded-lg border-[6px] shadow-[0_4px_0_rgba(0,0,0,0.1)] overflow-hidden relative transition-all",
                                    isActive ? "border-purple-400 ring-2 ring-purple-200" : "border-green-600 border-b-green-700",
                                    isChecked && isCorrect && "border-green-400 opacity-80"
                                )}
                            >
                                <img src={pair.leftImage} className="w-full h-full object-cover" alt="match-item" />
                            </motion.button>
                            {/* Dot */}
                            <div 
                                id={id}
                                className={cn(
                                    "absolute -right-3 w-4 h-4 rounded-full border-2 border-white z-20 transition-colors",
                                    isActive || isConnected ? "bg-teal-400" : "bg-teal-400"
                                )}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-around gap-4 flex-1 items-end">
                {pairs.map((pair, index) => {
                    const rightId = `R-${index}`;
                    // Determine if this right item is connected
                    const isConnected = Object.values(connections).includes(rightId);
                    
                    return (
                        <div key={index} className="relative flex items-center">
                            {/* Dot */}
                             <div 
                                id={rightId}
                                className={cn(
                                    "absolute -left-3 w-4 h-4 rounded-full border-2 border-white z-20",
                                    isConnected ? "bg-teal-400" : "bg-teal-400"
                                )}
                            />
                            
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onRightClick(index)}
                                className="w-24 h-24 flex items-center justify-center p-2"
                            >
                                <img 
                                    src={pair.rightImage} 
                                    className="w-full h-full object-contain drop-shadow-lg" 
                                    alt="match-target" 
                                />
                            </motion.button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};