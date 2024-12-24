export type MenuAction = {
  id: 'task' | 'idea' | 'discord' | 'copy';
  icon: string;
  label: string;
  class?: string;
};

export type MenuPosition = {
  show: boolean;
  x: number;
  y: number;
};