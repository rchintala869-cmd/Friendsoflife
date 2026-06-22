/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { TabNavigation } from './components/TabNavigation';
import { MediaFeed } from './components/MediaFeed';
import { UploadButton } from './components/UploadButton';
import { Lightbox } from './components/Lightbox';
import { SettingsModal } from './components/SettingsModal';
import { MediaItem, TabType } from './types';
import { getMediaItems, saveMediaItem, deleteMediaItem, clearAllMedia } from './lib/db';

export default function App() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'BSYJPA');

  useEffect(() => {
    // Load initial data from IndexedDB
    const loadData = async () => {
      try {
        const storedItems = await getMediaItems();
        setItems(storedItems);
      } catch (err) {
        console.error("Failed to load media items", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateName = (newName: string) => {
    setUserName(newName);
    localStorage.setItem('userName', newName);
  };

  const handleClearAll = async () => {
    try {
      await clearAllMedia();
      setItems([]);
      setSelectedItem(null);
    } catch (err) {
      console.error("Failed to clear media", err);
    }
  };

  const handleFileSelect = async (file: File) => {

    // Determine type
    const isVideo = file.type.startsWith('video/');
    
    // Create object URL for local display. 
    // In a real generic app, you'd upload this file to a server here.
    // However, to keep this client-side DB robust to reloads, we'll convert it to a Base64 string if it's small,
    // or just let it be ephemeral if large. Since this is an AI mockup without a backend, base64 is safest.
    
    // Convert to base64 for IDB persistence
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64string = reader.result as string;
      const newItem: MediaItem = {
        id: crypto.randomUUID(),
        type: isVideo ? 'video' : 'photo',
        url: base64string,
        createdAt: Date.now(),
        isFavorite: false,
      };

      try {
        await saveMediaItem(newItem);
        setItems(prev => [newItem, ...prev]);
      } catch (err) {
        console.error("Failed to save to DB (file might be too large)", err);
        // Fallback: still show it in memory this session
        newItem.url = URL.createObjectURL(file);
        setItems(prev => [newItem, ...prev]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleFavorite = async (id: string) => {
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      const updatedItem = { ...items[itemIndex], isFavorite: !items[itemIndex].isFavorite };
      
      try {
        await saveMediaItem(updatedItem);
        setItems(prev => {
          const newItems = [...prev];
          newItems[itemIndex] = updatedItem;
          return newItems;
        });
        
        // Update lightbox item if currently open
        if (selectedItem?.id === id) {
          setSelectedItem(updatedItem);
        }
      } catch (err) {
        console.error("Failed to update favorite status", err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMediaItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden pb-10">
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onSettingsClick={() => setIsSettingsOpen(true)}
        userName={userName}
      />
      
      <main className="flex-1 flex flex-col relative w-full h-full pb-8">
        <Hero />
        {!isLoading && (
          <MediaFeed 
            items={items} 
            activeTab={activeTab} 
            onItemClick={setSelectedItem} 
          />
        )}
      </main>

      <UploadButton onFileSelect={handleFileSelect} />
      <Lightbox 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
      />
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        userName={userName}
        onUpdateName={handleUpdateName}
        onClearAll={handleClearAll}
      />
      
      {/* Bottom Micro-Bar */}
      <footer className="h-10 bg-slate-900/80 px-4 md:px-8 flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest fixed bottom-0 w-full z-20 backdrop-blur-sm border-t border-slate-800">
        <span className="hidden sm:inline">Active Sync: Mobile + Laptop connected</span>
        <span>Pro Version v2.4.0 • Secured Friend-Only Cloud</span>
        <span className="hidden md:inline">7 Active Members Online</span>
      </footer>
    </div>
  );
}
