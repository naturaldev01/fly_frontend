'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface LocaleContextType {
  locale: string;
  currency: string;
  currencySymbol: string;
  setLocale: (locale: string) => void;
  setCurrency: (currency: string) => void;
  formatPrice: (amount: number, currencyCode?: string) => string;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  tr: {
    // Header
    'flights': 'Uçuşlar',
    'myBookings': 'Rezervasyonlarım',
    'support': 'Destek',
    'signIn': 'Giriş Yap',
    
    // Hero
    'healthTourismPlatform': 'Sağlık Turizmi Uçuş Platformu',
    'yourJourneyTo': 'Sağlık ve Wellness',
    'heroTitle': 'Yolculuğunuz',
    'heroDescription': 'Natural Clinic\'teki medikal randevularınızla entegre uçuş rezervasyonu yapın. Akıllı zamanlama, en iyi fiyatlar, tam huzur.',
    
    // Search Form
    'searchFlights': 'Uçuş Ara',
    'from': 'Nereden',
    'to': 'Nereye',
    'departureDate': 'Gidiş Tarihi',
    'returnDate': 'Dönüş Tarihi',
    'passengers': 'Yolcu',
    'oneWay': 'Tek Yön',
    'roundTrip': 'Gidiş-Dönüş',
    'search': 'Ara',
    'searching': 'Aranıyor...',
    
    // Results
    'flightsFound': 'Uçuş Bulundu',
    'noFlightsFound': 'Uçuş bulunamadı',
    'noFlightsDescription': 'Arama kriterlerinize uygun uçuş bulamadık. Tarihlerinizi veya destinasyonlarınızı değiştirmeyi deneyin.',
    'totalPrice': 'Toplam Fiyat',
    'perPerson': 'kişi başı',
    'select': 'Seç',
    'direct': 'Direkt',
    'stop': 'aktarma',
    'stops': 'aktarma',
    
    // Booking
    'bookingDetails': 'Rezervasyon Detayları',
    'passengerInfo': 'Yolcu Bilgileri',
    'firstName': 'Ad',
    'lastName': 'Soyad',
    'email': 'E-posta',
    'phone': 'Telefon',
    'dateOfBirth': 'Doğum Tarihi',
    'passportNumber': 'Pasaport No',
    'continueToPayment': 'Ödemeye Devam Et',
    'back': 'Geri',
    
    // Features
    'whyBookWithUs': 'Neden Natural Clinic ile Rezervasyon Yapmalısınız?',
    'healthFirstScheduling': 'Sağlık Öncelikli Zamanlama',
    'healthFirstDesc': 'Akıllı sistemimiz klinik randevularınıza göre varış tarihleri önerir.',
    'secureCompliant': 'Güvenli ve Uyumlu',
    'secureDesc': 'GDPR ve KVKK uyumlu. Verileriniz kurumsal güvenlik ile korunur.',
    'easyChanges': 'Kolay Değişiklikler',
    'easyChangesDesc': 'Planlar değişir. Ekibimiz yeniden rezervasyon ve iadelerinizi halleder.',
    
    // CTA
    'readyToStart': 'Sağlık Yolculuğunuza Başlamaya Hazır Mısınız?',
    'contactTeam': 'Medikal seyahat planlarınız için kişiselleştirilmiş yardım alın.',
    'callUs': 'Bizi Arayın',
    'emailUs': 'E-posta Gönderin',
    
    // Footer
    'allRightsReserved': 'Tüm hakları saklıdır.',
    'privacyPolicy': 'Gizlilik Politikası',
    'termsOfService': 'Kullanım Koşulları',
  },
  en: {
    // Header
    'flights': 'Flights',
    'myBookings': 'My Bookings',
    'support': 'Support',
    'signIn': 'Sign In',
    
    // Hero
    'healthTourismPlatform': 'Health Tourism Flight Platform',
    'yourJourneyTo': 'Health & Wellness',
    'heroTitle': 'Your Journey to',
    'heroDescription': 'Book flights seamlessly integrated with your medical appointments at Natural Clinic. Smart scheduling, best prices, complete peace of mind.',
    
    // Search Form
    'searchFlights': 'Search Flights',
    'from': 'From',
    'to': 'To',
    'departureDate': 'Departure Date',
    'returnDate': 'Return Date',
    'passengers': 'Passengers',
    'oneWay': 'One Way',
    'roundTrip': 'Round Trip',
    'search': 'Search',
    'searching': 'Searching...',
    
    // Results
    'flightsFound': 'Flights Found',
    'noFlightsFound': 'No flights found',
    'noFlightsDescription': 'We couldn\'t find any flights for your search criteria. Try adjusting your dates or destinations.',
    'totalPrice': 'Total Price',
    'perPerson': 'per person',
    'select': 'Select',
    'direct': 'Direct',
    'stop': 'stop',
    'stops': 'stops',
    
    // Booking
    'bookingDetails': 'Booking Details',
    'passengerInfo': 'Passenger Information',
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'email': 'Email',
    'phone': 'Phone',
    'dateOfBirth': 'Date of Birth',
    'passportNumber': 'Passport Number',
    'continueToPayment': 'Continue to Payment',
    'back': 'Back',
    
    // Features
    'whyBookWithUs': 'Why Book with Natural Clinic?',
    'healthFirstScheduling': 'Health-First Scheduling',
    'healthFirstDesc': 'Our smart system suggests arrival dates based on your clinic appointments.',
    'secureCompliant': 'Secure & Compliant',
    'secureDesc': 'GDPR and KVKK compliant. Your data is protected with enterprise-grade security.',
    'easyChanges': 'Easy Changes',
    'easyChangesDesc': 'Plans change. Our team handles rebooking and refunds for you.',
    
    // CTA
    'readyToStart': 'Ready to Start Your Health Journey?',
    'contactTeam': 'Contact our team for personalized assistance with your medical travel plans.',
    'callUs': 'Call Us Now',
    'emailUs': 'Email Us',
    
    // Footer
    'allRightsReserved': 'All rights reserved.',
    'privacyPolicy': 'Privacy Policy',
    'termsOfService': 'Terms of Service',
  },
  de: {
    'flights': 'Flüge',
    'myBookings': 'Meine Buchungen',
    'support': 'Support',
    'signIn': 'Anmelden',
    'searchFlights': 'Flüge suchen',
    'from': 'Von',
    'to': 'Nach',
    'search': 'Suchen',
    'select': 'Auswählen',
    'totalPrice': 'Gesamtpreis',
    'perPerson': 'pro Person',
  },
  ar: {
    'flights': 'رحلات',
    'myBookings': 'حجوزاتي',
    'support': 'الدعم',
    'signIn': 'تسجيل الدخول',
    'searchFlights': 'بحث عن رحلات',
    'from': 'من',
    'to': 'إلى',
    'search': 'بحث',
    'select': 'اختر',
    'totalPrice': 'السعر الإجمالي',
    'perPerson': 'للشخص',
  },
  ru: {
    'flights': 'Рейсы',
    'myBookings': 'Мои бронирования',
    'support': 'Поддержка',
    'signIn': 'Войти',
    'searchFlights': 'Поиск рейсов',
    'from': 'Откуда',
    'to': 'Куда',
    'search': 'Искать',
    'select': 'Выбрать',
    'totalPrice': 'Общая цена',
    'perPerson': 'за человека',
  },
};

