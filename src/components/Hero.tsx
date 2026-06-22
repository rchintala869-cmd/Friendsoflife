import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="relative w-full h-[320px] flex items-center justify-center overflow-hidden mb-8">
      {/* Seven Friends Backdrop (Stylized avatars/silhouettes) */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-10">
        <div className="w-32 h-48 bg-slate-400 rounded-full blur-xl hidden sm:block"></div>
        <div className="w-32 h-48 bg-slate-400 rounded-full blur-xl hidden sm:block"></div>
        <div className="w-32 h-48 bg-slate-400 rounded-full blur-xl hidden sm:block"></div>
        <div className="w-32 h-48 bg-slate-400 rounded-full blur-xl"></div>
        <div className="w-32 h-48 bg-slate-400 rounded-full blur-xl hidden sm:block"></div>
        <div className="w-32 h-48 bg-slate-400 rounded-full blur-xl hidden sm:block"></div>
        <div className="w-32 h-48 bg-slate-400 rounded-full blur-xl hidden md:block"></div>
      </div>
      
      <div className="absolute flex gap-2 md:gap-6 items-center justify-center w-full z-0 opacity-20">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-800 border-2 border-slate-500 hidden sm:block"></div>
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-800 border-2 border-slate-500 mt-12 hidden sm:block"></div>
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-800 border-2 border-slate-500 mb-8 hidden sm:block"></div>
        <motion.div 
           initial={{ scale: 0.9 }}
           animate={{ scale: 1 }}
           transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
           className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-800 border-2 border-slate-500 mt-4"
        ></motion.div>
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-800 border-2 border-slate-500 mb-12 hidden sm:block"></div>
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-800 border-2 border-slate-500 mt-8 hidden sm:block"></div>
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-800 border-2 border-slate-500 hidden md:block"></div>
      </div>
      
      {/* Quote */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 px-4 md:px-20 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-serif italic text-slate-300 leading-tight mb-6">
          &ldquo;Friendship is the only cement that will ever hold the world together.&rdquo;
        </h2>
        <p className="uppercase tracking-[0.4em] text-amber-500 text-xs font-semibold">The Core Brotherhood • Est. 2024</p>
      </motion.div>
    </div>
  );
}
