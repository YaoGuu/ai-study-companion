import image_b2cef4392ab76d4e171b44f8edc919330a3a147f from 'figma:asset/b2cef4392ab76d4e171b44f8edc919330a3a147f.png';
import image_c8b9e2b8cd3be31b9d358351017cb1adc5931370 from 'figma:asset/c8b9e2b8cd3be31b9d358351017cb1adc5931370.png';
import image_ef572b260f42f4c5e836f1b4100eb2752d1c3569 from 'figma:asset/ef572b260f42f4c5e836f1b4100eb2752d1c3569.png';
import React, { useState } from 'react';
import avatarAlex from 'figma:asset/ef572b260f42f4c5e836f1b4100eb2752d1c3569.png';
import avatarEmma from 'figma:asset/35def045862cc023bc89171be5c57cc8f60d17f4.png';
import { 
  Bell, 
  Settings, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  FileText,
  User,
  Home
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Card } from "../components/ui/card";
import { cn } from "../components/ui/utils";

export const ParentDashboard = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string) => void }) => {
  const [selectedStudent, setSelectedStudent] = useState('Alex');

  // 不同学生的数据
  const studentData = {
    Alex: {
      unit: 'Unit 3: At the Supermarket',
      progress: 30,
      time: '25m',
      timeChange: '+5m',
      completion: '85%',
      completionChange: '↑12%',
      trend: '+12%',
      trendSub: 'Speaking',
      level: 'Level 2',
      speakingFluency: { score: '8/10', status: 'On Track', value: 80 },
      vocabulary: { count: '120 Words', status: 'Ahead', value: 90 }
    },
    Emma: {
      unit: 'Unit 2: My Family',
      progress: 70,
      time: '40m',
      timeChange: '+8m',
      completion: '92%',
      completionChange: '↑15%',
      trend: '+18%',
      trendSub: 'Vocabulary',
      level: 'Level 3',
      speakingFluency: { score: '9/10', status: 'Excellent', value: 90 },
      vocabulary: { count: '156 Words', status: 'Excellent', value: 95 }
    }
  };

  const currentData = studentData[selectedStudent as keyof typeof studentData];

  return (
    <div className="min-h-full bg-gray-50 pb-24 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 pt-8 sticky top-0 z-20">
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="-ml-2 text-gray-800" onClick={onBack}>
        ←
      </Button>
      <div>
        <h1 className="text-xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-xs text-gray-500">家长您好</p>
      </div>
    </div>

    {/* ========== 关键修改：右上角按钮容器 ========== */}
    <div className="flex gap-2 items-center"> {/* 保持flex + gap-2，添加items-center垂直居中 */}
      {/* 第一个按钮（铃铛） */}
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-600 relative"
      >
        <Bell className="w-6 h-6" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </Button>

      {/* 第二个按钮（首页）：移除absolute定位，统一样式 */}
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-600"
        onClick={onBack}
      >
        <Home size={20} className="text-gray-600" /> {/* 文字颜色和铃铛按钮统一 */}
      </Button>
    </div>
  </div>

  {/* Student Selector：这部分本来就是水平并排，可优化样式 */}
  <div className="flex gap-4 border-b border-gray-100 -mx-4 px-4">
    <button className={`pb-3 border-b-2 ${selectedStudent === 'Alex' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400'} font-bold text-sm flex items-center gap-2`} onClick={() => setSelectedStudent('Alex')}>
      <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center border border-white">
        <img src={image_c8b9e2b8cd3be31b9d358351017cb1adc5931370} alt="Alex" className="w-full h-full object-cover" />
      </div>
      Alex
    </button>
    <button className={`pb-3 border-b-2 ${selectedStudent === 'Emma' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400'} font-bold text-sm flex items-center gap-2`} onClick={() => setSelectedStudent('Emma')}>
       <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center border border-white">
         <img src={image_ef572b260f42f4c5e836f1b4100eb2752d1c3569} alt="Emma" className="w-full h-full object-cover" />
       </div>
       Emma
    </button>
  </div>
</div>

      <div className="p-4 space-y-6">
        
        {/* Priority Card */}
        <Card className="p-4 border-l-4 border-l-purple-500 shadow-md bg-white">
          <div className="flex justify-between items-start mb-3">
             <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
               <AlertCircle className="w-3 h-3" /> Mandatory
             </span>
             <span className="text-xs font-bold text-red-500">Due Today • 15 min</span>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
               <img src={image_b2cef4392ab76d4e171b44f8edc919330a3a147f} alt="Lesson" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-sm">{currentData.unit}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                  <span>Progress</span>
                  <span>{currentData.progress}%</span>
                </div>
                <Progress value={currentData.progress} className="h-2" />
              </div>
            </div>
          </div>
          <Button className="w-full mt-4 bg-[rgb(175,149,255)] hover:bg-purple-700 text-white font-bold h-10 text-sm" onClick={() => onNavigate('warmup')}>
            继续学习
          </Button>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Time', val: currentData.time, sub: currentData.timeChange, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Done', val: currentData.completion, sub: currentData.completionChange, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Trend', val: currentData.trend, sub: currentData.trendSub, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
               <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mb-1", item.bg, item.color)}>
                 <item.icon className="w-4 h-4" />
               </div>
               <span className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</span>
               <span className="text-lg font-black text-gray-900 leading-none">{item.val}</span>
               <span className="text-[10px] text-green-500 font-bold">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Curriculum Snapshot */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Curriculum Snapshot</h3>
            <span className="text-xs font-bold text-purple-600">{currentData.level}</span>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-4">
             <div>
               <div className="flex justify-between text-xs font-bold mb-1">
                 <span className="text-gray-600">Speaking Fluency</span>
                 <span className="text-green-600">{currentData.speakingFluency.score} ({currentData.speakingFluency.status})</span>
               </div>
               <Progress value={currentData.speakingFluency.value} className="h-2" indicatorClassName="bg-green-500" />
             </div>
             <div>
               <div className="flex justify-between text-xs font-bold mb-1">
                 <span className="text-gray-600">Vocabulary Size</span>
                 <span className="text-blue-600">{currentData.vocabulary.count} ({currentData.vocabulary.status})</span>
               </div>
               <Progress value={currentData.vocabulary.value} className="h-2" indicatorClassName="bg-blue-500" />
             </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 justify-start font-bold text-gray-600" onClick={() => onNavigate('report')}>
             <FileText className="w-4 h-4 mr-2" /> 学习报告
          </Button>
          <Button variant="outline" className="h-12 justify-start font-bold text-gray-600">
             <Settings className="w-4 h-4 mr-2" /> 设置
          </Button>
        </div>

      </div>


    </div>
  );
};