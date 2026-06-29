import { config, collection, fields } from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'production'
      ? {
          kind: 'github',
          repo: {
            owner: 'alfreds97s-lab',
            name: 'musashi-blog',
          },
        }
      : { kind: 'local' },

  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        author: fields.text({ label: 'Author', defaultValue: 'Alfred' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'General', value: 'General' },
            { label: 'n8n', value: 'n8n' },
            { label: 'Make.com', value: 'Make.com' },
            { label: 'Automations', value: 'Automations' },
            { label: 'Tutorials', value: 'Tutorials' },
            { label: 'Tools', value: 'Tools' },
          ],
          defaultValue: 'General',
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Short summary shown on the home page and in the RSS feed.',
          multiline: true,
          validation: { isRequired: true },
        }),
        published: fields.checkbox({
          label: 'Published',
          description: 'Uncheck to save as a draft — the post will not appear on the site.',
          defaultValue: false,
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
});
