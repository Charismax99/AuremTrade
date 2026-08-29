'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import {
  LEAD_FIELD_LIMITS,
  validateLeadInput,
  type LeadField,
  type LeadValidationErrors,
} from '@/lib/lead-validation';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

interface LeadApiResponse {
  success?: boolean;
  message?: string;
  errors?: LeadValidationErrors;
}

const inputClasses =
  'min-h-12 w-full rounded-lg border border-charcoal-500/70 bg-charcoal-950/65 px-4 py-3 text-base text-text-primary outline-none transition placeholder:text-text-muted/65 hover:border-charcoal-500 focus:border-gold-500/75 focus:ring-2 focus:ring-gold-500/15 disabled:cursor-not-allowed disabled:opacity-60';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-gold-300" role="alert">
      <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export function LeadForm() {
  const formRegionRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const focusForm = () => {
      if (window.location.hash === '#lead-form') {
        window.requestAnimationFrame(() => formRegionRef.current?.focus({ preventScroll: true }));
      }
    };

    focusForm();
    window.addEventListener('hashchange', focusForm);
    return () => window.removeEventListener('hashchange', focusForm);
  }, []);

  const clearFieldError = (field: LeadField) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

    if (submissionState === 'error') {
      setSubmissionState('idle');
      setFormMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionState === 'submitting' || submissionState === 'success') return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const validation = validateLeadInput(payload);

    if (!validation.success) {
      setErrors(validation.errors);
      setSubmissionState('error');
      setFormMessage('Please correct the highlighted fields.');

      const firstInvalidField = Object.keys(validation.errors)[0] as LeadField | undefined;
      if (firstInvalidField) {
        const firstInvalidElement = form.elements.namedItem(firstInvalidField);
        if (firstInvalidElement instanceof HTMLElement) {
          firstInvalidElement.focus();
        }
      }
      return;
    }

    setErrors({});
    setFormMessage('');
    setSubmissionState('submitting');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': crypto.randomUUID(),
        },
        body: JSON.stringify(validation.data),
      });
      const result = (await response.json().catch(() => ({}))) as LeadApiResponse;

      if (!response.ok || !result.success) {
        if (result.errors) setErrors(result.errors);
        setSubmissionState('error');
        setFormMessage(
          result.message ??
            'We could not submit your inquiry right now. Please try again or email info@aurem.trade.'
        );
        return;
      }

      form.reset();
      setSubmissionState('success');
      window.requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setSubmissionState('error');
      setFormMessage(
        'We could not submit your inquiry right now. Please try again or email info@aurem.trade.'
      );
    }
  };

  return (
    <div
      ref={formRegionRef}
      id="lead-form"
      tabIndex={-1}
      className="scroll-mt-28 rounded-2xl border border-charcoal-600/70 bg-charcoal-800/75 p-6 text-left shadow-2xl shadow-black/20 outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-gold-500/70 sm:p-8 lg:p-10"
      aria-labelledby="lead-form-heading"
    >
      <div className="flex flex-col gap-4 border-b border-charcoal-600/60 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
            Private inquiry
          </p>
          <h3 id="lead-form-heading" className="mt-3 font-serif text-2xl font-semibold text-text-primary sm:text-3xl">
            Start a Conversation
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-text-secondary sm:text-right">
          Share your details and our team will follow up directly.
        </p>
      </div>

      {submissionState === 'success' ? (
        <div
          ref={successRef}
          tabIndex={-1}
          className="flex min-h-64 flex-col items-center justify-center px-4 py-12 text-center outline-none"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-gold-500" strokeWidth={1.5} />
          <h4 className="mt-5 font-serif text-2xl font-semibold text-text-primary">Inquiry Received</h4>
          <p className="mt-3 max-w-md leading-relaxed text-text-secondary">
            Thank you. Your inquiry has been received. Our team will be in touch.
          </p>
        </div>
      ) : (
        <form className="mt-8" noValidate onSubmit={handleSubmit}>
          <fieldset disabled={submissionState === 'submitting'}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-full-name" className="mb-2 block text-sm font-medium text-text-primary">
                  Full Name <span className="text-gold-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="lead-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={LEAD_FIELD_LIMITS.fullName}
                  aria-required="true"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'lead-full-name-error' : undefined}
                  className={inputClasses}
                  onChange={() => clearFieldError('fullName')}
                />
                <FieldError id="lead-full-name-error" message={errors.fullName} />
              </div>

              <div>
                <label htmlFor="lead-email" className="mb-2 block text-sm font-medium text-text-primary">
                  Email Address <span className="text-gold-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={LEAD_FIELD_LIMITS.email}
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'lead-email-error' : undefined}
                  className={inputClasses}
                  onChange={() => clearFieldError('email')}
                />
                <FieldError id="lead-email-error" message={errors.email} />
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-2 block text-sm font-medium text-text-primary">
                  Phone / WhatsApp <span className="text-gold-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  maxLength={LEAD_FIELD_LIMITS.phone}
                  aria-required="true"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
                  className={inputClasses}
                  onChange={() => clearFieldError('phone')}
                />
                <FieldError id="lead-phone-error" message={errors.phone} />
              </div>

              <div>
                <label htmlFor="lead-country" className="mb-2 block text-sm font-medium text-text-primary">
                  Country <span className="text-text-muted">(optional)</span>
                </label>
                <input
                  id="lead-country"
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  maxLength={LEAD_FIELD_LIMITS.country}
                  aria-invalid={Boolean(errors.country)}
                  aria-describedby={errors.country ? 'lead-country-error' : undefined}
                  className={inputClasses}
                  onChange={() => clearFieldError('country')}
                />
                <FieldError id="lead-country-error" message={errors.country} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lead-message" className="mb-2 block text-sm font-medium text-text-primary">
                  What are you interested in? <span className="text-text-muted">(optional)</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={5}
                  maxLength={LEAD_FIELD_LIMITS.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'lead-message-error' : 'lead-message-help'}
                  className={`${inputClasses} resize-y`}
                  onChange={() => clearFieldError('message')}
                />
                <p id="lead-message-help" className="mt-2 text-xs text-text-muted">
                  Tell us briefly how our team can help.
                </p>
                <FieldError id="lead-message-error" message={errors.message} />
              </div>
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="lead-website">Website</label>
              <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-charcoal-600/60 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-text-muted">
                Required fields are marked with an asterisk.
              </p>
              <button
                type="submit"
                disabled={submissionState === 'submitting'}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gold-500 px-7 py-3 font-semibold text-charcoal-950 transition hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {submissionState === 'submitting' ? (
                  <>
                    <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <Send aria-hidden="true" className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <div className="min-h-7 pt-4" aria-live="polite" aria-atomic="true">
              {submissionState === 'error' && formMessage && (
                <p className="flex items-start gap-2 text-sm text-gold-300" role="alert">
                  <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{formMessage}</span>
                </p>
              )}
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}
