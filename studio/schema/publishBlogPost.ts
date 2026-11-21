import { useToast } from '@sanity/ui/toast';
import { useState } from 'react';
import { type DocumentActionComponent, useClient, useSyncState, useValidationStatus } from 'sanity';
import { apiVersion } from '../../src/lib/blog/config';
import { lockedPermalink } from './permalink';

export function withBlogPostPublication(native: DocumentActionComponent): DocumentActionComponent {
  function usePublishBlogPost(props: Parameters<DocumentActionComponent>[0]) {
    const action = native(props);
    const { draft, published, id, type } = props;
    const client = useClient({ apiVersion });
    const toast = useToast();
    const sync = useSyncState(id, type);
    const validation = useValidationStatus(draft?._id || id, type);
    const [publishing, setPublishing] = useState(false);

    const slug = lockedPermalink(published?.slug, draft?.publishedSlug) ||
      (draft?.slug as { current?: string } | undefined)?.current;

    if (!action || !draft || !slug || props.version || props.release) {
      return action;
    }

    const publishedDate = typeof published?.firstPublishedAt === 'string' ? published.firstPublishedAt : undefined;
    const restoreDate = publishedDate && publishedDate !== draft.firstPublishedAt ? publishedDate : undefined;
    const isFirstPublication = !published && draft.trackFirstPublication === true && !draft.firstPublishedAt;

    if (draft.publishedSlug === slug && !restoreDate && !isFirstPublication) {
      return action;
    }

    return {
      ...action,
      disabled: action.disabled || publishing || sync.isSyncing ||
        validation.isValidating || validation.revision !== draft._rev,
      onHandle: async () => {
        setPublishing(true);
        try {
          // If Publish fails, neither the permalink lock nor the first publication date is saved.
          await client.action([
            {
              actionType: 'sanity.action.document.edit',
              draftId: draft._id,
              publishedId: id,
              patch: {
                set: { publishedSlug: slug, ...(restoreDate && { firstPublishedAt: restoreDate }) },
                ...(isFirstPublication && { setIfMissing: { firstPublishedAt: new Date().toISOString() } }),
              },
            },
            {
              actionType: 'sanity.action.document.publish',
              draftId: draft._id,
              publishedId: id,
              ifDraftRevisionId: draft._rev,
              ifPublishedRevisionId: published?._rev,
            },
          ]);
          props.onComplete();
        } catch (error) {
          const status = error && typeof error === 'object' && 'statusCode' in error ? error.statusCode : undefined;
          toast.push({
            status: 'error',
            title: status === 409
              ? 'تغيّرت المسودة أثناء النشر. انتظر حفظها ثم حاول مرة أخرى.'
              : 'تعذّر النشر. راجع المسودة ثم حاول مرة أخرى.',
          });
        } finally {
          setPublishing(false);
        }
      },
    };
  }

  return Object.assign(usePublishBlogPost, { action: native.action });
}
