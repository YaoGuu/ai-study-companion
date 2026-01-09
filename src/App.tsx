import React, { useState } from 'react';
import { MobileLayout } from './components/MobileLayout';
import { LearningHome } from './pages/LearningHome';
import { WarmUpIntro } from './pages/WarmUpIntro';
import { WarmUpTest } from './pages/WarmUpTest';
import { ContentPlayer } from './pages/ContentPlayer';
import { AudioPlayer } from './pages/AudioPlayer';
import { SpeakingPractice } from './pages/SpeakingPractice';
import { VocabularyManager } from './pages/VocabularyManager';
import { StatsDashboard } from './pages/StatsDashboard';
import { LearningReport } from './pages/LearningReport';
import { ParentDashboard } from './pages/ParentDashboard';
import { LearningCalendar } from './pages/LearningCalendar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LearningHome onNavigate={navigate} />;
      case 'warmup':
        return <WarmUpIntro onBack={() => navigate('home')} onStart={() => navigate('player')} />;
      case 'warmuptest':
        return <WarmUpTest onBack={() => navigate('home')} onComplete={() => navigate('speaking')} onNavigate={navigate} />;
      case 'player':
        return <ContentPlayer onBack={() => navigate('home')} onComplete={() => navigate('quiz')} onNavigateToSpeaking={() => navigate('speaking')} onNavigate={navigate} />;
      case 'audio':
        return <AudioPlayer onBack={() => navigate('player')} />;
      case 'speaking':
        return <SpeakingPractice onBack={() => navigate('home')} onFinish={() => navigate('report')} onNavigateToPlayer={() => navigate('player')} />;
      case 'vocabulary':
        return <VocabularyManager onBack={() => navigate('home')} />;
      case 'stats':
        return <StatsDashboard onBack={() => navigate('home')} />;
      case 'report':
        return <LearningReport onBack={() => navigate('home')} onNext={() => navigate('stats')} onNavigate={navigate} />;
      case 'parent':
        return <ParentDashboard onBack={() => navigate('home')} onNavigate={navigate} />;
      case 'calendar':
        return <LearningCalendar onBack={() => navigate('home')} onNavigate={navigate} />;
      default:
        return <LearningHome onNavigate={navigate} />;
    }
  };

  return (
    <MobileLayout className="font-sans">
      {/* Status Bar Placeholder */}
      <div className="h-[44px] bg-white w-full flex justify-between items-center px-6 shrink-0">
        <span className="text-xs font-bold text-gray-900">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-3 border border-gray-300 rounded-[3px] relative flex items-center p-0.5">
            <div className="h-full w-[100%] bg-gray-900 rounded-[1px]"></div>
          </div>
        </div>
      </div>
      {renderPage()}
    </MobileLayout>
  );
}

export default App;