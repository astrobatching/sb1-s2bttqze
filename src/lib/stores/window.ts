import { writable } from 'svelte/store';
import type { Position, Bounds } from '../types/window';

const defaultPosition: Position = { x: 20, y: 20 };

export const windowPosition = writable<Position>(defaultPosition);
export const isDragging = writable<boolean>(false);
export const bounds = writable<Bounds>({
  minX: 0,
  maxX: typeof window !== 'undefined' ? window.innerWidth - 500 : 1000,
  minY: 0,
  maxY: typeof window !== 'undefined' ? window.innerHeight - 600 : 1000
});

// Update bounds when window resizes
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    bounds.set({
      minX: 0,
      maxX: window.innerWidth - 500,
      minY: 0,
      maxY: window.innerHeight - 600
    });
  });
}