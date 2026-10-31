// Godrej Mahalunge - Official Web Application
import React, { useEffect, useRef, useState } from 'react';
import {
  motion, AnimatePresence, animate, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useTransform,
} from 'framer-motion';
import EnquiryForm from '@/components/EnquiryForm';
import { srcSet } from '@/lib/responsive-image';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import ContactFormModal from '@/components/ContactFormModal';
import Header from '@/components/Header';
import { projectSnapshot } from '@/lib/data';
import {
  ArrowIcon, CloseIcon, ClubhouseIcon, DeckIcon,
  DownloadIcon, EcoDeckIcon, ExpandIcon, FloorPlateIcon,
  GatedIcon, HighwayIcon, HospitalIcon, 
  LandParcelIcon, LayoutIcon, LowDensityIcon,
  MetroIcon, ParkingIcon, PhoneIcon, RailIcon, SchoolIcon, ShoppingIcon, TennisCourtIcon, WindowIcon, GymIcon, PoolsIcon, MapPinIcon, CheckIcon, ShieldIcon
} from '@/components/icons/AurisIcons';

type IconComponent = (props: { className?: string }) => JSX.Element;

// ivory #FAF7F1 · cream #F3EEE4 · navy #0B1E34 · gold line #B8975A · gold text #8C6D3A · gold on navy #C9AE76
const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;
const iconTone = 'text-[#0B1E34] [--icon-accent:#B8975A]';

// Section 1 Fact Counters
const projectFacts: { figure: string; label: string; icon: IconComponent }[] = [
  { figure: '8.5 Acres', label: 'Planned residential development', icon: LandParcelIcon },
  { figure: '30,000 Sq. Ft.', label: 'Approx. grand clubhouse', icon: ClubhouseIcon },
  { figure: '1 Lakh Sq. Ft.', label: 'Approx. riverfront lifestyle amenities', icon: DeckIcon },
];

// Section 1 Hero Highlights
const heroKeyHighlights: { label: string; icon?: IconComponent; img?: string }[] = [
  { label: '8.5-Acre Residential Development', icon: LandParcelIcon },
  { label: 'French-Inspired Architecture', icon: FloorPlateIcon },
  { label: 'Exclusive Low-Density Living', icon: LowDensityIcon },
  { label: 'Premium River-Facing Residences', icon: DeckIcon },
  { label: 'Grand Clubhouse & Riverfront Amenities', icon: ClubhouseIcon },
];

// Buttons
type BtnVariant = 'navy' | 'outline' | 'gold' | 'ghostLight';
const btnVariants: Record<BtnVariant, { base: string; fill: string; hoverText: string }> = {
  navy: { base: 'bg-[#0B1E34] text-[#FAF7F1]', fill: 'bg-[#1A3558]', hoverText: '' },
  outline: { base: 'border border-[#0B1E34]/50 text-[#0B1E34]', fill: 'bg-[#0B1E34]', hoverText: 'group-hover:text-[#FAF7F1]' },
  gold: { base: 'bg-[#C9AE76] text-[#0B1E34]', fill: 'bg-[#DCC594]', hoverText: '' },
  ghostLight: { base: 'border border-white/40 text-white', fill: 'bg-white', hoverText: 'group-hover:text-[#0B1E34]' },
};

