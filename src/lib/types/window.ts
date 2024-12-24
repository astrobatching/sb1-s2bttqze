export interface Position {
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface DragState {
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}