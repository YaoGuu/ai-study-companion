import image_0197b69c7093dcd9e1c8f90b85a759a41c1aa040 from '../assets/0197b69c7093dcd9e1c8f90b85a759a41c1aa040.png';
import image_292bce46f43e5be502522071459ccfe4130d4dbb from '../assets/292bce46f43e5be502522071459ccfe4130d4dbb.png';
import image_6ef24a16582070472a044eb1b1182be85d5c468d from '../assets/6ef24a16582070472a044eb1b1182be85d5c468d.png';
import image_6a01d307a24ebd61025daf50840a6b998a21d765 from '../assets/6a01d307a24ebd61025daf50840a6b998a21d765.png';
import image_6e6f5aff19a5414e5543585cb582b8c16f251d78 from '../assets/6e6f5aff19a5414e5543585cb582b8c16f251d78.png';
import image_c65ea70e0a031bec8680bad5864ce08943efa72f from '../assets/c65ea70e0a031bec8680bad5864ce08943efa72f.png';
import image_5610dd991a38f9822da382ca2dd3703d1f9f5c35 from '../assets/5610dd991a38f9822da382ca2dd3703d1f9f5c35.png';
import image_18598b7986469e03838556bdd64555b2bacc2db3 from '../assets/18598b7986469e03838556bdd64555b2bacc2db3.png';
import image_eb38f3c6c77266fa3361faa01348ea7146cf4a27 from '../assets/eb38f3c6c77266fa3361faa01348ea7146cf4a27.png';
import image_61d5c70747d9a64421277b909c8854718525355a from '../assets/61d5c70747d9a64421277b909c8854718525355a.png';
import image_1bf6cf573184ef3ea2d94545d8b02bdcc151774d from '../assets/1bf6cf573184ef3ea2d94545d8b02bdcc151774d.png';
import image_9d2a9c3291b102065e28381db402c0c32404dc51 from '../assets/9d2a9c3291b102065e28381db402c0c32404dc51.png';
import image_2f2e3b6ccb1388e14f1b30844a9c816bbc8231fa from '../assets/2f2e3b6ccb1388e14f1b30844a9c816bbc8231fa.png';
import image_35def045862cc023bc89171be5c57cc8f60d17f4 from '../assets/35def045862cc023bc89171be5c57cc8f60d17f4.png';
import avatarImage from '../assets/ef572b260f42f4c5e836f1b4100eb2752d1c3569.png';
import React from "react";
import { motion } from "motion/react";
import {
  Bell,
  Settings,
  Grid,
  ChevronRight,
  BookOpen,
  Music,
  Play,
  Star,
  Clock,
  Flame,
  Trophy,
  Calendar,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import {
  ScrollArea,
  ScrollBar,
} from "../components/ui/scroll-area";
import { cn } from "../components/ui/utils";

interface LearningHomeProps {
  onNavigate: (page: string) => void;
}

export const LearningHome = ({
  onNavigate,
}: LearningHomeProps) => {
  return (
    <div className="min-h-full bg-gray-50 pb-24 font-sans">
      {/* Top App Bar */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-purple-50 to-gray-50/90 backdrop-blur-md px-4 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600"
          >
            <Grid className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('calendar')}
            className="text-gray-600 hover:bg-purple-100"
          >
            <Calendar className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-yellow-100">
          <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] text-yellow-900 font-bold border border-yellow-500">
            $
          </div>
          <span className="font-extrabold text-yellow-600 text-sm">
            1,250
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 relative"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("parent")}
            className="text-gray-600"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="px-5 space-y-6 mt-2">
        {/* User Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-purple-50 relative overflow-hidden"
          style={{
            backgroundImage: `../assets/35def045862cc023bc89171be5c57cc8f60d17f4.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-b from-purple-30/50 to-purple-100/50 rounded-bl-full -mr-8 -mt-8" />

          <div className="flex justify-between items-end relative z-8 min-h-[80px]">
            <div className="flex flex-col justify-end">
              <p className="text-Gray-500 text-sm font-medium mb-1">
                Good Morning, Alex!
              </p>
              <h2 className="text-2xl font-extrabold text-Gray-500 leading-tight">
                Ready to learn
                <br />
                today? 
              </h2>
            </div>
            <div className="bg-purple-100 text-purple-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 self-start">
              <Trophy className="w-3 h-3" />
              口语达人
            </div>
          </div>

        
        </motion.div>

        {/* Weekly Goal */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h3 className="font-bold text-lg text-gray-800">
              本周目标
            </h3>
            <span className="text-sm font-bold text-purple-600">
              30/60 mins
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl text-orange-500">
              <Flame className="w-6 h6 fill-current" />
            </div>
            <div className="flex-1 space-y-2">
              <Progress
                value={50}
                className="h-3 bg-gray-100"
                indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-300"
              />
              <p className="text-xs text-gray-500">
                You're doing great! Keep it up! 
              </p>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800">
              继续学习
            </h3>
            <button
              className="text-sm text-gray-400 hover:text-purple-400"
              onClick={() => onNavigate("player")}
            >
              View All
            </button>
          </div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("player")}
            className="w-full aspect-[2/1] bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md"
          >
            <img
              src={image_0197b69c7093dcd9e1c8f90b85a759a41c1aa040}
              alt="Lesson Thumbnail"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md">
                EPISODE 1
              </Badge>
            </div>

            <div className="absolute center inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/50 transition-colors">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 ml-1 text-purple-400 fill-purple-400" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-lg mb-1">
                The Hungry Caterpillar
              </h3>
              <div className="flex items-center justify-between text-white/80 text-xs font-medium">
                <span>Chapter 2 • 5 min left</span>
                <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-2">
            <Button
              size="sm"
              className="rounded-full bg-[rgb(175,149,255)] hover:bg-[#9974F7] text-white font-bold shadow-md shadow-purple-200"
            >
              All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate('warmuptest')}
              className="rounded-full border-gray-200 text-gray-600 bg-white font-medium hover:bg-purple-100"
            >
              🔥 Warm-Up
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-gray-200 text-gray-600 bg-white font-medium hover:bg-[#959EFF]"
            >
              <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
              绘本阅读
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-gray-200 text-gray-600 bg-white font-medium hover:bg-[#959EFF]"
            >
              <Music className="w-4 h-4 mr-2 text-pink-500" />
              儿歌
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-gray-200 text-gray-600 bg-white font-medium hover:bg-[#959EFF]"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              科普拓展
            </Button>
          </div>
          <ScrollBar
            orientation="horizontal"
            className="invisible"
          />
        </ScrollArea>

        {/* Recommended Grid */}
        {/* Trending Courses Header */}
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-bold text-lg text-gray-800">推荐课程</h3>
          <button className="text-sm text-gray-400 font-medium hover:text-purple-600 transition-colors">View All</button>
        </div>

        {/* Trending Courses Grid */}
        <div className="-mx-5">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 px-5 pb-4">
              {[
                {
                  title: "Space Adventure",
                  img: image_18598b7986469e03838556bdd64555b2bacc2db3,
                  type: "Science",
                  duration: "13 Courses",
                  rating: "4.8"
                },
                {
                  title: "Colors & Shapes",
                  img: image_5610dd991a38f9822da382ca2dd3703d1f9f5c35,
                  type: "Art",
                  duration: "20 Courses",
                  rating: "5.0"
                },
                {
                  title: "Under the Sea",
                  img: image_0197b69c7093dcd9e1c8f90b85a759a41c1aa040,
                  type: "Nature",
                  duration: "8 Courses",
                  rating: "4.9"
                },
                {
                  title: "Music Time",
                  img: image_c65ea70e0a031bec8680bad5864ce08943efa72f,
                  type: "Songs",
                  duration: "15 Courses",
                  rating: "4.7"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    if (i === 3)
                      onNavigate("speaking"); // Demo linking
                    else onNavigate("warmup");
                  }}
                  className="w-[180px] shrink-0 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-3 relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-bold text-gray-700">{item.rating}</span>
                    </div>
                  </div>
                  <div className="px-1 mb-1">
                    <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs font-bold text-purple-500">
                      {item.duration}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* My Courses Section */}
        <div className="pb-8">
           <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-bold text-lg text-gray-800">我的课程</h3>
            <button className="text-sm text-gray-400 font-medium hover:text-purple-600 transition-colors">View All</button>
           </div>
           
           <div className="space-y-4">
              {[
                { title: "Stories: CelebratingSum-Day", author: "By-Miss Gameja", progress: 65, color: "text-purple-400", img: image_6e6f5aff19a5414e5543585cb582b8c16f251d78 },
                { title: "Castle Creator", author: "By-Mr. Science", progress: 45, color: "text-purple-300", img: image_0197b69c7093dcd9e1c8f90b85a759a41c1aa040 },
                { title: "Icing on the Cake", author: "By-Miss Gameja", progress: 75, color: "text-purple-600", img: image_6ef24a16582070472a044eb1b1182be85d5c468d },
              ].map((course, i) => (
                <div key={i} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                   <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm truncate">{course.title}</h4>
                      <p className="text-gray-400 text-xs truncate">{course.author}</p>
                   </div>
                   <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      {/* Circular Progress */}
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-100" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray={126} strokeDashoffset={126 - (126 * course.progress) / 100} strokeLinecap="round" className={course.color} />
                      </svg>
                      <span className="absolute text-[10px] font-bold text-gray-700">{course.progress}%</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};