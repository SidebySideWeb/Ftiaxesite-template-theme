import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import type { CollectionConfig, GlobalConfig } from 'payload'
import { seoFields } from './src/payload/fields/seoFields'

// Import collections with SEO fields
import { Pages } from './src/payload/collections/Pages'
import Posts from './src/payload/collections/Posts'
import Categories from './src/payload/collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Minimal Users collection for testing
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

// Media collection with proper upload configuration
const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
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
      admin: {
        description: 'Alternative text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the image',
      },
    },
  ],
}

// Homepage Global - Content for the landing page
// Header global configuration
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
          admin: {
            condition: (data) => data.type === 'text',
          },
          defaultValue: 'ftiaxesite.gr',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data) => data.type === 'image',
            description: 'Logo image (recommended: 200x50px)',
          },
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Menu',
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
            { label: 'Section (same page)', value: 'section' },
            { label: 'Page Link', value: 'page' },
            { label: 'External Link', value: 'external' },
          ],
          defaultValue: 'section',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL / Section ID',
          admin: {
            description: 'For External: full URL (https://example.com) | For Section: ID (hero, features) | For Page: leave empty and use Page field below',
          },
        },
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (for section links only)',
          admin: {
            condition: (data) => data.linkType === 'section',
            description: 'Enter section ID (e.g., hero, features, contact) - only used if Link Type is "Section"',
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Page (for page links only)',
          admin: {
            condition: (data) => data.linkType === 'page',
            description: 'Select page - only used if Link Type is "Page Link"',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL (for external links only)',
          admin: {
            condition: (data) => data.linkType === 'external',
            description: 'Enter full URL (e.g., https://example.com) - only used if Link Type is "External Link"',
          },
        },
      ],
      defaultValue: [
        { label: 'Αρχική', linkType: 'section', sectionId: 'hero' },
        { label: 'Υπηρεσίες', linkType: 'section', sectionId: 'features' },
        { label: 'Διαδικασία', linkType: 'section', sectionId: 'process' },
        { label: 'Επικοινωνία', linkType: 'section', sectionId: 'contact' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Button',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'url',
          type: 'text',
          label: '🔗 URL / Section ID (Always Visible)',
          admin: {
            description: 'For External: full URL (https://google.com) | For Section: ID (contact, hero) | For Page: leave empty and use Page field below',
          },
        },
        {
          name: 'text',
          type: 'text',
          admin: {
            condition: (data) => data.enabled === true,
          },
          defaultValue: 'Ξεκινήστε Σήμερα',
        },
        {
          name: 'linkType',
          type: 'select',
          label: '🔗 Link Type (Always Visible)',
          options: [
            { label: 'Section (same page)', value: 'section' },
            { label: 'Page Link', value: 'page' },
            { label: 'External Link', value: 'external' },
          ],
          defaultValue: 'external',
        },
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (for section links)',
          admin: {
            condition: (data) => data.enabled === true && data.linkType === 'section',
            description: 'Enter section ID (e.g., contact)',
          },
          defaultValue: 'contact',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Page (for page links)',
          admin: {
            condition: (data) => data.enabled === true && data.linkType === 'page',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL (for external links)',
          admin: {
            condition: (data) => data.enabled === true && data.linkType === 'external',
            description: 'Enter full URL (e.g., https://google.com)',
          },
        },
      ],
    },
  ],
}

