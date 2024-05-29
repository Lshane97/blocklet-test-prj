'use-client';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../components/context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Theme: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const isDark = localStorage.getItem('theme-mode') === 'dark';
    if (isDark) {
      setMode('dark');
    }
  }, []);

  const themeContext = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prev) => {
          const next = prev === 'dark' ? 'light' : 'dark';
          localStorage.setItem('theme-mode', next);
          return next;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Theme;
