import { PrimateEntry } from '@/types/primate';

export interface ParsedEntry {
  id: string;
  name: string;
  species: string;
  mediaType: string;
  title: string;
  year: number;
  country: string;
  realOrAnimated: string;
  submittedBy?: string;
  imageFile?: File;
  imagePreview?: string;
}

export const parseCSV = (csvText: string): ParsedEntry[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const entries: ParsedEntry[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length < headers.length) continue;

    const entry: ParsedEntry = {
      id: values[0] || '',
      name: values[1] || '',
      species: values[2] || '',
      mediaType: values[3]?.toLowerCase().replace(/\s+/g, '-') || '',
      title: values[4] || '',
      year: parseInt(values[5]) || new Date().getFullYear(),
      country: values[6] || '',
      realOrAnimated: values[7]?.toLowerCase().includes('physical') ? 'physical' : 
                      values[7]?.toLowerCase().includes('cgi') || values[7]?.toLowerCase().includes('digital') ? 'cgi' : 'animated',
      submittedBy: values[8] || '',
    };

    entries.push(entry);
  }

  return entries;
};
