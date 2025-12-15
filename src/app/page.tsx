'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart, Shield, Clock, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import FlightSearchForm from '@/components/FlightSearchForm';
import FlightResults from '@/components/FlightResults';
import LocaleSelector from '@/components/LocaleSelector';
import { useLocale } from '@/context/LocaleContext';

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { t } = useLocale();

  const handleSearch = async (results: any[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-brand-100/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center p-2 shadow-brand">
                <Image 
                  src="/logo.png" 
                  alt="Natural Clinic" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-brand-500">
                  Natural Clinic
                </span>
                <p className="text-xs text-brand-400 -mt-1">Flight Booking</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-brand-700 hover:text-brand-500 transition-colors font-medium">
                {t('flights')}
              </a>
              <a href="#" className="text-brand-700 hover:text-brand-500 transition-colors font-medium">
                {t('myBookings')}
              </a>
              <a href="#" className="text-brand-700 hover:text-brand-500 transition-colors font-medium">
                {t('support')}
              </a>
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <LocaleSelector />
              <a href="tel:+902125550000" className="hidden md:flex items-center gap-2 text-brand-600 hover:text-brand-500">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+90 212 555 00 00</span>
              </a>
              <button className="btn-primary text-sm">
                {t('signIn')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-brand-100">
              <Plane className="w-4 h-4" />
              {t('healthTourismPlatform')}
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              {t('heroTitle')}{' '}
              <span className="text-brand-500 relative">
                {t('yourJourneyTo')}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="#c9a227" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-brand-700/80 max-w-2xl mx-auto leading-relaxed">
              {t('heroDescription')}
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FlightSearchForm 
              onSearch={handleSearch} 
              isSearching={isSearching}
              setIsSearching={setIsSearching}
            />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            <div className="flex items-center gap-2 text-brand-600/70 text-sm">
              <Shield className="w-4 h-4" />
              <span>{t('secureCompliant')}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-600/70 text-sm">
              <Clock className="w-4 h-4" />
              <span>24/7 {t('support')}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-600/70 text-sm">
              <Heart className="w-4 h-4" />
              <span>{t('healthFirstScheduling')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FlightResults results={searchResults} isLoading={isSearching} />
          </div>
        </section>
      )}

      {/* Features Section */}
      {!hasSearched && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-900 mb-4">
                {t('whyBookWithUs')}
              </h2>
              <div className="gold-accent w-24 mx-auto mb-6" />
              <p className="text-brand-600/80 max-w-xl mx-auto">
                {t('heroDescription')}
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <FeatureCard
                icon={<Heart className="w-7 h-7" />}
                title={t('healthFirstScheduling')}
                description={t('healthFirstDesc')}
              />
              <FeatureCard
                icon={<Shield className="w-7 h-7" />}
                title={t('secureCompliant')}
                description={t('secureDesc')}
              />
              <FeatureCard
                icon={<Clock className="w-7 h-7" />}
                title={t('easyChanges')}
                description={t('easyChangesDesc')}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!hasSearched && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-500 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('readyToStart')}
                </h3>
                <p className="text-brand-100 mb-8 max-w-lg mx-auto">
                  {t('contactTeam')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+902125550000" className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 font-semibold py-3 px-8 rounded-xl hover:bg-brand-50 transition-all">
                    <Phone className="w-5 h-5" />
                    {t('callUs')}
                  </a>
                  <a href="mailto:flights@naturalclinic.com" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-all">
                    <Mail className="w-5 h-5" />
                    {t('emailUs')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-brand-100/30 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center p-2">
                  <Image 
                    src="/logo.png" 
                    alt="Natural Clinic" 
                    width={24} 
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="font-display font-bold text-brand-700">Natural Clinic</span>
              </div>
              <p className="text-brand-600/70 text-sm max-w-sm mb-4">
                Your trusted partner for health tourism in Turkey. Quality healthcare with seamless travel experiences.
              </p>
              <div className="flex items-center gap-2 text-brand-600/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Istanbul, Turkey</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-brand-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-brand-600/70">
                <li><a href="#" className="hover:text-brand-500 transition-colors">Search Flights</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">My Bookings</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Treatment Packages</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-brand-800 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-brand-600/70">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+902125550000" className="hover:text-brand-500 transition-colors">+90 212 555 00 00</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:flights@naturalclinic.com" className="hover:text-brand-500 transition-colors">flights@naturalclinic.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-brand-100/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-brand-500/60 text-sm">
              © 2025 Natural Clinic. {t('allRightsReserved')}
            </p>
            <div className="flex gap-6 text-sm text-brand-500/60">
              <a href="#" className="hover:text-brand-500 transition-colors">{t('privacyPolicy')}</a>
              <a href="#" className="hover:text-brand-500 transition-colors">{t('termsOfService')}</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="premium-card rounded-2xl p-8 border border-brand-100/50"
    >
      <div className="w-14 h-14 rounded-xl bg-brand-500 flex items-center justify-center text-white mb-6 shadow-brand">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-brand-800 mb-3">{title}</h3>
      <p className="text-brand-600/70 leading-relaxed">{description}</p>
    </motion.div>
  );
}
