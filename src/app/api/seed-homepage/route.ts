import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  return POST();
}

export async function POST() {
  try {
    const payload = await getPayload({ config })

    // Seed homepage with default Greek content
    const homepageData = {
      hero: {
        badge: 'Νέα Εποχή στην Ανάπτυξη Ιστοσελίδων',
        headline: 'Φτιάξε την ιστοσελίδα των ονείρων σου',
        subheadline: 'Δημιουργούμε μοντέρνες, γρήγορες και φιλικές προς τα μηχανές αναζήτησης ιστοσελίδες που μετατρέπουν τους επισκέπτες σε πελάτες.',
        ctaText: 'Ξεκίνα Τώρα',
        socialProof: 'Εμπιστεύονται περισσότεροι από 500+ επιχειρηματίες',
        stats: [
          { value: '500+', label: 'Ικανοποιημένοι Πελάτες' },
          { value: '98%', label: 'Ποσοστό Επιτυχίας' },
          { value: '24/7', label: 'Υποστήριξη' }
        ]
      },
      features: {
        title: 'Γιατί να Επιλέξεις το FtiAxesite.gr;',
        subtitle: 'Προσφέρουμε ολοκληρωμένες λύσεις ανάπτυξης ιστοσελίδων που ξεχωρίζουν',
        items: [
          {
            icon: 'speed',
            title: 'Εξαιρετικές Επιδόσεις',
            description: 'Ιστοσελίδες που φορτώνουν σε χρόνο ρεκόρ με βελτιστοποίηση για μηχανές αναζήτησης'
          },
          {
            icon: 'mobile',
            title: 'Responsive Design',
            description: 'Τέλεια εμφάνιση σε όλες τις συσκευές - υπολογιστές, tablets και κινητά'
          },
          {
            icon: 'cms',
            title: 'Εύκολη Διαχείριση',
            description: 'Ενημερώνετε το περιεχόμενό σας εύκολα με το φιλικό σύστημα διαχείρισης'
          }
        ]
      },
      process: {
        title: 'Πώς Δουλεύουμε',
        subtitle: 'Απλή και διαφανής διαδικασία για το καλύτερο αποτέλεσμα',
        steps: [
          {
            number: '1',
            icon: 'consultation',
            title: 'Δωρεάν Συμβουλευτική',
            description: 'Συζητάμε τις ανάγκες σας και σχεδιάζουμε την ιδανική λύση',
            color: 'teal' as const
          },
          {
            number: '2',
            icon: 'design',
            title: 'Σχεδιασμός & Ανάπτυξη',
            description: 'Δημιουργούμε μοναδικό design και αναπτύσσουμε την ιστοσελίδα σας',
            color: 'navy' as const
          },
          {
            number: '3',
            icon: 'launch',
            title: 'Δημοσίευση & Υποστήριξη',
            description: 'Δημοσιεύουμε την ιστοσελίδα και παρέχουμε συνεχή υποστήριξη',
            color: 'teal' as const
          }
        ]
      },
      contact: {
        title: 'Έτοιμος να Ξεκινήσουμε;',
        subtitle: 'Στείλτε μας μήνυμα και θα επικοινωνήσουμε μαζί σας εντός 24 ωρών',
        formLabels: {
          name: 'Όνομα',
          email: 'Email',
          message: 'Μήνυμα',
          submit: 'Αποστολή Μηνύματος',
          namePlaceholder: 'Το όνομά σας',
          emailPlaceholder: 'Το email σας',
          messagePlaceholder: 'Πείτε μας για το έργο σας...'
        }
      }
    }

    // Create or update homepage global
    await payload.updateGlobal({
      slug: 'homepage',
      data: homepageData,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Homepage seeded successfully with Greek content!',
      data: homepageData
    })
    
  } catch (error) {
    console.error('Error seeding homepage:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}