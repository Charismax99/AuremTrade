export const projectId = '7hwvx32u';
export const dataset = 'production';
export const apiVersion = '2025-02-19';

export const blogPath = '/blog';
export const articlePath = (slug: string) => `${blogPath}/${encodeURIComponent(slug)}`;
