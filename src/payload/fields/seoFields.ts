import { Field } from 'payload'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const seoFields: Field[] = [
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
        admin: {
          description: 'Recommended: 50-60 characters. Leave empty to auto-generate from page title.',
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        label: 'Meta Description',
        maxLength: 160,
        admin: {
          description: 'Recommended: 150-160 characters. Leave empty to auto-generate from content.',
        },
      },
      {
        name: 'keywords',
        type: 'text',
        label: 'Keywords',
        admin: {
          description: 'Comma-separated keywords for this page.',
        },
      },
      {
        name: 'canonicalUrl',
        type: 'text',
        label: 'Canonical URL',
        admin: {
          description: 'Override the default canonical URL if needed.',
        },
      },
      {
        name: 'openGraph',
        type: 'group',
        label: 'Open Graph / Social Media',
        fields: [
          {
            name: 'title',
            type: 'text',
            label: 'OG Title',
            maxLength: 60,
            admin: {
              description: 'Override title for social media sharing. Uses meta title if empty.',
            },
          },
          {
            name: 'description',
            type: 'textarea',
            label: 'OG Description',
            maxLength: 160,
            admin: {
              description: 'Override description for social media sharing. Uses meta description if empty.',
            },
          },
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'OG Image',
            admin: {
              description: 'Recommended size: 1200x630px. JPG or PNG format.',
            },
          },
          {
            name: 'type',
            type: 'select',
            label: 'OG Type',
            defaultValue: 'website',
            options: [
              { label: 'Website', value: 'website' },
              { label: 'Article', value: 'article' },
              { label: 'Product', value: 'product' },
              { label: 'Profile', value: 'profile' },
            ],
          },
        ],
      },
      {
        name: 'twitter',
        type: 'group',
        label: 'Twitter Card',
        fields: [
          {
            name: 'cardType',
            type: 'select',
            label: 'Card Type',
            defaultValue: 'summary_large_image',
            options: [
              { label: 'Summary', value: 'summary' },
              { label: 'Summary Large Image', value: 'summary_large_image' },
              { label: 'App', value: 'app' },
              { label: 'Player', value: 'player' },
            ],
          },
          {
            name: 'title',
            type: 'text',
            label: 'Twitter Title',
            maxLength: 70,
            admin: {
              description: 'Override title for Twitter. Uses OG title if empty.',
            },
          },
          {
            name: 'description',
            type: 'textarea',
            label: 'Twitter Description',
            maxLength: 200,
            admin: {
              description: 'Override description for Twitter. Uses OG description if empty.',
            },
          },
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Twitter Image',
            admin: {
              description: 'Override image for Twitter. Uses OG image if empty.',
            },
          },
        ],
      },
      {
        name: 'structuredData',
        type: 'group',
        label: 'Structured Data',
        fields: [
          {
            name: 'type',
            type: 'select',
            label: 'Schema Type',
            defaultValue: 'WebPage',
            options: [
              { label: 'WebPage', value: 'WebPage' },
              { label: 'Article', value: 'Article' },
              { label: 'Product', value: 'Product' },
              { label: 'Service', value: 'Service' },
              { label: 'Organization', value: 'Organization' },
              { label: 'Person', value: 'Person' },
              { label: 'FAQ', value: 'FAQPage' },
            ],
          },
          {
            name: 'customSchema',
            type: 'json',
            label: 'Custom Schema JSON',
            admin: {
              description: 'Add custom structured data JSON-LD. Will be merged with auto-generated schema.',
            },
          },
        ],
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'No Index',
        admin: {
          description: 'Prevent search engines from indexing this page.',
        },
      },
      {
        name: 'noFollow',
        type: 'checkbox',
        label: 'No Follow',
        admin: {
          description: 'Prevent search engines from following links on this page.',
        },
      },
    ],
  },
]

// Helper function to auto-populate SEO fields
export const autoPopulateSEO = {
  beforeChange: [
    ({ data, operation }: { data: Record<string, any>; operation?: string; [key: string]: unknown }) => {
      if (operation === 'create' || operation === 'update') {
        // Auto-populate meta title from title if empty
        if (!data?.seo?.metaTitle && data?.title) {
          if (!data.seo) data.seo = {}
          data.seo.metaTitle = data.title
        }

        // Auto-populate meta description from content/excerpt if empty
        if (!data?.seo?.metaDescription) {
          let autoDescription = ''
          
          // Try to extract from different content fields
          if (data?.excerpt) {
            autoDescription = data.excerpt as string
          } else if (data?.description) {
            autoDescription = data.description as string
          } else if (data?.content) {
            // Extract plain text from rich text content
            if (typeof data.content === 'string') {
              autoDescription = data.content.replace(/<[^>]*>/g, '').substring(0, 160)
            } else if (Array.isArray(data.content)) {
              // Handle structured content
              autoDescription = data.content
                .filter((block: { type: string }) => block.type === 'paragraph' || block.type === 'text')
                .map((block: { children?: Array<{ text: string }>; text?: string }) => 
                  block.children?.map((child: { text: string }) => child.text).join('') || block.text || '')
                .join(' ')
                .substring(0, 160)
            }
          }

          if (autoDescription && !data.seo) data.seo = {}
          if (autoDescription) (data.seo as any).metaDescription = autoDescription
        }

        // Auto-populate Open Graph fields if empty
        if (data?.seo && !(data.seo as any).openGraph) {
          (data.seo as any).openGraph = {}
        }
        
        if (data?.seo?.openGraph) {
          if (!(data.seo as any).openGraph.title && (data.seo as any).metaTitle) {
            (data.seo as any).openGraph.title = (data.seo as any).metaTitle
          }
          if (!(data.seo as any).openGraph.description && (data.seo as any).metaDescription) {
            (data.seo as any).openGraph.description = (data.seo as any).metaDescription
          }
        }

        // Auto-populate Twitter fields if empty
        if (data?.seo && !(data.seo as any).twitter) {
          (data.seo as any).twitter = {}
        }
        
        if (data?.seo?.twitter) {
          if (!(data.seo as any).twitter.title && (data.seo as any).openGraph?.title) {
            (data.seo as any).twitter.title = (data.seo as any).openGraph.title
          }
          if (!(data.seo as any).twitter.description && (data.seo as any).openGraph?.description) {
            (data.seo as any).twitter.description = (data.seo as any).openGraph.description
          }
        }
      }

      return data
    },
  ],
}