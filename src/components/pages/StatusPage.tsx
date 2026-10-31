import { motion } from 'framer-motion';
import { projectSnapshot } from '@/lib/data';
import { srcSet } from '@/lib/responsive-image';
import { ArrowIcon, PhoneIcon, ShieldIcon } from '@/components/icons/AurisIcons';

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  'not-found': {
    eyebrow: 'Error 404',
    title: ['Page', 'not found'],
    text: 'The page you are looking for may have moved or no longer exists. Explore Godrej Mahalunge from the beginning, or speak to our team directly.',
  },
  error: {
    eyebrow: 'Something went wrong',
    title: ['We hit', 'a small snag'],
    text: 'This page could not load just now. Please try again, or return to Godrej Mahalunge. Our team is also happy to help over the phone.',
  },
} as const;

// Branded page for unknown addresses (404) and for unexpected errors.
// Uses plain links so it also works when the app itself has failed.
export default function StatusPage({ variant = 'not-found' }: { variant?: keyof typeof COPY }) {
  const copy = COPY[variant];
  const tel = `tel:${projectSnapshot.phone.replace(/\s+/g, '')}`;

  return (
    <div className="min-h-[100svh] bg-[#FAF7F1] text-[#0B1E34] grid grid-cols-1 lg:grid-cols-2">
      {/* Image */}
      <div className="relative h-[34svh] min-h-[220px] lg:h-auto lg:min-h-[100svh] overflow-hidden bg-[#0B1E34]">
        <motion.img
          src="/godrej-banner-1.webp"
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt="Godrej Mahalunge elevation"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute inset-0 w-full h-full object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06111F]/60 via-transparent to-[#06111F]/40" />
        <a href="/" className="absolute top-5 left-5 sm:top-8 sm:left-8 flex flex-col text-white" aria-label="Godrej Mahalunge home">
          <span className="font-heading text-lg font-light tracking-[0.14em] uppercase">GODREJ <span className="text-[#C9AE76]">MAHALUNGE</span></span>
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#C9AE76]">West Pune</span>
        </a>
        <span className="absolute left-5 bottom-4 sm:left-8 sm:bottom-6 text-[10px] uppercase tracking-[0.24em] text-white/70">Artist's impression</span>
      </div>

      {/* Message */}
      <main className="flex items-center px-5 sm:px-10 lg:px-16 xl:px-24 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="w-full max-w-[520px] mx-auto lg:mx-0 max-lg:text-center"
        >
          <div className="flex items-center gap-4 mb-4 sm:mb-6 max-lg:justify-center">
            <span className="h-px w-10 bg-[#B8975A]" />
            <span className="text-[11px] uppercase tracking-[0.34em] text-[#8C6D3A]">{copy.eyebrow}</span>
            <span className="h-px w-10 bg-[#B8975A] lg:hidden" />
          </div>

          <h1 className="font-heading font-light tracking-[-0.02em] leading-[1.08] text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
            {copy.title[0]}
            <span className="block text-[#8C6D3A]">{copy.title[1]}</span>
          </h1>

          <p className="text-[15px] sm:text-[17px] leading-[1.75] text-[#0B1E34]/70 mb-8 sm:mb-10">{copy.text}</p>

          <div className="flex flex-col sm:flex-row gap-3 max-lg:justify-center">
            <a
              href="/"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-[#0B1E34] text-[#FAF7F1] px-8 py-4 text-[11px] uppercase tracking-[0.26em] whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-[#1A3558] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative">Back to Godrej Mahalunge</span>
              <ArrowIcon className="relative w-4 h-4 text-[#C9AE76] transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a
              href="/#enquiry"
              className="inline-flex items-center justify-center gap-3 border border-[#0B1E34]/50 px-8 py-4 text-[11px] uppercase tracking-[0.26em] whitespace-nowrap hover:bg-[#0B1E34] hover:text-[#FAF7F1] transition-colors duration-500"
            >
              Enquire Now
            </a>
          </div>

          <a
            href={tel}
            className="mt-6 sm:mt-8 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.2em] text-[#0B1E34]/80 hover:text-[#8C6D3A] transition-colors"
          >
            <PhoneIcon className="w-4 h-4 text-[#8C6D3A]" />
            {projectSnapshot.phone}
          </a>

          <p className="mt-10 sm:mt-14 pt-6 border-t border-[#0B1E34]/10 flex items-center gap-3 text-[12px] text-[#0B1E34]/55 max-lg:justify-center">
            <ShieldIcon className="w-4 h-4 text-[#8C6D3A] shrink-0" />
            {projectSnapshot.rera}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
