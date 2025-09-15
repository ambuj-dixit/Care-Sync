import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, toggleTheme } from '@/store/slices/themeSlice';
import { RootState } from '@/store/store';

export const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme && savedTheme !== theme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch, theme]);

  const setThemeMode = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
  };

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  return {
    theme,
    setTheme: setThemeMode,
    toggleTheme: toggleThemeMode,
    isDark: theme === 'dark',
  };
};