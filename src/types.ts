export type MediaType = 'photo' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  createdAt: number;
  isFavorite: boolean;
}

export type TabType = 'photos' | 'videos' | 'favorites';
