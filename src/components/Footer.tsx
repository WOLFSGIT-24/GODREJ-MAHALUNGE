import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, DownloadIcon, ExternalIcon, ShieldIcon } from '@/components/icons/AurisIcons';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenContactForm?: () => void;
  onOpenBrochure?: () => void;
}

const btn =
  'group inline-flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-7 py-[14px] sm:py-[15px] text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.16em] sm:tracking-[0.24em] transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-[0.98]';

export default function Footer({ onOpenContactForm, onOpenBrochure }: FooterProps) {
  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.location.assign(`/${id}`);
  };
  const openEnquiry = onOpenContactForm ?? (() => window.location.assign('/#enquiry'));
  const openBrochure = onOpenBrochure ?? openEnquiry;

  return (
    <footer id="footer" className="relative w-full bg-[#F3EEE4] text-[#0B1E34] pt-10 sm:pt-24 pb-6 md:pb-12">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">

        {/* Brand + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-8 pb-8 sm:pb-14 border-b border-[#0B1E34]/15 max-lg:text-center">
          <div className="lg:col-span-4 flex flex-col items-start max-lg:items-center">
            <img src="/godrej-logo.png" alt="Godrej Mahalunge" className="h-10 sm:h-12 w-auto object-contain mb-2" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#8C6D3A] font-medium">
              French-Inspired Luxury Living · West Pune
            </span>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <p className="font-heading text-[1.1rem] sm:text-[1.4rem] font-light tracking-[-0.01em]">
              Premium 3 BHK Residences &amp; Limited 4 BHK Duplex Homes
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:flex sm:flex-row lg:flex-col xl:flex-row gap-2 sm:gap-3 max-lg:justify-center lg:items-end xl:items-start lg:justify-end">
            <button onClick={openEnquiry} className={`${btn} bg-[#0B1E34] text-[#FAF7F1] hover:bg-[#17304F]`}>
              Enquire Now
              <ArrowIcon className="w-4 h-4 text-[#C9AE76] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={openBrochure}
              className={`${btn} border border-[#0B1E34]/50 hover:bg-[#0B1E34] hover:text-[#FAF7F1]`}
            >
              <DownloadIcon className="w-4 h-4" />
              <span className="sm:hidden">Brochure</span>
              <span className="hidden sm:inline">Download Brochure</span>
            </button>
          </div>
        </div>

        {/* Quick links + developer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-6 sm:py-12 border-b border-[#0B1E34]/15">
          <nav aria-label="Footer" className="hidden sm:grid md:col-span-8 grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-8 max-md:text-center">
            {[
              ['Overview', '#overview'],
              ['Pricing', '#pricing'],
              ['USPs', '#usps'],
              ['Amenities', '#amenities'],
              ['Location', '#location'],
              ['Why Godrej', '#why-choose'],
              ['Enquiry', '#enquiry'],
            ].map(([label, href]) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-center md:text-left text-[15px] text-[#0B1E34]/75 hover:text-[#0B1E34] transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="md:col-span-4 flex justify-center md:justify-end items-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#0B1E34]/50">A development by</span>
            <div className="flex flex-col text-left">
              <span className="font-heading text-lg font-light tracking-[0.14em] uppercase text-[#0B1E34] leading-tight">GODREJ</span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#8C6D3A] font-semibold leading-none">PROPERTIES</span>
            </div>
          </div>
        </div>

        {/* RERA + disclaimer */}
        <div id="disclaimer" className="py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start max-lg:text-center">
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start gap-4 sm:gap-5 max-lg:justify-center">
            <img src="/godrej-rera-qr.png" alt="MahaRERA QR Code" width={120} height={121} loading="lazy" className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-white p-1.5 border border-[#0B1E34]/15" />
            <div className="space-y-2.5">
              <div className="flex items-center max-lg:justify-center gap-3 text-[14px]">
                <ShieldIcon className="w-5 h-5 text-[#8C6D3A] shrink-0" />
                <span>MahaRERA Registered Project</span>
              </div>
              <a
                href="https://maharera.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] text-[#0B1E34]/70 hover:text-[#0B1E34] border-b border-[#B8975A]/60 pb-0.5 transition-colors"
              >
                maharera.maharashtra.gov.in
                <ExternalIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <p className="lg:col-span-8 text-[11px] sm:text-[12px] leading-[1.7] sm:leading-[1.8] text-[#0B1E34]/60">
            <span className="text-[#0B1E34]/80">Disclaimer:</span> The images, artist’s impressions, specifications, layout plans, and details displayed herein are indicative and subject to change without notice in the interest of the development and as permitted by law. Prices, availability, specifications, and offers are subject to confirmation and change. Tolerance of +/- 3% is possible in unit areas on account of design and construction variances. This electronic / printed material does not constitute an offer, brochure, or contract between the developer/promoter and the recipient. No booking or allotment shall be deemed to have been made on the basis of this material.
          </p>
        </div>

        {/* Authorised sales partner */}
        <div className="py-6 sm:py-8 border-t border-[#0B1E34]/15 flex flex-col sm:flex-row items-center justify-between gap-4 max-lg:text-center">
          <div>
            <p className="font-heading text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#8C6D3A]">
              Authorised Channel Partner
            </p>
            <p className="mt-1 text-[13px] text-[#0B1E34]/80">Affiliate Partner for Godrej Properties</p>
          </div>
          <img src="/godrej-partner-logo.png" alt="Authorised Affiliate Partner" className="h-12 sm:h-14 w-auto object-contain" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 max-sm:text-center border-t border-[#0B1E34]/15 text-[12.5px] text-[#0B1E34]/60">
          <p>© {new Date().getFullYear()} Godrej Mahalunge. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms-and-conditions" className="hover:text-[#0B1E34] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy-policy" className="hover:text-[#0B1E34] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
