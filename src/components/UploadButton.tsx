import { useRef } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface UploadButtonProps {
  onFileSelect: (file: File) => void;
}

export function UploadButton({ onFileSelect }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      // Reset input so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => fileInputRef.current?.click()}
        className="fixed bottom-12 right-8 md:right-12 w-16 h-16 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center z-40 transition-colors"
        aria-label="Add photo or video"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </>
  );
}
