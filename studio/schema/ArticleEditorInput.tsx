import { Button } from '@sanity/ui';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { type ObjectInputProps, useFormValue, useSyncState } from 'sanity';
import { useRouter } from 'sanity/router';
import { useDocumentPane } from 'sanity/structure';
import { articlePath } from '../../src/lib/blog/config';
import { validatePermalink } from './permalink';

export function ArticleEditorInput(props: ObjectInputProps) {
  const { documentId, documentType } = useDocumentPane();
  const slug = useFormValue(['slug', 'current']);
  const { isSyncing } = useSyncState(documentId, documentType);
  const { navigateIntent } = useRouter();
  const marker = useRef<HTMLSpanElement>(null);
  const [footerSlot, setFooterSlot] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    const panel = marker.current?.closest('[data-testid="document-panel-form-view"]');
    if (!panel) return;

    // Structure renders a single primary action. Add our own slot beside it.
    const slot = document.createElement('span');
    function placeButton() {
      const action = panel?.querySelector('[data-testid="pane-footer"] button[data-testid^="action-"]');
      const actionSlot = action?.parentElement;
      const group = actionSlot?.parentElement;
      if (group && actionSlot) {
        if (slot.nextElementSibling !== actionSlot) group.insertBefore(slot, actionSlot);
        setFooterSlot(slot);
      } else {
        slot.remove();
        setFooterSlot(null);
      }
    }

    const observer = new MutationObserver(placeButton);
    observer.observe(panel, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-testid'] });
    const frame = requestAnimationFrame(placeButton);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      slot.remove();
    };
  }, []);

  const path = typeof slug === 'string' && validatePermalink({ current: slug }) === true
    ? articlePath(slug)
    : undefined;
  const preview = (
    <Button
      type="button"
      text="معاينة"
      mode="ghost"
      disabled={!path || isSyncing}
      title={!path ? 'اكتب رابط المقال أولًا' : isSyncing ? 'انتظر حفظ المسودة' : 'افتح المعاينة الخاصة'}
      onClick={() => {
        if (!path || isSyncing) return;
        navigateIntent('edit', {
          id: documentId,
          type: documentType,
          mode: 'presentation',
          presentation: 'presentation',
          preview: path,
        });
        // In the narrow Presentation layout, the editor and preview are separate tabs.
        const tab = document.getElementById('presentation-narrow-tab-preview');
        if (tab?.getAttribute('aria-selected') === 'false' && tab.getClientRects().length) tab.click();
      }}
    />
  );

  return (
    <>
      <span ref={marker} hidden />
      {props.renderDefault(props)}
      {footerSlot ? createPortal(preview, footerSlot) : preview}
    </>
  );
}
