import { CollectionConfig } from 'payload'
import { seoFields, autoPopulateSEO } from '../fields/seoFields'

const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    ...autoPopulateSEO,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Post Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'This will be the URL path for this post (e.g., "my-awesome-post")',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      admin: {
        position: 'sidebar',
        description: 'This controls when the post appears on the site',
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author Name',
      defaultValue: 'FtiAxesite Team',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      maxRows: 10,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Add relevant tags for this post',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Post Excerpt',
      maxLength: 300,
      admin: {
        description: 'Short summary of the post. Used for post previews and SEO if meta description is empty.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Main image for this post. Will be used as Open Graph image if not overridden in SEO settings.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Post Content',
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Reading Time (minutes)',
      admin: {
        description: 'Estimated reading time in minutes. Leave empty to auto-calculate.',
      },
    },
    ...seoFields,
  ],
  versions: {
    drafts: true,
  },
}

export default Posts