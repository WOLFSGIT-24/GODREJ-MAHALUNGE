// Shared enquiry form used by the popup and the in-page final CTA.
import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowIcon } from '@/components/icons/AurisIcons';

const CONFIGURATIONS = [
  '3 BHK Premium (1960 Sq.Ft)',
  '3 BHK Grande (2700 Sq.Ft)',
  '4 BHK Grande (3150 Sq.Ft)',
];
const CONFIG_LABELS: Record<string, string> = {
  '3 BHK Premium (1960 Sq.Ft)': '3 BHK Premium (1,960 Sq.Ft)',
  '3 BHK Grande (2700 Sq.Ft)': '3 BHK Grande (2,700 Sq.Ft)',
  '4 BHK Grande (3150 Sq.Ft)': '4 BHK Grande (3,150 Sq.Ft)',
};
const BUDGETS = ['₹2.60 Cr* Onwards', '₹3.60 Cr* Onwards', '₹4.35 Cr* Onwards'];
const BUDGET_LABELS: Record<string, string> = {
  '₹2.60 Cr* Onwards': '₹2.60 Cr* Onwards',
  '₹3.60 Cr* Onwards': '₹3.60 Cr* Onwards',
  '₹4.35 Cr* Onwards': '₹4.35 Cr* Onwards',
};

const EMPTY = {
  name: '',
  phoneNumber: '',
  email: '',
  city: 'Pune',
  configuration: CONFIGURATIONS[0],
  budget: BUDGETS[0],
};

interface EnquiryFormProps {
  ctaText?: string;
  autoFocus?: boolean;
  onSuccess?: () => void;
  /** Tighter spacing for the popup sheet on small screens. */
  compact?: boolean;
}

export default function EnquiryForm({
  ctaText = 'Get Complete Project Details',
  autoFocus = false,
  onSuccess,
  compact = false,
}: EnquiryFormProps) {
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Skip on phones: focusing would raise the keyboard over the sheet straight away.
    if (autoFocus && window.matchMedia('(min-width: 768px)').matches) nameRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (name === 'phoneNumber') {
      sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'name') {
      sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
    }
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name';
    }
    if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      onSuccess?.();
      // Full page load (not an in-app route change) on /thank-you.
      try {
        sessionStorage.setItem('enquiryName', formData.name);
      } catch {
        // Storage blocked: the thank-you page just skips the name.
      }
      window.location.assign('/thank-you');
      setFormData(EMPTY);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setSubmitError("We couldn't process your details. Please try again, or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const label = `block text-[10.5px] uppercase tracking-[0.24em] text-[#0B1E34]/60 mb-1.5 ${compact ? 'short:!mb-0.5 micro:!mb-0 micro:!text-[9.5px]' : ''}`;
  const field = (err?: string) =>
    `w-full bg-transparent border-b ${err ? 'border-[#B3261E]' : 'border-[#0B1E34]/25'} focus:border-[#0B1E34] ${compact ? 'py-2 sm:py-3 short:!py-1.5 tiny:!py-1 micro:!py-0.5' : 'py-3'} text-[16px] text-[#0B1E34] placeholder-[#0B1E34]/30 focus:outline-none transition-colors duration-500`;
  const Chevron = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className="pointer-events-none absolute right-0 bottom-3.5 w-4 h-4 text-[#0B1E34]/70" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
  const errorText = (msg?: string, elId?: string) =>
    msg ? <p id={elId} className="text-[#B3261E] text-[12px] mt-1.5">{msg}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? 'space-y-3.5 sm:space-y-6 short:!space-y-3 tiny:!space-y-2 micro:!space-y-1.5' : 'space-y-6'}>
      <div>
        <label htmlFor={`${id}-name`} className={label}>Full Name *</label>
        <input
          ref={nameRef}
          id={`${id}-name`}
          type="text"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
          className={field(errors.name)}
        />
        {errorText(errors.name, `${id}-name-err`)}
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-3.5 sm:gap-y-6 ${compact ? 'short:!gap-y-3 tiny:!gap-y-2 micro:!gap-y-1.5' : ''}`}>
      <div>
        <label htmlFor={`${id}-phone`} className={label}>Mobile Number *</label>
        <div className={`flex items-center gap-3 border-b ${errors.phoneNumber ? 'border-[#B3261E]' : 'border-[#0B1E34]/25'} focus-within:border-[#0B1E34] transition-colors duration-500`}>
          <span className="text-[16px] text-[#0B1E34]/55 tabular-nums">+91</span>
          <span className="h-4 w-px bg-[#0B1E34]/20" />
          <input
            id={`${id}-phone`}
            type="tel"
            name="phoneNumber"
            inputMode="numeric"
            autoComplete="tel-national"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit number"
            aria-invalid={!!errors.phoneNumber}
            aria-describedby={errors.phoneNumber ? `${id}-phone-err` : undefined}
            className={`flex-1 min-w-0 bg-transparent ${compact ? 'py-2 sm:py-3 short:!py-1.5 tiny:!py-1 micro:!py-0.5' : 'py-3'} text-[16px] text-[#0B1E34] tabular-nums placeholder-[#0B1E34]/30 focus:outline-none`}
          />
        </div>
        {errorText(errors.phoneNumber, `${id}-phone-err`)}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={label}>Email *</label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-err` : undefined}
          className={field(errors.email)}
        />
        {errorText(errors.email, `${id}-email-err`)}
      </div>
      </div>

      <div>
        <label htmlFor={`${id}-city`} className={label}>City</label>
        <input
          id={`${id}-city`}
          type="text"
          name="city"
          autoComplete="address-level2"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. Pune"
          className={field()}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-7">
        <div className="relative">
          <label htmlFor={`${id}-config`} className={label}>Configuration</label>
          <select id={`${id}-config`} name="configuration" value={formData.configuration} onChange={handleChange} className={`${field()} appearance-none pr-7 cursor-pointer`}>
            {CONFIGURATIONS.map((c) => <option key={c} value={c}>{CONFIG_LABELS[c]}</option>)}
          </select>
          <Chevron />
        </div>
        <div className="relative">
          <label htmlFor={`${id}-budget`} className={label}>Budget</label>
          <select id={`${id}-budget`} name="budget" value={formData.budget} onChange={handleChange} className={`${field()} appearance-none pr-7 cursor-pointer`}>
            {BUDGETS.map((b) => <option key={b} value={b}>{BUDGET_LABELS[b]}</option>)}
          </select>
          <Chevron />
        </div>
      </div>

      <div className={compact ? 'pt-1 sm:pt-2 short:!pt-1' : 'pt-2'}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group relative w-full overflow-hidden bg-[#0B1E34] text-[#FAF7F1] ${compact ? 'py-4 sm:py-[18px] short:!py-3.5 tiny:!py-3 micro:!py-2.5' : 'py-[18px]'} text-[11px] uppercase tracking-[0.26em] cursor-pointer active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait`}
        >
          <span className="absolute inset-0 bg-[#1A3558] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
          <span className="relative flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                Sending
              </>
            ) : (
              <>
                {ctaText}
                <ArrowIcon className="w-4 h-4 text-[#C9AE76] transition-transform duration-500 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
        {submitError && <p className="text-[#B3261E] text-[13px] mt-3" role="alert">{submitError}</p>}
      </div>

      <p className={`text-[12px] leading-relaxed text-[#0B1E34]/55 ${compact ? 'micro:!text-[11px] micro:!leading-snug' : ''}`}>
        Our representative will get in touch with you to share the latest project details.
      </p>
    </form>
  );
}
