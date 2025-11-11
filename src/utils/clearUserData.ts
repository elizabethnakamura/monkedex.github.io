const STORAGE_KEY = 'monkedex_user_data';

export const clearAllHasSeenData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  console.log('All hasSeen data has been cleared');
};
