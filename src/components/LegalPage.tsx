// Shared layout for the Privacy Policy and Terms & Conditions pages.
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#0B1E34]">
      <Header />

      <main className="w-full pt-[80px] lg:pt-[100px]">
        <section className="bg-[#F3EEE4] border-b border-[#0B1E34]/10">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-12 sm:py-20 max-lg:text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <div className="flex items-center max-lg:justify-center gap-4 mb-5">
                <span className="h-px w-10 bg-[#B8975A]" />
                <span className="text-[11px] uppercase tracking-[0.34em] text-[#8C6D3A]">Godrej Mahalunge · West Pune</span>
                <span className="h-px w-10 bg-[#B8975A] lg:hidden" />
              </div>
              <h1 className="font-heading font-light text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-[-0.015em] mb-4">{title}</h1>
              <p className="text-[13px] uppercase tracking-[0.2em] text-[#0B1E34]/50">Last updated: {updated}</p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-[1320px] mx-auto px-5 sm:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8"
          >
            {/* Contents */}
            <nav aria-label="Contents" className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#8C6D3A] mb-4">Contents</p>
                <ol className="space-y-2.5 text-[14px] text-[#0B1E34]/65">
                  {sections.map((s, i) => (
                    <li key={s.heading}>
                      <a href={`#s${i + 1}`} className="hover:text-[#0B1E34] transition-colors">
                        <span className="tabular-nums text-[#8C6D3A] mr-2">{String(i + 1).padStart(2, '0')}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article className="lg:col-span-8 lg:col-start-5 max-w-[760px]">
              <div className="text-[16px] sm:text-[17px] leading-[1.85] text-[#0B1E34]/75 mb-10 sm:mb-14 space-y-4">{intro}</div>
              <div className="space-y-10 sm:space-y-12">
                {sections.map((s, i) => (
                  <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-28 border-t border-[#0B1E34]/10 pt-8">
                    <h2 className="font-heading font-light text-[1.6rem] sm:text-[2rem] leading-tight mb-4">
                      <span className="tabular-nums text-[#8C6D3A] text-[1rem] sm:text-[1.15rem] mr-3 align-middle">{String(i + 1).padStart(2, '0')}</span>
                      {s.heading}
                    </h2>
                    <div className="text-[15px] sm:text-[16px] leading-[1.85] text-[#0B1E34]/70 space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-[#0B1E34] [&_a]:border-b [&_a]:border-[#B8975A]/60">
                      {s.body}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
