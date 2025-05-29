// // src/context/LanguageContext.jsx
// import React, { createContext, useEffect, useState } from 'react';

// export const LanguageContext = createContext();

// const LANGUAGE_KEY = 'lan';

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('uz'); // default 'uz'

//   useEffect(() => {
//     const savedLang = localStorage.getItem(LANGUAGE_KEY);
//     if (savedLang) {
//       setLanguage(savedLang);
//     } else {
//       localStorage.setItem(LANGUAGE_KEY, 'uz');
//     }
//   }, []);

//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//     localStorage.setItem(LANGUAGE_KEY, lang);
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };
