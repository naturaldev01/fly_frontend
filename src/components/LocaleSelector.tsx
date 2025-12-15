'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const currencies = [
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
];

export default function LocaleSelector() {
  const { locale, currency, setLocale, setCurrency } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'currency'>('language');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(l => l.code === locale) || languages[1];
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[1];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-50 hover:bg-brand-100 transition-colors text-brand-700"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage.flag} {currentCurrency.symbol}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-brand-100 overflow-hidden z-50">
          {/* Tabs */}
          <div className="flex border-b border-brand-100">
            <button
              onClick={() => setActiveTab('language')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'language'
                  ? 'text-brand-600 bg-brand-50 border-b-2 border-brand-500'
                  : 'text-brand-400 hover:text-brand-600'
              }`}
            >
              {locale === 'tr' ? 'Dil' : 'Language'}
            </button>
            <button
              onClick={() => setActiveTab('currency')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'currency'
                  ? 'text-brand-600 bg-brand-50 border-b-2 border-brand-500'
                  : 'text-brand-400 hover:text-brand-600'
              }`}
            >
              {locale === 'tr' ? 'Para Birimi' : 'Currency'}
            </button>
          </div>

          {/* Content */}
          <div className="max-h-64 overflow-y-auto">
            {activeTab === 'language' && (
              <div className="p-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      locale === lang.code
                        ? 'bg-brand-50 text-brand-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </span>
                    {locale === lang.code && (
                      <Check className="w-4 h-4 text-brand-500" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'currency' && (
              <div className="p-2">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      currency === curr.code
                        ? 'bg-brand-50 text-brand-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg font-mono">{curr.symbol}</span>
                      <span className="text-sm">
                        <span className="font-medium">{curr.code}</span>
                        <span className="text-gray-500 ml-1 text-xs">- {curr.name}</span>
                      </span>
                    </span>
                    {currency === curr.code && (
                      <Check className="w-4 h-4 text-brand-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

