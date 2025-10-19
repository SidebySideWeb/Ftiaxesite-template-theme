import { getPayload } from 'payload'
import config from '../payload.config.js'

async function seedHomepage() {
  try {
    const payload = await getPayload({ config })
    
    // Check if homepage global already exists
    try {
      const existingHomepage = await payload.findGlobal({
        slug: 'homepage',
      })
      
      if (existingHomepage) {
        console.log('Homepage already exists, updating...')
      }
    } catch {
      console.log('Creating new homepage global...')
    }

    // Create or update homepage with current Greek content
    const homepageData = await payload.updateGlobal({
      slug: 'homepage',
      data: {
        hero: {
          badge: "AI-Powered Web Development",
          headline: "Δημιουργούμε Ιστοσελίδες που Πουλάνε",
          subheadline: "Προσφέρουμε ολοκληρωμένες λύσεις web development με τη χρήση τεχνητής νοημοσύνης για μέγιστη απόδοση και μοναδική εμπειρία χρήστη.",
          ctaText: "Ξεκινήστε Σήμερα",
          socialProof: "100+ ικανοποιημένοι πελάτες",
          stats: [
            { value: "50+", label: "Έργα" },
            { value: "100%", label: "Επιτυχία" },
            { value: "24/7", label: "Υποστήριξη" }
          ]
        },
        features: {
          title: "Γιατί να Επιλέξετε το ftiaxesite.gr",
          subtitle: "Προσφέρουμε ολοκληρωμένες λύσεις web development με σύγχρονες τεχνολογίες και προσωπική εξυπηρέτηση για να δημιουργήσουμε την ιδανική ιστοσελίδα για την επιχείρησή σας.",
          items: [
            {
              icon: "zap",
              title: "Ταχύτητα & Απόδοση",
              description: "Δημιουργούμε ιστοσελίδες με μέγιστη ταχύτητα φόρτωσης και βελτιστοποίηση για τις μηχανές αναζήτησης."
            },
            {
              icon: "smartphone",
              title: "Mobile-First Design",
              description: "Κάθε ιστοσελίδα είναι πλήρως responsive και βελτιστοποιημένη για όλες τις συσκευές και οθόνες."
            },
            {
              icon: "shield",
              title: "Ασφάλεια & Αξιοπιστία",
              description: "Χρησιμοποιούμε τις πιο σύγχρονες τεχνικές ασφαλείας για να προστατεύσουμε την ιστοσελίδα σας."
            },
            {
              icon: "euro",
              title: "Προσιτές Τιμές",
              description: "Ανταγωνιστικές τιμές χωρίς συμβιβασμούς στην ποιότητα. Πληρώνετε μόνο για αυτό που χρειάζεστε."
            },
            {
              icon: "clock",
              title: "Γρήγορη Παράδοση",
              description: "Παραδίδουμε τα έργα μας στον συμφωνημένο χρόνο χωρίς καθυστερήσεις και με πλήρη λειτουργικότητα."
            },
            {
              icon: "trendingUp",
              title: "SEO Βελτιστοποίηση",
              description: "Κάθε ιστοσελίδα δημιουργείται με ενσωματωμένο SEO για καλύτερη κατάταξη στις μηχανές αναζήτησης."
            }
          ]
        },
        process: {
          title: "Πώς Δουλεύουμε",
          subtitle: "Η διαδικασία ανάπτυξης της ιστοσελίδας σας σε 3 απλά βήματα. Από την πρώτη συνάντηση μέχρι το τελικό αποτέλεσμα, σας συνοδεύουμε σε κάθε στάδιο.",
          steps: [
            {
              number: "01",
              icon: "fileText",
              title: "Ανάλυση & Σχεδιασμός",
              description: "Συζητάμε τις ανάγκες σας, αναλύουμε τον ανταγωνισμό και δημιουργούμε ένα λεπτομερές σχέδιο για την ιστοσελίδα σας.",
              color: "teal"
            },
            {
              number: "02", 
              icon: "wand2",
              title: "Ανάπτυξη & Design",
              description: "Δημιουργούμε το design και αναπτύσσουμε την ιστοσελίδα με τις πιο σύγχρονες τεχνολογίες για τη βέλτιστη απόδοση.",
              color: "navy"
            },
            {
              number: "03",
              icon: "checkCircle2", 
              title: "Δοκιμές & Παράδοση",
              description: "Κάνουμε εκτενείς δοκιμές, βελτιστοποιούμε την ιστοσελίδα και την παραδίδουμε έτοιμη για χρήση με πλήρη εκπαίδευση.",
              color: "teal"
            }
          ]
        },
        contact: {
          title: "Επικοινωνήστε μαζί μας",
          subtitle: "Στείλτε μας μήνυμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.",
          formLabels: {
            name: 'Όνομα',
            email: 'Email',  
            phone: 'Τηλέφωνο',
            voicePrompt: 'Πατήστε το μικρόφωνο και περιγράψτε το project σας',
            voiceListening: 'Ακούω... Μιλήστε τώρα',
            voiceTranscript: 'Μετατροπή σε κείμενο:',
            submit: 'Αποστολή Μηνύματος'
          }
        }
      }
    })

    console.log('✅ Homepage data seeded successfully!')
    console.log('Homepage ID:', homepageData.id)
    
  } catch (error) {
    console.error('❌ Error seeding homepage:', error)
  }
}

seedHomepage()