import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Context yaratish
export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  // 2. Lang o'zgarganda localStorage'ni ham yangilash
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext)
