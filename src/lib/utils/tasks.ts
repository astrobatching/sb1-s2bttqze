interface Task {
  title: string;
  description: string;
}

export async function generateTasks(content?: string): Promise<Task[]> {
  const text = content || window.getSelection()?.toString() || '';
  
  if (!text) {
    return [];
  }

  // Simple task generation logic - split by newlines and create tasks
  return text.split('\n')
    .filter(line => line.trim())
    .map(line => ({
      title: line.trim(),
      description: '',
    }));
}