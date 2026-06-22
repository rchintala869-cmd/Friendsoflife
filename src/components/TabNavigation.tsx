import { TabType } from '../types';
import { Settings, User } from 'lucide-react';
import { motion } from 'motion/react';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSettingsClick: () => void;
  userName: string;
}

export function TabNavigation({ activeTab, onTabChange, onSettingsClick, userName }: TabNavigationProps) {
  const tabs: { id: TabType; label: string; }[] = [
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'favorites', label: 'Favorites' },
  ];

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : 'B';

  return (
    <nav className="h-16 border-b border-slate-800 px-4 md:px-8 flex items-center justify-between bg-slate-950/50 backdrop-blur-md z-30 sticky top-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-slate-950">{firstLetter}</div>
        <span className="font-semibold tracking-tight text-lg hidden sm:inline">{userName}</span>
      </div>
      <div className="flex gap-6 md:gap-10 items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`font-medium transition-colors relative pb-1 ${
                isActive ? 'text-amber-500' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="navTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onSettingsClick}
          className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors xs:flex"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-slate-300" />
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
          <User className="w-5 h-5 text-slate-400" />
        </div>
      </div>
    </nav>
  );
}
