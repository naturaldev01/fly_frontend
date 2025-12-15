'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Plane, 
  ArrowLeft, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { useLocale } from '@/context/LocaleContext';

interface PassengerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
}

// Loading component
function BookingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin mx-auto" />
        <p className="mt-4 text-brand-600">Loading booking...</p>
      </div>
    </div>
  );
}

// Main booking content component
function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formatPrice, t, locale } = useLocale();
  
  const [flight, setFlight] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [passengers, setPassengers] = useState<PassengerForm[]>([{
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    passportNumber: '',
    nationality: '',
  }]);

  useEffect(() => {
    // URL'den flight data'yı al
    const flightData = searchParams.get('flight');
    if (flightData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(flightData));
        setFlight(parsed);
      } catch (e) {
        console.error('Failed to parse flight data:', e);
        setError('Invalid flight data');
      }
    } else {
      setError('No flight selected');
    }
  }, [searchParams]);

  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'HH:mm');
    } catch {
      return '--:--';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd MMM yyyy');
    } catch {
      return '';
    }
  };

  const parseDuration = (duration: string) => {
    const match = duration?.match(/PT(\d+)H(\d+)?M?/);
    if (match) {
      const hours = match[1];
      const minutes = match[2] || '0';
      return `${hours}h ${minutes}m`;
    }
    return duration || '--';
  };

  const getAirlineName = (code: string) => {
    const airlines: Record<string, string> = {
      TK: 'Turkish Airlines',
      PC: 'Pegasus',
      EK: 'Emirates',
      QR: 'Qatar Airways',
      BA: 'British Airways',
      LH: 'Lufthansa',
      AF: 'Air France',
    };
    return airlines[code] || code;
  };

  const handlePassengerChange = (index: number, field: keyof PassengerForm, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const validatePassengers = () => {
    for (const p of passengers) {
      if (!p.firstName || !p.lastName || !p.email || !p.phone || !p.dateOfBirth) {
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (step === 1 && validatePassengers()) {
      setStep(2);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    // Simüle edilmiş ödeme işlemi
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep(3);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-brand-800 mb-2">
            {locale === 'tr' ? 'Bir hata oluştu' : 'An error occurred'}
          </h2>
          <p className="text-brand-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            {locale === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin" />
      </div>
    );
  }

  const outbound = flight.itineraries?.[0];
  const returnFlight = flight.itineraries?.[1];
  const outboundSegment = outbound?.segments?.[0];
  const outboundLastSegment = outbound?.segments?.[outbound?.segments.length - 1];
  const returnSegment = returnFlight?.segments?.[0];
  const returnLastSegment = returnFlight?.segments?.[returnFlight?.segments.length - 1];

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50/50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-brand-100/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-brand-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-brand-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center p-1">
                  <Image 
                    src="/logo.png" 
                    alt="Natural Clinic" 
                    width={24} 
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="font-display text-lg font-bold text-brand-500">
                  Natural Clinic
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="hidden md:flex items-center gap-4">
              <StepIndicator number={1} label={locale === 'tr' ? 'Yolcu Bilgileri' : 'Passenger Info'} active={step === 1} completed={step > 1} />
              <div className="w-8 h-px bg-brand-200" />
              <StepIndicator number={2} label={locale === 'tr' ? 'Ödeme' : 'Payment'} active={step === 2} completed={step > 2} />
              <div className="w-8 h-px bg-brand-200" />
              <StepIndicator number={3} label={locale === 'tr' ? 'Onay' : 'Confirmation'} active={step === 3} completed={false} />
            </div>

            <div className="flex items-center gap-2 text-sm text-brand-600">
              <Shield className="w-4 h-4" />
              <span>{locale === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h1 className="text-2xl font-display font-bold text-brand-800">
                  {locale === 'tr' ? 'Yolcu Bilgileri' : 'Passenger Information'}
                </h1>

                {passengers.map((passenger, index) => (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-brand-600" />
                      </div>
                      <h3 className="font-semibold text-brand-800">
                        {locale === 'tr' ? `Yolcu ${index + 1}` : `Passenger ${index + 1}`}
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          {locale === 'tr' ? 'Ad' : 'First Name'} *
                        </label>
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                          className="input-field"
                          placeholder={locale === 'tr' ? 'Adınız' : 'Enter first name'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          {locale === 'tr' ? 'Soyad' : 'Last Name'} *
                        </label>
                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                          className="input-field"
                          placeholder={locale === 'tr' ? 'Soyadınız' : 'Enter last name'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          {locale === 'tr' ? 'E-posta' : 'Email'} *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                          <input
                            type="email"
                            value={passenger.email}
                            onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                            className="input-field pl-10"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          {locale === 'tr' ? 'Telefon' : 'Phone'} *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                          <input
                            type="tel"
                            value={passenger.phone}
                            onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                            className="input-field pl-10"
                            placeholder="+90 555 123 4567"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          {locale === 'tr' ? 'Doğum Tarihi' : 'Date of Birth'} *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                          <input
                            type="date"
                            value={passenger.dateOfBirth}
                            onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          {locale === 'tr' ? 'Pasaport No' : 'Passport Number'}
                        </label>
                        <input
                          type="text"
                          value={passenger.passportNumber}
                          onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                          className="input-field"
                          placeholder="AB1234567"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleContinue}
                  disabled={!validatePassengers()}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {locale === 'tr' ? 'Ödemeye Devam Et' : 'Continue to Payment'}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-500 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {locale === 'tr' ? 'Yolcu Bilgilerine Dön' : 'Back to Passenger Info'}
                </button>

                <h1 className="text-2xl font-display font-bold text-brand-800">
                  {locale === 'tr' ? 'Ödeme Bilgileri' : 'Payment Information'}
                </h1>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-brand-600" />
                    </div>
                    <h3 className="font-semibold text-brand-800">
                      {locale === 'tr' ? 'Kart Bilgileri' : 'Card Details'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">
                        {locale === 'tr' ? 'Kart Üzerindeki İsim' : 'Name on Card'}
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="JOHN DOE"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">
                        {locale === 'tr' ? 'Kart Numarası' : 'Card Number'}
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          {locale === 'tr' ? 'Son Kullanma' : 'Expiry'}
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-brand-50 rounded-lg flex items-center gap-3">
                    <Shield className="w-5 h-5 text-brand-600" />
                    <p className="text-sm text-brand-700">
                      {locale === 'tr' 
                        ? 'Ödeme bilgileriniz 256-bit SSL ile şifrelenmektedir.' 
                        : 'Your payment information is encrypted with 256-bit SSL.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {locale === 'tr' ? 'İşleniyor...' : 'Processing...'}
                    </span>
                  ) : (
                    `${locale === 'tr' ? 'Öde' : 'Pay'} ${formatPrice(parseFloat(flight.price?.total || 0), flight.price?.currency)}`
                  )}
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-2xl font-display font-bold text-brand-800 mb-2">
                  {locale === 'tr' ? 'Rezervasyonunuz Onaylandı!' : 'Booking Confirmed!'}
                </h1>
                <p className="text-brand-600 mb-6">
                  {locale === 'tr' 
                    ? 'E-biletiniz e-posta adresinize gönderildi.' 
                    : 'Your e-ticket has been sent to your email.'}
                </p>

                <div className="bg-brand-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-brand-600 mb-1">
                    {locale === 'tr' ? 'Rezervasyon Referansı' : 'Booking Reference'}
                  </p>
                  <p className="text-2xl font-bold text-brand-800 font-mono">
                    NC{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </p>
                </div>

                <button
                  onClick={() => router.push('/')}
                  className="btn-primary"
                >
                  {locale === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Flight Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h3 className="font-semibold text-brand-800 mb-4">
                {locale === 'tr' ? 'Uçuş Özeti' : 'Flight Summary'}
              </h3>

              {/* Outbound */}
              <div className="border-b border-brand-100 pb-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Plane className="w-4 h-4 text-brand-500" />
                  <span className="text-sm font-medium text-brand-700">
                    {locale === 'tr' ? 'Gidiş' : 'Outbound'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-brand-800">{formatTime(outboundSegment?.departure?.at)}</p>
                    <p className="text-sm text-brand-600">{outboundSegment?.departure?.iataCode}</p>
                  </div>
                  <div className="flex-1 px-4 text-center">
                    <div className="w-full h-px bg-brand-200 relative">
                      <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-brand-400 rotate-90" />
                    </div>
                    <p className="text-xs text-brand-500 mt-1">{parseDuration(outbound?.duration)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-800">{formatTime(outboundLastSegment?.arrival?.at)}</p>
                    <p className="text-sm text-brand-600">{outboundLastSegment?.arrival?.iataCode}</p>
                  </div>
                </div>
                <p className="text-xs text-brand-500 mt-2">
                  {formatDate(outboundSegment?.departure?.at)} • {getAirlineName(outboundSegment?.carrierCode)}
                </p>
              </div>

              {/* Return */}
              {returnFlight && (
                <div className="border-b border-brand-100 pb-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Plane className="w-4 h-4 text-brand-500 rotate-180" />
                    <span className="text-sm font-medium text-brand-700">
                      {locale === 'tr' ? 'Dönüş' : 'Return'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-brand-800">{formatTime(returnSegment?.departure?.at)}</p>
                      <p className="text-sm text-brand-600">{returnSegment?.departure?.iataCode}</p>
                    </div>
                    <div className="flex-1 px-4 text-center">
                      <div className="w-full h-px bg-brand-200 relative">
                        <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-brand-400 rotate-90" />
                      </div>
                      <p className="text-xs text-brand-500 mt-1">{parseDuration(returnFlight?.duration)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-800">{formatTime(returnLastSegment?.arrival?.at)}</p>
                      <p className="text-sm text-brand-600">{returnLastSegment?.arrival?.iataCode}</p>
                    </div>
                  </div>
                  <p className="text-xs text-brand-500 mt-2">
                    {formatDate(returnSegment?.departure?.at)} • {getAirlineName(returnSegment?.carrierCode)}
                  </p>
                </div>
              )}

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-600">{locale === 'tr' ? 'Yolcu' : 'Passenger'} x {passengers.length}</span>
                  <span className="text-brand-700">{formatPrice(parseFloat(flight.price?.base || 0), flight.price?.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-600">{locale === 'tr' ? 'Vergiler ve Ücretler' : 'Taxes & Fees'}</span>
                  <span className="text-brand-700">
                    {formatPrice(parseFloat(flight.price?.total || 0) - parseFloat(flight.price?.base || 0), flight.price?.currency)}
                  </span>
                </div>
                <div className="pt-3 border-t border-brand-100 flex justify-between font-bold">
                  <span className="text-brand-800">{locale === 'tr' ? 'Toplam' : 'Total'}</span>
                  <span className="text-xl text-brand-500">
                    {formatPrice(parseFloat(flight.price?.total || 0), flight.price?.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StepIndicator({ 
  number, 
  label, 
  active, 
  completed 
}: { 
  number: number; 
  label: string; 
  active: boolean; 
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
        ${completed ? 'bg-green-500 text-white' : active ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-400'}
      `}>
        {completed ? <CheckCircle className="w-4 h-4" /> : number}
      </div>
      <span className={`text-sm ${active ? 'text-brand-700 font-medium' : 'text-brand-400'}`}>
        {label}
      </span>
    </div>
  );
}

// Main export with Suspense boundary
export default function BookingPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingContent />
    </Suspense>
  );
}
