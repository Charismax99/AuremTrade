'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Script from 'next/script';
import { Container } from '@/components/ui/Container';

const TRADINGVIEW_WIDGET_SCRIPT = 'https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js';

const MARKET_SYMBOLS = [
  'OANDA:XAUUSD',
  'FX_IDC:EURUSD',
  'FX_IDC:GBPUSD',
  'FX_IDC:USDJPY',
  'FX_IDC:AUDUSD',
  'FX_IDC:USDCAD',
].join(',');

const widgetTheme = {
  colorScheme: 'dark',
  '--tv-widget-accent-color': '#C6953B',
  '--tv-widget-background-color': 'transparent',
  '--tv-widget-font-family': 'var(--font-inter), system-ui, -apple-system, sans-serif',
  '--tv-widget-price-text-color': '#F0EDE6',
  '--tv-widget-text-color': '#F0EDE6',
} as CSSProperties;

export function LiveMarketWatch() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container) return;

    const tickerTape = document.createElement('tv-ticker-tape');
    tickerTape.setAttribute('symbols', MARKET_SYMBOLS);
    tickerTape.setAttribute('direction', 'horizontal');
    tickerTape.setAttribute('item-size', 'compact');
    tickerTape.setAttribute('theme', 'dark');
    tickerTape.setAttribute('transparent', '');
    tickerTape.setAttribute('hide-chart', '');
    tickerTape.setAttribute('aria-label', 'Live major foreign exchange and gold prices');
    tickerTape.style.display = 'block';
    tickerTape.style.width = '100%';

    const loadingMessage = document.createElement('span');
    loadingMessage.className =
      'flex min-h-12 items-center text-xs uppercase tracking-[0.2em] text-text-muted';
    loadingMessage.textContent = 'Loading live market data…';
    tickerTape.appendChild(loadingMessage);

    container.replaceChildren(tickerTape);

    return () => {
      if (container.contains(tickerTape)) container.replaceChildren();
    };
  }, []);

  return (
    <section
      id="live-market-watch"
      aria-labelledby="live-market-watch-heading"
      className="relative border-y border-gold-700/20 bg-[linear-gradient(180deg,#080808_0%,#0b0b0b_52%,#0e0e0e_100%)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />

      <Container className="relative py-2 sm:py-0">
        <div className="grid items-center gap-1 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-0">
          <div className="flex min-h-10 items-center gap-2.5 sm:min-h-20 sm:border-r sm:border-gold-700/20 sm:pr-4">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400/25 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
            </span>
            <div>
              <h2
                id="live-market-watch-heading"
                className="whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-primary"
              >
                Live Market Watch
              </h2>
              <p className="mt-1 whitespace-nowrap text-[0.58rem] uppercase tracking-[0.12em] text-text-muted">
                Real-time market data
              </p>
            </div>
          </div>

          <div className="relative -mx-5 min-w-0 sm:mx-0 sm:pl-3" style={widgetTheme}>
            <div ref={widgetContainerRef} className="min-h-12 w-full">
              <span className="flex min-h-12 items-center text-xs uppercase tracking-[0.2em] text-text-muted">
                Loading live market data…
              </span>
            </div>
          </div>
        </div>
      </Container>

      <Script
        id="tradingview-ticker-tape-widget"
        src={TRADINGVIEW_WIDGET_SCRIPT}
        type="module"
        strategy="afterInteractive"
      />
    </section>
  );
}
