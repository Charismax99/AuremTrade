type Slug = { current?: string };

export function lockedPermalink(publishedSlug: unknown, saved: unknown) {
  const current = (publishedSlug as Slug | undefined)?.current;
  return current || (typeof saved === 'string' ? saved : undefined);
}

export function validatePermalink(slug: Slug | undefined) {
  if (!slug?.current) return 'اكتب رابط المقال قبل النشر.';
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
    ? true
    : 'استخدم حروفًا إنجليزية صغيرة أو أرقامًا، وافصل الكلمات بشرطة.';
}
