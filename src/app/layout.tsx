import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/context/LocaleContext';

export const metadata: Metadata = {
  title: 'Natural Clinic - Health Tourism Flight Booking',
  description: 'Book your medical travel flights with ease. Integrated with clinic appointments for a seamless health tourism experience in Turkey.',
  keywords: 'health tourism, medical travel, flight booking, Turkey healthcare, Natural Clinic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-pattern">
        {/* Decorative background shapes */}
        <div className="shape-blob shape-blob-1" />
        <div className="shape-blob shape-blob-2" />
        
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
