import { get } from 'svelte/store';
import { isDragging, windowPosition, bounds } from '../stores/window';
import type { Position, DragState } from '../types/window';

let dragState: DragState | null = null;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function handleDragStart(event: MouseEvent) {
  const currentPosition = get(windowPosition);
  
  dragState = {
    startX: event.clientX,
    startY: event.clientY,
    initialX: currentPosition.x,
    initialY: currentPosition.y
  };
  
  isDragging.set(true);
  
  // Add global event listeners
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleDragEnd);
}

function handleDragMove(event: MouseEvent) {
  if (!dragState) return;
  
  const currentBounds = get(bounds);
  
  // Calculate new position with smooth movement
  const deltaX = event.clientX - dragState.startX;
  const deltaY = event.clientY - dragState.startY;
  
  const newX = clamp(
    dragState.initialX + deltaX,
    currentBounds.minX,
    currentBounds.maxX
  );
  
  const newY = clamp(
    dragState.initialY + deltaY,
    currentBounds.minY,
    currentBounds.maxY
  );
  
  windowPosition.set({ x: newX, y: newY });
}

export function handleDragEnd() {
  isDragging.set(false);
  dragState = null;
  
  // Remove global event listeners
  window.removeEventListener('mousemove', handleDragMove);
  window.removeEventListener('mouseup', handleDragEnd);
}

// No need for handleDrag anymore as it's handled by global mousemove