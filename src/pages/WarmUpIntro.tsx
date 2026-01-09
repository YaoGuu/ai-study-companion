import image_6ef24a16582070472a044eb1b1182be85d5c468d from '../assets/6ef24a16582070472a044eb1b1182be85d5c468d.png';
import image_715b9d47417ca4a247e5187cccaab42cb407e196 from '../assets/715b9d47417ca4a247e5187cccaab42cb407e196.png';
import image_6e6f5aff19a5414e5543585cb582b8c16f251d78 from '../assets/6e6f5aff19a5414e5543585cb582b8c16f251d78.png';
import exampleImage from '../assets/c65ea70e0a031bec8680bad5864ce08943efa72f.png';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Menu, Volume2, Play, Rocket, Heart, BookOpen, Clock, Users } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { cn } from "../components/ui/utils";

interface WarmUpIntroProps {
  onBack: () => void;
  onStart: () => void;
}

const vocabList = [
  {
    id: 1,
    word: "Elephant",
    phonetic: "/ˈel.ɪ.fənt/",
    definition: "A very large animal with a long nose called a trunk.",
    sentence: "The elephant sprayed water with its trunk.",
    image: image_6e6f5aff19a5414e5543585cb582b8c16f251d78
  },
  {
    id: 2,
    word: "Lion",
    phonetic: "/ˈlaɪ.ən/",
    definition: "A large wild cat known as the 'King of the Jungle'.",
    sentence: "The lion roared loudly at sunset.",
    image: image_715b9d47417ca4a247e5187cccaab42cb407e196
  },
  {
    id: 3,
    word: "Monkey",
    phonetic: "/ˈmʌŋ.ki/",
    definition: "A small animal that climbs trees and has a long tail.",
    sentence: "The monkey peeled a banana.",
    image: image_6ef24a16582070472a044eb1b1182be85d5c468d
  }
];

export const WarmUpIntro = ({ onBack, onStart }: WarmUpIntroProps) => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-full bg-white font-sans pb-24">
      {/* Hero Image Section */}
      <div className="relative h-[45vh] w-full bg-gray-900">
        <img 
          src={exampleImage}
          alt="Zoo Scene" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10" />
        
        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 pt-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack} 
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/10"
          >
            <Heart className="w-5 h-5 fill-transparent" />
          </Button>
        </div>
      </div>

      {/* Overlapping Content Card */}
      <div className="relative -mt-10 bg-white rounded-t-[2.5rem] px-6 pt-8 pb-32 z-10 min-h-[50vh] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        {/* Title & Author */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2 leading-snug">
            Let's meet the Animals!<br />Zoo Adventure
          </h1>
          <p className="text-gray-400 text-sm font-medium">By- Professor</p>
        </div>

        {/* Custom Tabs */}
        <div className="flex border-b border-gray-100 mb-8 relative">
          {['Overview', 'Keywords'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 pb-3 text-sm font-bold transition-colors relative z-10",
                activeTab === tab ? "text-purple-600" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-purple-600 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'Overview' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-purple-50 rounded-2xl p-3 py-4 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-extrabold text-purple-600 block mb-1">6</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Key Words</span>
                </div>
                <div className="bg-orange-50 rounded-2xl p-3 py-4 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-extrabold text-orange-500 block mb-1">03</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Key Sentences</span>
                </div>
                <div className="bg-green-50 rounded-2xl p-3 py-4 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-extrabold text-green-600 block mb-1">20<span className="text-xs">m</span></span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Duration</span>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">About Course 学习目标和课程详情</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Join Ms. Hoot and Buzz on an exciting journey through the zoo! We will learn about different animals, their habitats, and the sounds they make. 
                  <br/><br/>
                  Perfect for beginners starting their English adventure. Get ready to roar like a lion and stomp like an elephant!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {/* Keywords/Vocab List */}
              {vocabList.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.word} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800">{item.word}</h4>
                    <p className="text-xs text-gray-400 font-mono">{item.phonetic}</p>
                  </div>
                  <Button size="icon" variant="ghost" className="text-purple-400 bg-purple-50 hover:bg-purple-100 rounded-full h-8 w-8">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50">
        <Button 
          onClick={onStart}
          className="w-full bg-[#9974F7] hover:bg-purple-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-purple-500/30 text-lg transition-transform active:scale-95"
        >
          开始学习
        </Button>
      </div>
    </div>
  );
};