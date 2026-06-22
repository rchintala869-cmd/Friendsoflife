import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2 } from 'lucide-react';
import { MediaItem } from '../types';

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Lightbox({ item, onClose, onToggleFavorite, onDelete }: LightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4 md:p-8"
        onClick={onClose}
      >
        <div 
          className="relative max-w-7xl max-h-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-4 z-50">
            <button
              onClick={() => onDelete(item.id)}
              className="p-3 bg-slate-900/80 border border-slate-700 hover:bg-slate-800 rounded-full text-slate-300 transition-colors backdrop-blur-md hover:text-red-500 hover:border-red-900/50"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => onToggleFavorite(item.id)}
              className="p-3 bg-slate-900/80 border border-slate-700 hover:bg-slate-800 rounded-full text-slate-300 transition-colors backdrop-blur-md"
            >
              <Heart className={`w-6 h-6 ${item.isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-slate-900/80 border border-slate-700 hover:bg-slate-800 rounded-full text-slate-300 transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Media Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-slate-800 bg-slate-900"
          >
            {item.type === 'photo' ? (
              <img 
                src={item.url} 
                alt="Enlarged shared moment" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              />
            ) : (
              <video 
                src={item.url} 
                controls 
                autoPlay
                className="max-w-full max-h-[85vh] rounded-2xl"
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
