import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryForm from '@/components/EnquiryForm';
import { srcSet } from '@/lib/responsive-image';
import { CloseIcon } from '@/components/icons/AurisIcons';
import { lockScroll, unlockScroll } from '@/lib/scroll-lock';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactFormModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Enquire Now",
  subtitle = "Godrej Mahalunge · West Pune",
  ctaText = "GET COMPLETE PROJECT DETAILS"
}: ContactFormModalProps) {
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  // Parent passes a new onClose each render; keep the latest without re-running effects.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Esc closes; page behind does not scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current();
    window.addEventListener('keydown', onKey);
    lockScroll();
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockScroll();
      clearTimeout(closeTimer.current);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="enquiry-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 short:!p-3 micro:!p-2"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div onClick={onClose} className="absolute inset-0 bg-[#06111F]/80 backdrop-blur-sm" />

          <motion.div
            initial={{ y: 24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative w-full max-w-[400px] sm:max-w-[480px] md:max-w-[980px] max-h-[calc(100svh-2rem)] sm:max-h-[calc(100svh-3rem)] short:!max-h-[calc(100svh-1.5rem)] micro:!max-h-[calc(100svh-1rem)] overflow-y-auto overscroll-contain bg-[#FAF7F1] grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] tiny:!grid-cols-1 md:tiny:!max-w-[560px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.6)]"
          >
            {/* Visual side (tablet and up) */}
            <div className="relative hidden md:block tiny:!hidden min-h-[560px] short:!min-h-0 overflow-hidden bg-[#0B1E34]">
              <motion.img
                src="/godrej-banner-2.webp"
                sizes="460px"
                alt="Godrej Mahalunge luxury residences"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.4, ease: EASE }}
                className="absolute inset-0 w-full h-full object-cover object-[50%_35%]"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111F] via-[#06111F]/55 to-[#06111F]/25" />

              <div className="absolute top-8 left-9 short:!top-6 short:!left-7 flex flex-col">
                <img src="/godrej-logo.png" alt="Godrej Mahalunge" className="h-7 w-auto object-contain brightness-0 invert" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9AE76] mt-1">West Pune</span>
              </div>

              <div className="absolute inset-x-9 bottom-9 short:!inset-x-7 short:!bottom-7 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-[#C9AE76]" />
                  <span className="text-[10.5px] uppercase tracking-[0.3em] text-[#C9AE76]">{subtitle}</span>
                </div>
                <h2 className="font-heading font-light text-2xl sm:text-3xl leading-[1.1] tracking-[-0.01em]">
                  {title}
                </h2>
              </div>
            </div>

            {/* Form side */}
            <div className="relative px-5 pt-5 pb-6 sm:p-9 md:p-11 short:!px-6 short:!pt-5 short:!pb-5 sm:short:!px-8 md:short:!px-9 md:short:!pt-8 md:short:!pb-6 tiny:!pt-4 tiny:!pb-4 md:tiny:!pt-4 md:tiny:!pb-4 micro:!pt-3 micro:!pb-3 md:micro:!pt-3 md:micro:!pb-3">
              <span className="hidden md:block tiny:!hidden absolute top-0 left-11 w-16 h-[2px] bg-[#B8975A]" />

              {/* Compact heading on phones, where the visual side is hidden */}
              <div className="md:hidden tiny:!block pr-10 mb-4 short:!mb-3 micro:!mb-2">
                <span className="block text-[10px] uppercase tracking-[0.2em] min-[400px]:tracking-[0.28em] text-[#8C6D3A] mb-2 micro:!hidden">{subtitle}</span>
                <h2 className="font-heading font-light text-[1.6rem] tiny:!text-[1.4rem] micro:!text-[1.2rem] leading-[1.05] tracking-[-0.01em] text-[#0B1E34]">{title}</h2>
              </div>

              <div className="hidden md:block h-4 short:!hidden" />

              <EnquiryForm
                ctaText={ctaText}
                autoFocus
                compact
                onSuccess={() => {
                  onSuccess?.();
                  closeTimer.current = setTimeout(() => onCloseRef.current(), 2500);
                }}
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 flex items-center justify-center text-[#0B1E34] hover:bg-[#0B1E34] hover:text-white transition-colors duration-300 cursor-pointer z-10"
              aria-label="Close"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
