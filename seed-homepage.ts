import { getPayload } from 'payload'
import config from './payload.config'
import { sampleHeroData, sampleFeaturesData, sampleProcessData, sampleContactData } from './src/data/sampleData'

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
            linkType: sampleHeroData.cta.linkType,
            sectionId: sampleHeroData.cta.sectionId
          },
          socialProof: sampleHeroData.socialProof,
          stats: sampleHeroData.stats?.map(stat => ({
            value: stat.value,
            label: stat.label
          })) || []
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
        process: {
          title: sampleProcessData.title,
          subtitle: sampleProcessData.subtitle,
          steps: sampleProcessData.steps.map(step => ({
            number: step.number,
            icon: step.icon,
            title: step.title,
            description: step.description,
            color: step.color
          }))
        },
        contact: {
          title: sampleContactData.title,
          subtitle: sampleContactData.subtitle,
          formLabels: {
            name: sampleContactData.form.name,
            email: sampleContactData.form.email,
            phone: sampleContactData.form.phone,
            voicePrompt: sampleContactData.form.voicePrompt,
            voiceListening: sampleContactData.form.voiceListening,
            voiceTranscript: sampleContactData.form.voiceTranscript,
            submit: sampleContactData.form.submit
          }
        }
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