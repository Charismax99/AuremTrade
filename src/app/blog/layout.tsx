import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import type { ReactNode } from 'react';

export default async function BlogLayout({ children }: { children: ReactNode }) {
  const isPreview = (await draftMode()).isEnabled && Boolean(process.env.SANITY_API_READ_TOKEN);

  return (
    <>
      {children}
      {isPreview && (
        <>
          <aside className="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-4 border-t border-gold-500 bg-charcoal-900 px-4 py-3 text-sm">
            <span>Private draft preview</span>
            <form action="/api/draft-mode/disable" method="post">
              <button type="submit" className="text-gold-400 underline underline-offset-4">Exit preview</button>
            </form>
          </aside>
          <VisualEditing />
        </>
      )}
    </>
  );
}
