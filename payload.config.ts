import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import type { CollectionConfig, GlobalConfig, Field } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Inline seoFields to avoid import issues
const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO Settings',
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        label: 'Meta Title',
        maxLength: 60,
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        label: 'Meta Description',
        maxLength: 160,
      },
      {
        name: 'keywords',
        type: 'text',
        label: 'Keywords',
      },
    ],
  },
]

// Users collection
const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
  ],
}

// Media collection
const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
}

// Posts collection
const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    ...seoFields,
  ],
}

// Categories collection
const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

// Pages collection
const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    ...seoFields,
  ],
}

// Header global
const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Site Settings'
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Image', value: 'image' },
          ],
          defaultValue: 'text',
        },
        {
          name: 'text',
          type: 'text',
          defaultValue: 'ftiaxesite.gr',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'linkType',
          type: 'select',
          options: [
            { label: 'Section', value: 'section' },
            { label: 'External', value: 'external' },
          ],
          defaultValue: 'section',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}

// Footer global
const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Site Settings'
  },
  fields: [
    {
      name: 'company',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'FtiAxesite.gr',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Modern websites that deliver results.',
        },
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '© 2025 FtiAxesite.gr. All rights reserved.',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@ftiaxesite.gr',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+30 123 456 7890',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
      ],
    },
  ],
}

// Homepage global
const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    group: 'Content'
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
        },
        {
          name: 'subheadline',
          type: 'textarea',
          required: true,
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
              name: 'url',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'text',
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
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
        },
      ],
    },
    ...seoFields,
  ],
}

// Blog Settings global
const BlogSettings: GlobalConfig = {
  slug: 'blog-settings',
  admin: {
    group: 'Blog'
  },
  fields: [
    {
      name: 'blogTitle',
      type: 'text',
      defaultValue: 'Blog - FtiAxesite.gr',
      required: true,
    },
    {
      name: 'blogDescription',
      type: 'textarea',
      defaultValue: 'Tips, guides and news for web development',
    },
    {
      name: 'postsPerPage',
      type: 'number',
      defaultValue: 6,
    },
    ...seoFields,
  ],
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories, Pages],
  globals: [Header, Footer, Homepage, BlogSettings],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: process.env.SKIP_PAYLOAD_BUILD
    ? (undefined as any)
    : postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/payload',
        },
      }),
  sharp,
  plugins: [],
})