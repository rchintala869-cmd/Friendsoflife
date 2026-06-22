import { MediaItem, TabType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface MediaFeedProps {
  items: MediaItem[];
  activeTab: TabType;
  onItemClick: (item: MediaItem) => void;
}

export function MediaFeed({ items, activeTab, onItemClick }: MediaFeedProps) {
  const filteredItems = items.filter(item => {
    if (activeTab === 'favorites') return item.isFavorite;
    if (activeTab === 'videos') return item.type === 'video';
    return item.type === 'photo';
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">Nothing to see here yet.</p>
          <p className="mt-2 text-sm">Click the plus button to add memorable moments!</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square xl:aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl transition-all hover:scale-[1.02]"
                onClick={() => onItemClick(item)}
              >
                {/* Gradient overlay from design */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10 pointers-events-none" />
                
                {item.type === 'photo' ? (
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.url})` }}
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <video 
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center transition-colors group-hover:bg-slate-950/20">
                      <div className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-600 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-amber-500 ml-1 pl-[2px]" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Simulated timestamp */}
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-sm font-medium text-slate-200">Shared Moment</p>
                  <p className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
