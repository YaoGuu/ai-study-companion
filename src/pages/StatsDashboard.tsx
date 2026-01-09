import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Clock, Flame, Calendar } from 'lucide-react';

const data = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 30 },
  { name: 'Wed', score: 60 },
  { name: 'Thu', score: 45 },
  { name: 'Fri', score: 80 },
  { name: 'Sat', score: 55 },
  { name: 'Sun', score: 70 },
];

export const StatsDashboard = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="p-4 pt-8 bg-gray-50 min-h-full font-sans pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">我的学习趋势</h1>
        <button onClick={onBack} className="text-sm font-bold text-gray-500">Close</button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2 text-blue-500">
            <Clock className="w-5 h-5" />
            <span className="font-bold text-xs">TIME</span>
          </div>
          <p className="text-3xl font-black text-gray-800">120<span className="text-sm text-gray-400 font-medium ml-1">min</span></p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2 text-orange-500">
            <Flame className="w-5 h-5" />
            <span className="font-bold text-xs">STREAK</span>
          </div>
          <p className="text-3xl font-black text-gray-800">7<span className="text-sm text-gray-400 font-medium ml-1">days</span></p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-gray-800">能力成长曲线</h3>
           <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">Weekly</span>
        </div>
        <div className="w-full" style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-800">我的徽章</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
           {[1,2,3].map((i) => (
             <div key={i} className="min-w-[120px] bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-2 shadow-sm">
               <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl border-4 border-yellow-200">
                 🏆
               </div>
               <span className="font-bold text-sm text-center text-gray-800">Super Star</span>
               <span className="text-[10px] text-gray-400">Earned Oct 12</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};