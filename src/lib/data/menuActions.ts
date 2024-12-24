import type { MenuAction } from '../types/menu';

export const contextMenuActions: MenuAction[] = [
  { 
    id: 'task', 
    icon: 'task_alt', 
    label: 'Convert to Task', 
    class: 'bg-blue-50 hover:bg-blue-100 text-blue-600' 
  },
  { 
    id: 'idea', 
    icon: 'lightbulb', 
    label: 'Save as Idea', 
    class: 'bg-pink-50 hover:bg-pink-100 text-pink-600' 
  },
  { 
    id: 'discord', 
    icon: 'share', 
    label: 'Send to Discord', 
    class: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600' 
  },
  { 
    id: 'copy', 
    icon: 'content_copy', 
    label: 'Copy', 
    class: 'bg-gray-50 hover:bg-gray-100 text-gray-600' 
  }
];