import React, { useState } from 'react';
import { Home, Book, Mic, ChevronRight, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import image_c8b9e2b8cd3be31b9d358351017cb1adc5931370 from 'figma:asset/c8b9e2b8cd3be31b9d358351017cb1adc5931370.png';

interface LearningCalendarProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

// Mock data
const weeklyData = {
  totalHours: 0.5,
  targetHours: 1,
  courses: 0.2,
  speaking: 0.1,
};

const calendarDates = [
  { day: 1, studied: true, streak: false },
  { day: 2, studied: true, streak: false },
  { day: 3, studied: false, streak: false },
  { day: 4, studied: true, streak: true },
  { day: 5, studied: true, streak: true },
  { day: 6, studied: true, streak: true },
  { day: 7, studied: true, streak: true },
  { day: 8, studied: true, streak: true },
  { day: 9, studied: true, streak: true },
  { day: 10, studied: true, streak: true },
  { day: 11, studied: false, streak: false },
  { day: 12, studied: true, streak: false },
  { day: 13, studied: true, streak: false },
  { day: 14, studied: true, streak: false },
  { day: 15, studied: false, streak: false },
  { day: 16, studied: true, streak: false },
  { day: 17, studied: true, streak: false },
  { day: 18, studied: true, streak: false },
  { day: 19, studied: true, streak: false },
  { day: 20, studied: true, streak: false },
  { day: 21, studied: false, streak: false },
  { day: 22, studied: true, streak: false },
  { day: 23, studied: true, streak: false },
  { day: 24, studied: true, streak: false },
  { day: 25, studied: true, streak: false },
  { day: 26, studied: true, streak: false },
  { day: 27, studied: true, streak: false },
  { day: 28, studied: true, streak: false },
];

const growthData = [
  { day: '周一', listening: 75, speaking: 70, reading: 80, writing: 65 },
  { day: '周二', listening: 78, speaking: 72, reading: 82, writing: 68 },
  { day: '周三', listening: 80, speaking: 75, reading: 83, writing: 70 },
  { day: '周四', listening: 82, speaking: 78, reading: 85, writing: 72 },
  { day: '周五', listening: 83, speaking: 80, reading: 86, writing: 74 },
  { day: '周六', listening: 85, speaking: 82, reading: 88, writing: 76 },
  { day: '周日', listening: 85, speaking: 85, reading: 90, writing: 78 },
];

const achievements = [
  { id: 1, name: '学习新星', icon: '⭐', achieved: true, date: '12-20', color: 'from-yellow-400 to-orange-400' },
  { id: 2, name: '开口积极', icon: '🔥', achieved: true, date: '12-15', color: 'from-red-400 to-pink-400' },
  { id: 3, name: '词汇达人', icon: '📚', achieved: true, date: '12-10', color: 'from-blue-400 to-cyan-400' },
  { id: 4, name: '交流自然', icon: '💯', achieved: false, date: '', color: 'from-gray-300 to-gray-400', progress: '5/7' },
  { id: 5, name: '口语高手', icon: '🎤', achieved: false, date: '', color: 'from-gray-300 to-gray-400', progress: '8/10' },
  { id: 6, name: '全勤高手', icon: '👑', achieved: false, date: '', color: 'from-gray-300 to-gray-400', progress: '20/30' },
];

export const LearningCalendar = ({ onBack, onNavigate }: LearningCalendarProps) => {
  const [selectedMonth, setSelectedMonth] = useState('12月');
  const [selectedTab, setSelectedTab] = useState<'week' | 'month' | 'all'>('week');

  const percentage = Math.round((weeklyData.totalHours / weeklyData.targetHours) * 100);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full h-full bg-[#F5F5F5] overflow-y-auto pb-[80px] no-scrollbar">
      {/* 1. Top Personal Info Card */}
      <div className="bg-gradient-to-r from-purple-300 to-purple-400 pt-6 pb-8 px-5 rounded-b-[16px] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <button 
          className="absolute top-6 right-5 p-2 hover:bg-white/20 rounded-full transition-colors z-20"
          onClick={onBack}
        >
          <Home size={20} className="text-white" />
        </button>

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-3 border-white bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center text-white text-[24px] overflow-hidden">
              <img src={image_c8b9e2b8cd3be31b9d358351017cb1adc5931370} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#9974F7] rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]">
              5
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-white text-[16px] mb-1">Alex</h2>
            <p className="text-white/80 text-[12px]">已坚持学习 28 天</p>
            <p className="text-white text-[12px] mt-0.5">连续打卡 5 天 🔥</p>
          </div>
        </div>
      </div>

      {/* 2. Weekly Study Duration Module */}
      <div className="mx-4 -mt-6 bg-white rounded-[12px] shadow-lg p-5 relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[36px] font-bold text-[rgb(153,116,247)]">{weeklyData.totalHours}</span>
              <span className="text-[14px] text-[#757575]">小时</span>
            </div>
            <p className="text-[12px] text-[#757575]">本周学习时长</p>
          </div>
          
          <div className="relative w-20 h-20">
            <svg className="transform -rotate-90" width="80" height="80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#E0E0E0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#9974F7"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[14px] font-bold">{percentage}%</span>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#757575] text-left -mt-3 mb-4">目标1小时</p>

        {/* Duration Distribution */}
        <div className="border-t border-[#F5F5F5] pt-4">
          <h4 className="text-[14px] font-bold mb-3">学习分布</h4>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Book size={16} className="text-[#9687FE]" />
              <span className="text-[12px] text-[#757575] w-16">互动课程</span>
              <div className="flex-1 h-2 bg-[#E3F2FD] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#9687FE] rounded-full"
                  style={{ width: `${(weeklyData.courses / weeklyData.totalHours) * 100}%` }}
                ></div>
              </div>
              <span className="text-[12px] text-[#757575] w-12 text-right">{weeklyData.courses}小时</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Mic size={16} className="text-[#FF9800]" />
              <span className="text-[12px] text-[#757575] w-16">口语练习</span>
              <div className="flex-1 h-2 bg-[#FFF3E0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FF9800] rounded-full"
                  style={{ width: `${(weeklyData.speaking / weeklyData.totalHours) * 100}%` }}
                ></div>
              </div>
              <span className="text-[12px] text-[#757575] w-12 text-right">{weeklyData.speaking}小时</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Learning Calendar Module */}
      <div className="mx-4 mt-4 bg-white rounded-[12px] p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[16px] font-bold">学习日历</h3>
          <button className="flex items-center gap-1 text-[14px] text-[#757575]">
            {selectedMonth}
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {['一', '二', '三', '四', '五', '六', '日'].map((day) => (
            <div key={day} className="h-6 flex items-center justify-center text-[10px] text-[#757575] font-medium">
              {day}
            </div>
          ))}
          
          {calendarDates.map((date, index) => (
            <div
              key={index}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-[14px] font-medium relative
                ${date.streak ? 'bg-gradient-to-br from-[#9974F7] to-[#9687FE] text-white' : ''}
                ${!date.streak && date.studied ? 'bg-[#E3F2FD] text-[#1976D2]' : ''}
                ${!date.studied ? 'bg-white text-[#757575]' : ''}
                ${date.day === 28 ? 'border-2 border-[#5C6BC0]' : ''}
              `}
            >
              {date.day}
              {date.studied && !date.streak && (
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#9687FE] rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-[#F5F5F5]">
          <span className="text-[12px] font-medium text-[#5C6BC0]">本月打卡 18 天</span>
          <span className="text-[12px] font-medium text-[#FF9800]">最长连续 12 天</span>
        </div>
      </div>

      {/* 4. Vocabulary Mastery Progress */}
      <div className="mx-4 mt-4 bg-white rounded-[12px] p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[16px] font-bold">词汇掌握进度</h3>
          <button 
            className="text-[12px] text-[#5C6BC0] font-medium flex items-center gap-1"
            onClick={() => onNavigate('vocabulary')}
          >
            查看词汇本 <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-[32px] font-bold text-[#9687FE]">235</span>
          <span className="text-[12px] text-[#757575]">个词汇已掌握</span>
        </div>

        <div className="h-3 w-full rounded-full overflow-hidden flex mb-3">
          <div className="bg-[#9687FE]" style={{ width: '60%' }}></div>
          <div className="bg-[#FFC107]" style={{ width: '25%' }}></div>
          <div className="bg-[#E0E0E0]" style={{ width: '15%' }}></div>
        </div>

        <div className="flex gap-4 text-[12px]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#9687FE] rounded"></div>
            <span className="text-[#757575]">已掌握 235</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFC107] rounded"></div>
            <span className="text-[#757575]">复习中 98</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#E0E0E0] rounded"></div>
            <span className="text-[#757575]">待学习 67</span>
          </div>
        </div>
      </div>

      {/* 5. Ability Growth Curve */}
      <div className="mx-4 mt-4 bg-white rounded-[12px] p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[16px] font-bold">能力成长曲线</h3>
          <div className="flex gap-2">
            {(['week', 'month', 'all'] as const).map((tab) => (
              <button
                key={tab}
                className={`text-[12px] px-3 py-1 rounded font-medium ${
                  selectedTab === tab
                    ? 'text-[#5C6BC0] border-b-2 border-[#5C6BC0]'
                    : 'text-[#757575]'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab === 'week' ? '本周' : tab === 'month' ? '本月' : '全部'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#757575" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#757575" />
              <Line type="monotone" dataKey="listening" stroke="#2196F3" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="speaking" stroke="#FF9800" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="reading" stroke="#9687FE" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="writing" stroke="#FFB2EC" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-4 text-[12px] mt-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#2196F3]"></div>
            <span className="text-[#757575]">听力 85</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#FF9800]"></div>
            <span className="text-[#757575]">口语 85</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#9687FE]"></div>
            <span className="text-[#757575]">阅读 90</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#FFB2EC]"></div>
            <span className="text-[#757575]">写作 78</span>
          </div>
        </div>
      </div>

      {/* 6. Learning Achievements */}
      <div className="mx-4 mt-4 mb-4 bg-white rounded-[12px] p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[16px] font-bold">学习成就</h3>
          <button className="text-[12px] text-[#5C6BC0] font-medium flex items-center gap-1">
            查看全部 <ChevronRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`
                rounded-lg p-3 flex flex-col items-center justify-center
                bg-gradient-to-br ${achievement.color}
                ${!achievement.achieved ? 'opacity-50' : ''}
              `}
            >
              <div className="text-[48px] mb-2 relative">
                {achievement.icon}
                {!achievement.achieved && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full text-white text-[24px]">
                    🔒
                  </div>
                )}
              </div>
              <p className="text-[12px] text-center text-white truncate w-full mb-1 font-medium">
                {achievement.name}
              </p>
              {achievement.achieved ? (
                <p className="text-[10px] text-white/80">{achievement.date}</p>
              ) : (
                <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ width: achievement.progress ? `${(parseInt(achievement.progress.split('/')[0]) / parseInt(achievement.progress.split('/')[1])) * 100}%` : '0%' }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};