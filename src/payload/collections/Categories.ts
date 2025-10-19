import { CollectionConfig } from 'payload'
import { seoFields, autoPopulateSEO } from '../fields/seoFields'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    ...autoPopulateSEO,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'This will be the URL path for this category (e.g., "web-development")',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
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
      name: 'description',
      type: 'textarea',
      label: 'Category Description',
      admin: {
        description: 'Brief description of this category. Used for SEO if meta description is empty.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Category Image',
      admin: {
        description: 'Image representing this category. Will be used as Open Graph image if not overridden in SEO settings.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
      admin: {
        description: 'Optional: Select a parent category to create a hierarchy',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Category Color',
      admin: {
        description: 'Hex color code for this category (e.g., #3B82F6)',
      },
    },
    ...seoFields,
  ],
}

export default Categories