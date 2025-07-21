// src/hooks/useTranslation.js
import { useState } from 'react';
import translations from '../components/translations';

const useTranslation = (defaultLocale = 'br') => {
  const [locale, setLocale] = useState(defaultLocale);
  const [isPopped, setIsPopped] = useState(false);

  const toggleLocale = () => {
    const newLocale = locale === 'us' ? 'br' : 'us';
    setLocale(newLocale);
    setIsPopped(true);
    setTimeout(() => setIsPopped(false), 200);
  };

  const getLocaleFormat = () => {
    return locale === 'br' ? 'pt-BR' : 'en';
  };

  const t = translations[locale];

  return {
    locale,
    toggleLocale,
    isPopped,
    getLocaleFormat,
    t,
  };
};

export default useTranslation;
