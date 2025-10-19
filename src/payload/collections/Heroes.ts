import type { CollectionConfig } from 'payload'

export const Heroes: CollectionConfig = {
  slug: 'heroes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'headline', 'updatedAt'],
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
        description: 'Internal name for this hero section',
      },
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Small badge text above the headline',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline text',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Supporting text below the headline',
      },
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'linkType',
          type: 'select',
          options: [
            {
              label: 'Section Link',
              value: 'section',
            },
            {
              label: 'URL Link',
              value: 'href',
            },
          ],
          required: true,
        },
        {
          name: 'sectionId',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.linkType === 'section',
            description: 'ID of the section to scroll to (e.g., "contact")',
          },
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.linkType === 'href',
            description: 'URL to link to',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero image (optional)',
      },
    },
    {
      name: 'socialProof',
      type: 'text',
      admin: {
        description: 'Social proof text (e.g., "100+ satisfied customers")',
      },
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Statistics to display (e.g., "50+ Projects")',
      },
    },
  ],
}