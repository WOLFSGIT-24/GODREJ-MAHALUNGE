import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectSnapshot } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { ArrowIcon, CloseIcon, DownloadIcon, MenuIcon, PhoneIcon } from "@/components/icons/AurisIcons";

interface HeaderProps {
  onOpenContactForm?: () => void;
  onOpenBrochure?: () => void;
}

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Pricing", href: "#pricing" },
  { label: "USPs", href: "#usps" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Why Godrej", href: "#why-choose" },
  { label: "Enquiry", href: "#enquiry" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header({ onOpenContactForm, onOpenBrochure }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveHref(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    // The open menu locks page scroll; release it before scrolling, or the scroll is ignored.
    unlockScroll();
    const target = document.querySelector(href);
    if (!target) {
      window.location.assign(`/${href}`); // section lives on the homepage
      return;
    }
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth" }));
  };

  // Outside the homepage there is no popup form: send enquiries to the homepage form.
  const openEnquiry = onOpenContactForm ?? (() => window.location.assign("/#enquiry"));
  const openBrochure = onOpenBrochure ?? openEnquiry;

  const tel = `tel:${projectSnapshot.phone.replace(/\s+/g, "")}`;
  // The hero banner now sits below the header, so the bar is always solid.
  const clear = false;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          clear
            ? "bg-transparent text-white"
            : `bg-[#FAF7F1]/95 backdrop-blur-md text-[#0B1E34] ${isScrolled ? "shadow-[0_12px_32px_-20px_rgba(11,30,52,0.35)]" : ""}`
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex h-[80px] lg:h-[100px] items-center justify-between gap-4 sm:gap-6">

            <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (document.getElementById("hero")) window.scrollTo({ top: 0, behavior: "smooth" });
                else window.location.assign("/");
              }}
              className="cursor-pointer flex items-center gap-3 shrink-0 py-1"
              aria-label="Godrej Mahalunge — back to top"
            >
              <img
                src="/godrej-logo.png"
                alt="Godrej Mahalunge"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              />
            </button>
            </div>

            <nav aria-label="Primary" className="hidden xl:flex items-center gap-9 2xl:gap-11">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative py-2 text-[14px] tracking-[0.03em] whitespace-nowrap cursor-pointer transition-colors duration-500 ${
                      clear
                        ? "text-white/80 hover:text-white"
                        : isActive ? "text-[#0B1E34]" : "text-[#0B1E34]/60 hover:text-[#0B1E34]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 right-0 -bottom-0.5 h-px origin-left transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                        clear ? "bg-[#C9AE76]" : "bg-[#B8975A]"
                      } ${isActive && !clear ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              <a
                href={tel}
                className={`hidden 2xl:inline-flex items-center gap-2.5 text-[14px] tabular-nums transition-colors duration-500 ${
                  clear ? "text-white/85 hover:text-white" : "text-[#0B1E34]/75 hover:text-[#0B1E34]"
                }`}
              >
                <PhoneIcon className={`w-4 h-4 ${clear ? "text-[#C9AE76]" : "text-[#8C6D3A]"}`} />
                {projectSnapshot.phone}
              </a>

              <button
                onClick={openEnquiry}
                className={`group relative hidden sm:inline-flex items-center overflow-hidden border px-6 py-3 text-[11px] uppercase tracking-[0.24em] cursor-pointer active:scale-[0.98] transition-colors duration-700 ${
                  clear ? "border-white/60" : "border-[#0B1E34]/70"
                }`}
              >
                <span
                  className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    clear ? "bg-white" : "bg-[#0B1E34]"
                  }`}
                />
                <span className={`relative transition-colors duration-500 ${clear ? "group-hover:text-[#0B1E34]" : "group-hover:text-[#FAF7F1]"}`}>
                  Enquire Now
                </span>
              </button>

              <div className={`hidden md:flex flex-col justify-center pl-5 border-l transition-colors duration-700 ${clear ? "border-white/25" : "border-[#0B1E34]/15"}`}>
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#0B1E34]/50 leading-none mb-0.5">By</span>
                <span className="font-heading text-[14px] lg:text-[15px] font-light tracking-[0.14em] uppercase text-[#0B1E34] leading-tight">GODREJ</span>
                <span className="text-[8px] uppercase tracking-[0.24em] text-[#8C6D3A] font-semibold leading-none">PROPERTIES</span>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden w-11 h-11 -mr-2 flex items-center justify-center text-current cursor-pointer"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* reading progress hairline (hidden over the hero) */}
        <div className={`h-px transition-opacity duration-700 bg-[#0B1E34]/10 ${clear ? "opacity-0" : "opacity-100"}`}>
          <div className="h-px bg-[#B8975A] origin-left" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="xl:hidden fixed inset-0 top-[81px] lg:top-[101px] z-40 bg-[#FAF7F1] overflow-y-auto"
          >
            <nav aria-label="Mobile" className="px-5 sm:px-8 pt-6 pb-28">
              {navItems.map((item, i) => (
                <div key={item.label} className="overflow-hidden border-b border-[#0B1E34]/10">
                  <motion.button
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay: 0.04 * i, ease: EASE }}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center justify-between py-4 font-heading text-[1.8rem] font-light text-left text-[#0B1E34] cursor-pointer"
                  >
                    {item.label}
                    <ArrowIcon className="w-5 h-5 text-[#8C6D3A]" />
                  </motion.button>
                </div>
              ))}

              <div className="pt-8 flex flex-col gap-3">
                <button
                  className="w-full bg-[#0B1E34] text-[#FAF7F1] py-4 text-[11px] uppercase tracking-[0.24em] cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openEnquiry();
                  }}
                >
                  Enquire Now
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openBrochure();
                  }}
                  className="w-full flex items-center justify-center gap-3 py-4 text-[11px] uppercase tracking-[0.24em] text-[#0B1E34] border border-[#0B1E34]/50 cursor-pointer"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download Brochure
                </button>
                <a href={tel} className="mt-4 inline-flex items-center justify-center gap-3 text-[15px] tabular-nums text-[#0B1E34]/80">
                  <PhoneIcon className="w-4 h-4 text-[#8C6D3A]" />
                  {projectSnapshot.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating vertical enquire tab (desktop) */}
      <button
        onClick={openEnquiry}
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#0B1E34] hover:bg-[#17304F] text-[#FAF7F1] py-7 px-3 transition-colors duration-500 cursor-pointer items-center border-l-2 border-[#C9AE76]"
        style={{ writingMode: "vertical-rl" }}
        aria-label="Enquire Now"
      >
        <span className="text-[10.5px] tracking-[0.32em] uppercase rotate-180">Enquire Now</span>
      </button>
    </>
  );
}
