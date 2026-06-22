import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Bell, Lock, Smartphone, Cloud, LogOut, ChevronLeft, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateName: (name: string) => void;
  onClearAll: () => void;
}

export function SettingsModal({ isOpen, onClose, userName, onUpdateName, onClearAll }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [tempName, setTempName] = useState(userName);
  const [isClearing, setIsClearing] = useState(false);

  const handleClose = () => {
    setActiveSection(null);
    onClose();
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setActiveSection(null);
    }
  };

  const handleClearData = async () => {
    setIsClearing(true);
    await onClearAll();
    setIsClearing(false);
    setActiveSection(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[400px]"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                {activeSection && (
                  <button 
                    onClick={() => setActiveSection(null)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-xl font-semibold text-slate-100">
                  {activeSection === 'account' ? 'Account Preferences' : 
                   activeSection === 'storage' ? 'Storage Settings' : 
                   'Settings'}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full text-slate-400 transition-colors"
                aria-label="Close settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {!activeSection && (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div 
                      onClick={() => {
                        setTempName(userName);
                        setActiveSection('account');
                      }}
                      className="p-3 flex items-center gap-4 hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors text-slate-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                        <User className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">Account Preferences</p>
                        <p className="text-xs text-slate-500">Manage your profile and display name</p>
                      </div>
                    </div>
                    
                    <div className="p-3 flex items-center gap-4 opacity-50 cursor-not-allowed rounded-xl transition-colors text-slate-300">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">Privacy & Security</p>
                        <p className="text-xs text-slate-500">Coming soon</p>
                      </div>
                    </div>
                    
                    <div className="p-3 flex items-center gap-4 opacity-50 cursor-not-allowed rounded-xl transition-colors text-slate-300">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">Notifications</p>
                        <p className="text-xs text-slate-500">Coming soon</p>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => setActiveSection('storage')}
                      className="p-3 flex items-center gap-4 hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors text-slate-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                        <Cloud className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">Storage Settings</p>
                        <p className="text-xs text-slate-500">Manage local IndexedDB storage usage</p>
                      </div>
                    </div>
                    
                    <div className="p-3 flex items-center gap-4 opacity-50 cursor-not-allowed rounded-xl transition-colors text-slate-300">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">App Integration</p>
                        <p className="text-xs text-slate-500">Coming soon</p>
                      </div>
                    </div>

                    <div className="my-2 border-t border-slate-800/80 mx-3"></div>

                    <div className="p-3 flex items-center gap-4 hover:bg-red-500/10 rounded-xl cursor-pointer transition-colors text-red-400 group">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-colors">
                        <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">Sign Out</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'account' && (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 flex flex-col gap-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
                      <input 
                        type="text" 
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-500/50 transition-colors"
                        placeholder="Enter your group name"
                      />
                      <p className="text-xs text-slate-500 mt-2">This name appears in the top navigation bar.</p>
                    </div>

                    <button 
                      onClick={handleSaveName}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl transition-colors mt-auto"
                    >
                      Save Changes
                    </button>
                  </motion.div>
                )}

                {activeSection === 'storage' && (
                  <motion.div
                    key="storage"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 flex flex-col gap-6"
                  >
                    <div className="p-4 border border-red-900/30 bg-red-950/10 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-900/20 rounded-lg text-red-400">
                          <Trash2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-red-400 font-medium mb-1">Clear All Data</h3>
                          <p className="text-sm text-slate-400 mb-4">
                            This will permanently delete all photos, videos, and favorites from this device's local storage. This action cannot be undone.
                          </p>
                          <button 
                            onClick={handleClearData}
                            disabled={isClearing}
                            className={`px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-300 font-medium rounded-lg transition-colors border border-red-900/50 ${isClearing ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {isClearing ? 'Clearing...' : 'Clear All Media'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
