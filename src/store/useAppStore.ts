import { create } from 'zustand';

type Locale = 'id' | 'en' | 'zh';

interface AppState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'id',
  setLocale: (locale) => set({ locale }),
}));
