import type { ComponentType, CSSProperties } from 'react';

export interface CircularGalleryItem {
  image: string;
  text?: string;
  alt?: string;
  description?: string;
}

export interface CircularGalleryApi {
  open: (index: number) => void;
  focus: (index: number) => void;
  close: () => void;
}

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  itemSize?: number;
  itemAspect?: number;
  gap?: number;
  wave?: number;
  fadeEdges?: number;
  shadow?: number;
  grayscale?: boolean;
  showTitles?: boolean;
  snap?: boolean;
  autoScroll?: number;
  openOnClick?: boolean;
  intro?: boolean;
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
  onActiveChange?: (index: number) => void;
  apiRef?: { current: CircularGalleryApi | null };
  dpr?: number;
  className?: string;
  style?: CSSProperties;
}

declare const CircularGallery: ComponentType<CircularGalleryProps>;

export default CircularGallery;
