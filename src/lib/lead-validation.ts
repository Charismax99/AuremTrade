export const LEAD_FIELD_LIMITS = {
  fullName: 100,
  email: 254,
  phone: 40,
  country: 100,
  message: 2000,
} as const;

export type LeadField = keyof typeof LEAD_FIELD_LIMITS;

export interface LeadFormValues {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  website: string;
}

export type LeadValidationErrors = Partial<Record<LeadField, string>>;

export type LeadValidationResult =
  | { success: true; data: LeadFormValues }
  | { success: false; errors: LeadValidationErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s().-]*$/;

function toTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeLeadInput(input: unknown): LeadFormValues {
  const values = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};

  return {
    fullName: toTrimmedString(values.fullName),
    email: toTrimmedString(values.email).toLowerCase(),
    phone: toTrimmedString(values.phone),
    country: toTrimmedString(values.country),
    message: toTrimmedString(values.message),
    website: toTrimmedString(values.website),
  };
}

export function validateLeadInput(input: unknown): LeadValidationResult {
  const data = normalizeLeadInput(input);
  const errors: LeadValidationErrors = {};

  if (data.fullName.length < 2) {
    errors.fullName = 'Please enter your full name.';
  } else if (data.fullName.length > LEAD_FIELD_LIMITS.fullName) {
    errors.fullName = `Full name must be ${LEAD_FIELD_LIMITS.fullName} characters or fewer.`;
  }

  if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (data.email.length > LEAD_FIELD_LIMITS.email) {
    errors.email = `Email must be ${LEAD_FIELD_LIMITS.email} characters or fewer.`;
  }

  const phoneDigitCount = data.phone.replace(/\D/g, '').length;
  if (!PHONE_PATTERN.test(data.phone) || phoneDigitCount < 7) {
    errors.phone = 'Please enter a valid phone or WhatsApp number.';
  } else if (data.phone.length > LEAD_FIELD_LIMITS.phone) {
    errors.phone = `Phone number must be ${LEAD_FIELD_LIMITS.phone} characters or fewer.`;
  }

  if (data.country.length > LEAD_FIELD_LIMITS.country) {
    errors.country = `Country must be ${LEAD_FIELD_LIMITS.country} characters or fewer.`;
  }

  if (data.message.length > LEAD_FIELD_LIMITS.message) {
    errors.message = `Message must be ${LEAD_FIELD_LIMITS.message} characters or fewer.`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
