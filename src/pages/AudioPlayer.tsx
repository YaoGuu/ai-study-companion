import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Menu, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Clock,
  ChevronDown,
  Heart
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";

interface AudioPlayerProps {
  onBack: () => void;
}

export const AudioPlayer = ({ onBack }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Simulated playback
  useEffect(() => {
    if (isPlaying && currentTime < duration) {
      const timer = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentTime, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="h-full bg-gradient-to-b from-[#9974F7]/60 via-[#AF95FF]/60 to-[#DFD9F5] flex flex-col text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-60 h-60 bg-purple-400/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="px-5 py-4 flex justify-between items-center relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">磨耳朵</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        {/* Vinyl Record */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ 
            duration: 3, 
            repeat: isPlaying ? Infinity : 0, 
            ease: "linear" 
          }}
          className="w-64 h-64 mx-auto mb-8 relative"
        >
          {/* Outer vinyl disc */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl relative overflow-hidden">
            {/* Vinyl grooves effect */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-white/5"
                style={{
                  top: `${i * 8}px`,
                  left: `${i * 8}px`,
                  right: `${i * 8}px`,
                  bottom: `${i * 8}px`,
                }}
              />
            ))}
            
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 rounded-full bg-gray-900"></div>
              </div>
            </div>

            {/* Album art on label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center text-white shadow-md">
                <span className="text-2xl">🎵</span>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-purple-300/30 blur-xl"></div>
        </motion.div>

        {/* Song Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">The Hungry Caterpillar</h2>
          <p className="text-white/70 text-sm">Children's Story Collection</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => setCurrentTime(value[0])}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-white/60 mb-8">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-10 h-10"
          >
            <Repeat className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-12 h-12"
          >
            <SkipBack className="w-6 h-6 fill-white" />
          </Button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-white text-purple-500 flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-purple-500" />
            ) : (
              <Play className="w-6 h-6 ml-0 fill-purple-500" />
            )}
          </motion.button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-12 h-12"
          >
            <SkipForward className="w-6 h-6 fill-white" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-10 h-10"
          >
            <Clock className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Info Card */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showPlaylist ? 0 : 0 }}
        className="bg-white/10 backdrop-blur-md rounded-t-3xl p-5 relative z-10"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-300 flex items-center justify-center shadow-md bg-[rgba(177,183,223,0)]">
              <span className="text-xl">🐼</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">Chapter 2</h3>
              <p className="text-xs text-white/60">Episode 1 • 3:00</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setShowPlaylist(!showPlaylist)}
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${showPlaylist ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2 pt-3 border-t border-white/10"
          >
            {[
              { title: 'Chapter 1', duration: '2:45', playing: false },
              { title: 'Chapter 2', duration: '3:00', playing: true },
              { title: 'Chapter 3', duration: '3:20', playing: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  item.playing ? 'bg-white/10' : 'hover:bg-white/5'
                } cursor-pointer transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center ${
                    item.playing ? 'text-pink-300' : 'text-white/40'
                  }`}>
                    {item.playing ? (
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-3 bg-pink-300 animate-pulse"></div>
                        <div className="w-0.5 h-3 bg-pink-300 animate-pulse delay-75"></div>
                        <div className="w-0.5 h-3 bg-pink-300 animate-pulse delay-150"></div>
                      </div>
                    ) : (
                      <Play className="w-3 h-3 fill-current" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${item.playing ? 'text-white' : 'text-white/70'}`}>
                      {item.title}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-white/40">{item.duration}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