const currencySymbols: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
  SAR: '﷼',
  RUB: '₽',
};

// Ülke -> Para birimi eşleştirmesi
const countryToCurrency: Record<string, string> = {
  TR: 'TRY',
  US: 'USD',
  GB: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  AE: 'AED',
  SA: 'SAR',
  RU: 'RUB',
};

// Ülke -> Dil eşleştirmesi
const countryToLocale: Record<string, string> = {
  TR: 'tr',
  US: 'en',
  GB: 'en',
  AU: 'en',
  CA: 'en',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  FR: 'en', // Fransızca desteği yoksa İngilizce
  AE: 'ar',
  SA: 'ar',
  RU: 'ru',
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    if (isDetected) return;

    const detectLocaleAndCurrency = async () => {
      try {
        // 1. Önce tarayıcı dilini kontrol et
        const browserLang = navigator.language || (navigator as any).userLanguage;
        const langCode = browserLang?.split('-')[0]?.toLowerCase() || 'en';
        
        // 2. Timezone'dan ülke tahmin et
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let detectedCountry = 'US'; // Default
        
        // Timezone'dan ülke tahmin et
        if (timezone.includes('Istanbul') || timezone.includes('Turkey')) {
          detectedCountry = 'TR';
        } else if (timezone.includes('London')) {
          detectedCountry = 'GB';
        } else if (timezone.includes('Berlin') || timezone.includes('Vienna') || timezone.includes('Zurich')) {
          detectedCountry = 'DE';
        } else if (timezone.includes('Paris')) {
          detectedCountry = 'FR';
        } else if (timezone.includes('Dubai')) {
          detectedCountry = 'AE';
        } else if (timezone.includes('Riyadh')) {
          detectedCountry = 'SA';
        } else if (timezone.includes('Moscow')) {
          detectedCountry = 'RU';
        } else if (timezone.includes('New_York') || timezone.includes('Los_Angeles') || timezone.includes('Chicago')) {
          detectedCountry = 'US';
        }

        // 3. IP tabanlı konum tespiti (opsiyonel - ücretsiz API)
        try {
          const response = await fetch('https://ipapi.co/json/', { 
            signal: AbortSignal.timeout(3000) // 3 saniye timeout
          });
          if (response.ok) {
            const data = await response.json();
            if (data.country_code) {
              detectedCountry = data.country_code;
            }
          }
        } catch {
          // IP API başarısız olursa timezone tabanlı değeri kullan
          console.log('IP detection failed, using timezone-based detection');
        }

        // 4. Dil ve para birimini ayarla
        const detectedLocale = countryToLocale[detectedCountry] || langCode;
        const detectedCurrency = countryToCurrency[detectedCountry] || 'USD';

        // Desteklenen dil kontrolü
        const supportedLocale = translations[detectedLocale] ? detectedLocale : 'en';

        setLocale(supportedLocale);
        setCurrency(detectedCurrency);
        setIsDetected(true);

        // LocalStorage'a kaydet
        localStorage.setItem('preferredLocale', supportedLocale);
        localStorage.setItem('preferredCurrency', detectedCurrency);
        
      } catch (error) {
        console.error('Locale detection error:', error);
        setIsDetected(true);
      }
    };

    // LocalStorage'dan öncelikli tercih al
    const savedLocale = localStorage.getItem('preferredLocale');
    const savedCurrency = localStorage.getItem('preferredCurrency');

    if (savedLocale && savedCurrency) {
      setLocale(savedLocale);
      setCurrency(savedCurrency);
      setIsDetected(true);
    } else {
      detectLocaleAndCurrency();
    }
  }, [isDetected]);

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('preferredLocale', newLocale);
  };

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  const formatPrice = (amount: number, currencyCode?: string): string => {
    const curr = currencyCode || currency;
    const symbol = currencySymbols[curr] || curr;
    
    return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations['en']?.[key] || key;
  };

  const currencySymbol = currencySymbols[currency] || currency;

  return (
    <LocaleContext.Provider
      value={{
        locale,
        currency,
        currencySymbol,
        setLocale: handleSetLocale,
        setCurrency: handleSetCurrency,
        formatPrice,
        t,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

