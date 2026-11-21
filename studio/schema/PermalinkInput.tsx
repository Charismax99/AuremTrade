import { getPublishedId, type SlugInputProps, useEditState, useFormValue } from 'sanity';
import { lockedPermalink } from './permalink';

export function PermalinkInput(props: SlugInputProps) {
  const id = useFormValue(['_id']);
  const publishedSlug = useFormValue(['publishedSlug']);
  const { published, ready } = useEditState(getPublishedId(typeof id === 'string' ? id : ''), 'blogPost');

  return props.renderDefault({
    ...props,
    readOnly: props.readOnly || !ready || Boolean(lockedPermalink(published?.slug, publishedSlug)),
  });
}
