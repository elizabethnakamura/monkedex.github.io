import { useState, useEffect } from 'react';
import { UserEntryData } from '@/types/primate';

const STORAGE_KEY = 'monkedex_user_data';

export const useUserEntryData = (entryId: string) => {
  const [data, setData] = useState<UserEntryData>({
    hasSeen: false,
    notes: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allData = JSON.parse(stored);
        if (allData[entryId]) {
          setData(allData[entryId]);
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, [entryId]);

  const updateData = (updates: Partial<UserEntryData>) => {
    const newData = { ...data, ...updates };
    setData(newData);

    const stored = localStorage.getItem(STORAGE_KEY);
    const allData = stored ? JSON.parse(stored) : {};
    allData[entryId] = newData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  };

  return { data, updateData };
};
