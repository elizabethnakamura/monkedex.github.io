import { PrimateEntry } from '@/types/primate';
import { sampleEntries } from '@/data/sampleEntries';

const STORAGE_KEY = 'monkedex_user_entries';

export const getUserEntries = (): PrimateEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error loading user entries:', e);
    return [];
  }
};

export const getAllEntries = (): PrimateEntry[] => {
  return [...sampleEntries, ...getUserEntries()];
};

export const addUserEntry = (entry: PrimateEntry): void => {
  const current = getUserEntries();
  const updated = [...current, entry];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const addMultipleUserEntries = (entries: PrimateEntry[]): void => {
  const current = getUserEntries();
  const updated = [...current, ...entries];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const generateEntryId = (name: string, title: string, year: number): string => {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return `${cleanName}_${cleanTitle}_${year}`;
};
