'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Clock, ArrowRight, Luggage, Wifi, Coffee } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';

interface FlightResultsProps {
  results: any[];
  isLoading: boolean;
}

export default function FlightResults({ results, isLoading }: FlightResultsProps) {
  const { t, formatPrice } = useLocale();
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin" />
          <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand-500" />
        </div>
        <p className="mt-6 text-lg text-brand-700 font-medium">{t('searching')}</p>
        <p className="text-sm text-brand-400 mt-2">{t('searchingDesc') || 'This may take a few seconds'}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-brand-50 flex items-center justify-center mb-6">
          <Plane className="w-10 h-10 text-brand-300" />
        </div>
        <h3 className="text-xl font-semibold text-brand-800 mb-2">{t('noFlightsFound')}</h3>
        <p className="text-brand-500 max-w-md mx-auto">
          {t('noFlightsDescription')}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-brand-800">
          {results.length} {t('flightsFound')}
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white text-brand-600 text-sm font-medium hover:bg-brand-50 transition-colors border border-brand-100">
            Price
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-brand-600 text-sm font-medium hover:bg-brand-50 transition-colors border border-brand-100">
            Duration
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-brand-600 text-sm font-medium hover:bg-brand-50 transition-colors border border-brand-100">
            Departure
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {results.map((flight, index) => (
            <FlightCard key={flight.id || index} flight={flight} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FlightCard({ flight, index }: { flight: any; index: number }) {
  const router = useRouter();
  const { t, formatPrice } = useLocale();
  const outbound = flight.itineraries?.[0];
  const returnFlight = flight.itineraries?.[1];
  const price = flight.price;

  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'HH:mm');
    } catch {
      return '--:--';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d');
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

  const outboundSegment = outbound?.segments?.[0];
  const outboundLastSegment = outbound?.segments?.[outbound.segments.length - 1];
  const returnSegment = returnFlight?.segments?.[0];
  const returnLastSegment = returnFlight?.segments?.[returnFlight?.segments.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flight-card group"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Outbound Flight */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center">
              <span className="text-xs font-bold text-brand-600">
                {outboundSegment?.carrierCode}
              </span>
            </div>
            <div>
              <p className="font-medium text-brand-800">
                {getAirlineName(outboundSegment?.carrierCode)}
              </p>
              <p className="text-xs text-brand-500">
                {outboundSegment?.carrierCode}{outboundSegment?.number}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Departure */}
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-800">
                {formatTime(outboundSegment?.departure?.at)}
              </p>
              <p className="text-sm font-medium text-brand-600">
                {outboundSegment?.departure?.iataCode}
              </p>
              <p className="text-xs text-brand-400">
                {formatDate(outboundSegment?.departure?.at)}
              </p>
            </div>

            {/* Flight Path */}
            <div className="flex-1 px-4">
              <div className="relative flex items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300" />
                <div className="absolute bg-white px-2">
                  <div className="flex items-center gap-1 text-xs text-brand-500">
                    <Clock className="w-3 h-3" />
                    {parseDuration(outbound?.duration)}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-1">
                <span className="text-xs text-brand-400">
                  {outbound?.segments?.length > 1 
                    ? `${outbound.segments.length - 1} stop${outbound.segments.length > 2 ? 's' : ''}`
                    : 'Direct'}
                </span>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-800">
                {formatTime(outboundLastSegment?.arrival?.at)}
              </p>
              <p className="text-sm font-medium text-brand-600">
                {outboundLastSegment?.arrival?.iataCode}
              </p>
              <p className="text-xs text-brand-400">
                {formatDate(outboundLastSegment?.arrival?.at)}
              </p>
            </div>
          </div>
        </div>

        {/* Return Flight */}
        {returnFlight && (
          <>
            <div className="hidden lg:block w-px bg-brand-100" />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-600">
                    {returnSegment?.carrierCode}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-brand-800">
                    {getAirlineName(returnSegment?.carrierCode)}
                  </p>
                  <p className="text-xs text-brand-500">
                    {returnSegment?.carrierCode}{returnSegment?.number}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/* Departure */}
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-800">
                    {formatTime(returnSegment?.departure?.at)}
                  </p>
                  <p className="text-sm font-medium text-brand-600">
                    {returnSegment?.departure?.iataCode}
                  </p>
                  <p className="text-xs text-brand-400">
                    {formatDate(returnSegment?.departure?.at)}
                  </p>
                </div>

                {/* Flight Path */}
                <div className="flex-1 px-4">
                  <div className="relative flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300" />
                    <div className="absolute bg-white px-2">
                      <div className="flex items-center gap-1 text-xs text-brand-500">
                        <Clock className="w-3 h-3" />
                        {parseDuration(returnFlight?.duration)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-1">
                    <span className="text-xs text-brand-400">
                      {returnFlight?.segments?.length > 1 
                        ? `${returnFlight.segments.length - 1} stop${returnFlight.segments.length > 2 ? 's' : ''}`
                        : 'Direct'}
                    </span>
                  </div>
                </div>

                {/* Arrival */}
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-800">
                    {formatTime(returnLastSegment?.arrival?.at)}
                  </p>
                  <p className="text-sm font-medium text-brand-600">
                    {returnLastSegment?.arrival?.iataCode}
                  </p>
                  <p className="text-xs text-brand-400">
                    {formatDate(returnLastSegment?.arrival?.at)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Price & Book */}
        <div className="lg:w-48 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-brand-100 lg:pl-6">
          <div className="text-right">
            <p className="text-sm text-brand-500">{t('totalPrice')}</p>
            <p className="text-3xl font-bold text-brand-500">
              {formatPrice(parseFloat(price?.total || 0), price?.currency)}
            </p>
            <p className="text-xs text-brand-400">{t('perPerson')}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const flightData = encodeURIComponent(JSON.stringify(flight));
              router.push(`/booking?flight=${flightData}`);
            }}
            className="btn-primary flex items-center gap-2"
          >
            {t('select')}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-brand-100">
        <div className="flex items-center gap-1 text-xs text-brand-500">
          <Luggage className="w-4 h-4" />
          <span>23kg</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-brand-500">
          <Wifi className="w-4 h-4" />
          <span>WiFi</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-brand-500">
          <Coffee className="w-4 h-4" />
          <span>Meals</span>
        </div>
      </div>
    </motion.div>
  );
}