const Btn = ({
  children, onClick, variant = 'navy', icon: Icon = ArrowIcon, leading = false, compact = false, className = '', type = 'button', disabled,
}: {
  children: React.ReactNode; onClick?: () => void; variant?: BtnVariant; icon?: IconComponent | null;
  leading?: boolean; compact?: boolean; className?: string; type?: 'button' | 'submit'; disabled?: boolean;
}) => {
  const v = btnVariants[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center overflow-hidden ${compact ? 'px-5 sm:px-8 tracking-[0.2em] sm:tracking-[0.26em]' : 'px-8 tracking-[0.26em]'} py-4 text-[11px] uppercase whitespace-nowrap cursor-pointer transition-colors duration-500 active:scale-[0.985] disabled:opacity-60 disabled:cursor-wait focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#B8975A] ${v.base} ${className}`}
    >
      <span className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${v.fill}`} />
      <span className={`relative flex items-center gap-3 transition-colors duration-500 ${v.hoverText}`}>
        {Icon && leading && <Icon className="w-4 h-4" />}
        {children}
        {Icon && !leading && <Icon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />}
      </span>
    </button>
  );
};

// Type & motion primitives
const Eyebrow = ({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) => {
  const line = (extra = '') => (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE }}
      className={`h-px w-10 origin-left ${light ? 'bg-[#C9AE76]' : 'bg-[#B8975A]'} ${extra}`}
    />
  );
  return (
    <div className={`flex items-center gap-4 mb-4 sm:mb-7 ${center ? 'justify-center' : 'max-lg:justify-center'}`}>
      {line()}
      <span className={`text-[11px] uppercase tracking-[0.34em] ${light ? 'text-[#C9AE76]' : 'text-[#8C6D3A]'}`}>{children}</span>
      {center ? line() : line('lg:hidden')}
    </div>
  );
};

const MaskLines = ({ lines, start, delay = 0 }: { lines: React.ReactNode[]; start: boolean; delay?: number }) => (
  <>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
        <motion.span
          className="block"
          initial={{ y: '105%' }}
          animate={start ? { y: '0%' } : undefined}
          transition={{ duration: 1.2, delay: delay + i * 0.1, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </>
);

const Display = ({ lines, as: Tag = 'h2', className = '' }: { lines: React.ReactNode[]; as?: 'h1' | 'h2'; className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <Tag ref={ref} className={`font-heading font-light tracking-[-0.015em] leading-[1.15] ${className}`}>
      <MaskLines lines={lines} start={inView} />
    </Tag>
  );
};

const CinematicReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8%" }}
    transition={{ duration: 1, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);


const ExpandBadge = () => (
  <span className="absolute top-4 right-4 w-11 h-11 bg-[#FAF7F1] text-[#0B1E34] flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
    <ExpandIcon className="w-4 h-4" />
  </span>
);

export const godrejRendersGallery = [
  {
    id: "elevation",
    title: "French-Inspired Elevation",
    imageUrl: "/godrej-banner-1.webp",
    category: "Architecture",
  },
  {
    id: "overview",
    title: "8.5-Acre Planned Development",
    imageUrl: "/godrej-about.webp",
    category: "Overview",
  },
  {
    id: "riverfront-deck",
    title: "Riverfront Sky Deck",
    imageUrl: "/godrej-deck.webp",
    category: "Riverfront",
  },
  {
    id: "living-room",
    title: "Spacious Living & Dining",
    imageUrl: "/godrej-living-room.webp",
    category: "Interiors",
  },
  {
    id: "master-bedroom",
    title: "Luxury Master Suite",
    imageUrl: "/godrej-bedroom.webp",
    category: "Interiors",
  },
  {
    id: "living-lounge",
    title: "Contemporary Living Lounge",
    imageUrl: "/godrej-living-room-2.webp",
    category: "Interiors",
  },
  {
    id: "grand-clubhouse",
    title: "Grand 30,000 Sq. Ft. Clubhouse",
    imageUrl: "/godrej-clubhouse.webp",
    category: "Clubhouse",
  },
  {
    id: "infinity-pool",
    title: "Infinity Edge Swimming Pool",
    imageUrl: "/godrej-infinity-pool.webp",
    category: "Amenities",
  },
  {
    id: "riverfront-promenade",
    title: "1 Lakh Sq. Ft. Riverfront Promenade",
    imageUrl: "/godrej-riverfront-promenade.webp",
    category: "Riverfront",
  },
  {
    id: "gymnasium",
    title: "Fully Equipped Fitness Centre",
    imageUrl: "/godrej-gym.webp",
    category: "Amenities",
  },
  {
    id: "badminton-court",
    title: "Badminton Court",
    imageUrl: "/godrej-badminton.webp",
    category: "Sports",
  },
  {
    id: "master-plan",
    title: "Master Layout Plan",
    imageUrl: "/godrej-master-plan.webp",
    category: "Master Plan",
  },
];

type GalleryItem = typeof godrejRendersGallery[0];

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Get Pricing & Floor Plans");
  const [modalCtaText, setModalCtaText] = useState("GET PRICING & FLOOR PLANS");

  const [showLoader, setShowLoader] = useState(() => {
    try { return sessionStorage.getItem('godrej_intro_seen') !== '1'; } catch { return true; }
  });
  const finishLoader = () => {
    try { sessionStorage.setItem('godrej_intro_seen', '1'); } catch { /* ignore */ }
    setShowLoader(false);
  };

  useEffect(() => {
    if (showLoader || !window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
  }, [showLoader]);

  const [activeGalleryModal, setActiveGalleryModal] = useState<GalleryItem | null>(null);

  const openEnquiryModal = (title = "Get Pricing & Floor Plans", cta = "GET COMPLETE PROJECT DETAILS") => {
    setModalTitle(title);
    setModalCtaText(cta);
    setIsContactModalOpen(true);
  };

  const openEnquiry = () => openEnquiryModal("Get Pricing & Floor Plans", "GET PRICING & FLOOR PLANS");
  const openBrochure = () => openEnquiryModal("Download Project Brochure", "DOWNLOAD BROCHURE");
  const openPriceBreakup = () => openEnquiryModal("Get Complete Price Breakup", "GET PRICE BREAKUP");
  const openLocationMap = () => openEnquiryModal("Get Location Map & Directions", "GET LOCATION MAP");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContactModalOpen(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!activeGalleryModal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActiveGalleryModal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeGalleryModal]);

  return (
    <div className="bg-[#FAF7F1] text-[#0B1E34] min-h-screen overflow-x-clip selection:bg-[#C9AE76]/40 selection:text-[#0B1E34] relative font-normal">
      <AnimatePresence>
        {showLoader && (
          <Loader key="loader" onComplete={finishLoader} />
        )}
      </AnimatePresence>

      <a href="#overview" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[3000] focus:bg-[#0B1E34] focus:text-white focus:px-4 focus:py-2">
        Skip to content
      </a>

      <div className="w-full">
        <Header onOpenContactForm={openEnquiry} onOpenBrochure={openBrochure} />

        <ContactFormModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          title={modalTitle}
          ctaText={modalCtaText}
        />

        <main className="pb-[var(--mobile-bar-h,52px)] md:pb-0">
          {/* SECTION 1 — HERO BANNER */}
          <HeroSection
            ready={!showLoader}
            onOpenPricing={openEnquiry}
            onOpenBrochure={openBrochure}
          />

          {/* SECTION 2 — PROJECT OVERVIEW */}
          <ProjectOverviewSection
            onOpenImageModal={setActiveGalleryModal}
            onOpenBrochure={openBrochure}
          />

          {/* SECTION 3 — CONFIGURATION & PRICING */}
          <ConfigurationPricingSection
            onOpenImageModal={setActiveGalleryModal}
            onOpenPriceBreakup={openPriceBreakup}
          />

          {/* SECTION 4 — PROJECT USPs */}
          <ProjectUSPsSection
            onOpenHighlights={openEnquiry}
          />

          {/* SECTION 5 — LIFESTYLE & AMENITIES */}
          <LifestyleAmenitiesSection
            onOpenImageModal={setActiveGalleryModal}
            onOpenContactForm={openEnquiry}
          />

          {/* GALLERY SECTION */}
          <GallerySection onOpenImageModal={setActiveGalleryModal} />

          {/* RIVER-FACING VIEWS BAND */}
          <ViewsBand />

          {/* SECTION 6 — LOCATION ADVANTAGES */}
          <LocationAdvantagesSection
            onOpenLocationMap={openLocationMap}
          />

          {/* SECTION 7 — WHY CHOOSE GODREJ MAHALUNGE? */}
          <WhyChooseSection
            onOpenContactForm={() => openEnquiryModal("Enquire About Available Residences", "ENQUIRE NOW")}
          />

          {/* SECTION 8 — FINAL CTA & LEAD GENERATION */}
          <FinalLeadGenSection />

          {/* FOOTER */}
          <Footer onOpenContactForm={openEnquiry} onOpenBrochure={openBrochure} />
        </main>

        {/* Full-screen render lightbox */}
        <AnimatePresence>
          {activeGalleryModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-[#06111F]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
              onClick={() => setActiveGalleryModal(null)}
              role="dialog"
              aria-modal="true"
              aria-label={activeGalleryModal.title}
            >
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="bg-[#FAF7F1] text-[#0B1E34] max-w-6xl w-full relative max-h-[94vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="absolute top-0 left-0 h-[2px] w-24 bg-[#B8975A]" />
                <div className="flex items-start justify-between gap-6 px-5 sm:px-8 pt-6 sm:pt-7 pb-4">
                  <div>
                    <span className="text-[10.5px] uppercase tracking-[0.3em] text-[#8C6D3A] block mb-1.5">
                      {activeGalleryModal.category} · Godrej Mahalunge
                    </span>
                    <h3 className="font-heading text-xl sm:text-3xl font-light tracking-[-0.01em]">
                      {activeGalleryModal.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveGalleryModal(null)}
                    className="w-11 h-11 shrink-0 border border-[#0B1E34]/25 hover:bg-[#0B1E34] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-hidden bg-[#0B1E34] flex items-center justify-center min-h-[300px]">
                  <img
                    src={activeGalleryModal.imageUrl}
                    alt={activeGalleryModal.title}
                    className="max-h-[68vh] w-auto max-w-full object-contain"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-8 py-5">
                  <p className="text-sm text-[#0B1E34]/70">
                    Artist's impression
                  </p>
                  <Btn
                    variant="navy"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setActiveGalleryModal(null);
                      openEnquiry();
                    }}
                  >
                    Enquire Now
                  </Btn>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile sticky bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-stretch border-t border-[#0B1E34]/15 bg-[#FAF7F1]/95 backdrop-blur-md">
          <a
            href={`tel:${projectSnapshot.phone.replace(/\s+/g, "")}`}
            className="flex-1 py-4 px-3 flex items-center justify-center gap-2.5 text-[#0B1E34] text-[11px] uppercase tracking-[0.22em] border-r border-[#0B1E34]/15 active:bg-[#0B1E34]/5"
            aria-label={`Call ${projectSnapshot.phone}`}
          >
            <PhoneIcon className="w-4 h-4" />
            <span>Call Us</span>
          </a>
          <button
            onClick={openEnquiry}
            className="flex-1 py-4 px-3 bg-[#0B1E34] active:bg-[#17304F] flex items-center justify-center gap-2.5 text-white text-[11px] uppercase tracking-[0.22em] cursor-pointer"
            aria-label="Enquire Now"
          >
            <span>Enquire Now</span>
            <ArrowIcon className="w-4 h-4 text-[#C9AE76]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// SECTION 1 — HERO BANNER
// =========================================================================
const HeroSection = ({
  ready,
  onOpenPricing,
  onOpenBrochure,
}: {
  ready: boolean;
  onOpenPricing: () => void;
  onOpenBrochure: () => void;
}) => {
  return (
    <>
      <section id="hero" aria-label="Godrej Mahalunge" className="relative w-full min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-100px)] mt-[80px] lg:mt-[100px] flex items-center bg-[#0B1E34] text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Background Render Imagery — Starts below the header so the entire image including the building roofs are 100% visible */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="/godrej-banner-mobile-1.webp"
            />
            <motion.img
              src="/godrej-banner-1.webp"
              sizes="100vw"
              alt="Godrej Mahalunge — French-Inspired Luxury Living in West Pune"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ duration: 1.4, ease: EASE }}
              className="w-full h-full object-cover object-[75%_top] sm:object-[78%_top] lg:object-[82%_top]"
              loading="eager"
              fetchPriority="high"
            />
          </picture>

          {/* Soft directional scrim on the left half ONLY to ensure crisp text readability while leaving the towers on the right 100% uncovered, clear and bright */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#06111F]/90 via-[#06111F]/50 to-transparent pointer-events-none" />

          {/* Mobile vertical gradient on small screens only */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#06111F]/90 via-[#06111F]/35 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content — Positioned on the left side so the building on the right is completely unobscured */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="max-w-[680px] flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#0B1E34]/70 backdrop-blur-md border border-white/20 rounded-full mb-4 sm:mb-6 shadow-sm"
            >
              <MapPinIcon className="w-3.5 h-3.5 text-[#C9AE76] shrink-0" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#E3CF9F] font-medium">
                Mahalunge | Baner–Hinjewadi Corridor, Pune
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
              className="font-heading font-light tracking-[0.05em] text-[2.2rem] sm:text-4xl lg:text-5xl xl:text-[3.8rem] uppercase leading-[1.02] mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            >
              GODREJ <span className="text-[#C9AE76]">MAHALUNGE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="font-heading font-light text-[1.15rem] sm:text-xl lg:text-[1.45rem] text-white tracking-wide mb-2 sm:mb-2.5 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            >
              French-Inspired Luxury Living in West Pune
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="text-[14px] sm:text-[16px] text-white/90 mb-6 sm:mb-7 tracking-[0.02em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
            >
              Premium 3 BHK Residences &amp; Limited 4 BHK Duplex Homes
            </motion.p>

            {/* Pricing Highlight Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={ready ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mb-6 sm:mb-8 py-3 px-5 sm:px-7 border border-[#C9AE76]/50 bg-[#0B1E34]/85 backdrop-blur-md shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] text-center lg:text-left"
            >
              <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.28em] text-[#C9AE76] block mb-1 font-medium">
                Exclusive Launch Opportunity
              </span>
              <span className="font-heading text-2xl sm:text-3xl lg:text-[2rem] text-white font-light tracking-tight">
                Starting ₹1.90 Cr Onwards*
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.65, ease: EASE }}
              className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Btn variant="gold" onClick={onOpenPricing}>
                Get Pricing &amp; Floor Plans
              </Btn>
              <Btn variant="ghostLight" icon={DownloadIcon} leading onClick={onOpenBrochure}>
                Download Brochure
              </Btn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facts & Section 1 Highlights Bar */}
      <section id="intro" aria-label="Project Highlights" className="relative bg-[#FAF7F1] scroll-mt-20 lg:scroll-mt-[100px]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-10 sm:py-16">
          {/* Project facts counters — Separate Dedicated Luxury Boxes */}
          <div className="mb-8 sm:mb-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {projectFacts.map(({ figure, label, icon: Icon }, i) => (
                <CinematicReveal key={label} delay={i * 0.08} className="h-full">
                  <div className="group relative bg-[#F3EEE4] border border-[#0B1E34]/15 p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center justify-center h-full transition-all duration-500 hover:border-[#B8975A] hover:bg-white hover:shadow-[0_16px_36px_-12px_rgba(11,30,52,0.12)]">
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8975A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />

                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 mb-4 transition-transform duration-500 group-hover:-translate-y-1 ${iconTone}`} />
                    <span className="font-heading text-2xl sm:text-3xl lg:text-[2.35rem] xl:text-[2.6rem] text-[#8C6D3A] font-light tracking-tight leading-none mb-3">
                      {figure}
                    </span>
                    <span className="text-[11px] sm:text-[12.5px] uppercase tracking-[0.2em] text-[#0B1E34]/80 font-medium leading-relaxed max-w-[260px]">
                      {label}
                    </span>
                  </div>
                </CinematicReveal>
              ))}
            </div>
          </div>

          {/* Key 5 Highlights from Section 1 */}
          <div className="pt-8 border-t border-[#0B1E34]/[0.12]">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#8C6D3A] text-center mb-6 font-semibold">
              Project Key Pillars
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {heroKeyHighlights.map(({ label, icon: Icon }, i) => (
                <CinematicReveal key={label} delay={i * 0.06} className="h-full">
                  <li className="group bg-[#F3EEE4] p-4 sm:p-5 flex flex-col items-center text-center justify-center h-full border border-[#0B1E34]/10 transition-all duration-500 hover:border-[#B8975A] hover:bg-white">
                    {Icon && <Icon className={`w-8 h-8 sm:w-10 sm:h-10 mb-3 transition-transform duration-500 group-hover:-translate-y-1 ${iconTone}`} />}
                    <span className="font-heading text-[13px] sm:text-[15px] leading-snug font-light">{label}</span>
                  </li>
                </CinematicReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

// =========================================================================
// SECTION 2 — PROJECT OVERVIEW
// =========================================================================
const ProjectOverviewSection = ({
  onOpenImageModal,
  onOpenBrochure,
}: {
  onOpenImageModal: (img: GalleryItem) => void;
  onOpenBrochure: () => void;
}) => {
  const towerRender = godrejRendersGallery[1];

  const highlights = [
    '8.5 Acres of Planned Development',
    'Premium 3 BHK Apartments',
    'Limited 4 BHK Duplex Residences',
    'French-Inspired Design',
    'Low-Density Residential Concept',
    'River-Facing Apartments',
  ];

  return (
    <section id="overview" className="py-12 sm:py-24 lg:py-36 bg-[#FAF7F1] relative overflow-hidden scroll-mt-20 lg:scroll-mt-[100px]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-10 items-center">

          {/* Left Visual Bento */}
          <div className="lg:col-span-5 relative max-sm:w-[85%] max-sm:mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
              className="hidden sm:block absolute sm:-top-7 sm:-left-7 w-[70%] h-[70%] border border-[#B8975A]/60 pointer-events-none"
            />
            <button
              onClick={() => onOpenImageModal(towerRender)}
              className="relative block w-full aspect-[4/5] overflow-hidden cursor-pointer group bg-[#0B1E34]"
              aria-label="View Godrej Mahalunge elevation render"
            >
              <img
                src="/godrej-about.webp"
                alt="Godrej Mahalunge project overview"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111F]/50 via-transparent to-transparent pointer-events-none" />
              <ExpandBadge />
            </button>
            <p className="mt-2 sm:mt-4 text-[10px] sm:text-[10.5px] uppercase tracking-[0.24em] text-[#0B1E34]/50 max-lg:text-center">
              Artist's impression
            </p>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-7 max-lg:text-center lg:pl-6">
            <Eyebrow>Welcome to Godrej Mahalunge</Eyebrow>
            <Display
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] mb-3 sm:mb-5"
              lines={['A Touch of', <span key="f" className="text-[#8C6D3A]">French Elegance.</span>, 'A Lifestyle Beyond Ordinary.']}
            />

            <CinematicReveal delay={0.15}>
              <div className="space-y-4 text-[15px] sm:text-[16.5px] leading-[1.75] sm:leading-[1.85] text-[#0B1E34]/75 mb-8 text-pretty max-w-[620px] max-lg:mx-auto">
                <p>
                  Discover a premium residential address in Mahalunge, West Pune, where French-inspired architecture meets thoughtfully designed living spaces.
                </p>
                <p>
                  Planned across approximately 8.5 acres, this residential development brings together spacious homes, a low-density environment, river-facing views, and an exceptional location.
                </p>
                <p>
                  With Hinjewadi's IT hub on one side and Baner–Balewadi's lifestyle destinations on the other, experience a home that keeps work, leisure, and everyday conveniences connected.
                </p>
              </div>
            </CinematicReveal>

            {/* Project Highlights Grid */}
            <CinematicReveal delay={0.25}>
              <div className="border-t border-b border-[#0B1E34]/15 py-6 mb-8">
                <h3 className="text-[11px] uppercase tracking-[0.28em] text-[#8C6D3A] font-semibold mb-4 text-left max-lg:text-center">
                  Project Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#B8975A] shrink-0 rotate-45" />
                      <span className="font-heading text-[15px] sm:text-[16px] text-[#0B1E34] font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CinematicReveal>

            <CinematicReveal delay={0.35}>
              <div className="flex flex-row flex-wrap gap-4 max-lg:justify-center">
                <Btn variant="navy" icon={DownloadIcon} leading onClick={onOpenBrochure}>
                  Download Project Brochure
                </Btn>
              </div>
            </CinematicReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

// =========================================================================
// SECTION 3 — CONFIGURATION & PRICING
// =========================================================================
const ConfigurationPricingSection = ({
  onOpenImageModal,
  onOpenPriceBreakup,
}: {
  onOpenImageModal: (img: GalleryItem) => void;
  onOpenPriceBreakup: () => void;
}) => {
  const configs = [
    {
      title: "3 BHK Premium Residences",
      tag: "Premium Living",
      price: "Starting ₹1.90 Cr Onwards*",
      description: "Spacious layouts, premium finishes, and thoughtfully designed living spaces.",
      image: "/godrej-living-room.webp",
      galleryRef: godrejRendersGallery[3],
      features: ["Spacious living & dining spaces", "Expansive sunlit balcony", "Optimal privacy & cross-ventilation", "Panoramic river / city vistas"],
    },
    {
      title: "4 BHK Luxury Duplex Residences",
      tag: "Limited Edition",
      price: "Price On Request",
      description: "Limited-edition duplex homes offering expansive spaces and an exclusive residential experience.",
      image: "/godrej-bedroom.webp",
      galleryRef: godrejRendersGallery[4],
      features: ["Double-height architectural volume", "Grand master suites with deck", "Ultra low-density layout", "Select river-facing orientation"],
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-24 lg:py-36 bg-[#F3EEE4] relative scroll-mt-20 lg:scroll-mt-[100px]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end mb-8 sm:mb-14 lg:mb-16">
          <div className="lg:col-span-7 max-lg:text-center">
            <Eyebrow>Configuration &amp; Pricing</Eyebrow>
            <Display
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem]"
              lines={['Spacious Homes.', <span key="p" className="text-[#8C6D3A]">Exclusive Living.</span>]}
            />
          </div>
          <CinematicReveal delay={0.1} className="lg:col-span-5 max-lg:text-center">
            <p className="font-heading text-base sm:text-lg lg:text-xl text-[#0B1E34]/85 mb-1.5">
              Find a Home That Matches Your Lifestyle.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#0B1E34]/70">
              Thoughtfully planned residences designed to offer comfort, privacy, and a refined living experience.
            </p>
          </CinematicReveal>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14">
          {configs.map((c, idx) => (
            <CinematicReveal key={c.title} delay={idx * 0.15} className="h-full">
              <div className="bg-[#FAF7F1] border border-[#0B1E34]/12 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1E34]">
                  <button
                    onClick={() => onOpenImageModal(c.galleryRef)}
                    className="w-full h-full block cursor-pointer group relative"
                    aria-label={`View ${c.title}`}
                  >
                    <img
                      src={c.image}
                      srcSet={srcSet(c.image)}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06111F]/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#0B1E34] text-[#C9AE76] text-[10px] uppercase tracking-[0.24em] px-3 py-1 font-medium">
                      {c.tag}
                    </span>
                    <ExpandBadge />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-9 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-light text-[#0B1E34] mb-2">
                      {c.title}
                    </h3>
                    <div className="font-heading text-2xl sm:text-[1.9rem] text-[#8C6D3A] font-light tracking-tight mb-4">
                      {c.price}
                    </div>
                    <p className="text-[15px] leading-[1.7] text-[#0B1E34]/70 mb-6">
                      {c.description}
                    </p>

                    <div className="border-t border-[#0B1E34]/10 pt-5 mb-8">
                      <ul className="space-y-2.5">
                        {c.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-3 text-[14px] text-[#0B1E34]/80">
                            <CheckIcon className="w-4 h-4 text-[#8C6D3A] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Btn variant="navy" className="w-full" onClick={onOpenPriceBreakup}>
                    Get Complete Price Breakup
                  </Btn>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>

        {/* Footnote Disclaimer */}
        <p className="text-center text-[12px] text-[#0B1E34]/55 italic">
          *Prices are indicative and subject to availability and applicable charges.
        </p>

      </div>
    </section>
  );
};

// =========================================================================
// SECTION 4 — PROJECT USPs
// =========================================================================
const ProjectUSPsSection = ({ onOpenHighlights }: { onOpenHighlights: () => void }) => {
  const usps = [
    {
      title: "French-Inspired Architecture",
      icon: FloorPlateIcon,
      desc: "An elegant design philosophy bringing timeless European-inspired aesthetics into contemporary residential living.",
    },
    {
      title: "Low-Density Living",
      icon: LowDensityIcon,
      desc: "A residential environment designed around greater privacy, comfort, and exclusivity.",
    },
    {
      title: "River-Facing Residences",
      icon: DeckIcon,
      desc: "Selected apartments offer beautiful river-facing views, adding a refreshing natural element to everyday life.",
    },
    {
      title: "Limited 4 BHK Duplex Homes",
      icon: LayoutIcon,
      desc: "An exclusive collection of larger duplex residences for buyers looking for additional space and privacy.",
    },
    {
      title: "Prime West Pune Location",
      icon: HighwayIcon,
      desc: "Positioned in Mahalunge with connectivity to the Hinjewadi IT corridor and Baner–Balewadi's popular lifestyle destinations.",
    },
    {
      title: "Trusted Godrej Legacy",
      icon: ShieldIcon,
      desc: "A residential development associated with Godrej Properties, one of India's established real estate developers.",
    },
  ];

  return (
    <section id="usps" className="bg-[#FAF7F1] relative py-12 sm:py-24 lg:py-36 scroll-mt-20 lg:scroll-mt-[100px]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">

        <div className="max-w-[800px] mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
          <Eyebrow center>Project USPs</Eyebrow>
          <Display
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem]"
            lines={['What Makes', <span key="u" className="text-[#8C6D3A]">Godrej Mahalunge</span>, 'Special?']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <CinematicReveal key={usp.title} delay={idx * 0.08} className="h-full">
                <div className="group relative bg-[#FAF7F1] border border-[#0B1E34]/12 p-6 sm:p-9 flex flex-col justify-between h-full transition-all duration-700 hover:border-[#B8975A] hover:shadow-lg">
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8975A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <Icon className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 transition-transform duration-700 group-hover:-translate-y-1 ${iconTone}`} />
                      <span className="font-heading text-2xl text-[#0B1E34]/25 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-light text-[#0B1E34] mb-3">
                      {usp.title}
                    </h3>

                    <p className="text-[15px] leading-[1.75] text-[#0B1E34]/70">
                      {usp.desc}
                    </p>
                  </div>
                </div>
              </CinematicReveal>
            );
          })}
        </div>

        <CinematicReveal delay={0.2} className="text-center">
          <Btn variant="navy" onClick={onOpenHighlights}>
            Discover More Project Highlights
          </Btn>
        </CinematicReveal>

      </div>
    </section>
  );
};

// =========================================================================
// SECTION 5 — LIFESTYLE & AMENITIES
// =========================================================================
const amenitiesItems = [
  { label: 'Swimming Pool', icon: PoolsIcon, detail: 'Expansive pool designed for recreation and leisure' },
  { label: 'Fully Equipped Gymnasium', icon: GymIcon, detail: 'Modern fitness studio with world-class equipment' },
  { label: 'Landscaped Gardens', icon: EcoDeckIcon, detail: 'Themed green spaces with seating pavilions' },
  { label: 'Sports & Recreation Facilities', icon: TennisCourtIcon, detail: 'Multi-purpose courts and indoor activity rooms' },
  { label: 'Dedicated Relaxation Spaces', icon: SunrisePavilionIcon, detail: 'Quiet yoga decks and open-air contemplative nooks' },
  { label: 'Open Green Surroundings', icon: LandParcelIcon, detail: 'Riverfront views and verdant landscaping' },
];

function SunrisePavilionIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M6 40h36M10 24 24 16l14 8M9 24h30M14 24v16M34 24v16M24 28v12" />
      <g stroke="#B8975A"><path d="M19 11a5 5 0 0 1 10 0M24 3v2.5M16.6 5.8l1.6 1.6M31.4 5.8l-1.6 1.6M13 11h2.5M32.5 11H35" /></g>
    </svg>
  );
}

const LifestyleAmenitiesSection = ({
  onOpenImageModal,
  onOpenContactForm,
}: {
  onOpenImageModal: (img: GalleryItem) => void;
  onOpenContactForm: () => void;
}) => {
  return (
    <section id="amenities" className="py-12 sm:py-24 lg:py-36 bg-[#F3EEE4] relative scroll-mt-20 lg:scroll-mt-[100px] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-end mb-8 sm:mb-12 lg:mb-14">
          <div className="lg:col-span-7 max-lg:text-center">
            <Eyebrow>Lifestyle &amp; Amenities</Eyebrow>
            <Display
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem]"
              lines={['More Than a Home.', <span key="l" className="text-[#8C6D3A]">A Complete Lifestyle.</span>]}
            />
          </div>
          <CinematicReveal delay={0.1} className="lg:col-span-5 max-lg:text-center">
            <p className="font-heading text-base sm:text-lg lg:text-xl text-[#0B1E34]/85 mb-1.5">
              Grand Clubhouse &amp; Riverfront Lifestyle Amenities
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#0B1E34]/70">
              Experience a lifestyle where wellness, recreation, fitness, and relaxation become part of everyday living.
            </p>
          </CinematicReveal>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-14">
          <CinematicReveal delay={0.1}>
            <div className="bg-[#FAF7F1] border border-[#0B1E34]/12 p-6 sm:p-8 flex items-center gap-5">
              <ClubhouseIcon className="w-12 h-12 text-[#8C6D3A] shrink-0" />
              <div>
                <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#8C6D3A] block mb-1">Scale of Luxury</span>
                <span className="font-heading text-2xl sm:text-3xl text-[#0B1E34] font-light">Approx. 30,000 Sq. Ft. Clubhouse</span>
              </div>
            </div>
          </CinematicReveal>

          <CinematicReveal delay={0.2}>
            <div className="bg-[#FAF7F1] border border-[#0B1E34]/12 p-6 sm:p-8 flex items-center gap-5">
              <DeckIcon className="w-12 h-12 text-[#8C6D3A] shrink-0" />
              <div>
                <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#8C6D3A] block mb-1">Waterfront Grandeur</span>
                <span className="font-heading text-2xl sm:text-3xl text-[#0B1E34] font-light">Approx. 1 Lakh Sq. Ft. Riverfront Amenities</span>
              </div>
            </div>
          </CinematicReveal>
        </div>

        {/* Visual + Amenities List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10 sm:mb-16">
          <div className="lg:col-span-7">
            <button
              onClick={() => onOpenImageModal(godrejRendersGallery[6])}
              className="relative block w-full overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[500px] group cursor-pointer bg-[#0B1E34]"
              aria-label="View grand clubhouse render"
            >
              <img
                src="/godrej-clubhouse.webp"
                sizes="(min-width: 1024px) 55vw, 100vw"
                alt="Godrej Mahalunge grand clubhouse and amenities"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06111F]/70 to-transparent pointer-events-none" />
              <span className="absolute left-5 bottom-4 text-[10.5px] uppercase tracking-[0.24em] text-white/80">
                Artist's impression
              </span>
              <ExpandBadge />
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <ul className="divide-y divide-[#0B1E34]/12 bg-[#FAF7F1] border border-[#0B1E34]/12">
              {amenitiesItems.map(({ label, icon: Icon, detail }) => (
                <li key={label} className="p-4 sm:p-5 flex items-start gap-4 group hover:bg-white transition-colors duration-300">
                  <Icon className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 ${iconTone}`} />
                  <div>
                    <h4 className="font-heading text-[16px] sm:text-[18px] text-[#0B1E34] font-light leading-snug">
                      {label}
                    </h4>
                    <p className="text-[13px] text-[#0B1E34]/65 mt-0.5">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section Outro & CTA */}
        <div className="bg-[#FAF7F1] border border-[#0B1E34]/12 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="font-heading text-lg sm:text-xl text-[#0B1E34]/85 max-w-[700px] leading-relaxed">
            From peaceful mornings surrounded by greenery to evenings spent enjoying recreation and leisure, every day offers something to look forward to.
          </p>
          <Btn variant="navy" onClick={onOpenContactForm}>
            View Amenities &amp; Gallery
          </Btn>
        </div>

      </div>
    </section>
  );
};

// =========================================================================
// GALLERY SECTION — Drifting reel
// =========================================================================
const galleryOrder = [2, 4, 8, 3, 7, 0, 9, 1, 10, 6, 11, 5].map((i) => godrejRendersGallery[i]).filter(Boolean);
const reelShapes = ['aspect-[4/5]', 'aspect-[1/1] mt-8 sm:mt-20', 'aspect-[4/5.4] mt-4 sm:mt-8'];

const GallerySection = ({ onOpenImageModal }: { onOpenImageModal: (img: GalleryItem) => void }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const speed = useRef(1);
  const targetSpeed = useRef(1);
  const drag = useRef<{ startX: number; startVal: number } | null>(null);
  const dragged = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setLoopWidth(trackRef.current.scrollWidth / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const wrap = (v: number) => {
    if (!loopWidth) return v;
    let r = v % loopWidth;
    if (r > 0) r -= loopWidth;
    return r;
  };

  useAnimationFrame((_, delta) => {
    if (!loopWidth || drag.current || reduced) return;
    speed.current += (targetSpeed.current - speed.current) * 0.05;
    x.set(wrap(x.get() - 48 * speed.current * (delta / 1000)));
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 6) dragged.current = true;
      x.set(wrap(drag.current.startVal + dx));
    };
    const onUp = () => {
      drag.current = null;
      setTimeout(() => (dragged.current = false), 0);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  });

  const reel = [...galleryOrder, ...galleryOrder];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-[#FAF7F1] pt-4 sm:pt-12 overflow-hidden scroll-mt-20 lg:scroll-mt-[100px]">
      <div className="absolute inset-x-0 bottom-0 h-[50%] sm:h-[54%] bg-[#0B1E34]" />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-5 items-end mb-6 sm:mb-10 lg:mb-16">
        <div className="lg:col-span-7 max-lg:text-center">
          <Eyebrow>Project Gallery</Eyebrow>
          <span id="gallery-title" className="block">
            <Display className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem]" lines={['Inside', <span key="g" className="text-[#8C6D3A]">Godrej Mahalunge</span>]} />
          </span>
        </div>
        <CinematicReveal delay={0.15} className="lg:col-span-4 lg:col-start-9 flex justify-center lg:justify-end">
          <span className="inline-flex items-center gap-4 text-[10.5px] uppercase tracking-[0.26em] text-[#0B1E34]/55">
            <svg viewBox="0 0 40 16" className="w-10 h-4 text-[#8C6D3A]" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 8h28M10 4 6 8l4 4M30 4l4 4-4 4" />
            </svg>
            Drag to explore · Tap to view
          </span>
        </CinematicReveal>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="relative cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={(e) => {
          drag.current = { startX: e.clientX, startVal: x.get() };
          dragged.current = false;
        }}
        onMouseEnter={() => (targetSpeed.current = 0.12)}
        onMouseLeave={() => (targetSpeed.current = 1)}
      >
        <motion.div ref={trackRef} style={{ x }} className="flex items-start w-max gap-5 sm:gap-7 pr-5 sm:pr-7 will-change-transform">
          {reel.map((item, i) => (
            <button
              key={`${item.id}-${i}`}
              onClick={() => !dragged.current && onOpenImageModal(item)}
              onDragStart={(e) => e.preventDefault()}
              aria-hidden={i >= galleryOrder.length ? true : undefined}
              tabIndex={i >= galleryOrder.length ? -1 : 0}
              className="group relative shrink-0 text-left w-[50vw] min-[480px]:w-[42vw] sm:w-[40vw] md:w-[32vw] lg:w-[25vw] xl:w-[340px] cursor-[inherit]"
              aria-label={`View ${item.title}`}
            >
              <div className={`relative overflow-hidden bg-[#06111F] ${reelShapes[i % reelShapes.length]}`}>
                <img
                  src={item.imageUrl}
                  srcSet={srcSet(item.imageUrl)}
                  sizes="(min-width: 1280px) 340px, (min-width: 1024px) 25vw, (min-width: 640px) 40vw, 50vw"
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06111F]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="absolute inset-3 border border-white/0 group-hover:border-white/45 transition-colors duration-700 pointer-events-none" />
                <ExpandBadge />
              </div>
              <div className="pt-3 sm:pt-5 text-white">
                <span className="block text-[10px] sm:text-[10.5px] uppercase tracking-[0.28em] text-[#C9AE76] mb-1.5">{item.category}</span>
                <span className="block font-heading text-[17px] sm:text-xl font-light leading-snug">{item.title}</span>
              </div>
            </button>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 pt-5 sm:pt-10 pb-7 sm:pb-16 flex items-center justify-between gap-6 text-[10px] uppercase tracking-[0.26em] text-white/45">
        <span>Artist's impression</span>
      </div>
    </section>
  );
};

// =========================================================================
// RIVER-FACING VIEWS BAND
// =========================================================================
const ViewsBand = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  return (
    <section ref={ref} aria-label="Riverfront Views" className="relative min-h-[320px] sm:min-h-[560px] lg:min-h-[660px] flex items-center overflow-hidden [clip-path:inset(0)]">
      <motion.img
        src="/godrej-deck.webp"
        sizes="100vw"
        alt="River-facing deck views at Godrej Mahalunge"
        loading="lazy"
        style={{ y, scale: 1.28 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06111F]/90 via-[#06111F]/60 to-[#06111F]/20" />
      <div className="relative max-w-[1320px] w-full mx-auto px-5 sm:px-8 py-10 sm:py-20 max-lg:text-center">
        <CinematicReveal>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#C9AE76] font-medium mb-4">
            Scenic Natural Expanse
          </div>
        </CinematicReveal>
        <Display
          className="text-white text-[1.35rem] sm:text-2xl lg:text-3xl xl:text-[2.35rem] max-w-[960px] leading-[1.2]"
          lines={[<span key="v" className="block text-balance">Premium river-facing residences offering refreshing natural views and open green surroundings.</span>]}
        />
      </div>
    </section>
  );
};

// =========================================================================
// SECTION 6 — LOCATION ADVANTAGES
// =========================================================================
const LocationAdvantagesSection = ({ onOpenLocationMap }: { onOpenLocationMap: () => void }) => {
  const locationCategories = [
    {
      title: "IT & Business Connectivity",
      icon: MetroIcon,
      items: [
        { name: "Hinjewadi IT Park" },
        { name: "Rajiv Gandhi Infotech Park" },
        { name: "Baner Business District" },
        { name: "Balewadi Commercial Corridor" },
      ],
    },
    {
      title: "Lifestyle & Entertainment",
      icon: ShoppingIcon,
      items: [
        { name: "Balewadi High Street" },
        { name: "Baner Cafés & Restaurants" },
        { name: "Balewadi Sports Complex" },
        { name: "Shopping & Entertainment Destinations" },
      ],
    },
    {
      title: "Road Connectivity",
      icon: HighwayIcon,
      items: [
        { name: "Baner–Hinjewadi Road" },
        { name: "Mumbai–Bengaluru Highway (NH-48)" },
        { name: "Wakad" },
        { name: "Pune–Mumbai Expressway Connectivity" },
      ],
    },
    {
      title: "Everyday Conveniences",
      icon: HospitalIcon,
      items: [
        { name: "Reputed Schools & Educational Institutions" },
        { name: "Hospitals & Healthcare Facilities" },
        { name: "Retail & Shopping Destinations" },
      ],
    },
  ];

  const [openGroup, setOpenGroup] = useState(0);

  return (
    <section id="location" className="py-12 sm:py-24 lg:py-36 bg-[#FAF7F1] relative scroll-mt-20 lg:scroll-mt-[100px] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center mb-8 sm:mb-14 lg:mb-16">
          <div className="lg:col-span-6 max-lg:text-center">
            <Eyebrow>Location Advantages</Eyebrow>
            <Display
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] leading-[1.18] mb-3 sm:mb-4"
              lines={['Two Major Pune Hubs.', <span key="p" className="text-[#8C6D3A]">One Perfectly Connected Address.</span>]}
            />
            <CinematicReveal delay={0.1}>
              <p className="font-heading text-base sm:text-lg lg:text-xl text-[#0B1E34]/85 mb-2.5 leading-snug">
                Work Near Hinjewadi. Unwind Around Baner–Balewadi. Live at Mahalunge.
              </p>
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#0B1E34]/70 mb-5 sm:mb-7 text-pretty">
                Strategically positioned in West Pune, Godrej Mahalunge offers connectivity to major employment hubs, lifestyle destinations, educational institutions, and essential conveniences.
              </p>
              <Btn variant="navy" onClick={onOpenLocationMap}>
                Get Location Map
              </Btn>
            </CinematicReveal>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-6">
            <CinematicReveal delay={0.15}>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
                  className="hidden sm:block absolute sm:-bottom-7 sm:-right-7 w-[60%] h-[60%] border border-[#B8975A]/60 pointer-events-none"
                />
                <div className="relative h-[240px] sm:h-[450px] lg:h-[520px] bg-[#F3EEE4] overflow-hidden border border-[#0B1E34]/15">
                  <iframe
                    src="https://maps.google.com/maps?q=Mahalunge+Pune+Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.3) sepia(0.08) contrast(1.02)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Godrej Mahalunge Location Map"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </CinematicReveal>
          </div>
        </div>

        {/* Accordion on Mobile */}
        <CinematicReveal className="md:hidden">
          <div className="border-t border-[#0B1E34]">
            {locationCategories.map((group, gi) => {
              const isOpen = openGroup === gi;
              const GroupIcon = group.icon;
              return (
                <div key={group.title} className="border-b border-[#0B1E34]/[0.15]">
                  <button
                    onClick={() => setOpenGroup(isOpen ? -1 : gi)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 py-4 text-left cursor-pointer"
                  >
                    <GroupIcon className={`w-7 h-7 shrink-0 ${iconTone}`} />
                    <span className="flex-1 font-heading text-[1.1rem] font-light">
                      <span className="text-[#8C6D3A] text-sm tabular-nums mr-2">{String(gi + 1).padStart(2, '0')} —</span>
                      {group.title}
                    </span>
                    <span className="relative w-7 h-7 border border-[#0B1E34]/20 flex items-center justify-center shrink-0">
                      <span className="absolute w-3 h-px bg-[#0B1E34]" />
                      <span className={`absolute w-3 h-px bg-[#0B1E34] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${isOpen ? 'rotate-0' : 'rotate-90'}`} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-4 space-y-2">
                          {group.items.map(({ name }) => (
                            <li key={name} className="flex items-center gap-2.5 py-1.5 pl-2 text-[14px] text-[#0B1E34]/85 border-t border-[#0B1E34]/[0.08]">
                              <span className="w-1.5 h-1.5 bg-[#8C6D3A] shrink-0" />
                              <span>{name}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </CinematicReveal>

        {/* Desktop 4-Column Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {locationCategories.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <CinematicReveal key={group.title} delay={gi * 0.08}>
                <div className="bg-[#FAF7F1] border border-[#0B1E34]/15 p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-[#0B1E34]/15 mb-4">
                      <GroupIcon className={`w-8 h-8 shrink-0 ${iconTone}`} />
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D3A] font-semibold">
                        {String(gi + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-light text-[#0B1E34] mb-4">
                      {group.title}
                    </h3>
                    <ul className="space-y-3">
                      {group.items.map(({ name }) => (
                        <li key={name} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#0B1E34]/80">
                          <span className="w-1.5 h-1.5 bg-[#8C6D3A] shrink-0 mt-1.5" />
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CinematicReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// =========================================================================
// SECTION 7 — WHY CHOOSE GODREJ MAHALUNGE?
// =========================================================================
const godrejStats = [
  { value: 125, suffix: '+ Years', label: 'Legacy of Trust' },
  { value: 40, suffix: '+ Cities', label: 'Presence Across India' },
  { value: 50, suffix: '+ Million', label: 'Sq. Ft. Delivered' },
];

const StatCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
};

const WhyChooseSection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  const reasons = [
    {
      title: "A Prime West Pune Location",
      desc: "Enjoy connectivity to two of Pune's important destinations — Hinjewadi's employment corridor and Baner–Balewadi's lifestyle hub.",
    },
    {
      title: "A Distinctive Residential Experience",
      desc: "French-inspired design, low-density living, and river-facing residences create a unique lifestyle proposition.",
    },
    {
      title: "Premium Living Spaces",
      desc: "Choose between thoughtfully designed 3 BHK apartments and limited 4 BHK duplex residences.",
    },
    {
      title: "A Lifestyle Beyond Your Apartment",
      desc: "Enjoy access to clubhouse amenities, fitness facilities, recreation spaces, and landscaped surroundings.",
    },
    {
      title: "The Confidence of Godrej",
      desc: "Experience the design philosophy and residential development expertise associated with Godrej Properties.",
    },
  ];

  return (
    <section id="why-choose" className="relative py-14 sm:py-24 lg:py-36 bg-[#0B1E34] text-white scroll-mt-20 lg:scroll-mt-[100px] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full bg-[#C9AE76]/[0.06] blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8">

        <div className="text-center max-w-[850px] mx-auto mb-10 sm:mb-14 lg:mb-16">
          <Eyebrow light center>Why Choose Godrej Mahalunge</Eyebrow>
          <Display
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] mb-3 sm:mb-4"
            lines={['An Address That', <span key="w" className="text-[#E3CF9F]">Brings Everything Together.</span>]}
          />
          <p className="text-[14px] sm:text-base text-white/80 max-w-[660px] mx-auto">
            Experience the design philosophy and residential development expertise associated with Godrej Properties.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {reasons.map((r, i) => (
            <CinematicReveal key={r.title} delay={i * 0.08} className="h-full">
              <div className="bg-[#FAF7F1]/10 backdrop-blur-sm border border-white/15 p-6 sm:p-8 flex flex-col justify-between h-full hover:border-[#C9AE76] transition-colors duration-500">
                <div>
                  <span className="font-heading text-xl text-[#C9AE76] block mb-3 tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-light text-white mb-3">
                    {r.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-white/70 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            </CinematicReveal>
          ))}

          {/* CTA Box inside the grid */}
          <CinematicReveal delay={0.4} className="h-full">
            <div className="bg-[#FAF7F1] text-[#0B1E34] p-6 sm:p-8 flex flex-col justify-between h-full border border-[#C9AE76]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.26em] text-[#8C6D3A] font-semibold block mb-2">
                  Exclusive Residences
                </span>
                <h3 className="font-heading text-2xl font-light mb-3">
                  Find Your Ideal Home in West Pune
                </h3>
                <p className="text-[14px] text-[#0B1E34]/70 mb-6">
                  Schedule a private consultation and explore tailored payment plans &amp; availability.
                </p>
              </div>
              <Btn variant="navy" onClick={onOpenContactForm}>
                Enquire About Available Residences
              </Btn>
            </div>
          </CinematicReveal>
        </div>

        {/* Godrej Legacy Stats */}
        <div className="border-t border-white/15 pt-12 sm:pt-16">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center max-w-[960px] mx-auto">
            {godrejStats.map((st, i) => (
              <CinematicReveal key={st.label} delay={0.2 + i * 0.1} className="h-full">
                <li className="bg-white/5 border border-white/15 p-6 sm:p-8 flex flex-col items-center justify-center h-full hover:border-[#C9AE76] transition-colors duration-500">
                  <div className="font-heading font-light text-[2.2rem] sm:text-4xl lg:text-5xl leading-none tracking-[-0.02em] mb-2 text-white">
                    <StatCounter value={st.value} />
                    <span className="text-[#C9AE76] text-2xl sm:text-3xl ml-1 font-light">{st.suffix}</span>
                  </div>
                  <div className="text-[10px] sm:text-[11.5px] uppercase tracking-[0.24em] text-[#C9AE76]">{st.label}</div>
                </li>
              </CinematicReveal>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

// =========================================================================
// SECTION 8 — FINAL CTA & LEAD GENERATION
// =========================================================================
const FinalLeadGenSection = () => {
  const accessItems = [
    'Latest Pricing & Availability',
    'Complete Project Brochure',
    'Floor Plans & Configurations',
    'Amenities & Project Details',
    'Private Site Visit Assistance',
  ];

  return (
    <section id="enquiry" className="py-12 sm:py-24 lg:py-36 bg-[#0B1E34] text-white relative scroll-mt-20 lg:scroll-mt-[100px] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/godrej-banner-3.webp"
          sizes="100vw"
          alt=""
          className="w-full h-full object-cover object-[55%_center] lg:object-center opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E34] via-[#0B1E34]/90 to-[#0B1E34]/60" />
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

          {/* Left Column Copy */}
          <div className="lg:col-span-6 max-lg:text-center">
            <Eyebrow light>Your Next Home Awaits</Eyebrow>
            <Display
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] mb-3 sm:mb-4"
              lines={['Your Next Home in', <span key="w" className="text-[#E3CF9F]">West Pune Awaits.</span>]}
            />

            <CinematicReveal delay={0.1}>
              <h3 className="font-heading text-lg sm:text-xl text-white/95 font-light mb-2.5">
                Godrej Mahalunge — Where French Elegance Meets Modern Living.
              </h3>
              <p className="text-[15px] sm:text-[17px] text-white/80 mb-2">
                Premium 3 BHK Residences &amp; Limited 4 BHK Duplex Homes
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6 max-lg:justify-center">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#C9AE76]">📍 Mahalunge, Pune</span>
                <span className="text-white/40">•</span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#C9AE76] font-semibold">Starting ₹1.90 Cr Onwards*</span>
              </div>
            </CinematicReveal>

            {/* "Get access to" list */}
            <CinematicReveal delay={0.2}>
              <div className="border-t border-white/15 pt-6 mb-8 text-left max-lg:max-w-[420px] max-lg:mx-auto">
                <p className="text-[11px] uppercase tracking-[0.26em] text-[#C9AE76] font-semibold mb-4">
                  Get Exclusive Access To:
                </p>
                <ul className="space-y-3">
                  {accessItems.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[14.5px] text-white/85">
                      <span className="w-1.5 h-1.5 bg-[#C9AE76] rotate-45 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CinematicReveal>

            <CinematicReveal delay={0.3}>
              <a
                href={`tel:${projectSnapshot.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-3 text-white/90 hover:text-[#C9AE76] transition-colors text-base"
              >
                <PhoneIcon className="w-5 h-5 text-[#C9AE76]" />
                <span className="font-heading text-xl tabular-nums">{projectSnapshot.phone}</span>
              </a>
            </CinematicReveal>
          </div>

          {/* Right Lead Generation Form */}
          <div className="lg:col-span-6">
            <CinematicReveal delay={0.2}>
              <div className="relative bg-[#FAF7F1] text-[#0B1E34] p-6 sm:p-12 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.6)]">
                <span className="absolute top-0 left-6 sm:left-12 w-16 h-[2px] bg-[#B8975A]" />
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6D3A] font-semibold block mb-1">
                    Enquire Now
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-light text-[#0B1E34]">
                    Get Project Details
                  </h3>
                </div>

                <EnquiryForm ctaText="Get Complete Project Details" compact />

                <p className="mt-6 text-[11px] text-[#0B1E34]/50 text-center italic">
                  Prices, availability, specifications and offers are subject to confirmation and change.
                </p>
              </div>
            </CinematicReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
