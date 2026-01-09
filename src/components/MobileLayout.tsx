import React from 'react';
import { cn } from "../components/ui/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className={cn(
        "w-full max-w-[400px] h-[850px] bg-background rounded-[3rem] shadow-2xl overflow-hidden relative border-[1px] border-gray-100 flex flex-col",
        className
      )}>
        
        {/* Content */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[130px] h-1.5 bg-gray-900/20 rounded-full z-50"></div>
      </div>
    </div>
  );
};
