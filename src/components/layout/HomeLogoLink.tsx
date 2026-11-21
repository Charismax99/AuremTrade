'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE_NAME } from '@/lib/constants';

export function HomeLogoLink({ children, className }: { children: ReactNode; className: string }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} home`}
      className={className}
      onNavigate={(event) => {
        const { pathname, search, hash } = window.location;
        event.preventDefault();
        if (pathname !== '/') {
          // Use a fresh navigation so the shared layout cannot retain the previous scroll position.
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.assign('/');
          return;
        }

        if (search || hash) {
          window.history.pushState(null, '', '/');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      }}
    >
      {children}
    </Link>
  );
}
