export function exportToJSON(data: any): string {
  return JSON.stringify(data, null, 2);
}

export function downloadJSON(data: any, filename: string = 'export.json'): void {
  const blob = new Blob([exportToJSON(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}