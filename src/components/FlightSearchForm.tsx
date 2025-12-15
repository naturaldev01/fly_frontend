'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Calendar, Users, Search, ArrowLeftRight, ChevronDown } from 'lucide-react';
import { flightApi, airportApi } from '@/lib/api';
import { useLocale } from '@/context/LocaleContext';

// Fallback airports data (used when API is unavailable)
const FALLBACK_AIRPORTS = [
  { id: '1', iata_code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  { id: '2', iata_code: 'SAW', name: 'Sabiha Gokcen International Airport', city: 'Istanbul', country: 'Turkey' },
  { id: '3', iata_code: 'ESB', name: 'Esenboga International Airport', city: 'Ankara', country: 'Turkey' },
  { id: '4', iata_code: 'AYT', name: 'Antalya Airport', city: 'Antalya', country: 'Turkey' },
  { id: '5', iata_code: 'ADB', name: 'Adnan Menderes Airport', city: 'Izmir', country: 'Turkey' },
  { id: '6', iata_code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
  { id: '7', iata_code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { id: '8', iata_code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { id: '9', iata_code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  { id: '10', iata_code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
  { id: '11', iata_code: 'SVO', name: 'Sheremetyevo International Airport', city: 'Moscow', country: 'Russia' },
  { id: '12', iata_code: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt' },
  { id: '13', iata_code: 'RUH', name: 'King Khalid International Airport', city: 'Riyadh', country: 'Saudi Arabia' },
  { id: '14', iata_code: 'KWI', name: 'Kuwait International Airport', city: 'Kuwait City', country: 'Kuwait' },
  { id: '15', iata_code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
];

interface Airport {
  id: string;
  iata_code: string;
  name: string;
  city: string;
  country: string;
}

interface FlightSearchFormProps {
  onSearch: (results: any[]) => void;
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
}

export default function FlightSearchForm({ onSearch, isSearching, setIsSearching }: FlightSearchFormProps) {
  const { currency, t } = useLocale();
  const [tripType, setTripType] = useState<'round_trip' | 'one_way'>('round_trip');
  const [origin, setOrigin] = useState('');
  const [originCode, setOriginCode] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<Airport[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginSuggestions(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestSuggestions(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAirports = async (query: string): Promise<Airport[]> => {
    if (query.length < 1) return [];
    
    try {
      // Try API first
      const response = await airportApi.search(query);
      if (response && response.length > 0) {
        return response.slice(0, 6);
      }
    } catch (error) {
      console.log('Airport API unavailable, using fallback data');
    }
    
    // Fallback to local data
    const searchTerm = query.toLowerCase();
    return FALLBACK_AIRPORTS.filter(airport => 
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.iata_code.toLowerCase().includes(searchTerm) ||
      airport.name.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    ).slice(0, 6);
  };

  const handleOriginChange = async (value: string) => {
    setOrigin(value);
    setOriginCode('');
    const results = await searchAirports(value);
    setOriginSuggestions(results);
    setShowOriginSuggestions(results.length > 0);
  };

  const handleDestinationChange = async (value: string) => {
    setDestination(value);
    setDestinationCode('');
    const results = await searchAirports(value);
    setDestSuggestions(results);
    setShowDestSuggestions(results.length > 0);
  };

  const selectAirport = (airport: Airport, type: 'origin' | 'destination') => {
    if (type === 'origin') {
      setOrigin(`${airport.city} (${airport.iata_code})`);
      setOriginCode(airport.iata_code);
      setShowOriginSuggestions(false);
    } else {
      setDestination(`${airport.city} (${airport.iata_code})`);
      setDestinationCode(airport.iata_code);
      setShowDestSuggestions(false);
    }
  };

  const swapLocations = () => {
    const tempOrigin = origin;
    const tempOriginCode = originCode;
    setOrigin(destination);
    setOriginCode(destinationCode);
    setDestination(tempOrigin);
    setDestinationCode(tempOriginCode);
  };

  const handleSearch = async () => {
    if (!originCode || !destinationCode || !departureDate) {
      setSearchError(t('fillRequiredFields') || 'Please fill in all required fields');
      return;
    }

    if (tripType === 'round_trip' && !returnDate) {
      setSearchError(t('selectReturnDate') || 'Please select a return date for round trip');
      return;
    }

    setSearchError(null);
    setIsSearching(true);

    try {
      // Call real Amadeus API through backend
      const response = await flightApi.search({
        originCode: originCode,
        destinationCode: destinationCode,
        departureDate: departureDate,
        returnDate: tripType === 'round_trip' ? returnDate : undefined,
        tripType: tripType,
        adults: passengers.adults,
        children: passengers.children || undefined,
        infants: passengers.infants || undefined,
      });

      // Amadeus returns data in response.data format
      const flights = response?.data || response || [];
      onSearch(flights);
    } catch (error: any) {
      console.error('Flight search error:', error);
      
      // If API fails, show error but also provide mock data for demo
      const errorMessage = error?.response?.data?.message || error?.message || 'Search failed';
      console.log('API Error:', errorMessage);
      
      // Use mock data as fallback for demo purposes
      const mockResults = [
        {
          id: '1',
          itineraries: [
            {
              duration: 'PT3H30M',
              segments: [{
                carrierCode: 'TK',
                number: '1234',
                departure: { iataCode: originCode, at: `${departureDate}T08:00:00` },
                arrival: { iataCode: destinationCode, at: `${departureDate}T11:30:00` }
              }]
            },
            tripType === 'round_trip' ? {
              duration: 'PT3H45M',
              segments: [{
                carrierCode: 'TK',
                number: '1235',
                departure: { iataCode: destinationCode, at: `${returnDate}T14:00:00` },
                arrival: { iataCode: originCode, at: `${returnDate}T17:45:00` }
              }]
            } : null
          ].filter(Boolean),
          price: { currency: currency, total: '285.00', base: '250.00' }
        },
        {
          id: '2',
          itineraries: [
            {
              duration: 'PT4H15M',
              segments: [{
                carrierCode: 'PC',
                number: '567',
                departure: { iataCode: originCode, at: `${departureDate}T12:30:00` },
                arrival: { iataCode: destinationCode, at: `${departureDate}T16:45:00` }
              }]
            },
            tripType === 'round_trip' ? {
              duration: 'PT4H00M',
              segments: [{
                carrierCode: 'PC',
                number: '568',
                departure: { iataCode: destinationCode, at: `${returnDate}T18:00:00` },
                arrival: { iataCode: originCode, at: `${returnDate}T22:00:00` }
              }]
            } : null
          ].filter(Boolean),
          price: { currency: currency, total: '195.00', base: '170.00' }
        },
        {
          id: '3',
          itineraries: [
            {
              duration: 'PT3H20M',
              segments: [{
                carrierCode: 'TK',
                number: '890',
                departure: { iataCode: originCode, at: `${departureDate}T19:00:00` },
                arrival: { iataCode: destinationCode, at: `${departureDate}T22:20:00` }
              }]
            },
            tripType === 'round_trip' ? {
              duration: 'PT3H35M',
              segments: [{
                carrierCode: 'TK',
                number: '891',
                departure: { iataCode: destinationCode, at: `${returnDate}T07:00:00` },
                arrival: { iataCode: originCode, at: `${returnDate}T10:35:00` }
              }]
            } : null
          ].filter(Boolean),
          price: { currency: currency, total: '320.00', base: '280.00' }
        }
      ];

      // Show mock data with a note that it's demo data
      setSearchError('Demo mode: Showing sample flights (API unavailable)');
      onSearch(mockResults);
    } finally {
      setIsSearching(false);
    }
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="glass-card p-6 md:p-8">
      {/* Trip Type Toggle */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTripType('round_trip')}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            tripType === 'round_trip'
              ? 'bg-brand-500 text-white shadow-brand'
              : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
          }`}
        >
          Round Trip
        </button>
        <button
          onClick={() => setTripType('one_way')}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            tripType === 'one_way'
              ? 'bg-brand-500 text-white shadow-brand'
              : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
          }`}
        >
          One Way
        </button>
      </div>

      {/* Search Fields */}
      <div className="grid md:grid-cols-12 gap-4">
        {/* Origin */}
        <div className="md:col-span-3 relative" ref={originRef}>
          <label className="block text-sm font-medium text-brand-700 mb-2">From</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
            <input
              type="text"
              placeholder="City or Airport"
              value={origin}
              onChange={(e) => handleOriginChange(e.target.value)}
              onFocus={async () => {
                if (origin.length >= 1) {
                  const results = await searchAirports(origin);
                  setOriginSuggestions(results);
                  setShowOriginSuggestions(results.length > 0);
                }
              }}
              className="input-field pl-12"
            />
          </div>
          <AnimatePresence>
            {showOriginSuggestions && originSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-brand-lg border border-brand-100 overflow-hidden"
              >
                <div className="py-2">
                  <p className="px-4 py-1 text-xs font-medium text-brand-400 uppercase tracking-wider">
                    Airports
                  </p>
                  {originSuggestions.map((airport) => (
                    <button
                      key={airport.id}
                      onClick={() => selectAirport(airport, 'origin')}
                      className="w-full px-4 py-3 text-left hover:bg-brand-50 transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center transition-colors">
                        <span className="text-brand-600 font-bold text-sm">{airport.iata_code}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-brand-800 truncate">{airport.city}</p>
                        <p className="text-sm text-brand-500 truncate">{airport.name}</p>
                      </div>
                      <span className="text-xs text-brand-400 bg-brand-50 px-2 py-1 rounded-lg">
                        {airport.country}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex items-end justify-center pb-3">
          <button
            onClick={swapLocations}
            className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center hover:bg-brand-200 transition-colors shadow-sm"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        {/* Destination */}
        <div className="md:col-span-3 relative" ref={destRef}>
          <label className="block text-sm font-medium text-brand-700 mb-2">To</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
            <input
              type="text"
              placeholder="Istanbul (IST)"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              onFocus={async () => {
                if (destination.length >= 1) {
                  const results = await searchAirports(destination);
                  setDestSuggestions(results);
                  setShowDestSuggestions(results.length > 0);
                }
              }}
              className="input-field pl-12"
            />
          </div>
          <AnimatePresence>
            {showDestSuggestions && destSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-brand-lg border border-brand-100 overflow-hidden"
              >
                <div className="py-2">
                  <p className="px-4 py-1 text-xs font-medium text-brand-400 uppercase tracking-wider">
                    Airports
                  </p>
                  {destSuggestions.map((airport) => (
                    <button
                      key={airport.id}
                      onClick={() => selectAirport(airport, 'destination')}
                      className="w-full px-4 py-3 text-left hover:bg-brand-50 transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center transition-colors">
                        <span className="text-brand-600 font-bold text-sm">{airport.iata_code}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-brand-800 truncate">{airport.city}</p>
                        <p className="text-sm text-brand-500 truncate">{airport.name}</p>
                      </div>
                      <span className="text-xs text-brand-400 bg-brand-50 px-2 py-1 rounded-lg">
                        {airport.country}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Departure Date */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brand-700 mb-2">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Return Date */}
        {tripType === 'round_trip' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-brand-700 mb-2">Return</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departureDate || new Date().toISOString().split('T')[0]}
                className="input-field pl-12"
              />
            </div>
          </div>
        )}

        {/* Passengers */}
        <div className={`${tripType === 'round_trip' ? 'md:col-span-1' : 'md:col-span-3'} relative`} ref={passengerRef}>
          <label className="block text-sm font-medium text-brand-700 mb-2">Passengers</label>
          <button
            onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
            className="input-field flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-400" />
              <span className="text-brand-800">{totalPassengers}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-brand-400 transition-transform ${showPassengerDropdown ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showPassengerDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-72 right-0 mt-2 bg-white rounded-xl shadow-brand-lg border border-brand-100 p-4"
              >
                {/* Adults */}
                <div className="flex items-center justify-between py-3 border-b border-brand-50">
                  <div>
                    <p className="font-medium text-brand-800">Adults</p>
                    <p className="text-sm text-brand-500">12+ years</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPassengers(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-brand-200 flex items-center justify-center hover:bg-brand-50 text-brand-600 font-medium transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-brand-800">{passengers.adults}</span>
                    <button
                      onClick={() => setPassengers(p => ({ ...p, adults: Math.min(9, p.adults + 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-brand-200 flex items-center justify-center hover:bg-brand-50 text-brand-600 font-medium transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between py-3 border-b border-brand-50">
                  <div>
                    <p className="font-medium text-brand-800">Children</p>
                    <p className="text-sm text-brand-500">2-11 years</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPassengers(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-brand-200 flex items-center justify-center hover:bg-brand-50 text-brand-600 font-medium transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-brand-800">{passengers.children}</span>
                    <button
                      onClick={() => setPassengers(p => ({ ...p, children: Math.min(9, p.children + 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-brand-200 flex items-center justify-center hover:bg-brand-50 text-brand-600 font-medium transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-brand-800">Infants</p>
                    <p className="text-sm text-brand-500">Under 2</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPassengers(p => ({ ...p, infants: Math.max(0, p.infants - 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-brand-200 flex items-center justify-center hover:bg-brand-50 text-brand-600 font-medium transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-brand-800">{passengers.infants}</span>
                    <button
                      onClick={() => setPassengers(p => ({ ...p, infants: Math.min(passengers.adults, p.infants + 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-brand-200 flex items-center justify-center hover:bg-brand-50 text-brand-600 font-medium transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error Message */}
      {searchError && (
        <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
          searchError.includes('Demo') 
            ? 'bg-amber-50 text-amber-700 border border-amber-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {searchError}
        </div>
      )}

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          disabled={isSearching}
          className="btn-primary flex items-center gap-3 px-10 py-4 text-lg disabled:opacity-70"
        >
          {isSearching ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t('searching') || 'Searching...'}
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {t('searchFlights') || 'Search Flights'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
