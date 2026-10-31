import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { projectSnapshot } from '@/lib/data';
import { srcSet } from '@/lib/responsive-image';
import { ArrowIcon, CheckIcon, PhoneIcon, ShieldIcon } from '@/components/icons/AurisIcons';

const EASE = [0.22, 1, 0.36, 1] as const;

// Name saved by the enquiry form just before it loads this page.
function readStoredName(): string | undefined {
  try {
    return sessionStorage.getItem('enquiryName') ?? undefined;
  } catch {
    return undefined;
  }
}

export default function ThankYouPage() {
  const location = useLocation();
  const name = ((location.state as { name?: string } | null)?.name ?? readStoredName())?.trim().split(/\s+/)[0];
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
        <Link to="/" className="absolute top-5 left-5 sm:top-8 sm:left-8 flex flex-col text-white" aria-label="Godrej Mahalunge home">
          <span className="font-heading text-lg font-light tracking-[0.14em] uppercase">GODREJ <span className="text-[#C9AE76]">MAHALUNGE</span></span>
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#C9AE76]">West Pune</span>
        </Link>
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
          <CheckIcon className="w-12 h-12 sm:w-14 sm:h-14 text-[#8C6D3A] mb-6 sm:mb-8 max-lg:mx-auto" />

          <div className="flex items-center gap-4 mb-4 sm:mb-6 max-lg:justify-center">
            <span className="h-px w-10 bg-[#B8975A]" />
            <span className="text-[11px] uppercase tracking-[0.34em] text-[#8C6D3A]">Enquiry received</span>
            <span className="h-px w-10 bg-[#B8975A] lg:hidden" />
          </div>

          <h1 className="font-heading font-light tracking-[-0.02em] leading-[1.08] text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Thank you{name ? ',' : ''}
            {name && <span className="block text-[#8C6D3A]">{name}</span>}
          </h1>

          <p className="text-[15px] sm:text-[17px] leading-[1.75] text-[#0B1E34]/70 mb-8 sm:mb-10">
            Our representative will get in touch with you to share the latest project details.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-lg:justify-center">
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-[#0B1E34] text-[#FAF7F1] px-8 py-4 text-[11px] uppercase tracking-[0.26em] whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-[#1A3558] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative">Back to Godrej Mahalunge</span>
              <ArrowIcon className="relative w-4 h-4 text-[#C9AE76] transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <a
              href={tel}
              className="inline-flex items-center justify-center gap-3 border border-[#0B1E34]/50 px-8 py-4 text-[11px] uppercase tracking-[0.26em] whitespace-nowrap hover:bg-[#0B1E34] hover:text-[#FAF7F1] transition-colors duration-500"
            >
              <PhoneIcon className="w-4 h-4" />
              {projectSnapshot.phone}
            </a>
          </div>

          <p className="mt-10 sm:mt-14 pt-6 border-t border-[#0B1E34]/10 flex items-center gap-3 text-[12px] text-[#0B1E34]/55 max-lg:justify-center">
            <ShieldIcon className="w-4 h-4 text-[#8C6D3A] shrink-0" />
            {projectSnapshot.rera}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
