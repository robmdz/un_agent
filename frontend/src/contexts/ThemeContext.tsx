import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

/**
 * Definición del tipo para el contexto del tema.
 */
interface ThemeContextType {
  theme: 'dark' | 'light'; // Tema actual
  toggleTheme: () => void; // Función para alternar el tema
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook personalizado para usar el contexto del tema.
 * @returns {ThemeContextType} El contexto del tema.
 * @throws {Error} Si se usa fuera de un ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto del tema.
 * Maneja el estado del tema y lo persiste en localStorage.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

