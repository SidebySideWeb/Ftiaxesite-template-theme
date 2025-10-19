import { getPayload } from 'payload'
import config from './payload.config'
import { sampleHeroData, sampleFeaturesData, sampleContactData } from './src/data/sampleData'

async function seedHomepage() {
  try {
    console.log('🌱 Seeding homepage data...')
    const payload = await getPayload({ config })

    // Create homepage global with current sample data
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        hero: {
          badge: sampleHeroData.badge,
          headline: sampleHeroData.headline,
          subheadline: sampleHeroData.subheadline,
          cta: {
            text: sampleHeroData.cta.text,
            url: `#${sampleHeroData.cta.sectionId}`
          },
        },
        features: {
          title: sampleFeaturesData.title,
          subtitle: sampleFeaturesData.subtitle,
          items: sampleFeaturesData.items.map(item => ({
            icon: item.icon,
            title: item.title,
            description: item.description
          }))
        },
        contact: {
          title: sampleContactData.title,
          subtitle: sampleContactData.subtitle,
        },
      }
    })

    console.log('✅ Homepage data seeded successfully!')
    console.log('🎉 You can now edit content at: http://localhost:3001/admin')
    console.log('📝 Go to Globals → Homepage to start editing')
    
  } catch (error) {
    console.error('❌ Error seeding homepage:', error)
  }

  process.exit(0)
}

seedHomepage()