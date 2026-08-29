import nodemailer from 'nodemailer';
import { validateLeadInput, type LeadFormValues } from '@/lib/lead-validation';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 12_000;
const DUPLICATE_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_DUPLICATE_CACHE_ENTRIES = 500;
const GENERIC_ERROR_MESSAGE =
  'We could not submit your inquiry right now. Please try again or email info@aurem.trade.';

interface DeliveryResult {
  success: boolean;
  status: number;
  message?: string;
}

const recentSubmissions = new Map<
  string,
  { expiresAt: number; delivery: Promise<DeliveryResult> }
>();

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] ?? character
  );
}

function formatPlainTextEmail(lead: LeadFormValues, submittedAt: string) {
  return [
    'New AUREM CAPITAL Lead Inquiry',
    '',
    `Full Name: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Phone / WhatsApp: ${lead.phone}`,
    `Country: ${lead.country || 'Not provided'}`,
    `Message: ${lead.message || 'Not provided'}`,
    `Submitted: ${submittedAt}`,
  ].join('\n');
}

function formatHtmlEmail(lead: LeadFormValues, submittedAt: string) {
  const rows = [
    ['Full Name', lead.fullName],
    ['Email', lead.email],
    ['Phone / WhatsApp', lead.phone],
    ['Country', lead.country || 'Not provided'],
    ['Message', lead.message || 'Not provided'],
    ['Submitted', submittedAt],
  ];

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#0e0e0e;color:#f0ede6;font-family:Arial,sans-serif;">
        <div style="max-width:680px;margin:0 auto;padding:40px 24px;">
          <div style="border:1px solid #2a2a2a;border-radius:12px;background:#161616;overflow:hidden;">
            <div style="padding:24px 28px;border-bottom:1px solid #2a2a2a;">
              <p style="margin:0 0 8px;color:#c6953b;font-size:12px;letter-spacing:2px;text-transform:uppercase;">AUREM CAPITAL</p>
              <h1 style="margin:0;color:#f0ede6;font-size:24px;font-weight:600;">New Lead Inquiry</h1>
            </div>
            <div style="padding:12px 28px 28px;">
              ${rows
                .map(
                  ([label, value]) => `
                    <div style="padding:16px 0;border-bottom:1px solid #242424;">
                      <p style="margin:0 0 6px;color:#a8a29e;font-size:12px;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(label)}</p>
                      <p style="margin:0;color:#f0ede6;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(value)}</p>
                    </div>`
                )
                .join('')}
            </div>
          </div>
        </div>
      </body>
    </html>`;
}

function cleanDuplicateCache(now: number) {
  for (const [key, entry] of recentSubmissions) {
    if (entry.expiresAt <= now) recentSubmissions.delete(key);
  }

  if (recentSubmissions.size >= MAX_DUPLICATE_CACHE_ENTRIES) {
    const oldestKey = recentSubmissions.keys().next().value;
    if (oldestKey) recentSubmissions.delete(oldestKey);
  }
}

function getSubmissionKey(request: Request) {
  const suppliedKey = request.headers.get('idempotency-key');
  return suppliedKey && /^[A-Za-z0-9._:-]{1,200}$/.test(suppliedKey)
    ? suppliedKey
    : crypto.randomUUID();
}

async function deliverLeadEmail(
  lead: LeadFormValues,
  submittedAt: string
): Promise<DeliveryResult> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const leadToEmail = process.env.LEAD_TO_EMAIL;

  if (!smtpHost || smtpPort !== 465 || !smtpUser || !smtpPassword || !leadToEmail) {
    console.error('Lead SMTP delivery is not configured.');
    return { success: false, status: 503, message: GENERIC_ERROR_MESSAGE };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    const delivery = await transporter.sendMail({
      from: {
        name: 'AUREM CAPITAL Website',
        address: smtpUser,
      },
      to: leadToEmail,
      replyTo: lead.email,
      subject: 'New AUREM CAPITAL Lead Inquiry',
      text: formatPlainTextEmail(lead, submittedAt),
      html: formatHtmlEmail(lead, submittedAt),
    });

    const destinationAccepted = delivery.accepted.some((recipient) => {
      const address = typeof recipient === 'string' ? recipient : recipient.address;
      return address.toLowerCase() === leadToEmail.toLowerCase();
    });

    if (!destinationAccepted) {
      console.error('Lead SMTP server did not accept the destination address.');
      return { success: false, status: 502, message: GENERIC_ERROR_MESSAGE };
    }

    return { success: true, status: 200 };
  } catch {
    console.error('Lead SMTP delivery failed.');
    return { success: false, status: 502, message: GENERIC_ERROR_MESSAGE };
  } finally {
    transporter.close();
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ success: false, message: GENERIC_ERROR_MESSAGE }, { status: 413 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json(
      { success: false, message: 'Please review the form and try again.' },
      { status: 400 }
    );
  }

  const validation = validateLeadInput(input);
  if (!validation.success) {
    return Response.json(
      {
        success: false,
        message: 'Please correct the highlighted fields.',
        errors: validation.errors,
      },
      { status: 400 }
    );
  }

  if (validation.data.website) {
    return Response.json({ success: true });
  }

  const submittedAt = new Date().toISOString();
  const submissionKey = getSubmissionKey(request);
  const now = Date.now();
  cleanDuplicateCache(now);

  let duplicateEntry = recentSubmissions.get(submissionKey);
  if (!duplicateEntry || duplicateEntry.expiresAt <= now) {
    duplicateEntry = {
      expiresAt: now + DUPLICATE_CACHE_TTL_MS,
      delivery: deliverLeadEmail(validation.data, submittedAt),
    };
    recentSubmissions.set(submissionKey, duplicateEntry);
  }

  const result = await duplicateEntry.delivery;
  if (!result.success) recentSubmissions.delete(submissionKey);

  return Response.json(
    result.success
      ? { success: true }
      : { success: false, message: result.message ?? GENERIC_ERROR_MESSAGE },
    { status: result.status }
  );
}