// Footer global configuration
const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Site Settings'
  },
  fields: [
    {
      name: 'company',
      type: 'group',
      label: 'Company Information',
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'FtiAxesite.gr',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Δημιουργούμε μοντέρνες ιστοσελίδες που φέρνουν αποτελέσματα.',
        },
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '© 2025 FtiAxesite.gr. Όλα τα δικαιώματα κατοχυρωμένα.',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
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
        {
          name: 'address',
          type: 'textarea',
          defaultValue: 'Αθήνα, Ελλάδα',
        },
      ],
    },
    {
      name: 'links',
      type: 'group',
      label: 'Footer Links',
      fields: [
        {
          name: 'quickLinks',
          type: 'array',
          label: 'Quick Links',
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
                { label: 'Section (same page)', value: 'section' },
                { label: 'Page Link', value: 'page' },
                { label: 'External Link', value: 'external' },
              ],
              defaultValue: 'section',
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL / Section ID',
              admin: {
                description: 'For External: full URL (https://example.com) | For Section: ID (hero, contact) | For Page: leave empty and use Page field below',
              },
            },
            {
              name: 'sectionId',
              type: 'text',
              label: 'Section ID (for section links only)',
              admin: {
                condition: (data) => data.linkType === 'section',
                description: 'Enter section ID - only used if Link Type is "Section"',
              },
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Page (for page links only)',
              admin: {
                condition: (data) => data.linkType === 'page',
                description: 'Select page - only used if Link Type is "Page Link"',
              },
            },
            {
              name: 'externalUrl',
              type: 'text',
              label: 'External URL (for external links only)',
              admin: {
                condition: (data) => data.linkType === 'external',
                description: 'Enter full URL - only used if Link Type is "External Link"',
              },
            },
          ],
          defaultValue: [
            { label: 'Αρχική', linkType: 'section', sectionId: 'hero' },
            { label: 'Υπηρεσίες', linkType: 'section', sectionId: 'features' },
            { label: 'Επικοινωνία', linkType: 'section', sectionId: 'contact' },
          ],
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Legal Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
            },
          ],
          defaultValue: [
            { label: 'Όροι Χρήσης' },
            { label: 'Πολιτική Απορρήτου' },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
        },
      ],
    },
  ],
}

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
          label: 'Call to Action Button',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              required: true,
            },
            {
              name: 'linkType',
              type: 'select',
              options: [
                { label: 'Section (same page)', value: 'section' },
                { label: 'External Link', value: 'href' },
              ],
              defaultValue: 'href',
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL / Section ID',
              admin: {
                description: 'For External: full URL (https://google.com) | For Section: ID (contact, hero)',
              },
            },
            {
              name: 'sectionId',
              type: 'text',
              admin: {
                condition: (data) => data.linkType === 'section',
                description: 'Enter section ID (e.g., contact)',
              },
            },
            {
              name: 'href',
              type: 'text',
              admin: {
                condition: (data) => data.linkType === 'href',
                description: 'Enter full URL (e.g., https://example.com)',
              },
            },
          ],
        },
        {
          name: 'socialProof',
          type: 'text',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero section background or featured image',
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
      name: 'process',
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
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
            },
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
            {
              name: 'color',
              type: 'select',
              options: [
                { label: 'Teal', value: 'teal' },
                { label: 'Navy', value: 'navy' },
              ],
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
        {
          name: 'formLabels',
          type: 'group',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              type: 'text',
              required: true,
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
            },
            {
              name: 'voicePrompt',
              type: 'text',
              required: true,
            },
            {
              name: 'voiceListening',
              type: 'text',
              required: true,
            },
            {
              name: 'voiceTranscript',
              type: 'text',
              required: true,
            },
            {
              name: 'submit',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    ...seoFields,
  ],
}

// Blog Settings Global
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
      admin: {
        description: 'Main title for your blog section',
      },
    },
    {
      name: 'blogDescription',
      type: 'textarea',
      defaultValue: 'Συμβουλές, οδηγοί και νέα για την ανάπτυξη ιστοσελίδων',
      admin: {
        description: 'Description shown on blog listing page',
      },
    },
    {
      name: 'postsPerPage',
      type: 'number',
      defaultValue: 6,
      admin: {
        description: 'Number of posts to show per page',
      },
    },
    {
      name: 'enableComments',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable comments on blog posts',
      },
    },
    {
      name: 'socialSharing',
      type: 'group',
      fields: [
        {
          name: 'enableSharing',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'platforms',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'WhatsApp', value: 'whatsapp' },
              ],
            },
          ],
        },
      ],
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
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:H5l68FxxEBko63oZ@db.gfpyhjsmopgocivxvtgr.supabase.co:5432/postgres',
    },
  }),
  sharp,
  plugins: [
    // Add plugins here
  ],
})