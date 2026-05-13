"use client";

import { useState, useEffect, useContext, createContext, useCallback } from "react";

interface DarkModeContextType {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | null>(null);

/** Provider del dark mode que comparte estado entre componentes */
export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const getIsDark = () => document.documentElement.classList.contains("dark");
    setIsDark(getIsDark());

    // Escuchar cambios en la clase "dark" del html
    const observer = new MutationObserver(() => {
      setIsDark(getIsDark());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const newDark = prev === true ? false : true;
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", newDark ? "dark" : "light");
      return newDark;
    });
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDark: isDark ?? true, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

/** Hook para usar el dark mode */
export function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}