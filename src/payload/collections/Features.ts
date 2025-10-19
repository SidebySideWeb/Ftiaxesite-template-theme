import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for this feature set',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main section title',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Supporting text below the title',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Zap (Lightning)', value: 'zap' },
            { label: 'Smartphone', value: 'smartphone' },
            { label: 'Shield', value: 'shield' },
            { label: 'Euro', value: 'euro' },
            { label: 'Clock', value: 'clock' },
            { label: 'Trending Up', value: 'trendingUp' },
            { label: 'Globe', value: 'globe' },
            { label: 'Users', value: 'users' },
            { label: 'Star', value: 'star' },
            { label: 'Heart', value: 'heart' },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      admin: {
        description: 'List of features to display',
      },
    },
  ],
}