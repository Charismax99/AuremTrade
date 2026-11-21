import { defineConfig } from 'sanity';
import { defineDocuments, defineLocations, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { articlePath, blogPath, dataset, projectId } from '../src/lib/blog/config';
import { blogPost } from './schema/blogPost';
import { withBlogPostPublication } from './schema/publishBlogPost';

const previewUrl = new URL(process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000');

export default defineConfig({
  name: 'aurem-blog',
  title: 'Aurem Capital Blog',
  projectId,
  dataset,
  schema: {
    types: [blogPost],
    templates: [{ id: 'blogPost', title: 'مقال جديد', schemaType: 'blogPost', value: {} }],
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === 'blogPost'
        ? actions.filter(({ action }) => action !== 'duplicate').map((action) =>
            action.action === 'publish' ? withBlogPostPublication(action) : action,
          )
        : actions,
  },
  plugins: [
    structureTool({
      title: 'المقالات',
      structure: (S) => S.documentTypeList('blogPost').title('المقالات'),
    }),
    presentationTool({
      title: 'المعاينة الخاصة',
      previewUrl: {
        initial: new URL(blogPath, previewUrl).href,
        previewMode: { enable: '/api/draft-mode/enable', shareAccess: false },
      },
      allowOrigins: [previewUrl.origin],
      resolve: {
        mainDocuments: defineDocuments([
          { route: '/blog/:slug', filter: '_type == "blogPost" && slug.current == $slug' },
        ]),
        locations: {
          blogPost: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) =>
              doc?.slug
                ? { locations: [{ title: doc.title || 'معاينة المقال', href: articlePath(doc.slug) }] }
                : { message: 'اكتب رابط المقال أولًا لفتح المعاينة.' },
          }),
        },
      },
    }),
  ],
});
