import { defineArrayMember, defineField, defineType, getPublishedId } from 'sanity';
import { apiVersion } from '../../src/lib/blog/config';
import { ArticleEditorInput } from './ArticleEditorInput';
import { PermalinkInput } from './PermalinkInput';
import { validatePermalink } from './permalink';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'مقال جديد',
  type: 'document',
  components: { input: ArticleEditorInput },
  // Older drafts may have been unpublished before this field existed.
  initialValue: { trackFirstPublication: true },
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).custom((value) =>
        value && !value.trim() ? 'اكتب عنوان المقال.' : true,
      ),
    }),
    defineField({
      name: 'authorName',
      title: 'اسم الكاتب',
      type: 'string',
      validation: (Rule) => Rule.required().custom((value) =>
        value?.trim() ? true : 'اكتب اسم الكاتب الفعلي.',
      ),
    }),
    defineField({
      name: 'excerpt',
      title: 'الملخص',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().custom((value) =>
        value && !value.trim() ? 'اكتب ملخص المقال.' : true,
      ),
    }),
    defineField({
      name: 'body',
      title: 'المحتوى',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'فقرة', value: 'normal' },
            { title: 'عنوان فرعي', value: 'h2' },
            { title: 'عنوان أصغر', value: 'h3' },
            { title: 'اقتباس', value: 'blockquote' },
          ],
          marks: {
            decorators: [{ title: 'عريض', value: 'strong' }, { title: 'مائل', value: 'em' }],
            annotations: [
              {
                name: 'link',
                title: 'رابط',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'الرابط',
                    type: 'url',
                    validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http', 'mailto'] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'cover',
      title: 'صورة الغلاف',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'وصف الصورة',
          type: 'string',
          validation: (Rule) => Rule.required().custom((value) =>
            value && !value.trim() ? 'اكتب وصفًا للصورة.' : true,
          ),
        }),
      ],
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: 'slug',
      title: 'رابط المقال',
      description: 'اكتب الجزء بعد /blog/، مثل market-outlook. يمكنك تعديله قبل أول نشر.',
      type: 'slug',
      components: { input: PermalinkInput },
      validation: (Rule) => Rule.required().custom(validatePermalink).custom(async (slug, context) => {
        const doc = context.document;
        if (!doc?._id || !slug?.current) return true;

        const saved = doc.publishedSlug || await context.getClient({ apiVersion })
          .withConfig({ perspective: 'published', useCdn: false })
          .fetch<string | null>('*[_id == $id][0].slug.current', { id: getPublishedId(doc._id) });
        return !saved || saved === slug.current || 'استخدم الرابط الأصلي للمقال المنشور.';
      }),
    }),
    defineField({ name: 'publishedSlug', type: 'string', hidden: true, readOnly: true }),
    defineField({ name: 'trackFirstPublication', type: 'boolean', hidden: true, readOnly: true }),
    defineField({ name: 'firstPublishedAt', type: 'datetime', hidden: true, readOnly: true }),
    defineField({
      name: 'seoTitle',
      title: 'عنوان SEO (اختياري)',
      description: 'يُستخدم عنوان المقال تلقائيًا إذا تركت هذا الحقل فارغًا.',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'وصف SEO (اختياري)',
      description: 'يُستخدم ملخص المقال تلقائيًا إذا تركت هذا الحقل فارغًا.',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'excerpt', media: 'cover' } },
});
