import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { MiloProvider } from '@/context/MiloContext';
import { ToastContainer } from '@/components/ui/ToastContainer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'MILO — Find People. Find Plans. Go Together.',
  description: 'MILO is a modern social community platform that helps people meet new friends through real-world group activities, meetups, and shared experiences in Pune.',
  keywords: ['MILO', 'Social Community', 'Pune Activities', 'Meetups Pune', 'Make Friends Pune', 'Badminton', 'Trekking', 'Coffee Meetups'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans antialiased selection:bg-milo-orange selection:text-white">
        <MiloProvider>
          {children}
          <ToastContainer />
        </MiloProvider>
      </body>
    </html>
  );
}
