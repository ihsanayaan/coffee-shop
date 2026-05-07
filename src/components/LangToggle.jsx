import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function LangToggle() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    const newLang = lang === 'en'? 'ar' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar'? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-orange-500 text-white px-4 py-2 rounded shadow-lg"
    >
      {lang === 'en'? 'العربية' : 'English'}
    </button>
  );
}