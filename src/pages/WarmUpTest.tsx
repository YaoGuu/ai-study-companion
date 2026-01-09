import avatarBuzz from '../assets/ef572b260f42f4c5e836f1b4100eb2752d1c3569.png';
import avatarStudent from '../assets/c8b9e2b8cd3be31b9d358351017cb1adc5931370.png';
import image_5610dd991a38f9822da382ca2dd3703d1f9f5c35 from '../assets/6ef24a16582070472a044eb1b1182be85d5c468d.png';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, Check, RotateCcw } from 'lucide-react';
import { Button } from "../components/ui/button";
import { cn } from "../components/ui/utils";

interface WarmUpTestProps {
  onBack: () => void;
  onComplete: () => void;
  onNavigate: (page: string) => void;
}

const levels = [
  { value: '1', label: '探险勇士', emoji: '🕵🏻‍♀️' },
  { value: '2', label: '动物伙伴', emoji: '🦍' },
  { value: '3', label: '小鸟飞飞', emoji: '🦩' },
  { value: '4', label: '涂色画家', emoji: '🖍️' },
  { value: '5', label: '森林寻宝', emoji: '🍁' },
  { value: '6', label: '云朵探险', emoji: '⛅️' },
  { value: '7', label: '小熊搬粮', emoji: '🐻' },
  { value: '8', label: '数字找找', emoji: '🔢' },
];

const avatars = [
  { id: 1, emoji: '🐶', label: 'Puppy' },
  { id: 2, emoji: '🐱', label: 'Kitty' },
  { id: 3, emoji: '🐻', label: 'Bear' },
  { id: 4, emoji: '🦁', label: 'Lion' },
  { id: 5, emoji: '🐼', label: 'Panda' },
  { id: 6, emoji: '🐨', label: 'Koala' },
  { id: 7, emoji: '🐯', label: 'Tiger' },
  { id: 8, emoji: '🦊', label: 'Fox' },
  { id: 9, emoji: '🐸', label: 'Frog' },
  { id: 10, emoji: '🐰', label: 'Rabbit' },
  { id: 11, emoji: '🦄', label: 'Unicorn' },
  { id: 12, emoji: '🐵', label: 'Monkey' },
];

export const WarmUpTest = ({ onBack, onComplete, onNavigate }: WarmUpTestProps) => {
  const [step, setStep] = useState<'level' | 'avatar' | 'test'>('level');
  const [selectedlevel, setSelectedlevel] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const handlelevelSelect = (level: string) => {
    setSelectedlevel(level);
  };

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
    if (step === 'level' && selectedlevel) {
      setStep('avatar');
    } else if (step === 'avatar' && selectedAvatar) {
      setStep('test');
    }
  };

  const handleStartTest = () => {
    onComplete();
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col font-sans overflow-hidden relative">
      {/* Dim Overlay */}
      {/* 调整透明度（数值越小，图片越清晰） */}
      <div className="absolute inset-0 bg-black/20" /> {/* 10%透明度，图片更亮 */}

       {/* ========== 新增的背景装饰图片 ========== */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-80"
        style={{ 
          backgroundImage: `url(${image_5610dd991a38f9822da382ca2dd3703d1f9f5c35})`,
        }}
      />
      
      {/* Top Bar */}
      <div className="relative z-10">
        {/* Header with Title */}
        <div className="px-5 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="font-bold text-lg text-white">Warm-Up Test</h1>
          <div className="flex gap-2">
            <Button
             
              onClick={() => onNavigate('player')}
              className="flex flex-col items-center gap-1 h-auto py-2 px-4 hover:bg-white/10 bg-[rgba(139,92,246,0)]"
            >
              <RotateCcw className="w-6 h-6 text-white" />
        
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-5 pb-2 flex justify-center">
          <div className="flex gap-2">
            <div className={cn("h-1.5 w-8 rounded-full transition-all", step === 'level' ? "bg-purple-400" : "bg-white/30")} />
            <div className={cn("h-1.5 w-8 rounded-full transition-all", step === 'avatar' ? "bg-purple-400" : "bg-white/30")} />
            <div className={cn("h-1.5 w-8 rounded-full transition-all", step === 'test' ? "bg-purple-400" : "bg-white/30")} />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative z-10 flex flex-col px-5 py-8 overflow-y-auto bg-[rgba(0,0,0,0)]">
        <AnimatePresence mode="wait">
          {/* level Selection */}
          {step === 'level' && (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl flex-3 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Pick your level to challenge!</h2>
                  <p className="text-gray-500 text-sm">选择你要挑战的关卡</p>
                </div>

                <div className="grid grid-cols-4 gap-3 flex-1 content-start">
                  {levels.map((level) => (
                    <motion.button
                      key={level.value}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlelevelSelect(level.value)}
                      className={cn(
                        "aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border-2",
                        selectedlevel === level.value
                          ? "bg-gradient-to-br from-purple-300 to-purple-300 border-purple-300 shadow-lg shadow-purple-300/50"
                          : "bg-white border-gray-200 hover:border-purple-300"
                      )}
                    >
                      <span className="text-3xl">{level.emoji}</span>
                      <span className={cn(
                        "text-xs font-bold",
                        selectedlevel === level.value ? "text-white" : "text-gray-700"
                      )}>
                        {level.label}
                      </span>
                      {selectedlevel === level.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!selectedlevel}
                  className={cn(
                    "mt-6 h-14 rounded-2xl text-lg font-bold shadow-lg transition-all",
                    selectedlevel
                      ? "bg-gradient-to-r from-gray-300 to-gray-300 hover:from-purple-400 hover:to-purple-300 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Avatar Selection */}
          {step === 'avatar' && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose your avatar</h2>
                  <p className="text-gray-500 text-sm">选择你喜欢的头像</p>
                </div>

                <div className="grid grid-cols-4 gap-3 flex-1 content-start">
                  {avatars.map((avatar) => (
                    <motion.button
                      key={avatar.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAvatarSelect(avatar.id)}
                      className={cn(
                        "aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-2 relative",
                        selectedAvatar === avatar.id
                          ? "bg-gradient-to-br from-purple-300 to-purple-300 border-purple-400 shadow-lg shadow-purple-300/50"
                          : "bg-white border-gray-200 hover:border-purple-300"
                      )}
                    >
                      <span className="text-4xl">{avatar.emoji}</span>
                      <span className={cn(
                        "text-[10px] font-bold",
                        selectedAvatar === avatar.id ? "text-white" : "text-gray-600"
                      )}>
                        {avatar.label}
                      </span>
                      {selectedAvatar === avatar.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => setStep('level')}
                    variant="outline"
                    className="h-14 rounded-2xl text-lg font-bold flex-1 border-2"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleContinue}
                    disabled={!selectedAvatar}
                    className={cn(
                      "h-14 rounded-2xl text-lg font-bold shadow-lg flex-1 transition-all",
                      selectedAvatar
                        ? "bg-gradient-to-r from-gray-300 to-gray-300 hover:from-purple-300 hover:to-purple-400 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Test Introduction */}
          {step === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-full"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-300 to-purple-40 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-6xl">
                    {avatars.find(a => a.id === selectedAvatar)?.emoji || '🎯'}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Ready to Start?
                </h2>
                <p className="text-gray-600 text-lg mb-2">
                  Let's have a quick conversation!
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  我们来进行一段简短的对话，帮助我们了解你的英语水平
                </p>

                <div className="w-full space-y-4 mb-8">
                  <div className="bg-purple-50 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-xl">
                      🎤
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-gray-800 text-sm">Speak Clearly</p>
                      <p className="text-gray-600 text-xs">清晰地说出你的回答</p>
                    </div>
                  </div>

                  <div className="bg-pink-50 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-xl">
                      🎯
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-gray-800 text-sm">Take Your Time</p>
                      <p className="text-gray-600 text-xs">不要紧张，慢慢来</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-xl">
                      ⭐
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-gray-800 text-sm">Have Fun</p>
                      <p className="text-gray-600 text-xs">享受这个过程！</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleStartTest}
                  className="h-16 px-12 rounded-2xl text-xl font-bold bg-gradient-r from-gray-300 to-gray-350 hover:from-purple-300 hover:to-purple-400 text-white shadow-xl shadow-purple-200/50 bg-[rgba(188,188,188,0.72)]"
                >
                  Start Test
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};