import { getPayload } from 'payload'
import config from './payload.config.js'

async function seedHomepage() {
  try {
    const payload = await getPayload({ config })

    console.log('Seeding homepage...')

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
            number: 1,
            icon: 'consultation',
            title: 'Δωρεάν Συμβουλευτική',
            description: 'Συζητάμε τις ανάγκες σας και σχεδιάζουμε την ιδανική λύση',
            color: 'blue'
          },
          {
            number: 2,
            icon: 'design',
            title: 'Σχεδιασμός & Ανάπτυξη',
            description: 'Δημιουργούμε μοναδικό design και αναπτύσσουμε την ιστοσελίδα σας',
            color: 'green'
          },
          {
            number: 3,
            icon: 'launch',
            title: 'Δημοσίευση & Υποστήριξη',
            description: 'Δημοσιεύουμε την ιστοσελίδα και παρέχουμε συνεχή υποστήριξη',
            color: 'purple'
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
    const result = await payload.updateGlobal({
      slug: 'homepage',
      data: homepageData,
    })

    console.log('Homepage seeded successfully!', result.id)
    process.exit(0)
    
  } catch (error) {
    console.error('Error seeding homepage:', error)
    process.exit(1)
  }
}

seedHomepage()